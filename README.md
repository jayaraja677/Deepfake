# FIN-SHIELD

**Financial Communication Trust & Deepfake Detection — frontend prototype**

> Hackathon problem statement:
> “Deepfake Detection for Financial Communications: Help people and institutions verify financial communications, detect manipulation, and create an actionable path for review, reporting, or response.”

FIN-SHIELD examines what a financial communication says, who sent it, how it arrived, and what it asks the recipient to do — then returns a trust score, quoted evidence, and a recommended action.

> **SYNTHETIC DEMO DATA** — every person, organisation, account number, transaction and record in this application is fictional.
> **AI Detection Status: Simulation / Demo** — no machine-learning model, backend, database, or API is integrated.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # type-check + production bundle
npm run preview  # serve the production build
npm run lint     # oxlint
```

Requires Node 20+ (built and verified on Node 22).

---

## Application structure

| Route | Screen |
|---|---|
| `/` | Landing page — hero with live trust-score readout |
| `/dashboard` | User dashboard — stats and recent analyses |
| `/analyze` | Analyze communication — upload, paste message, 6-step simulated scan |
| `/analysis/:id` | Analysis result — gauge, risk dimensions, quoted findings, run log |
| `/action-center` | Action Center — pending / escalations / filed tasks |
| `/evidence` | Evidence Vault — hashed records, chain of custody |
| `/incidents` | Incident Timeline — chronological case history |
| `/institution` | Institution Console — organisation-wide metrics |
| `/review` | Review Queue — analyst triage with decision drawer |
| `/about` | About / How It Works — pipeline, methods, scenarios, disclosure |
| `/about/disclosure` | **Data & Model Disclosure** — sections A–H |

```
src/
├── components/
│   ├── Layout.tsx        # navigation, mobile drawer, footer, disclosure strip
│   └── ui.tsx            # panels, badges, trust gauge, meters, tables, buttons
├── data/
│   ├── synthetic.ts      # SYNTHETIC DEMO DATA — scenarios + analyses
│   └── ops.ts            # SYNTHETIC DEMO DATA — actions, evidence, incidents, queue
├── lib/
│   └── analysis.ts       # deterministic rule-based simulator (no model)
├── store/
│   └── analyses.tsx      # local in-memory store for the current session
└── pages/                # one file per route
```

---

## Design

- Background `#080808` · secondary `#101010` · cards `#151515` · borders `#292929`
- Primary crimson `#B11226` · dark red `#750F1C` · accent red `#D62839`
- Text `#F5F5F5` · secondary `#A0A0A0`
- System font stack for UI, `ui-monospace` for identifiers, scores and timestamps
- All graphics are inline SVG or CSS — no images, icon fonts, chart libraries, or animation libraries
- Motion is CSS-only and honours `prefers-reduced-motion`

---

## AI & Data Disclosure

> This hackathon prototype uses synthetic demonstration content and AI-assisted analysis concepts. No confidential bank, customer, or platform data is used.

The full record lives at **`/about/disclosure`** with sections:

| Section | Content |
|---|---|
| A. Data Sources | Dataset registry — name, source, licence, purpose, type, version. Current type: **Synthetic / Mock Data** |
| B. AI-Generated Content | Where AI assistance appears, and every label applied in the UI |
| C. AI Models | Model registry — all rows **Not integrated**; status **Simulation / Demo** |
| D. Third-Party Libraries | Every installed package with purpose, licence and scope |
| E. Third-Party Assets | Icons, fonts, images, animations, charts, APIs |
| F. Licensing | Licence status of this project and its dependencies |
| G. Privacy & Security | No PII, no network transmission, no persistence, fictional identifiers only |
| H. Limitations | What this prototype does not do |

---

## Third-party assets (appendix)

| Asset | Purpose | Licence |
|---|---|---|
| **React** + **React DOM** | Frontend framework | MIT |
| **React Router DOM** | Client-side routing | MIT |
| **Tailwind CSS** + **@tailwindcss/vite** | Styling and design tokens | MIT |
| **Lucide React** | Interface icons | ISC |
| **Vite** + **@vitejs/plugin-react** | Dev server and bundler | MIT |
| **TypeScript** | Static type checking | Apache-2.0 |
| **oxlint** | Linting | MIT |
| System fonts | UI and data typography | OS-provided, no files bundled |
| Favicon / brand mark | Shield mark | Authored for this project |

No images, photography, icon fonts, charting or animation libraries are used. No external API, analytics, or tracking service is contacted.

---

## Data policy

Used: synthetic data created for this project only.
Not used: real customer banking information, account numbers, OTPs, passwords, confidential records, private communications, scraped data, or any personally identifiable financial information.

Fictional placeholders used throughout:

```
Account:       DEMO-XXXX-001
Transaction:   TXN-DEMO-2026-001
Communication: FS-DEMO-001928
Phone:         +91 90000 00000
E-mail:        demo@example.test
Domains:       *.test
```

---

## Not built (by design)

Backend · database · authentication server · real detection models · API integrations · file uploads · persistence. These are intentionally out of scope for this frontend prototype.

---

## License

Source code: [MIT](./LICENSE). Synthetic demo datasets: CC0 1.0.
