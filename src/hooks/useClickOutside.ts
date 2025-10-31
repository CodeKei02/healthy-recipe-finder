import { useEffect } from "react";
import type { RefObject } from "react";

type ref = RefObject<HTMLElement | null>;

export default function useClickOutside(
  ref: ref,
  onClickOutside: () => void,
  options?: { enabled?: boolean; ignore?: ref[] }
) {
  const { enabled = true, ignore = [] } = options ?? {};

  useEffect(() => {
    if (!enabled) return;

    const handle = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      const el = ref?.current ?? null;
      if (!el) return;

      if (target && el.contains(target)) return;

      for (const r of ignore) {
        const ir = r?.current ?? null;
        if (ir && target && ir.contains(target)) return;
      }

      onClickOutside();
    };

    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);

    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [
    ref,
    onClickOutside,
    enabled,
    JSON.stringify(ignore.map((r) => !!r?.current)),
  ]);
}
