"use client";
import { useEffect, useState } from "react";
export default function useSectionSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const ios: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: `-${offset}px 0px -60% 0px`, threshold: 0.01 }
      );
      io.observe(el);
      ios.push(io);
    });
    return () => ios.forEach((i) => i.disconnect());
  }, [ids, offset]);
  return active;
}