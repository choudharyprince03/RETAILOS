# MOAR RetailOS — Phase 1 PRD & Project Plan

- **Status:** Review draft · 24 October 2026
- **Owner:** Prince (Product Manager)
- **Basis:** Client's existing HTML prototype and the supplied scope discussion
- **Product:** Public retail solution showcase, hosted as part of the client's existing website (`/retail-showcase/`)

---

## 1. Goal
Replace a static sales-deck-only experience with a guided, interactive website where prospects discover MOAR's retail solutions, understand the business scenarios they address, and express interest. Release one is a public, no-login experience; a personalized "experience center" is a later phase and is not included here.

---

## 2. Phase 1 Scope & Acceptance Criteria

| Area | Behavior / Acceptance Criteria |
| :--- | :--- |
| **Retail lifecycle** | Nine clickable stages: Discover, Plan, Source, Merchandise, Catalog, Marketplace, Store, Customer, Returns. Selecting a stage shows context and relevant solutions. |
| **Solution library** | Full searchable, filterable list on the homepage; 23 capabilities from the supplied prototype retained plus 3 requested capabilities added (26 total). |
| **Priority solutions** | Detailed examples for **AI Catalog Intelligence**, **Space Planning / Planograms**, **Geo-Intelligence**, and **AI Product Imagery**. |
| **Solution details** | Each solution has a dedicated view with the challenge, approach, potential value, capabilities, related solutions, and next-step CTA. |
| **Visual examples** | Priority solutions have interactive, selectable before-and-after illustrative imagery. These examples are concepts, not actual client performance or live AI execution. |
| **Leads / email** | “Connect with us” collects name, work email, company, area of interest and optional message. Submit to a same-site endpoint that emails the client team. |
| **Branding and hosting** | Use the MOAR look suggested by the existing HTML (navy / blue / cyan / yellow), pending approved brand guidelines. Publish under the existing website and hosting; no new domain. |
| **Accessibility and mobile** | Responsive layout, functional keyboard interaction, descriptive labels, validation, and clear privacy/contact consent. |
| **Authentication** | No login, accounts, admin dashboard or personalized access in Phase 1. |

> **Important:** The supplied first-phase build includes a browser-based visual preview of AI Product Imagery, not a live image-generation model. Enabling a production AI demo requires approved assets, separate model/API decisions and data-handling requirements.

---

## 3. User Workflows

1. **Discovery:** Website → Click lifecycle stage → Preview stage-specific solutions → Open solution detail → Review visual example → Connect with us.
2. **Search:** Website → Search/filter all solutions → Open detail → View capabilities and related solutions → Connect with us.
3. **Enquiry:** Visitor completes the form → Browser POSTs to `/api/lead` (or `lead-handler.php`) → Server validates input, checks spam field, and sends email to the client's designated mailbox (`harsha.nandakumar@moaradvisory.com`) → Visitor sees success only if the email handler confirms submission. If the endpoint is unavailable, an email draft opens; it must be sent manually.

---

## 4. Suggested Milestones (Planning Estimates — Confirm with Client)

| Milestone | Activities | Review Gate |
| :--- | :--- | :--- |
| **M0 — Requirements & asset collection** | Confirm stakeholders, hosting stack, brand, approved copy, solution priority, photos and examples. | Scope/asset sign-off. |
| **M1 — Experience design** | Lifecycle wireframe, information architecture, solution detail template, lead journey and responsive UI. | Client approval of UI prototype. |
| **M2 — Showcase implementation** | Build full solution library, search and filters, detailed views, four illustrative before/after previews. | Content and interaction QA. |
| **M3 — Contact and website integration** | Configure client-approved notification mailbox, connect live mail endpoint on existing hosting, adapt site header/footer and policies. | Verified live delivery test. |
| **M4 — UAT & launch** | Test mobile/desktop, keyboard navigation, browsers, forms, broken links, actual brand assets and final content. | Client acceptance and launch approval. |

---

## 5. Pending Inputs from the Client

1. **Brand:** Official logo/wordmark, color palette, fonts, UI rules, footer and legal text, existing website URL and navigation integration conventions.
2. **Assets:** Authorized before/after images, planogram samples, catalog input/output records, anonymized geo dashboards or maps, product imagery originals/outputs, approved brand and case-study claims.
3. **Copy & prioritization:** Approved names/descriptions for every listed capability, maturity labels if desired, and the most important target industries/personas.
4. **Interactions:** Should each solution contain a video, clickable prototype, static comparison, embedded app or live data-driven demo? What is approved for the four priorities?
5. **Email workflow:** Confirm notification recipient(s), outbound mail service, consent/privacy wording, spam protection, and whether contact requests should be stored in a CRM.
6. **Later login:** Define who logs in (prospect, client, internal team), which content/data unlocks, role-based permissions, onboarding, and the experience center's purpose. These remain Phase 2 discovery items, not assumptions.

---

## 6. Implementation Notes
- `MOAR_RetailOS_Interactive_Showcase` uses clean system/brand typography in the review build, avoiding fragile external front-end dependencies. Approved brand fonts can be integrated later.
- It can live at a path on the current website, e.g. `/retail-showcase/`, without a separate domain. Integration into the current site header/theme is subject to brand guidance.
- Both Next.js `/api/lead` and `public/lead-handler.php` are provided as same-site email endpoints.
- The recipient in this draft is `harsha.nandakumar@moaradvisory.com`, carried over from the uploaded prototype; verify before launch.
- Email deliverability requires verified sender details and proper SMTP/SPF/DKIM configuration. Test actual receipt before publishing the form.
- The product visuals and dashboard values used to illustrate an experience are not certified production screenshots or actual measured impact; replace with approved examples before public launch.

---

## 7. Definition of Done
- [x] All 26 solutions are visible and navigable (23 from prototype + 3 requested capabilities).
- [x] Stage filter, library search/filter, detail navigation, example switches and responsive views work.
- [ ] The first four priority solution examples are approved by the client.
- [ ] Legal/branding copy is approved.
- [ ] A real enquiry is received by the nominated mailbox during UAT.
- [ ] Analytics/tracking requirements have been agreed.
- [ ] The client signs off on launch.
