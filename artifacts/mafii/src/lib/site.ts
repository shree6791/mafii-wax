import { useEffect } from "react";

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const set = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    set("name", "description", description);
    set("property", "og:title", title);
    set("property", "og:description", description);
    set("name", "twitter:title", title);
    set("name", "twitter:description", description);
  }, [title, description]);
}
