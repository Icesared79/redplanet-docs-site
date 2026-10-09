// The application-window frame every Atlas visual sits in, plus the caption
// that dates the data. Server component: these visuals are static reads of
// data/atlas-snapshot.json, so no JavaScript ships for them.
import type { ReactNode } from "react";
import { AS_OF } from "@/lib/snapshot";

export default function VisualFrame({
  title,
  chip,
  caption,
  surface,
  children,
}: {
  /** The window's own title, as the real screen would name it. */
  title: string;
  /** Right-hand chip in the title bar: the product or module. */
  chip?: string;
  /** One line under the window. "Atlas data as of <date>" is appended. */
  caption?: ReactNode;
  /** Band surface, per the design system. Omit for the page's own surface. */
  surface?: "sage" | "paper" | "forest";
  children: ReactNode;
}) {
  return (
    <figure className="rpv" data-surface={surface} data-product="atlas">
      <div className="rpv__win">
        <div className="rpv__bar">
          <span className="rpv__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="rpv__title">{title}</span>
          {chip && <span className="rpv__chip">{chip}</span>}
        </div>
        <div className="rpv__body">{children}</div>
      </div>
      <figcaption className="rpv__caption">
        {caption ? <>{caption} </> : null}
        Atlas data as of {AS_OF}.
      </figcaption>
    </figure>
  );
}
