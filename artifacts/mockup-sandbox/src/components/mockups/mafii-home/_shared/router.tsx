import type { AnchorHTMLAttributes } from "react";

export function Link({ href, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} href={href} onClick={(event) => { event.preventDefault(); onClick?.(event); }} />;
}

export function useLocation(): [string] {
  return ["/"];
}
