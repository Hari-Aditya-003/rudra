"use client";

type Props = {
  items: string[];
  background?: string;
  textColor?: string;
  speedMs?: number; // lower = faster
};

export default function NewsTicker({
  items,
  background = "#0098DC",
  textColor = "#fff",
  speedMs = 18000,
}: Props) {
  const text = items.join("   •   "); // separator

  return (
    <div
      style={{ background, color: textColor }}
      className="w-full overflow-hidden"
    >
      <div className="relative mx-auto max-w-[100vw]">
        <div
          className="whitespace-nowrap py-2 will-change-transform"
          style={{
            animation: `ticker ${speedMs}ms linear infinite`,
          }}
        >
          <span className="opacity-90">{text}</span>
          {/* duplicate for seamless loop */}
          <span className="opacity-90 pl-12">{text}</span>
        </div>
      </div>

      {/* Local keyframes */}
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}