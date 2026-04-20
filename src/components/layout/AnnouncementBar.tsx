"use client";

import { useEffect, useMemo, useState } from "react";
import "./AnnouncementBar.css";

const DISMISS_KEY = "announcement_dismissed";

type AnnouncementBarProps = {
  text: string;
  link?: string;
  linkText?: string;
  enabled?: boolean;
};

export function AnnouncementBar({
  text,
  link,
  linkText,
  enabled = true,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);
  const hasLink = useMemo(() => Boolean(link && linkText), [link, linkText]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isDismissed = window.sessionStorage.getItem(DISMISS_KEY) === "true";
    setDismissed(isDismissed);
  }, []);

  if (!enabled || dismissed) {
    return null;
  }

  const onDismiss = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DISMISS_KEY, "true");
    }
    setDismissed(true);
  };

  return (
    <aside className="announcement-bar" role="status" aria-live="polite">
      <div className="announcement-bar__content">
        <span className="announcement-bar__text">{text}</span>
        {hasLink ? (
          <a className="announcement-bar__link" href={link}>
            {linkText}
          </a>
        ) : null}
      </div>
      <button
        type="button"
        className="announcement-bar__dismiss"
        onClick={onDismiss}
        aria-label="Dismiss announcement"
      >
        <span aria-hidden="true">X</span>
      </button>
    </aside>
  );
}

export type { AnnouncementBarProps };
