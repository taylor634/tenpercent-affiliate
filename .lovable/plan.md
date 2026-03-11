

# 10% With Dan Harris — Affiliate Partner Toolkit

Build a password-protected, single-page affiliate toolkit using the actual content from the PDF, styled in **black, white, and brand orange (#E8533A)** with the pill-shaped logo.

## Structure

The toolkit mirrors the PDF's 5 sections, presented as tabs on a dashboard behind a password gate.

### Files to create/modify

| File | Purpose |
|------|---------|
| `src/assets/logo.png` | Copy uploaded logo |
| `src/index.css` | Black/white/orange palette, no dark mode |
| `src/components/PasswordGate.tsx` | Password entry with logo, sessionStorage |
| `src/pages/Index.tsx` | Wraps Dashboard with PasswordGate |
| `src/pages/Dashboard.tsx` | Header with pill logo + tabbed navigation |
| `src/components/WelcomeSection.tsx` | Welcome message, quick version, about the app, commission structure, attribution |
| `src/components/BrandGuidelines.tsx` | Brand voice table, what to avoid, approved descriptions |
| `src/components/ReadyToUseCopy.tsx` | Newsletter, podcast, feed drop, social media copy blocks with copy-to-clipboard |
| `src/components/PerformanceTips.tsx` | What works / what to avoid tips |
| `src/components/PartnerFAQ.tsx` | All 9 FAQ items as accordions + contact info |
| `src/App.tsx` | Route updates |

### Content mapping (from PDF)

**Tab 1 — Welcome & Program Overview**
- Welcome message with `[name]` placeholder
- The Quick Version (commission %, discount, custom link)
- About 10% With Dan Harris (app features list)
- How the Affiliate Program Works
- Commission Structure (what you earn, getting paid)
- Attribution & Tracking (30-day cookie)

**Tab 2 — Brand Guidelines**
- How to Describe the App (short/medium/longer descriptions)
- Brand Voice table (warm/honest, skeptic-friendly, practical, personal, science-grounded)
- What to Avoid list

**Tab 3 — Ready-to-Use Copy**
- Newsletter (subject lines + body) with copy button
- Podcast (30s + 60s ad reads) with copy button
- Feed Drop / Solo Episode scripts with copy button
- Social Media (Instagram/Facebook, X/Twitter, Stories) with copy button
- All bracketed placeholders highlighted visually

**Tab 4 — Performance Tips**
- "What Works" cards (6 tips from PDF)
- "What to Avoid" cards (4 items from PDF)

**Tab 5 — FAQ & Support**
- 9 FAQ items as accordions (exact content from PDF)
- "Let's Stay in Touch" section with contact info
- Link to Circle.so dashboard

### Design details
- Pill-shaped logo: `rounded-full overflow-hidden` container with fixed height
- Orange used for: primary buttons, active tab indicator, copy-success toasts, link highlights
- Cards with white background, subtle gray borders
- Copy-to-clipboard buttons on all ready-to-use copy blocks using `navigator.clipboard` + sonner toast confirmation

