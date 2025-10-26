"use client";

import { useEffect, useState } from "react";
import { Thermometer, MapPin, Loader2 } from "lucide-react";

type Weather = {
  temp: number;
  city?: string;
};

const REFRESH_MS = 15 * 60 * 1000; // 15 minutes

export default function Temperature({
  fallbackCity = "Hyderabad,IN",
  className = "",
}: {
  /** If geolocation is denied/unavailable, we’ll use this. Format "City,CC" */
  fallbackCity?: string;
  className?: string;
}) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

  useEffect(() => {
    let timer: number | undefined;

    async function fromLatLon(lat: number, lon: number) {
      if (!apiKey) return;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather({
        temp: Math.round(data.main?.temp),
        city: data.name,
      });
    }

    async function fromCity() {
      if (!apiKey) return;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        fallbackCity
      )}&units=metric&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather({
        temp: Math.round(data.main?.temp),
        city: data.name,
      });
    }

    function getWeather() {
      setLoading(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setDenied(false);
            fromLatLon(pos.coords.latitude, pos.coords.longitude).finally(() =>
              setLoading(false)
            );
          },
          () => {
            setDenied(true);
            fromCity().finally(() => setLoading(false));
          },
          { enableHighAccuracy: false, timeout: 8000, maximumAge: 10 * 60 * 1000 }
        );
      } else {
        setDenied(true);
        fromCity().finally(() => setLoading(false));
      }
    }

    getWeather();
    timer = window.setInterval(getWeather, REFRESH_MS);
    return () => clearInterval(timer);
  }, [apiKey, fallbackCity]);

  if (!apiKey) return null;

  return (
    <div
      className={`flex items-center gap-2 rounded px-2 py-1 text-white/95 ${className}`}
      title={
        weather?.city
          ? `Local weather • ${weather.city}`
          : denied
          ? "Location blocked — showing fallback city"
          : "Getting your location…"
      }
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Thermometer className="h-4 w-4" />
      )}
      {weather ? (
        <span className="text-xs sm:text-sm">
          {weather.temp}°C
          {weather.city ? (
            <span className="ml-1 hidden sm:inline-flex items-center gap-1 opacity-90">
              <MapPin className="h-3 w-3" /> {weather.city}
            </span>
          ) : null}
        </span>
      ) : (
        <span className="text-xs sm:text-sm opacity-90">—</span>
      )}
    </div>
  );
}