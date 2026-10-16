import type { ReactNode } from "react";
import "../_group.css";
import "./Refinement.css";
import "../Refined.css";
import "./InnerPages.css";

export function RefinedFrame({ children, inner = false }: { children: ReactNode; inner?: boolean }) {
  return <div className={`mafii-refined hero-balanced${inner ? " refined-inner" : ""}`}>{children}</div>;
}
