"use client";

import { useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";

export default function MarkdownImage(
  props: ImgHTMLAttributes<HTMLImageElement>,
) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const alt = props.alt ?? "";

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        alt={alt}
        onClick={() => setOpen(true)}
        className="cursor-zoom-in transition-opacity hover:opacity-90"
      />

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Expanded image"}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm cursor-zoom-out animate-fade-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={props.src as string}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[95vh] max-w-[95vw] rounded-md border border-white/10 shadow-2xl animate-scale-in cursor-default"
          />
        </div>
      )}
    </>
  );
}
