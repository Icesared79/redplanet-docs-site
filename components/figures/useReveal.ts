"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Shared reveal/replay mechanics for every animated figure: fires once when
// 35% of the figure enters the viewport (IntersectionObserver), with a
// getBoundingClientRect fallback if IO never fires within 1800ms — matching
// design_handoff_atlas_docs/reference/Red Planet Docs.dc.html's own runtime.
// Under prefers-reduced-motion the figure is armed immediately and replay is
// a no-op, so the final state renders with no timers.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [armed, setArmed] = useState(0);
  const firedRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" && !!window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (reducedRef.current) {
      firedRef.current = true;
      setArmed(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let fallback: ReturnType<typeof setTimeout> | undefined;
    let obs: IntersectionObserver | undefined;

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setArmed(1);
      obs?.disconnect();
      if (fallback) clearTimeout(fallback);
    };

    if (typeof IntersectionObserver !== "undefined") {
      obs = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) fire();
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
    }

    fallback = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.8 && r.bottom > 0) fire();
    }, 1800);

    return () => {
      obs?.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, []);

  const replay = useCallback(() => {
    if (reducedRef.current) return;
    setArmed((n) => n + 1);
  }, []);

  return { ref, armed, reduced: reducedRef.current, replay };
}

export const EASE = "cubic-bezier(.2,.7,.2,1)";
export const fmt = (n: number) => n.toLocaleString("en-US");
