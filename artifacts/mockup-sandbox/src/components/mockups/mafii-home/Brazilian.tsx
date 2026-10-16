import { useEffect } from "react";
import { page } from "../../../../../mafii/src/lib/site-links";

// Preserve old canvas links without maintaining a separate guide page.
export function Brazilian() {
  const destination = page("Brazilian");
  useEffect(() => { window.location.replace(destination); }, [destination]);
  return <a href={destination}>Continue to Services</a>;
}
export default Brazilian;
