import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  AudioLines,
  Database,
  FileText,
  Film,
  Fingerprint,
  ImageIcon,
  MessageSquare,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Siren,
} from 'lucide-react'
import { Btn, Panel, SectionHeader, SeverityBadge, SyntheticBadge } from '../components/ui'
import { PERSON_BANNER, SCENARIOS } from '../data/synthetic'

const STAGES = [
  { n: '01', title: 'Intake', body: 'File drop or pasted text. Content stays in the browser — nothing is uploaded.' },
  { n: '02', title: 'Extraction', body: 'Segments the payload into transcript, media track, metadata, and sender context.' },
  { n: '03', title: 'Media forensics', body: 'Face landmarks, lip-sync drift, blink cadence, spectral continuity, encoder fingerprints.' },
  { n: '04', title: 'Identity consistency', body: 'Compares claimed role and sender fingerprint against known records.' },
  { n: '05', title: 'Social engineering', body: 'Scores urgency, threats, authority claims, isolation, and credential requests.' },
  { n: '06', title: 'Financial risk', body: 'Weighs payment rail reversibility, payee novelty, value, and deadline pressure.' },
  { n: '07', title: 'Scoring', body: 'Combines dimensions into a trust score from 0 to 100 with a disposition.' },
  { n: '08', title: 'Report & action', body: 'Produces quoted findings, then routes to evidence, action center, or review.' },
]

const METHODS = [
  { icon: Film, name: 'Video', points: ['Facial landmark drift', 'Lip-sync deviation', 'Blink cadence', 'Encoder fingerprint'] },
  { icon: AudioLines, name: 'Audio', points: ['Pitch contour cloning', 'Phase discontinuity', 'Room-tone consistency', 'Speaker embedding'] },
  { icon: ImageIcon, name: 'Image', points: ['Warp residuals', 'Shadow direction', 'Noise non-uniformity', 'Provenance gaps'] },
  { icon: FileText, name: 'Documents', points: ['Metadata mismatch', 'Beneficiary changes', 'Author anomalies', 'Lookalike domains'] },
  { icon: MessageSquare, name: 'Messages', points: ['Urgency & deadlines', 'Threat language', 'Authority claims', 'Credential requests'] },
]

export default function About() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
      {/* header */}
      <div className="relative overflow-hidden border border-line bg-card px-6 py-8">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative max-w-3xl">
          <div className="label mb-3">About the prototype</div>
          <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight text-ink">
            HOW IT <span className="text-accent">WORKS</span>
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            FIN-SHIELD answers a narrow question: <span className="text-ink">should this financial communication be
            trusted?</span> It examines what was said, who said it, how it was delivered, and what it asks the recipient
            to do — then returns a score, quoted evidence, and a recommended action.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <SyntheticBadge />
            <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-warn uppercase">
              AI Detection Status: Simulation / Demo
            </span>
          </div>
        </div>
      </div>

      {/* problem statement */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <SectionHeader eyebrow="Problem statement" title="Deepfake detection for financial communications" />
          <blockquote className="mt-5 border-l-2 border-crimson bg-bg2 px-5 py-4 text-[15px] leading-relaxed text-ink/90">
            “Deepfake Detection for Financial Communications: Help people and institutions verify financial
            communications, detect manipulation, and create an actionable path for review, reporting, or response.”
          </blockquote>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['Verify', 'Establish whether a communication is genuine before it is acted on.'],
              ['Detect', 'Identify synthesis, impersonation, and social-engineering structure.'],
              ['Respond', 'Move the finding into evidence, action, or review — with a record.'],
            ].map(([k, v]) => (
              <div key={k} className="border border-line bg-bg2 px-4 py-3.5">
                <div className="text-[13px] font-semibold tracking-wide text-ink uppercase">{k}</div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{v}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionHeader eyebrow="Transparency" title="AI & Data Disclosure" />
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            This hackathon prototype uses synthetic demonstration content and AI-assisted analysis concepts. No
            confidential bank, customer, or platform data is used.
          </p>
          <ul className="mt-5 space-y-2.5">
            {[
              ['All records are fictional', 'No real customers, accounts, or institutions exist in this app.'],
              ['No model is integrated', 'Analysis is a deterministic rule-based simulation.'],
              ['No network calls', 'Nothing is uploaded; all state lives in the browser tab.'],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-3 border border-line px-3.5 py-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ok" strokeWidth={1.75} />
                <div>
                  <div className="text-[13px] text-ink">{k}</div>
                  <div className="mt-0.5 text-[12.5px] text-dim">{v}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <Btn to="/about/disclosure" variant="danger" size="md" className="w-full">
              <Database className="h-4 w-4" /> Data &amp; Model Disclosure
            </Btn>
          </div>
        </Panel>
      </div>

      {/* pipeline */}
      <section className="mt-12">
        <SectionHeader
          eyebrow="Processing pipeline"
          title="Eight stages from file to decision"
          action={<span className="label">Simulated end-to-end in the browser</span>}
        />
        <div className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, i) => (
            <div
              key={s.n}
              className="anim-rise group relative bg-card p-5 transition-colors duration-200 hover:bg-card2"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-medium text-crimson transition-colors group-hover:text-accent">
                  {s.n}
                </span>
                {i === 0 && <ScanLine className="h-4 w-4 text-muted" strokeWidth={1.5} />}
                {i === 3 && <Fingerprint className="h-4 w-4 text-muted" strokeWidth={1.5} />}
                {i === 4 && <ShieldAlert className="h-4 w-4 text-muted" strokeWidth={1.5} />}
                {i === 7 && <Siren className="h-4 w-4 text-muted" strokeWidth={1.5} />}
              </div>
              <h3 className="mt-3.5 text-[14px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* methods */}
      <section className="mt-12">
        <SectionHeader eyebrow="Detection methods" title="What gets examined, per media type" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {METHODS.map(({ icon: Icon, name, points }) => (
            <div key={name} className="border border-line bg-card p-5 transition-colors hover:border-line2">
              <Icon className="h-5 w-5 text-crimson" strokeWidth={1.5} />
              <div className="mt-3.5 text-[13px] font-semibold tracking-wide text-ink uppercase">{name}</div>
              <ul className="mt-3 space-y-1.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[12.5px] text-muted">
                    <span className="mt-[7px] h-1 w-1 shrink-0 bg-crimson" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* scenarios */}
      <section className="mt-12">
        <SectionHeader
          eyebrow="Demo scenarios"
          title="Fictional cases used throughout the prototype"
          action={<SyntheticBadge />}
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {SCENARIOS.slice(0, 3).map((s, i) => (
            <div
              key={s.id}
              className="anim-rise flex flex-col border border-line bg-card"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="font-mono text-[10px] tracking-[0.12em] text-dim uppercase">
                  Scenario {s.scenario}
                </span>
                <span className="font-mono text-[10px] text-muted">{s.id}</span>
              </div>

              <div className="flex-1 px-4 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-line bg-bg2 px-2 py-[3px] font-mono text-[10px] text-muted uppercase">
                    {s.type}
                  </span>
                  <SeverityBadge severity={s.risk === 'HIGH' ? 'CRITICAL' : s.risk === 'REVIEW' ? 'HIGH' : 'INFO'} />
                </div>

                <div className="mt-3.5">
                  <div className="label">Person / Organisation</div>
                  <div className="mt-1 text-[13.5px] text-ink">
                    {s.actor !== 'Unverified sender' ? s.actor : s.org}
                  </div>
                  <div className="mt-0.5 text-[12px] text-dim">{s.actor !== 'Unverified sender' ? s.org : '—'}</div>
                </div>

                <div className="mt-3.5">
                  <div className="label">Message</div>
                  <blockquote className="mt-1.5 border-l-2 border-crimson bg-bg2 px-3 py-2.5 text-[13px] leading-relaxed text-ink/90">
                    “{s.excerpt}”
                  </blockquote>
                </div>
              </div>

              <div className="border-t border-line px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted">
                    Trust {s.trustScore}/100
                  </span>
                  <Link
                    to={`/analysis/${s.id}`}
                    className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
                  >
                    Report <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <div className="border-t border-line bg-crimson/8 px-4 py-2.5">
                <span className="font-mono text-[9px] leading-relaxed tracking-[0.1em] text-crimson uppercase">
                  {s.scenario === '01' ? PERSON_BANNER : 'Synthetic demo data'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* limitations */}
      <section className="mt-12 border border-warn/40 bg-warn/6">
        <div className="flex flex-wrap items-start gap-5 px-6 py-6">
          <ShieldAlert className="h-6 w-6 shrink-0 text-warn" strokeWidth={1.5} />
          <div className="flex-1 min-w-[260px]">
            <h2 className="text-lg font-semibold tracking-tight text-ink">Limitations of this prototype</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {[
                'Detection output is simulated — no machine-learning model is integrated.',
                'Scores come from a fixed keyword rule set, not trained classifiers.',
                'No backend, database, authentication, or external API is connected.',
                'Results are illustrative and must never drive a real financial decision.',
                'All entities, numbers and records are fictional synthetic demo data.',
                'Media forensics readouts are illustrative values, not measurements.',
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
                  <span className="mt-[7px] h-1 w-1 shrink-0 bg-warn" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Btn to="/about/disclosure" variant="ghost" size="md">
                Read the full disclosure
              </Btn>
              <Btn to="/analyze" variant="primary" size="md">
                Try the analyzer
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
