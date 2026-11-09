"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

export default function InstagramEmbed({ url, caption }: { url: string; caption?: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );

    function process() {
      window.instgrm?.Embeds.process();
    }

    if (existingScript) {
      process();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = process;
      document.body.appendChild(script);
    }
  }, [url]);

  return (
    <div ref={containerRef} className="w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ width: "100%", margin: 0 }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          {caption || "Ver no Instagram"}
        </a>
      </blockquote>
    </div>
  );
}
