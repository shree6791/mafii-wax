# Website maintenance audit — October 15, 2026

## Fixed

- Removed seven unreachable legacy pages, including the retired request form, and their obsolete layout, animation, studio and photography helpers. No database rows or backend endpoints were removed.
- Removed the obsolete receipt-storage and request-attribution helpers from the active site's metadata module. Existing local storage is not erased.
- Removed unused query, tooltip, toast and animation providers from the app entry point. Reusable UI scaffold and package dependencies remain available; they are not proof of active product features.
- Approved canvas pages now render the website's components instead of independent copies. About/Visit therefore include the real studio photography in both environments.
- Removed obsolete homepage navigation, dialog, accordion, footer and visit-block CSS. Shared navigation and footer remain in SiteShell.
- Consolidated intimate-service prices and descriptions used by Services and its comparison guide. Reduced the guide's repeated booking sections and repeated preparation text; detailed preparation stays in First Visit.
- Consolidated navigation/routing helpers and rendered navigation links. Preserved redirects for the old booking, studio, policy and Brazilian URLs.
- Service category and search state survive reloads and can be shared using the URL.
- Mobile-menu Escape handling returns focus to the menu button; the skip link has a focusable main target.
- Twitter descriptions now update along with page descriptions and Open Graph metadata.
- Removed duplicate homepage/global font requests and corrected the serif font token. Footer distinguishes studio photography from stock models.

## Intentionally retained

- Legacy backend API, schemas and request data: may contain real historical requests. Retirement requires a separate data-retention decision, not a frontend cleanup.
- Shared UI scaffold and its dependencies: not part of the current page render tree; package pruning is a separate compatibility-sensitive change.
- Earlier canvas concept explorations: design references, not production routes.
- Licensed and approved photography originals: assets are not deleted merely because a current composition doesn't use them.

## Product work still needed

### Flow revision — October 16, 2026

The five-page flow has been revised: Services is compact and menu-first, its comparison is optional and collapsed, and links explicitly open the general booking menu. Contact puts booking/contact/address/hours before the entrance photo on mobile. FAQs groups the appointment journey and preserves the policy values. Home now includes the real interior; About uses the confirmed owner-operated background without invented biography. Mobile header booking is directly visible. The shared canvas base URL is normalized so both navigation and images resolve.

These flow changes do not supply missing owner source material or implement conversion tracking, production-domain SEO setup or automatic menu synchronization. The items below remain separate requirements.

1. **Conversion measurement:** booking links open GlossGenius; there is no completed-appointment sync or verified lead attribution. Outbound booking clicks can be measured separately, without implying that an appointment was completed.
2. **Local-search launch setup:** publish/confirm the actual production domain, then add canonical URLs, a sitemap and validated business structured data. No production URL should be guessed.
3. **Evidence-led storytelling:** the site now shows the actual studio, but has no approved owner portrait or sourced client testimonials. Gather permission and source material before adding either; do not invent evidence.
4. **Menu ownership:** prices are a dated public-menu snapshot, not a live GlossGenius feed. Assign a review process or verify supported provider integration before promising automatic updates.

This audit removes concrete legacy code and drift; it does not establish that the website is finished or a 9/10 design.
