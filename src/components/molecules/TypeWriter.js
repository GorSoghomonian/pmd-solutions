"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 80, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;
    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1)); // всегда берём срез
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block ml-1 w-0.5 h-6 bg-current animate-pulse" />
    </span>
  );
}
