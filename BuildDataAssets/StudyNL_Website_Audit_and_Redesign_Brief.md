# StudyNL Website Audit and Redesign Brief

**Client:** StudyNL  
**Website reviewed:** [https://www.study-nl.com/home](https://www.study-nl.com/home)  
**Audit date:** 16 July 2026  
**Document purpose:** Client-ready website audit, redesign strategy, content brief, and implementation roadmap

> **Executive verdict:** StudyNL has a relevant proposition and a useful starting set of topics, but the live website is not ready to be promoted or scaled. The most important work is not a visual reskin. It is a controlled rebuild of the information architecture, responsive system, content governance, trust layer, conversion paths, and search foundations.

## Executive summary

StudyNL aims to help international students make better decisions about studying and relocating to the Netherlands. That is a strong and valuable space: visitors face high-stakes choices involving admissions, money, housing, visas, employment, and arrival logistics.

The current site has the beginnings of that value proposition, including broad subject coverage, a friendly palette, a consistent desktop shell, a Start Here journey, a community concept, and a service proposition through Hub Plus. However, the experience still behaves like an unfinished prototype.

The critical issues are structural:

- All 23 sampled static routes contain a `noindex` directive, so they are explicitly excluded from search results.
- `robots.txt` advertises nine sitemap URLs, and all nine return HTTP 404.
- Eleven of the twelve Guide-card links point to the hidden root splash page rather than the intended guides.
- A public "animation test page" appears in the Guides navigation.
- Seven guide pages visibly contain "PUT A CTA HERE?" placeholder text.
- The About page uses `info@mysite.com` and `123-456-7890`.
- The Help Centre contains untouched template instructions.
- The main mobile layout remains approximately 980 pixels wide. At a 375-pixel browser viewport, the measured page scroll width was 1,126 pixels, creating roughly 3x horizontal overflow.
- A first-visit "Lets Get Started" dialog was observed blocking the homepage. Its Dutch/non-Dutch choices do not create a coherent personalised journey.
- The Enrolment form collects a date of birth, phone number, email address, country, university preference, and resume URL without a visible privacy notice or data-use explanation.
- Twelve reviewed long-form guides contain no in-body links to official sources or related StudyNL guidance, and none visibly shows an author, review date, effective date, or correction route.

These problems directly affect trust, discoverability, accessibility, conversion, and operational risk. Visual refinement should happen only after the product promise, content ownership, navigation, and data flows are clarified.

### Recommended direction in one sentence

Rebuild StudyNL as a calm, credible, task-led student planning service: begin with a short personalised "Build my plan" journey, organise information around what the student needs to do, publish source-backed guidance through structured CMS templates, and use a responsive, accessible visual system that feels authoritative without feeling institutional.

### Immediate recommendation

Treat the project as two connected workstreams:

1. **Stabilise the live site immediately.** Remove test and template content, repair links and forms, resolve the root/home conflict, and keep `noindex` in place until high-risk content passes editorial and legal review.
2. **Run the redesign as a product and content rebuild.** Validate positioning and audiences, test the new information architecture, create a responsive design system, migrate into structured content models, and launch with accessibility, SEO, performance, and analytics acceptance criteria.

## Audit scope and methodology

The audit covered:

- A navigation-discovered crawl of 23 static/public routes, plus selected community-generated pages.
- Desktop review at 1,440 x 900 pixels.
- Mobile review at 390 x 844 pixels, with browser client width measured at 375 pixels after scrollbars.
- Global navigation, footer, language selector, search, selected CTA, form, and forum behaviours.
- Page titles, canonical URLs, robots directives, meta descriptions, headings, landmarks, images, forms, links, and basic accessibility signals.
- `robots.txt`, advertised sitemap status, domain redirect behaviour, and sampled response headers.
- A browser-observed homepage asset inventory.
- Spot checks of high-stakes content against official Dutch and EU sources.

### Important limitations

This is an expert heuristic and implementation audit, not a replacement for:

- Analytics, Search Console, CRM, or CMS access.
- User interviews, moderated usability testing, or survey research.
- A complete automated and manual WCAG conformance audit.
- Real-user Core Web Vitals field data or a controlled Lighthouse test on representative devices.
- Penetration testing, a formal security review, or legal advice.
- A full translation-quality review of all nine language options.

Dynamic content may change after the audit date. All statements about the live site reflect the experience observed on 16 July 2026.

## Severity and scoring model

Findings use the following priority scale:

| Priority | Meaning | Required response |
|---|---|---|
| **P0 - Critical** | Blocks launch, breaks a core journey, creates material trust/privacy risk, or prevents discovery | Fix before promotion or public launch |
| **P1 - High** | Seriously reduces usability, comprehension, accessibility, conversion, or content reliability | Resolve during redesign before release candidate |
| **P2 - Medium** | Creates friction or inconsistency but does not independently block the core task | Include in design-system and QA work |
| **P3 - Low** | Polish, optimisation, or future enhancement | Address after core experience is stable |

The following scores are directional heuristic scores, not industry certifications. They are intended to show relative risk and prioritise investment.

## Heuristic scorecard

| Area | Score | Summary |
|---|---:|---|
| Overall launch readiness | **27/100** | The site contains multiple public prototype artefacts and broken core paths |
| Positioning and proposition | **44/100** | Relevant problem space, but value, independence, service model, and proof are unclear |
| Information architecture | **28/100** | Topics exist, but the taxonomy mixes journeys, products, support, and content types |
| Content quality and trust | **24/100** | High-stakes guidance is thin, unsourced, undated, and sometimes inaccurate or duplicated |
| Desktop visual design | **51/100** | Friendly palette and consistency, but hierarchy, density, branding, and page composition need work |
| Mobile and responsive UX | **8/100** | Fixed-width layout clips essential content and requires horizontal scrolling |
| Accessibility | **34/100** | Some semantic landmarks and labels exist, but reflow, contrast, targets, headings, and alt text fail |
| SEO and discoverability | **4/100** | Site-wide `noindex`, broken sitemaps, empty metadata, poor URLs, and no structured data |
| Conversion and forms | **22/100** | Broken or placeholder CTAs, weak next steps, and insufficient privacy context |
| Technical and performance readiness | **39/100** | HTTPS and caching are present, but the Wix implementation is script-heavy and not responsive |

## Evidence at a glance

| Evidence | Observation | Impact |
|---|---|---|
| Indexability | 23 of 23 sampled static routes use `noindex` | Search engines are instructed not to show the pages |
| Sitemaps | 9 of 9 sitemap URLs in `robots.txt` return 404 | Crawling, localisation, and Search Console monitoring are undermined |
| Guide hub | 11 of 12 "View Guide" links point to `/` | The main editorial journey fails |
| Public prototype content | Test page, template copy, dummy contact details, and seven CTA placeholders | Severe credibility loss |
| Mobile reflow | 1,126-pixel scroll width at a 375-pixel client viewport | Logo, navigation, copy, and CTA are clipped |
| CTA contrast | White text on `rgb(234,108,70)` measures approximately 3.12:1 | Below WCAG 2.2 AA for normal text |
| Content governance | 0 official in-body source links across 12 reviewed long-form guides | High-stakes claims are difficult to verify or maintain |
| Homepage asset inventory | 132 observed assets: 97 scripts, 12 images, 6 fonts, 1 video, 19 inline SVGs | Performance risk, especially on mobile |
| Mobile Lighthouse lab run | Performance 70, SEO 61, FCP 1.7 s, LCP 10.8 s, CLS 0.003 | The above-fold experience is visually stable but the main content is far too slow under mobile throttling |
| Network proxy | 153 resources, 99 script requests, about 1.20 MB transferred and 4.10 MB decoded | Excess implementation weight for a simple content-led homepage |
| Enrolment form | Collects multiple personal-data fields without visible privacy context | Trust, compliance, and abandonment risk |

## What is working and worth retaining

The redesign should not discard everything. Several foundations can be developed:

- The subject area is genuinely useful and commercially relevant.
- The homepage quickly communicates that the site is about studying in the Netherlands.
- The topic set covers many of the questions students actually ask: housing, funding, visa, work, universities, cost of living, and arrival.
- The recurring pale-blue background and warm-orange accent can evolve into a distinctive system.
- Desktop pages use consistent header and footer patterns.
- The page markup includes an English language declaration, a main landmark, a navigation landmark, and a footer landmark.
- A skip link appears after the page has loaded.
- Many form controls expose accessible names.
- HTTPS is enforced, HSTS is present, and the sampled response includes `X-Content-Type-Options: nosniff`.
- The content often distinguishes EU/EEA and non-EU students, which is the right direction for personalisation.
- Hub Plus, verified housing, planning tools, and community could become differentiators if their operating models and proof are made explicit.

The design opportunity is to keep the warmth and ambition while replacing ambiguity with utility, proof, and disciplined structure.

<!-- PDF_PAGEBREAK -->

# 1. Current website structure

The current structure is generated from global navigation and page links, not from a Wix CMS export.

```text
/  Welcome (hidden) splash
`-- /home  actual homepage
    |-- Start Here
    |-- About
    |-- Guides
    |   |-- animation test page
    |   |-- Accommodation
    |   |-- Student Finance & Loans (DUO)
    |   |-- Scholarships & Funding
    |   |-- Fraternities
    |   |-- Visa & Residency
    |   |-- Working While Studying
    |   |-- Cost of Living
    |   |-- Arrival Checklist
    |   |-- Avoid Scams
    |   |-- Study in the Netherlands
    |   |-- City Guides
    |   |-- Universities
    |   |-- Verified Housing
    |   `-- Enrolment
    |-- Hub Plus
    |-- Help Centre
    `-- Forum
```

The global header also includes Search, a language selector with nine languages, and a repeated Hub Plus CTA. The footer repeats most of the guide taxonomy and adds About, Contact, Legal, Help centre, and Partner with us.

## Structural diagnosis

The navigation mixes several different organising principles:

- **Journey entry point:** Start Here.
- **Corporate information:** About.
- **Content type:** Guides.
- **Product or membership:** Hub Plus.
- **Support channel:** Help Centre.
- **Community feature:** Forum.

This makes the visitor decode StudyNL's internal organisation before they can find an answer. The site should instead organise the primary navigation around user tasks and life stages.

The current root route also creates a needless extra layer. `/` is a hidden splash titled "Welcome (hidden) | Studynl", while `/home` is the functional homepage. Several broken Guide links send users to the splash. The preferred homepage should be `/`, and all old variants should resolve through tested permanent redirects.

## Current core journeys

### Main discovery journey

```text
Home -> Start Your Move -> Start Here -> View Guides -> Guides hub -> hidden splash
```

The journey fails at the point where the visitor expects useful detail because eleven Guide-card links route to `/`.

### Editorial journey

```text
Homepage topic -> long-form guide -> placeholder or unrelated CTA -> dead end
```

Most guides do not provide breadcrumbs, sources, related content, a next guide, a saved checklist, or a task-specific next action.

### Application journey

```text
Open Days & Enrolling -> Enrolment form
```

The homepage label promises open-day and enrolment discovery, but the destination is a lead form. There is no programme or event discovery step, no explanation of official application channels, and insufficient trust before personal-data collection.

### Service and community journey

```text
Hub Plus -> benefits promise -> forum/community -> sparse activity
```

The service is described as free, structured, private, and priority-based, but access, onboarding, moderation, service boundaries, and proof are unclear.

# 2. Content audit

## Content strengths

- The site recognises the breadth of the relocation problem rather than treating university application as a single form.
- Several article titles match high-intent search and user questions.
- EU/EEA and non-EU distinctions appear on several pages.
- The Start Here concept can become a powerful orientation layer.
- Some guides use scannable subheadings and practical checklists.

## P0 content and credibility failures

### Public placeholders and prototype artefacts

- The About page displays `info@mysite.com` and `123-456-7890`.
- The About contact message says, "I'm always looking for new and exciting opportunities. Let's connect."
- The Help Centre displays Wix template instructions: "This is your Team section. Briefly introduce the team then add their bios below. Click here to edit."
- The public Guides navigation includes an "animation test page" with two `TEST PAGE` H1 headings.
- Seven pages display "PUT A CTA HERE?": Student Finance, Scholarships, Cost of Living, Arrival Checklist, Avoid Scams, Study in the Netherlands, and Universities.
- Verified Housing shows placeholder-style property counts and repeated dummy phone numbers.
- The footer copyright reads "Copyright 2035 by AiWawa" and links "StudyNL" to Wix.
- Footer labels include "Citiy guides" and "Accomodation".

These are launch blockers because the service asks users to trust it with decisions involving money, immigration, housing, and personal data.

<!-- PDF_FIGURE: unfinished-pages -->

### Unsupported trust claims

The homepage says "We're Approved Partners" but:

- Partner logos use filename-style alternative text such as `75.png`.
- Partners are not named in supporting text.
- Logos do not link to partner profiles or evidence.
- The criteria for "approved" are not explained.
- The relationship, commercial model, and verification date are not disclosed.

Replace the generic claim with a transparent partner model containing legal name, category, relationship, verification method, date, and accessible logo text.

### High-stakes content lacks governance

Across twelve reviewed long-form guide pages:

- No page had an in-body link to an official Dutch source.
- No page had an in-body link to a related StudyNL guide.
- No page visibly showed an author or responsible editor.
- No page visibly showed a last-reviewed date, next-review date, or effective academic year.
- No page provided a corrections route or editorial policy.

This is especially risky for DUO eligibility, tuition, visa rules, work permissions, insurance, and housing.

### Accuracy and copy-paste examples

- Universities states an EU tuition fee of EUR 2,601 without an academic year. That was the statutory fee for 2025-26; DUO lists EUR 2,694 for 2026-27.
- Scholarships refers to the "Holland Scholarship" rather than its current name, the "NL Scholarship".
- Student Finance simplifies EU eligibility to citizenship, employment, a BSN, and "around 32 hours per month" without explaining other routes or assessment conditions.
- Visa & Residency contains an unrelated "University Scholarships (Major Institutions)" section copied into the page.
- Visa guidance presents MVV and residence-permit requirements too absolutely and omits important exceptions and process detail.
- Cost of Living says health insurance is "Mandatory" without explaining that the correct route depends on work status and circumstances.
- Working While Studying repeats the heading "Internships" and sends a work-focused reader to verified housing.
- Cost of Living and Student Finance repeat the same unsourced monthly budget ranges.
- City Guides contains generic About-style "The Problem" and "What We Are" copy instead of actual city records.

The redesign must include an editorial review process, not just text migration.

## Content depth and usefulness

Several pages are too thin for their subject:

- Avoid Scams contained approximately 46 words in the main content.
- Arrival Checklist contained approximately 77 words.
- Enrolment contained approximately 43 words before the form.
- Verified Housing contained approximately 65 words.
- Help Centre contained approximately 72 words.

Thinness is not only an SEO issue. It prevents visitors from making a decision or understanding the next step.

## Missing content and product capabilities

Priority gaps include:

- Programme and course discovery.
- Studielink and official application process guidance.
- Application requirements, documents, language tests, selection, and numerus-fixus deadlines.
- Structured university profiles with official outbound links.
- Real city profiles and a transparent comparison methodology.
- Health insurance and healthcare.
- Municipality registration and BSN.
- Banking, transport, taxes, and first-month logistics.
- Parent-focused guidance.
- Housing-verification methodology and listing expiry controls.
- Named team, registered organisation, editorial policy, corrections policy, privacy, terms, cookies, and disclaimers.
- Named partner profiles and partner eligibility criteria.
- Real open-day and event data.

## Recommended editorial standard

Every high-stakes guide should include:

1. A short direct answer.
2. Audience scope: nationality, study level, and journey stage.
3. Effective academic year or date.
4. Responsible editor and last-reviewed date.
5. Official sources, with the most important source near the relevant claim.
6. Clear steps, exceptions, warnings, and deadlines.
7. A task-specific next action.
8. Related guides and a correction/contact route.

Official sources should include DUO, IND, Government.nl, Studielink, the relevant municipality, the relevant institution, and Study in NL where appropriate.

<!-- PDF_PAGEBREAK -->

# 3. UI and visual design audit

## Overall visual direction today

The current interface uses pale blue surfaces, orange accents, a purple-to-orange gradient, rounded controls, a serif logo, and generous whitespace. The style is approachable, but it lacks a clear system for hierarchy, density, imagery, and trust.

## Strengths

- The colour direction is warmer and more student-friendly than a typical government portal.
- Repeated header and footer styling creates some continuity on desktop.
- Large headings and simple card shapes are easy to understand when visible.
- The hero message is concise.
- The visual language can evolve without abandoning the current brand entirely.

## P1 visual issues

### The page composition is frequently empty rather than calm

The Guides hub places its heading and introduction at the top of an almost empty 900-pixel viewport. Article pages use oversized blank zones before useful content. Generous spacing is valuable, but here it delays task completion and makes pages feel incomplete.

### Hierarchy is inconsistent

- Start Here and About have no H1.
- Student Finance uses six H1 elements.
- The test page uses two H1 elements.
- Enrolment uses an unrelated subheading about budgeting.
- Important calls to action sometimes appear as buttons, sometimes links, and sometimes inert styled elements.

### Brand presence and navigation compete

The header gives the strongest left-side visual position to Hub Plus and the language selector rather than to the StudyNL identity. The logo appears inside the homepage hero rather than anchoring the global navigation. Hub Plus is repeated, which makes the product feel more important than the visitor's primary task.

### Gradients are overused and under-structured

The orange-purple gradient is used as a large atmospheric field, border, and CTA motif. It can be retained as a brand accent, but it should not substitute for content hierarchy or trustworthy proof.

### Imagery does not build credibility

- Some illustrations feel generic.
- The Hub Plus hero image appears heavily blurred.
- Partner logos lack names and context.
- Image alternative text frequently exposes filenames rather than meaning.

## Recommended visual character

The redesigned brand should feel:

- **Clear:** public-service clarity without bureaucracy.
- **Human:** optimistic, student-centred, and culturally aware.
- **Credible:** calm typography, named evidence, and transparent status labels.
- **Practical:** actions, checklists, comparisons, and next steps are more prominent than decoration.
- **International:** designed for different language lengths and reading patterns.

### Suggested design system direction

- **Primary ink:** deep navy for authority and readable body text.
- **Primary surface:** warm white and very pale blue.
- **Action colour:** a darker accessible orange, verified against white and dark text.
- **Support colour:** clear blue for links and information.
- **Status colours:** reserved green, amber, and red for verified, warning, and urgent states.
- **Typography:** a highly legible sans-serif for UI and body, paired with a restrained editorial serif for selected display moments.
- **Grid:** 12-column desktop grid with a 1,200-pixel maximum content width; fluid tablet layout; single-column mobile layout.
- **Spacing:** an 8-pixel base scale with defined section, card, and control spacing tokens.
- **Radius:** use one or two radius values consistently instead of making every element equally rounded.

The existing orange and blue identity can be retained, but contrast and usage rules must be defined as tokens rather than selected page by page.

<!-- PDF_FIGURE: homepage-responsive -->

# 4. Mobile and responsive audit

## P0 responsive failure

At a 390 x 844 test viewport, the browser reported a 375-pixel client width. The page behaved as follows:

- Main site root width: approximately 980 pixels.
- Document scroll width: 1,126 pixels.
- Overflow ratio: approximately 3.0x the viewport.
- Navigation list width: approximately 1,924 pixels.
- Logo, H1, supporting copy, and CTA were clipped to the right.
- The desktop navigation remained visible rather than becoming a mobile menu.
- A horizontal scrollbar was required to reach content.
- Of 37 visible mobile interactive elements measured in the focused UX review, 29 were below the preferred 44-pixel size in at least one dimension.

This is a functional blocker, not a cosmetic breakpoint issue. It also conflicts with WCAG 2.2 reflow expectations, which require typical vertical content to work without two-dimensional scrolling at narrow widths.

## Mobile redesign requirements

- Replace the desktop header with a tested mobile header and menu.
- Keep the brand, one utility action, and one primary CTA visible.
- Use fluid containers with no fixed 980-pixel minimum width.
- Ensure every page reflows at 320 CSS pixels and at 400% zoom.
- Set readable line lengths and mobile type sizes.
- Stack cards and forms in a logical reading order.
- Make interactive targets at least 44 x 44 CSS pixels where possible and never below WCAG 2.2 minimum target guidance.
- Avoid autoplay background video on mobile.
- Test at 320, 375, 390, 412, 768, 1,024, and 1,440 pixels.
- Test landscape, 200% text zoom, 400% page zoom, and long translated labels.

# 5. Accessibility audit

## Positive foundations

- The document language is declared as English.
- Main, navigation, and footer landmarks are present.
- A skip-to-content control appears after load.
- Many form fields expose accessible names.
- Several pages have a single meaningful H1.

## High-priority accessibility issues

### Reflow

The mobile page requires two-dimensional scrolling and clips essential content. This is the most severe accessibility finding.

### Colour contrast

The homepage CTA uses white text on `rgb(234,108,70)`, measuring approximately 3.12:1. At the observed 18-pixel regular weight, it does not meet the WCAG 2.2 AA 4.5:1 requirement for normal text.

### Heading structure

- Missing H1 on Start Here and About.
- Multiple H1 elements used as visual subheadings on Student Finance.
- Two H1 elements on the test page.
- H4 used directly below H1 on Enrolment.

Heading levels should describe the page outline, not visual size.

### Alternative text

- Homepage and footer images expose filename-style text such as `logo (68).png`, `75.png`, and `72.png`.
- The forum has images without alternative text.
- Decorative images should have empty alt text; informative logos should name the partner and relationship.

### Target size and touch interaction

The mobile DOM exposed many 20-pixel-high footer links and 40-pixel-high navigation links. In the focused mobile review, 29 of 37 visible interactive elements were below 44 pixels in at least one dimension. These are difficult touch targets and fall below the preferred 44-pixel interaction size.

### Focus and stacking

Most standard Wix controls displayed a visible focus ring, which is positive. However, the separate Hub Plus header CTA did not expose an equivalent focus treatment. Search was also positioned below the header in stacking order: it could remain keyboard-focusable while visually obscured, then appear to float alone after the header moved away. The redesign must verify that focus is always visible, unobscured, and aligned with the visual reading order.

### Motion and media

The homepage includes an autoplaying or already-pressed video control with an accessible name derived from the asset filename: `Charless%20Animation5.mp4 Play video`. The redesign should provide:

- A meaningful label.
- Pause/stop control.
- Reduced-motion behaviour.
- No essential information conveyed only through motion.
- Captions or a text alternative where speech or meaningful audio exists.

### Forms and error prevention

High-impact personal-data forms need:

- Clearly indicated required fields.
- Native field types and autocomplete attributes.
- Instructions before errors occur.
- Inline and summary errors associated with fields.
- Confirmation and recovery.
- Privacy information before submission.

## Accessibility target

The new site should target **WCAG 2.2 Level AA** and include manual testing with keyboard-only navigation, NVDA or JAWS on Windows, VoiceOver on iOS/macOS, zoom/reflow, reduced motion, and high-contrast modes.

<!-- PDF_PAGEBREAK -->

# 6. UX, navigation, and conversion audit

## Audience model is missing

Most answers depend on variables the current site does not collect or visibly use:

- Journey stage: exploring, applying, admitted, preparing, arrived.
- Nationality/status: EU/EEA/Swiss or non-EU.
- Study level: bachelor's, master's, exchange, or other.
- City status: selected, shortlisted, or unknown.
- Persona: student, parent, or partner.

Without this context, the visitor receives generic pages and must work out which rules apply.

## Navigation issues

- The taxonomy reflects internal page types rather than visitor goals.
- "Guides" contains a very large list and exposes a test page.
- "Fraternities" is an American framing of Dutch student associations.
- Help Centre does not behave as a support centre.
- Forum receives primary-navigation prominence despite very low activity.
- Footer Contact, Legal, and Help centre are displayed as text rather than working links.
- Search was clicked during the audit and did not reveal a visible search interface or change the URL after a one-second verification.
- The language control loads after the rest of the header, which can cause movement and inconsistency.

## First-visit modal

A first-visit dialog titled "Lets Get Started" was observed covering the homepage before the visitor could understand the value proposition. "I am a dutch national" routed to Hub Plus, while "I am a non-dutch national" routed back to Home. Although the dialog exposed a dialog role and dismiss control, the segmentation logic added friction without delivering meaningful personalisation.

Remove the blocking gate. If segmentation is useful, place an optional "What best describes you?" selector after the hero, include "Continue without choosing", remember the preference only with an appropriate privacy basis, and change the content that follows.

## CTA and conversion issues

- Broken and placeholder CTAs are widespread.
- The same generic actions recur without connection to page intent.
- Start Here ends with an enrolment message but presents different actions.
- Working While Studying ends with a housing CTA.
- Cost of Living and other pages show editorial placeholder text as the CTA.
- The homepage "Open Days & Enrolling" link sends users directly to a lead form.
- No page clearly states the response time, service owner, eligibility, price, or success state for application support.

## Form risk

The Enrolment form requests:

- First and last name.
- Date of birth.
- Phone including country code.
- Country of origin.
- Email.
- University preference.
- Resume URL.

Observed issues:

- No visible privacy-policy link or privacy notice.
- No visible consent or acknowledgement control.
- Phone, email, and resume URL are required, while first name, last name, date of birth, and country are not.
- The page does not explain why a date of birth or resume URL is necessary.
- There is no explanation of who receives the data, legal basis, retention, or expected response.
- The form is not clearly distinguished from the official university or Studielink application process.

EU guidance emphasises lawfulness, transparency, purpose limitation, data minimisation, retention limits, and security. The form should remain unpromoted until the business process and privacy notice are reviewed by qualified counsel.

<!-- PDF_FIGURE: enrolment-form -->

## Community and trust

The Forum page showed a default welcome post, one group with one member, another with two members, and 42 views on the visible post. A sparse community can make a new service look inactive. Options:

1. Remove Forum from primary navigation until it has moderation, seed content, and an active member base.
2. Replace it temporarily with curated FAQs, expert office hours, or a moderated Q&A archive.
3. Re-launch community only with a clear onboarding and moderation model.

# 7. SEO and discoverability audit

## P0 indexability

Every one of the 23 sampled static routes contained:

```html
<meta name="robots" content="noindex">
```

Google documents that `noindex` instructs search engines not to show the page in search results. If this is an intentional pre-launch state, it should remain until P0 trust and content issues are fixed. If the owner believes the site is already public, this is a critical configuration mismatch.

## P0 sitemap failure

`robots.txt` advertises:

- `/sitemap.xml`
- `/de_de-sitemap.xml`
- `/fr_fr-sitemap.xml`
- `/hi_hi-sitemap.xml`
- `/it_it-sitemap.xml`
- `/nl_nl-sitemap.xml`
- `/ro_ro-sitemap.xml`
- `/tr_tr-sitemap.xml`
- `/zh_zh-sitemap.xml`

All nine returned HTTP 404 during the audit.

## Metadata

- All 23 sampled static routes lacked a meta description.
- Homepage Open Graph and Twitter descriptions were empty.
- Homepage Open Graph and Twitter images were empty.
- The title pattern uses `Studynl` rather than a consistent `StudyNL` brand form.
- Several page titles contain extra spacing or generic editor labels.
- The favicon resolves to Wix/Parastorage's default favicon rather than a StudyNL asset.

## URLs and canonical structure

- Public slugs expose editor history: `copy-of-*`, `about-5`, `about-9`, `team-4`, and `general-8`.
- `/` and `/home` split the homepage role.
- The hidden root splash is self-canonical.
- The actual homepage is separately self-canonical at `/home`.
- Broken guide links point to the root splash.

The redesign needs a clean URL map and permanent redirects.

## Headings and on-page semantics

- Missing and multiple H1 issues weaken page structure.
- Article lists are frequently simulated with separate paragraphs rather than semantic lists.
- Guides contain no contextual internal links.
- Partner logos and content images use poor alternative text.

## Structured data and localisation

The sampled homepage contained:

- No JSON-LD structured data.
- No `hreflang` alternate links.
- Nine language options in the UI.
- Nine broken locale sitemap URLs.

The multilingual strategy must be clarified. Either publish professionally reviewed locale routes with `hreflang`, translated metadata, canonicals, and valid locale sitemaps, or reduce the public language selector until that system is ready.

## Recommended SEO launch checklist

- Remove `noindex` only from approved production pages.
- Generate one valid canonical sitemap or valid sitemap index.
- Submit and monitor the sitemap in Search Console.
- Consolidate the homepage at `/` and redirect `/home`.
- Implement the complete URL migration map.
- Create unique titles and meta descriptions.
- Add Open Graph and social images.
- Add organisation, website, breadcrumb, article, FAQ, event, and relevant entity schema where eligible.
- Add author/editor, reviewed date, and source links to guides.
- Add contextual internal links and breadcrumbs.
- Replace the favicon and complete social profile metadata.
- Validate translated routes and `hreflang` before exposing them.
- Test every redirect, canonical, index directive, and sitemap entry in staging and production.

# 8. Technical and performance audit

## Platform signals

The website is served by Wix infrastructure (`Pepyaka`) and uses Wix/Parastorage assets. The sampled homepage displayed:

- 132 observed assets.
- 97 scripts.
- 12 images.
- 6 fonts.
- 1 MP4 video.
- 19 inline SVGs.

This is an asset inventory, not a transfer-size or Core Web Vitals result. It nevertheless indicates a large amount of client-side code for a relatively simple homepage.

### Mobile Lighthouse evidence

A single throttled mobile Lighthouse run using Headless Chrome 150 reported:

- Performance: 70/100.
- SEO: 61/100.
- Best Practices: 96/100.
- Automated Accessibility: 100/100.
- FCP: 1.7 seconds.
- LCP: 10.8 seconds.
- Speed Index: 5.4 seconds.
- Total Blocking Time: 50 milliseconds.
- CLS: 0.003.
- Initial server response: approximately 130 milliseconds.
- Total payload: approximately 1,804 KiB.

The automated accessibility score does not override the manual findings. It did not capture the severe mobile reflow, meaningful-sequence, filename-alt, target-size, modal, and interaction problems documented in this report.

An unthrottled desktop proxy was much faster - FCP approximately 548 ms, LCP approximately 588 ms, and CLS 0.001 - but still loaded 153 resources. Ninety-nine script requests accounted for approximately 747 KB transferred and 2.38 MB decoded. The difference between desktop and throttled mobile reinforces the need to design and test for real student devices and networks.

## Performance risks

- Autoplay or background video in the first viewport.
- Numerous scripts relative to content complexity.
- Six font files.
- Fixed-width layouts that force desktop rendering on mobile.
- Late-loading language selector.
- Large empty sections that increase page height without adding task value.
- Blurred or poorly optimised imagery.

## Positive technical signals

- HTTP redirects to HTTPS.
- Apex domain redirects to `www`.
- HSTS is present.
- `X-Content-Type-Options: nosniff` is present.
- CDN caching signals are present.
- UTF-8 and a viewport meta tag are present.

## Header and privacy observations

The sampled response did not expose a clear Content Security Policy, Referrer Policy, Permissions Policy, or frame-ancestors protection. Wix may manage some controls elsewhere, so this should be verified in a dedicated security review.

The homepage showed Wix/analytics-related code signals but no visible cookie or consent interface during the audit. Confirm the actual tracking configuration, jurisdictions, consent requirements, and privacy policy before launch.

A technical trace observed five cookies on first load plus Sentry and Wix telemetry endpoints. No GA/GTM, Meta Pixel, Microsoft Clarity, or Hotjar was detected. This is positive from an advertising-tracker perspective, but platform telemetry and long-lived cookies still require classification, disclosure, and a consent decision with qualified privacy counsel.

## Performance target

Use field data at the 75th percentile and target Google's current "good" Core Web Vitals thresholds:

- LCP <= 2.5 seconds.
- INP <= 200 milliseconds.
- CLS <= 0.1.

Recommended engineering budgets:

- Initial page transfer target: <= 1.0 MB on mobile where realistic.
- Initial request target: <= 60 requests.
- Critical JavaScript target: <= 250 KB compressed, with clear justification for exceptions.
- Hero image target: <= 250 KB and correctly sized.
- No autoplay hero video on mobile.
- Self-host or limit font families and weights.
- Reserve layout dimensions for media and asynchronous UI.
- Track real-user LCP, INP, CLS, navigation timing, and errors.

## Platform decision

Do not choose a platform only from aesthetic preference. Use a short architecture decision workshop.

| Option | Best fit | Advantages | Risks |
|---|---|---|---|
| Rebuild in Wix Studio with CMS collections | Primarily editorial and marketing site with simple forms | Faster handover, lower operational burden, familiar editor | Script weight, advanced personalisation limits, structured-data and app complexity |
| Modern framework plus headless CMS | Personalised planner, listings, university/city database, multilingual workflow, integrations | Stronger performance control, reusable content models, scalable product behaviour | Higher build and maintenance cost, requires engineering ownership |
| Structured WordPress build | Editorial scale with moderate dynamic functionality and broad editor familiarity | Mature CMS ecosystem, flexible templates, large talent pool | Plugin governance, security/maintenance discipline, variable performance |

**Recommendation:** If the confirmed scope is a trusted editorial hub plus light lead generation, a disciplined Wix Studio rebuild can work. If StudyNL intends to operate listings, personalised plans, university data, partner workflows, accounts, or multilingual editorial review at scale, select a modern structured CMS architecture.

<!-- PDF_PAGEBREAK -->

# 9. Recommended audiences and jobs to be done

## Primary audiences

### Exploring student

Needs to understand whether the Netherlands is a fit, compare programmes, cities, costs, deadlines, and university types.

### Applying student

Needs requirements, documents, Studielink guidance, deadlines, financing, and a transparent route to optional support.

### Admitted student

Needs housing, visa/residence, financial proof, insurance, registration, and a dated arrival plan.

### Arriving or current student

Needs first-week tasks, BSN, banking, transport, work rules, healthcare, social integration, and support.

### Parent or supporter

Needs a clear timeline, costs, safety, housing credibility, service accountability, and contact options.

### Partner

Needs partnership eligibility, audience reach, commercial disclosure, quality standards, and an enquiry path.

## Core jobs

- "Help me decide whether studying in the Netherlands is right for me."
- "Tell me what applies to my nationality and stage."
- "Help me compare cities, universities, cost, and housing risk."
- "Give me a reliable checklist with dates and official sources."
- "Show me when I can self-serve and when paid or partner support is useful."
- "Let me save my plan and continue later without creating an account too early."

# 10. Recommended information architecture

## Primary navigation

1. **Start here**
2. **Study & apply**
3. **Money & housing**
4. **Prepare your move**
5. **Cities & universities**
6. **Services**

Utilities:

- Search.
- Language.
- About.
- Help.
- Community only after it is active.
- Primary CTA: **Build my plan**.

## Recommended sitemap

```text
/
|-- start/
|   `-- personalised journey selector
|-- study/
|   |-- education-system/
|   |-- programmes-and-open-days/
|   |-- application-process/
|   |-- studielink/
|   |-- requirements-and-documents/
|   `-- deadlines/
|-- money/
|   |-- tuition-fees/
|   |-- scholarships/
|   |-- student-finance-duo/
|   `-- cost-of-living/
|-- housing/
|   |-- finding-housing/
|   |-- verified-housing/
|   |-- contracts-and-registration/
|   `-- avoiding-scams/
|-- immigration-and-work/
|   |-- visa-and-residence/
|   |-- working-while-studying/
|   `-- health-insurance/
|-- prepare/
|   |-- pre-departure-checklist/
|   |-- first-72-hours/
|   |-- municipality-and-bsn/
|   |-- banking/
|   |-- transport/
|   `-- first-30-days/
|-- cities/
|   `-- {city-slug}/
|-- universities/
|   `-- {institution-slug}/
|-- student-life/
|   |-- student-associations/
|   `-- community/
|-- services/
|   |-- application-support/
|   |-- housing-support/
|   `-- hub-plus/
|-- about/
|   |-- mission-and-team/
|   |-- partners/
|   |-- editorial-policy/
|   `-- contact/
|-- help/
|-- for-partners/
|-- privacy/
|-- terms/
`-- cookies/
```

## Personalised Start Here concept

The strongest functional differentiator is a short, non-account-gated planner:

1. **What stage are you at?** Exploring, applying, admitted, arriving, already here.
2. **What is your status?** EU/EEA/Swiss, non-EU, or unsure.
3. **What are you studying?** Bachelor's, master's, exchange, or other.
4. **Do you know your city?** Selected, shortlist, or not yet.

Output:

- A personalised task sequence.
- Applicable warnings and deadlines.
- Links to official sources.
- Recommended city/university/housing content.
- Optional save, email, or account creation.
- A contextual StudyNL service CTA only where it adds value.

The tool should never imply legal eligibility. It should make scope, sources, dates, and limitations visible.

# 11. Homepage redesign brief

## Homepage objective

Help a new visitor understand StudyNL, identify their path within seconds, and begin a relevant task without first learning the site's taxonomy.

## Recommended homepage structure

### 1. Global header

- StudyNL logo linked to `/`.
- Task-led primary navigation.
- Search and language utilities.
- One primary CTA: Build my plan.
- Mobile menu with accessible focus management.

### 2. Hero

- Outcome-led H1: "Plan your move to study in the Netherlands."
- Supporting line that states independent status and value.
- Three or four journey-stage choices.
- Primary CTA: Build my plan.
- Secondary CTA: Explore guides.
- No autoplay video on mobile.

### 3. Personalised pathway

Show the short stage/status selector or a preview of the output.

### 4. High-priority task cards

- Find a programme.
- Understand visa and residence.
- Plan tuition and funding.
- Find housing safely.
- Compare cities.
- Prepare for arrival.

### 5. Trust and proof

- Named organisation and team.
- Independence/affiliation statement.
- Editorial standard and last-reviewed model.
- Named partners with transparent relationships.
- Real service outcomes or testimonials with permission and context.

### 6. Cities and universities

Show structured comparisons with clear methodology and official links.

### 7. Hub Plus or service offer

Explain who it is for, what is included, price/free status, proof, response time, and success state.

### 8. Latest deadlines or alerts

Use dated, source-backed alerts for application, visa, housing, or open-day information.

### 9. FAQ and footer

Include accessible FAQ, contact, legal, privacy, cookies, editorial policy, partner information, and complete navigation.

# 12. Page-template requirements

## Guide/article template

- Breadcrumbs.
- One H1.
- One-sentence answer.
- Audience and stage tags.
- Effective date and last-reviewed date.
- Responsible editor.
- On-page table of contents.
- Key facts or warning callout.
- Step-by-step sections using semantic lists.
- Official sources linked near claims.
- Contextual CTA.
- Related guides and next step.
- Corrections link.
- SEO and social metadata.

## University template

- Official name and institution type: WO or HBO.
- City and campus.
- Official website and official application URL.
- Programme/language data.
- Tuition by academic year and student status.
- Deadlines and open days.
- Housing support.
- Source and last-verified date.

## City template

- Rent range with source/date.
- Housing-difficulty methodology.
- Cost range.
- Student population and institutions.
- Transport and registration links.
- Lifestyle profile without unsupported ranking claims.
- Last verified.

## Housing/listing template

- Provider/legal landlord.
- Address or area.
- Rent, deposit, utilities, and fees.
- Registration permitted: yes/no/unknown.
- Contract type.
- Availability and expiry.
- Verification method, status, and date.
- Enquiry route.
- Scam and safety warnings.

## Partner template

- Legal name and accessible logo.
- Partner category.
- Relationship and any commercial consideration.
- Meaning of "approved" or "verified".
- Evidence and verification date.
- Website and contact.

## Service landing page

- Who the service is for and not for.
- Exact deliverables.
- Price or free status.
- What StudyNL does and does not do.
- Proof and case studies.
- Data requested and why.
- Response time and process.
- FAQ, privacy, and contact.
- One conversion action.

# 13. Component and interaction system

Build a reusable system before designing pages independently.

Core components:

- Responsive header, mega-menu, mobile menu, utility bar, and footer.
- Button and link families with defined contrast and states.
- Journey-stage selector and progress indicator.
- Topic, guide, city, university, partner, and listing cards.
- Breadcrumbs and on-page table of contents.
- Source citation and reviewed-date block.
- Info, warning, deadline, eligibility, and correction callouts.
- Checklist with save/print/email behaviour.
- Search, filters, result list, no-results, and error states.
- Forms, validation, consent/notice, success, and recovery.
- Tabs/accordions only where semantic and keyboard behaviour is verified.
- Empty, loading, offline, expired, and unavailable states.

Every component should specify:

- Content rules.
- Responsive behaviour.
- Keyboard behaviour.
- Accessible name and focus state.
- Loading/error/empty state.
- Analytics event.
- CMS fields and ownership.

# 14. Content operations and governance

## Required roles

- Product/content owner.
- Managing editor.
- Subject reviewer for admissions/education.
- Subject reviewer for immigration and work.
- Subject reviewer for finance.
- Housing/listing operations owner.
- Privacy/legal reviewer.
- Translation owner per locale.

## Publishing workflow

```text
Draft -> subject review -> legal/privacy review where needed -> accessibility/SEO QA
-> publish -> scheduled review -> archive/redirect
```

## Review cadence

- Visa, finance, tuition, work, insurance, and application deadlines: review at least quarterly and on official updates.
- Housing listings and availability: expiry-based review, ideally daily or automated.
- University fees/deadlines: academic-year review plus event-driven updates.
- Evergreen guides: six-month review.
- Partner status: at least annual review.

## CMS guardrails

- Required title, H1, summary, description, canonical, source, effective date, review date, owner, and CTA fields.
- Block publication if required governance fields are missing.
- Use controlled vocabularies for stage, nationality, study level, city, university type, and content status.
- Keep an audit log of substantive updates.
- Automatically flag expired dates and listings.

# 15. Analytics and measurement plan

## Baseline before redesign

Obtain at least four weeks of reliable baseline data where available:

- Traffic by source, landing page, device, country, and language.
- Search queries and no-result searches.
- Guide-to-guide progression.
- CTA click-through rate.
- Form start, error, abandonment, and completion.
- Community and Hub Plus activation.
- Core Web Vitals and JavaScript errors.

## Recommended event taxonomy

- `plan_start`
- `stage_select`
- `status_select`
- `city_select`
- `plan_complete`
- `guide_view`
- `source_click`
- `related_guide_click`
- `search_submit`
- `search_no_results`
- `filter_apply`
- `cta_click`
- `form_start`
- `form_error`
- `form_submit`
- `housing_enquiry`
- `partner_click`
- `community_join`

## Success metrics

Launch acceptance targets:

- 0 broken primary links or CTAs.
- 0 public placeholder/test strings.
- 100% of high-stakes guides with source, owner, effective date, and review date.
- 100% of migrated URLs with tested redirect behaviour.
- Core user tasks reachable within three clicks or directly through search.
- WCAG 2.2 AA acceptance with no open critical issues.
- Good Core Web Vitals at the 75th percentile after sufficient field data.
- Valid sitemap and zero unintended `noindex` pages.
- Form completion and error rates measured by field without collecting sensitive analytics payloads.

Outcome targets should be set after baseline measurement rather than guessed. Recommended initial goals are improved task-completion rate, reduced form abandonment, increased source/related-content engagement, and a higher qualified-service conversion rate.

# 16. Prioritised backlog

## P0 - before promotion

1. Remove the animation test page from public navigation and unpublish/delete it.
2. Fix all twelve Guide-card destinations.
3. Replace all CTA placeholders and verify every CTA action.
4. Replace dummy contact details, template copy, dummy housing data, and the 2035 AiWawa footer.
5. Correct footer spelling and the Partner with us destination.
6. Resolve `/` versus `/home`; make `/` the canonical homepage and implement redirects.
7. Keep `noindex` until the content/trust pass is complete, then remove it from approved pages.
8. Restore one valid sitemap and remove broken locale sitemap references.
9. Remove or pause the Enrolment form until privacy, purpose, data minimisation, and follow-up are defined.
10. Fix mobile reflow and navigation across all templates.
11. Remove the blocking first-visit modal or replace it with optional inline personalisation.
12. Correct the most consequential factual errors and add official sources/effective dates.
13. Add a clear independence/affiliation statement and obtain legal brand review.

## P1 - redesign release candidate

1. Validate the task-led IA with representative users.
2. Implement the responsive design system and reusable templates.
3. Rebuild Start Here as a personalised plan.
4. Create editorial, university, city, listing, partner, and service content models.
5. Add author/reviewer/source/date governance.
6. Replace generic Help Centre and sparse Forum prominence.
7. Implement accessible search, filters, forms, validation, and focus states.
8. Clean all URLs and deploy redirects.
9. Add unique metadata, social cards, breadcrumbs, structured data, and internal links.
10. Build analytics and real-user performance monitoring.
11. Establish privacy/cookie controls based on actual tracking and jurisdiction.
12. Complete manual WCAG 2.2 AA testing.

## P2 - post-launch optimisation

1. Expand programme/open-day data.
2. Add save/email/print plan features.
3. Introduce city and university comparison tools.
4. Build a controlled housing-verification workflow.
5. Re-launch community with moderation and activation strategy.
6. Expand professionally reviewed localisation.
7. A/B test homepage and service messaging after baseline stabilises.

# 17. Project plan and deliverables

## Phase 0 - live-site stabilisation, 3 to 5 working days

Deliverables:

- P0 content cleanup.
- Link and CTA repair.
- Form risk containment.
- Root/home decision.
- Temporary launch-readiness checklist.

## Phase 1 - discovery and content architecture, 1 to 2 weeks

Deliverables:

- Stakeholder workshop.
- Product promise and service-boundary decision.
- Analytics and CMS review.
- Audience/jobs framework.
- Content inventory and disposition: keep, revise, merge, remove.
- Tested sitemap and navigation.
- Content governance and source policy.
- Architecture decision record.

## Phase 2 - UX and visual design, 2 to 3 weeks

Deliverables:

- Low-fidelity user flows and wireframes.
- Mobile-first prototypes.
- Homepage, guide, listing, university, city, service, help, and form templates.
- Design tokens and component library.
- Usability testing with 6 to 8 representative participants across major stages/statuses.
- Accessibility review before visual sign-off.

## Phase 3 - build and content migration, 3 to 6 weeks

Deliverables:

- Front-end/CMS implementation.
- Structured content models.
- Reviewed content migration.
- Search, filters, planner, and forms as agreed.
- Analytics, consent, SEO, redirects, and sitemap.
- Translation framework if approved.

## Phase 4 - QA, launch, and measurement, 1 to 2 weeks

Deliverables:

- Functional and cross-browser QA.
- Manual accessibility QA.
- Content and source verification.
- Redirect, metadata, schema, indexability, and sitemap tests.
- Performance tests and budgets.
- Privacy/security review.
- Launch checklist, rollback plan, and monitoring dashboard.

**Indicative total:** 8 to 12 weeks for a disciplined redesign, depending on platform, content volume, personalisation, listings, and integration scope.

## Recommended team

- Client product owner/decision maker.
- UX and content strategist.
- UI/product designer.
- Content editor and subject reviewers.
- Front-end/CMS engineer.
- SEO and analytics specialist.
- Accessibility QA.
- Privacy/legal reviewer.
- Optional back-end/integration engineer for planner, listings, or accounts.

# 18. Acceptance criteria

## Functional

- No broken links, inert CTAs, or wrong destinations in critical journeys.
- Search, filters, navigation, forms, and planner work with mouse, touch, and keyboard.
- Error, empty, loading, expired, and offline states are designed and tested.
- Community and listing features are hidden or clearly marked when unavailable.

## Content

- No template, test, or placeholder content in production.
- One H1 per content page.
- Every high-stakes guide has an owner, source, effective date, review date, and correction route.
- Service claims are specific, evidenced, and legally reviewed.
- Partner and housing verification claims explain the methodology.

## Accessibility

- WCAG 2.2 AA target met through automated and manual review.
- No two-dimensional scrolling for standard vertical content at 320 CSS pixels.
- Text contrast >= 4.5:1 for normal text and >= 3:1 for large text.
- Visible focus, logical order, skip links, landmarks, labels, and status announcements.
- Screen-reader and reduced-motion tests completed.

## SEO

- No unintended `noindex` directives.
- Valid sitemap submitted and monitored.
- Clean canonical URLs and tested redirects.
- Unique titles/descriptions and social metadata.
- Structured data valid and eligible.
- Hreflang valid for every published locale.

## Performance

- Real-user Core Web Vitals monitoring enabled.
- Target LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile.
- Asset and JavaScript budgets documented.
- No autoplay hero video on mobile.

## Privacy and security

- Data inventory, purpose, legal basis, recipients, retention, and deletion process documented.
- Privacy information is visible at collection.
- Fields are minimised to what the service requires.
- Consent is used only where appropriate and is not bundled.
- Security review and incident ownership are complete.

<!-- PDF_PAGEBREAK -->

# Appendix A. Page inventory

| Page | Current URL | Main finding |
|---|---|---|
| Welcome (hidden) | [study-nl.com/](https://www.study-nl.com/) | Splash should not be canonical homepage |
| Home | [study-nl.com/home](https://www.study-nl.com/home) | Actual homepage; noindex and no description |
| Start Here | [study-nl.com/about-9](https://www.study-nl.com/about-9) | No H1; mixed stages; tested CTA issue |
| About | [study-nl.com/about-5-1](https://www.study-nl.com/about-5-1) | Dummy email/phone and no H1 |
| Guides | [study-nl.com/team-4](https://www.study-nl.com/team-4) | 11 of 12 cards point to hidden splash |
| Animation test | [study-nl.com/copy-of-accommodation-3](https://www.study-nl.com/copy-of-accommodation-3) | Public test page with two TEST PAGE H1s |
| Accommodation | [study-nl.com/general-8](https://www.study-nl.com/general-8) | Useful outline, but no sources or in-body links |
| Student Finance | [study-nl.com/copy-of-accommodation-1](https://www.study-nl.com/copy-of-accommodation-1) | Six H1s, simplified rules, placeholder CTA |
| Scholarships | [study-nl.com/copy-of-student-finance-loans-duo-1](https://www.study-nl.com/copy-of-student-finance-loans-duo-1) | Outdated scholarship name and placeholder CTA |
| Student associations | [study-nl.com/copy-of-scholarships-funding-2](https://www.study-nl.com/copy-of-scholarships-funding-2) | "Fraternities" framing and form privacy gap |
| Visa & Residency | [study-nl.com/copy-of-scholarships-funding-1](https://www.study-nl.com/copy-of-scholarships-funding-1) | Copied scholarship section and no sources |
| Working While Studying | [study-nl.com/copy-of-accommodation](https://www.study-nl.com/copy-of-accommodation) | Undated rules, repeated heading, unrelated CTA |
| Cost of Living | [study-nl.com/copy-of-visa-residency](https://www.study-nl.com/copy-of-visa-residency) | Unsourced figures and visible CTA placeholder |
| Arrival Checklist | [study-nl.com/copy-of-cost-of-living-1](https://www.study-nl.com/copy-of-cost-of-living-1) | Very thin content and placeholder CTA |
| Avoid Scams | [study-nl.com/copy-of-cost-of-living](https://www.study-nl.com/copy-of-cost-of-living) | Approximately 46 words and placeholder CTA |
| Study in the Netherlands | [study-nl.com/copy-of-scholarships-funding](https://www.study-nl.com/copy-of-scholarships-funding) | Broad but unsourced overview; placeholder CTA |
| City Guides | [study-nl.com/copy-of-student-finance-loans-duo](https://www.study-nl.com/copy-of-student-finance-loans-duo) | Not a directory; duplicates About-style copy |
| Universities | [study-nl.com/copy-of-accommodation-2](https://www.study-nl.com/copy-of-accommodation-2) | Outdated fee and placeholder CTA |
| Verified Housing | [study-nl.com/copy-of-visa-residency-1](https://www.study-nl.com/copy-of-visa-residency-1) | Dummy data weakens verification claim |
| Enrolment | [study-nl.com/copy-of-cost-of-living-2](https://www.study-nl.com/copy-of-cost-of-living-2) | Personal-data form without visible privacy context |
| Hub Plus | [study-nl.com/about-5](https://www.study-nl.com/about-5) | Offer, access model, proof, and success state unclear |
| Help Centre | [study-nl.com/copy-of-city-guides](https://www.study-nl.com/copy-of-city-guides) | Untouched team-template content |
| Forum | [study-nl.com/groups](https://www.study-nl.com/groups) | Sparse default community; premature primary-nav prominence |

# Appendix B. URL migration map

| Current URL | Recommended URL |
|---|---|
| `/home` | `/` |
| `/about-9` | `/start/` |
| `/about-5-1` | `/about/` |
| `/team-4` | `/guides/` or replace with topical hubs |
| `/general-8` | `/housing/finding-housing/` |
| `/copy-of-accommodation-1` | `/money/student-finance-duo/` |
| `/copy-of-student-finance-loans-duo-1` | `/money/scholarships/` |
| `/copy-of-scholarships-funding-2` | `/student-life/student-associations/` |
| `/copy-of-scholarships-funding-1` | `/immigration-and-work/visa-and-residence/` |
| `/copy-of-accommodation` | `/immigration-and-work/working-while-studying/` |
| `/copy-of-visa-residency` | `/money/cost-of-living/` |
| `/copy-of-cost-of-living-1` | `/prepare/pre-departure-checklist/` |
| `/copy-of-cost-of-living` | `/housing/avoiding-scams/` |
| `/copy-of-scholarships-funding` | `/study/education-system/` |
| `/copy-of-student-finance-loans-duo` | `/cities/` |
| `/copy-of-accommodation-2` | `/universities/` |
| `/copy-of-visa-residency-1` | `/housing/verified-housing/` |
| `/copy-of-cost-of-living-2` | `/services/application-support/` |
| `/about-5` | `/services/hub-plus/` |
| `/copy-of-city-guides` | `/help/` |
| `/groups` | `/community/` |
| `/copy-of-accommodation-3` | Delete/410 or redirect to the relevant hub |

Use permanent 301 redirects, update every internal link, and test canonicals, breadcrumbs, sitemap entries, analytics attribution, and community breadcrumbs.

# Appendix C. Source and standards references

## Accessibility and performance

- [W3C Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C Understanding Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow)
- [web.dev Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)

## Search and indexing

- [Google robots meta tag specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Google build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

## Dutch student-information sources

- [DUO tuition fees](https://www.duo.nl/particulier/collegegeld.jsp)
- [DUO student finance eligibility](https://duo.nl/particulier/student-finance/eligibility.jsp)
- [IND study residence permits](https://ind.nl/en/residence-permits/study)
- [IND income requirements for study](https://ind.nl/en/income-requirements-study)
- [Official NL Scholarship](https://www.studyinnl.org/finances/nl-scholarship)
- [Official Study in NL background](https://www.studyinnl.org/about-study-in-the-netherlands)

## Data protection

- [European Commission GDPR processing principles](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en)
- [European Commission information required when collecting personal data](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr/what-information-must-be-given-individuals-whose-data-collected_en)
