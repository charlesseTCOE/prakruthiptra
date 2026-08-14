"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

declare global {
  interface Window {
    twttr?: {
      widgets: { load: (el?: HTMLElement) => void };
    };
  }
}

type Props = {
  handle?: string; // no leading @ — defaults to PTRA's own account
  height?: number;
  tweetLimit?: number; // caps how many tweets show, keeps the widget compact
};

export default function TwitterFeed({ handle, height = 320, tweetLimit = 3 }: Props) {
  const resolvedHandle = handle ?? siteConfig.social.twitterHandle;
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = document.getElementById("twitter-wjs");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.twttr && containerRef.current) {
      window.twttr.widgets.load(containerRef.current);
    }

    // The widget replaces the <a> below with an <iframe> once it renders.
    // If that hasn't happened after a few seconds (blocked script, slow
    // network, an account that disallows embedding), the overlay link
    // below stays visible instead of leaving an empty box that looks broken.
    const check = setInterval(() => {
      if (containerRef.current?.querySelector("iframe")) {
        setLoaded(true);
        clearInterval(check);
      }
    }, 500);
    const timeout = setTimeout(() => clearInterval(check), 6000);

    return () => {
      clearInterval(check);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl border border-line bg-white overflow-hidden"
      style={{ minHeight: height }}
    >
      <a
        className="twitter-timeline"
        data-height={height}
        data-tweet-limit={tweetLimit}
        data-theme="light"
        data-link-color="#8a4a30"
        data-chrome="noheader nofooter noborders transparent"
        href={`https://twitter.com/${resolvedHandle}?ref_src=twsrc%5Etfw`}
      >
        Tweets by @{resolvedHandle}
      </a>
      {!loaded && (
        <a
          href={`https://twitter.com/${resolvedHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center gap-2 bg-white text-sm text-clay hover:text-ochre transition-colors"
        >
          View @{resolvedHandle} on X ↗
        </a>
      )}
    </div>
  );
}
