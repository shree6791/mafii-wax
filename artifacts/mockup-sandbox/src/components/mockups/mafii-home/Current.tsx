import { Link } from "./_shared/router";
import { ArrowUpRight } from "lucide-react";
import { Layout, PrimaryCTA, StripeFrame } from "./_shared/layout";
import { photos } from "./_shared/photos";
import { directionsUrl } from "./_shared/studio";
import "./_group.css";

export default function Current() {

  return (
    <Layout>
      <section className="border-b border-black">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 grid lg:grid-cols-12 gap-x-10 gap-y-12 items-center pt-12 md:pt-16 lg:pt-20 pb-14 md:pb-20">
          <div className="lg:col-span-6">
            <p className="label text-black/55">Brazilian &amp; body waxing · Mountain View</p>
            <h1 className="t-hero mt-5">Beautifully<br /><span className="serif-i">smooth skin.</span></h1>
            <p className="mt-6 t-lead text-black/75 max-w-md">Your signature Brazilian. Bare legs for the weekend. Expert waxing that makes room for you and what feels good on your skin.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PrimaryCTA testId="link-hero-book" />
              <Link href="/services" data-testid="link-hero-services" className="u-link text-sm">Explore services</Link>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <StripeFrame src={photos.campaign.src} alt={photos.campaign.alt} priority side="right" position="top" />
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 sec grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <p className="label text-white/55">The person behind your wax</p>
            <h2 className="t-h2 mt-4">Experienced hands.<br />Personal attention.</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="t-lead text-white/75">Waxing is personal. Your care should be, too. MAFII is a women-owned, owner-operated studio with over seven years of waxing expertise—bringing practiced technique to an appointment shaped around your comfort and preferences.</p>
            <Link href="/studio" className="mt-6 inline-flex items-center gap-2 u-link text-sm" data-testid="link-home-studio">Meet MAFII <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 sec">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-black/55">Find your service</p>
            <h2 className="t-h2 mt-4">A little detail.<br />A full-body refresh.</h2>
          </div>
          <Link href="/services" className="u-link text-sm" data-testid="link-home-services">All services &amp; prices</Link>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            { title: "Brazilian", text: "For intimate-area waxing, start with the guide to choosing between a Brazilian and bikini line.", href: "/brazilian", action: "Explore Brazilian waxing" },
            { title: "Body", text: "Underarms, arms, and legs. Choose the areas you want smooth and build your own routine.", href: "/services?category=Body", action: "Explore body waxing" },
            { title: "Face", text: "Brow shaping and facial waxing for the finishing details.", href: "/services?category=Face", action: "Explore facial waxing" },
          ].map((service) => (
            <div key={service.title} className="border-t border-black pt-6 flex flex-col items-start">
              <h3 className="t-h3">{service.title}</h3>
              <p className="mt-4 mb-6 text-black/65 leading-relaxed max-w-sm">{service.text}</p>
              <Link href={service.href} className="mt-auto inline-flex items-center gap-2 u-link text-sm">{service.action}<ArrowUpRight className="w-4 h-4 shrink-0" /></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 sec-sm grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <p className="label text-white/60">New to waxing?</p>
            <h2 className="t-h2 mt-4">You don’t need to<br />know it all.</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="t-lead text-white/80">Questions about preparation, discomfort, or caring for your skin afterward? Our first-visit guide explains the essentials, so you can arrive feeling more at ease.</p>
            <p className="mt-4 text-white/70">All genders are welcome, whether this is your first wax or part of your routine.</p>
            <Link href="/first-visit" className="mt-6 inline-flex items-center gap-2 u-link text-sm" data-testid="link-home-first-visit">Before your first visit <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 md:px-10 lg:px-12 sec grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <p className="label text-black/55">Find us in Mountain View</p>
          <h2 className="t-h2 mt-4">Your next visit, Studio 21.</h2>
          <p className="mt-6 text-black/75">Inside Sola Salon Studios · 550 Showers Drive D006</p>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 u-link text-sm" data-testid="link-home-directions">Get directions <ArrowUpRight className="w-4 h-4" /></a>
        </div>
        <div className="lg:col-span-5 lg:justify-self-end">
          <PrimaryCTA testId="link-home-book" />
        </div>
      </section>
    </Layout>
  );
}
