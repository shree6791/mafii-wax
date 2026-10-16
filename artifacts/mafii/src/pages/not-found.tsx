import { SiteShell, page } from "@/pages/editorial/SiteShell";

export default function NotFound() {
  return (
    <SiteShell active="NotFound">
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-12 py-32">
        <p className="t-hero">404</p>
        <p className="mt-6 text-xl">This page doesn't exist. Try the menu above.</p>
        <a href={page("PersonalSpecialist")} className="mt-10 inline-block bg-black text-white px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em]" data-testid="link-404-home">Back home</a>
      </section>
    </SiteShell>
  );
}
