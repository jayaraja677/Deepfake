import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Database, Info, TriangleAlert } from 'lucide-react'
import { Panel, SyntheticBadge } from '../components/ui'

const SECTIONS = [
  { id: 'a', label: 'A. Data Sources' },
  { id: 'b', label: 'B. AI-Generated Content' },
  { id: 'c', label: 'C. AI Models' },
  { id: 'd', label: 'D. Third-Party Libraries' },
  { id: 'e', label: 'E. Third-Party Assets' },
  { id: 'f', label: 'F. Licensing' },
  { id: 'g', label: 'G. Privacy & Security' },
  { id: 'h', label: 'H. Limitations' },
]

const DATASETS = [
  {
    name: 'Mock Financial Communications Set',
    source: 'Authored for this project',
    license: 'Project-authored — CC0-1.0 dedication',
    purpose: 'Seed rows for dashboards, tables and report views',
    type: 'Synthetic',
    version: 'v0.1 · 08 Oct 2026',
    status: 'In use',
  },
  {
    name: 'Synthetic Scenario Library (4 cases)',
    source: 'Authored for this project',
    license: 'Project-authored — CC0-1.0 dedication',
    purpose: 'Demonstration scenarios: fake CFO video, bank notice, investment call, text phishing',
    type: 'Synthetic',
    version: 'v0.1 · 08 Oct 2026',
    status: 'In use',
  },
  {
    name: 'Operational Fixtures (actions, evidence, incidents, queue)',
    source: 'Authored for this project',
    license: 'Project-authored — CC0-1.0 dedication',
    purpose: 'Populate Action Center, Evidence Vault, Incident Timeline, Review Queue',
    type: 'Synthetic',
    version: 'v0.1 · 08 Oct 2026',
    status: 'In use',
  },
  {
    name: 'Rule set for simulated analysis',
    source: 'Authored for this project',
    license: 'Project-authored — MIT',
    purpose: 'Deterministic keyword scoring used by the demo analyzer',
    type: 'Synthetic',
    version: 'v0.1 · 08 Oct 2026',
    status: 'In use',
  },
  {
    name: 'Public deepfake detection corpora',
    source: 'Public repository (to be evaluated)',
    license: 'Verify before integration',
    purpose: 'Future model training / evaluation — planned only',
    type: 'Public (planned)',
    version: 'Not selected',
    status: 'Not integrated',
  },
  {
    name: 'Consented voice / video samples',
    source: 'Consent-based capture (to be arranged)',
    license: 'Consent-based — terms to be recorded',
    purpose: 'Future enrolment samples for identity comparison — planned only',
    type: 'Consented (planned)',
    version: 'Not collected',
    status: 'Not integrated',
  },
]

const MODELS = [
  {
    model: '—',
    purpose: 'Video deepfake analysis (face-swap, lip-sync)',
    source: 'Public repository (to be evaluated)',
    license: 'Verify license',
    version: '—',
    status: 'Not integrated',
  },
  {
    model: '—',
    purpose: 'Audio synthesis / voice-clone detection',
    source: 'Public repository (to be evaluated)',
    license: 'Verify license',
    version: '—',
    status: 'Not integrated',
  },
  {
    model: '—',
    purpose: 'Image manipulation detection',
    source: 'Public repository (to be evaluated)',
    license: 'Verify license',
    version: '—',
    status: 'Not integrated',
  },
  {
    model: '—',
    purpose: 'Text social-engineering classification',
    source: 'Public repository (to be evaluated)',
    license: 'Verify license',
    version: '—',
    status: 'Not integrated',
  },
]

const LIBS = [
  { name: 'React', version: '^19.2.8', purpose: 'Frontend framework', license: 'MIT', scope: 'Runtime' },
  { name: 'React DOM', version: '^19.2.8', purpose: 'DOM renderer', license: 'MIT', scope: 'Runtime' },
  { name: 'React Router DOM', version: '^7.18.4', purpose: 'Client-side routing', license: 'MIT', scope: 'Runtime' },
  { name: 'Tailwind CSS', version: '^4.3.3', purpose: 'Styling / design tokens', license: 'MIT', scope: 'Runtime' },
  { name: '@tailwindcss/vite', version: '^4.3.3', purpose: 'Tailwind build integration', license: 'MIT', scope: 'Build' },
  { name: 'lucide-react', version: '^1.53.0', purpose: 'Interface icons', license: 'ISC', scope: 'Runtime' },
  { name: 'Vite', version: '^8.3.0', purpose: 'Dev server & bundler', license: 'MIT', scope: 'Build' },
  { name: '@vitejs/plugin-react', version: '^6.1.1', purpose: 'React fast refresh / JSX', license: 'MIT', scope: 'Build' },
  { name: 'TypeScript', version: '~6.0.2', purpose: 'Static type checking', license: 'Apache-2.0', scope: 'Build' },
  { name: 'oxlint', version: '^1.81.0', purpose: 'Linting', license: 'MIT', scope: 'Tooling' },
  { name: '@types/react', version: '^19.2.18', purpose: 'React type definitions', license: 'MIT', scope: 'Tooling' },
  { name: '@types/react-dom', version: '^19.2.7', purpose: 'React DOM type definitions', license: 'MIT', scope: 'Tooling' },
  { name: '@types/node', version: '^24.13.3', purpose: 'Node type definitions', license: 'MIT', scope: 'Tooling' },
]

const ASSETS = [
  { name: 'Icons', detail: 'Lucide React icon set (ISC). Imported as React components; no icon font or sprite sheet.', used: 'Yes' },
  { name: 'Images / photography', detail: 'None. All graphics are inline SVG or CSS drawn for this project.', used: 'None' },
  { name: 'Favicon / brand mark', detail: 'Shield mark authored for this project as an inline SVG file.', used: 'Yes' },
  { name: 'Fonts', detail: 'System font stack (ui-sans-serif, system-ui, Segoe UI, Helvetica Neue) and ui-monospace for data. No font files bundled and no external font requests.', used: 'Yes' },
  { name: 'Animations', detail: 'CSS keyframes and Tailwind transitions authored for this project. No animation library installed.', used: 'Yes' },
  { name: 'Charts / gauges', detail: 'Hand-written SVG (trend line, trust gauge, meters). No charting library installed.', used: 'Yes' },
  { name: 'APIs / external services', detail: 'None. The prototype makes no network requests beyond loading its own bundle.', used: 'None' },
  { name: 'Third-party code snippets', detail: 'No external code samples or templates were embedded verbatim.', used: 'None' },
]

const LICENSING = [
  { name: 'This prototype (source code)', license: 'MIT', note: 'Hackathon submission — see repository license file.' },
  { name: 'Synthetic demo datasets', license: 'CC0-1.0 dedication', note: 'Authored for the project; contains no third-party material.' },
  { name: 'React / React Router / Vite / Tailwind', license: 'MIT', note: 'Standard upstream licenses apply.' },
  { name: 'lucide-react', license: 'ISC', note: 'Icon set attribution retained.' },
  { name: 'TypeScript', license: 'Apache-2.0', note: 'Compiler toolchain.' },
  { name: 'Future models & datasets', license: 'To be verified', note: 'Recorded in sections A and C before any integration.' },
]

const PRIVACY = [
  ['No real financial data', 'No real account numbers, OTPs, passwords, balances, statements, or private communications appear anywhere in the application.'],
  ['No personal data collection', 'The prototype collects no user personal data. There is no sign-up, login, session server, or analytics.'],
  ['No network transmission', 'Analysis runs in the browser. Files and pasted text are never uploaded or sent anywhere.'],
  ['No persistence', 'State lives in memory for the current tab. Reloading resets the prototype to its seeded demo records.'],
  ['Fictional identifiers only', 'All identifiers use the DEMO-*, TXN-DEMO-*, FS-DEMO-* placeholders and *.test domains.'],
  ['Clipboard use', 'The Evidence Vault can copy a content hash to the clipboard only when the user presses the copy button.'],
  ['Local storage & cookies', 'Not used.'],
]

const LIMITATIONS = [
  'No machine-learning model is integrated; "AI detection" is a deterministic rule-based simulation.',
  'The rule set cannot detect novel or obfuscated social-engineering language.',
  'Media forensics values shown in reports are illustrative, not measurements of the submitted file.',
  'Scores are not calibrated probabilities and carry no assurance for real decisions.',
  'No backend, database, authentication server, or third-party API is connected.',
  'Evidence hashes are generated locally for demonstration and are not anchored anywhere.',
  'The prototype must not be used to approve, reject, or report any genuine financial communication.',
]

function Head({ id, title, sub }: { id: string; title: string; sub?: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3 border-b border-line pb-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-crimson/60 bg-crimson/10 font-mono text-[12px] text-accent">
        {id.toUpperCase()}
      </span>
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
        {sub && <p className="mt-1 text-[13px] text-muted">{sub}</p>}
      </div>
    </div>
  )
}

export default function Disclosure() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
      <Link
        to="/about"
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> About
      </Link>

      <div className="mt-4 border border-line bg-card px-6 py-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <div className="label mb-3">Appendix · Transparency record</div>
            <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold tracking-tight uppercase text-ink">
              Data &amp; Model Disclosure
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              This hackathon prototype uses synthetic demonstration content and AI-assisted analysis concepts. No
              confidential bank, customer, or platform data is used.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <SyntheticBadge />
            <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-warn uppercase">
              AI Detection Status: Simulation / Demo
            </span>
            <span className="border border-line px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-muted uppercase">
              Document version 1.0 · 08 Oct 2026
            </span>
          </div>
        </div>

        {/* jump nav */}
        <nav className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:border-crimson hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-5 space-y-5">
        {/* ---------------- A ---------------- */}
        <Panel id="a" className="scroll-mt-24">
          <Head
            id="A"
            title="Data Sources"
            sub="Every dataset used — or planned for future use — with provenance and licence."
          />
          <div className="mb-4 flex items-center gap-3 border border-crimson/40 bg-crimson/8 px-4 py-3">
            <Database className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink uppercase">
              Current dataset type: Synthetic / Mock Data
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr>
                  {['Dataset name', 'Source', 'License', 'Purpose', 'Type', 'Version / date', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="border-b border-line px-3 py-2.5 text-left font-mono text-[10px] tracking-[0.12em] text-dim uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DATASETS.map((d) => (
                  <tr key={d.name} className="transition-colors hover:bg-white/[0.02]">
                    <td className="border-b border-line/70 px-3 py-3 text-[13px] text-ink">{d.name}</td>
                    <td className="border-b border-line/70 px-3 py-3 text-[12.5px] text-muted">{d.source}</td>
                    <td className="border-b border-line/70 px-3 py-3 font-mono text-[11px] text-muted">{d.license}</td>
                    <td className="border-b border-line/70 px-3 py-3 text-[12.5px] text-muted">{d.purpose}</td>
                    <td className="border-b border-line/70 px-3 py-3">
                      <span className="border border-line px-2 py-[2px] font-mono text-[10px] text-muted uppercase">
                        {d.type}
                      </span>
                    </td>
                    <td className="border-b border-line/70 px-3 py-3 font-mono text-[11px] text-muted">{d.version}</td>
                    <td className="border-b border-line/70 px-3 py-3">
                      <span
                        className={`font-mono text-[10px] tracking-[0.1em] uppercase ${
                          d.status === 'In use' ? 'text-ok' : 'text-warn'
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-dim">
            No customer records, statements, transaction histories, or communications from any real institution have
            been accessed, scraped, or included at any point.
          </p>
        </Panel>

        {/* ---------------- B ---------------- */}
        <Panel id="b" className="scroll-mt-24">
          <Head id="B" title="AI-Generated Content" sub="Where AI assistance appears in this prototype — and where it does not." />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="border border-line bg-bg2 px-4 py-4">
              <div className="label mb-2">Disclosure statement</div>
              <p className="text-[13.5px] leading-relaxed text-muted">
                This hackathon prototype uses synthetic demonstration content and AI-assisted analysis concepts. No
                confidential bank, customer, or platform data is used. Interface content, mock records and scenario
                copy were authored for this demonstration, with AI-assisted authoring tooling. No user input has been
                sent to any external AI service by this application.
              </p>
            </div>
            <div className="border border-line bg-bg2 px-4 py-4">
              <div className="label mb-2">Labels applied in the UI</div>
              <ul className="space-y-2.5 text-[13px] text-muted">
                <li className="flex items-center gap-3">
                  <span className="border border-dashed border-crimson/50 bg-crimson/8 px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-crimson uppercase">
                    Synthetic Demo Data
                  </span>
                  on tables, reports and records
                </li>
                <li className="flex items-center gap-3">
                  <span className="border border-crimson/50 bg-crimson/8 px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-accent uppercase">
                    Not a real person or organization
                  </span>
                  on scenario 01
                </li>
                <li className="flex items-center gap-3">
                  <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-warn uppercase">
                    Demo Mode
                  </span>
                  in the navigation status area
                </li>
                <li className="flex items-center gap-3">
                  <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-warn uppercase">
                    Simulation / Demo
                  </span>
                  beside every simulated analysis result
                </li>
              </ul>
            </div>
          </div>
        </Panel>

        {/* ---------------- C ---------------- */}
        <Panel id="c" className="scroll-mt-24">
          <Head id="C" title="AI Models" sub="Model registry. Nothing may be listed as in use until it is actually integrated." />
          <div className="mb-4 flex items-start gap-3 border border-warn/40 bg-warn/8 px-4 py-3">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warn" strokeWidth={1.75} />
            <p className="text-[13px] leading-relaxed text-warn/95">
              <span className="font-medium">AI Detection Status: Simulation / Demo.</span> FIN-SHIELD does not claim
              that any model is in use. The registry below is a placeholder structure for future integration and is
              intentionally empty.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr>
                  {['Model', 'Purpose', 'Source', 'License', 'Version', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="border-b border-line px-3 py-2.5 text-left font-mono text-[10px] tracking-[0.12em] text-dim uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MODELS.map((m, i) => (
                  <tr key={i} className="transition-colors hover:bg-white/[0.02]">
                    <td className="border-b border-line/70 px-3 py-3 font-mono text-[13px] text-dim">{m.model}</td>
                    <td className="border-b border-line/70 px-3 py-3 text-[13px] text-ink">{m.purpose}</td>
                    <td className="border-b border-line/70 px-3 py-3 text-[12.5px] text-muted">{m.source}</td>
                    <td className="border-b border-line/70 px-3 py-3 font-mono text-[11px] text-warn">{m.license}</td>
                    <td className="border-b border-line/70 px-3 py-3 font-mono text-[11px] text-dim">{m.version}</td>
                    <td className="border-b border-line/70 px-3 py-3">
                      <span className="border border-warn/50 bg-warn/10 px-2 py-[2px] font-mono text-[10px] tracking-[0.1em] text-warn uppercase">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-dim">
            When a model is added, record: model name, purpose, source, licence, version, and date of verification —
            and confirm the licence permits the intended use before shipping.
          </p>
        </Panel>

        {/* ---------------- D ---------------- */}
        <Panel id="d" className="scroll-mt-24">
          <Head id="D" title="Third-Party Libraries" sub="Every package installed in this project, with purpose and licence." />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr>
                  {['Package', 'Version', 'Purpose', 'License', 'Scope'].map((h) => (
                    <th
                      key={h}
                      className="border-b border-line px-3 py-2.5 text-left font-mono text-[10px] tracking-[0.12em] text-dim uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LIBS.map((l) => (
                  <tr key={l.name} className="transition-colors hover:bg-white/[0.02]">
                    <td className="border-b border-line/70 px-3 py-2.5 font-mono text-[12.5px] text-ink">{l.name}</td>
                    <td className="border-b border-line/70 px-3 py-2.5 font-mono text-[11px] text-muted">{l.version}</td>
                    <td className="border-b border-line/70 px-3 py-2.5 text-[12.5px] text-muted">{l.purpose}</td>
                    <td className="border-b border-line/70 px-3 py-2.5 font-mono text-[11px] text-muted">{l.license}</td>
                    <td className="border-b border-line/70 px-3 py-2.5">
                      <span className="border border-line px-2 py-[2px] font-mono text-[10px] text-dim uppercase">
                        {l.scope}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-dim">
            No charting, animation, state-management, icon-font, HTTP, storage, or authentication libraries are
            installed.
          </p>
        </Panel>

        {/* ---------------- E ---------------- */}
        <Panel id="e" className="scroll-mt-24">
          <Head id="E" title="Third-Party Assets" sub="Icons, fonts, images and other media used in the interface." />
          <div className="divide-y divide-line border border-line">
            {ASSETS.map((a) => (
              <div key={a.name} className="grid gap-2 px-4 py-3.5 sm:grid-cols-[200px_1fr_80px]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2
                    className={`h-3.5 w-3.5 shrink-0 ${a.used === 'Yes' ? 'text-ok' : 'text-line2'}`}
                    strokeWidth={1.75}
                  />
                  <span className="text-[13px] text-ink">{a.name}</span>
                </div>
                <p className="text-[12.5px] leading-relaxed text-muted">{a.detail}</p>
                <span
                  className={`justify-self-start border px-2 py-[2px] font-mono text-[10px] tracking-[0.1em] uppercase sm:justify-self-end ${
                    a.used === 'Yes' ? 'border-ok/50 bg-ok/10 text-ok' : 'border-line text-dim'
                  }`}
                >
                  {a.used}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ---------------- F ---------------- */}
        <Panel id="f" className="scroll-mt-24">
          <Head id="F" title="Licensing" sub="Licence status of this project and everything it depends on." />
          <div className="divide-y divide-line border border-line">
            {LICENSING.map((l) => (
              <div key={l.name} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3.5">
                <span className="text-[13px] text-ink">{l.name}</span>
                <span className="border border-line px-2 py-[2px] font-mono text-[10px] tracking-[0.1em] text-muted uppercase">
                  {l.license}
                </span>
                <span className="text-[12.5px] text-dim">{l.note}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ---------------- G ---------------- */}
        <Panel id="g" className="scroll-mt-24">
          <Head id="G" title="Privacy & Security" sub="How the prototype handles data — and what it never touches." />
          <div className="grid gap-3 md:grid-cols-2">
            {PRIVACY.map(([k, v]) => (
              <div key={k} className="border border-line bg-bg2 px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-ok" strokeWidth={1.75} />
                  <span className="text-[13px] font-medium text-ink">{k}</span>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 border border-line px-4 py-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} />
            <p className="text-[12.5px] leading-relaxed text-muted">
              No real bank account number, OTP, password, credential, statement, or private customer communication
              appears in this application. Where a placeholder is required, the fictional forms{' '}
              <code className="font-mono text-ink">DEMO-XXXX-001</code>, <code className="font-mono text-ink">TXN-DEMO-2026-001</code>,{' '}
              <code className="font-mono text-ink">FS-DEMO-001928</code>, <code className="font-mono text-ink">+91 90000 00000</code>{' '}
              and <code className="font-mono text-ink">demo@example.test</code> are used instead.
            </p>
          </div>
        </Panel>

        {/* ---------------- H ---------------- */}
        <Panel id="h" className="scroll-mt-24">
          <Head id="H" title="Limitations" sub="What this prototype does not do." />
          <ol className="space-y-2.5">
            {LIMITATIONS.map((t, i) => (
              <li key={t} className="flex gap-3.5 border border-line bg-bg2 px-4 py-3">
                <span className="font-mono text-[11px] text-crimson">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[13px] leading-relaxed text-muted">{t}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <SyntheticBadge />
            <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] text-warn uppercase">
              AI Detection Status: Simulation / Demo
            </span>
            <span className="ml-auto">
              <Link
                to="/analyze"
                className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
              >
                Back to the analyzer →
              </Link>
            </span>
          </div>
        </Panel>
      </div>
    </div>
  )
}
