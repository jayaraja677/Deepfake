import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  AudioLines,
  Eye,
  FileText,
  Fingerprint,
  Image as ImageIcon,
  MessageSquare,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Video,
} from 'lucide-react'
import { Btn, Meter, Panel, SectionHeader, SeverityBadge, SyntheticBadge } from '../components/ui'
import { SCENARIOS } from '../data/synthetic'

/* -------------------------------------------------------------------------
   Hero readout — a security dashboard panel, not a hologram
   ------------------------------------------------------------------------- */
const TICKER = [
  'Media forensics pass complete',
  'Identity consistency: drift detected',
  'Social engineering score: 94 / 100',
  'Payment rail: irreversible · new payee',
  'Recommendation: contain before release',
]

function Readout() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick((v) => (v + 1) % TICKER.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative overflow-hidden border border-line bg-card">
      {/* header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          <ScanLine className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
          <span className="label">Live Analysis Readout</span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.1em] text-dim">FS-DEMO-001928</span>
      </div>

      {/* score + status */}
      <div className="relative grid grid-cols-[1.2fr_1fr] border-b border-line">
        <div className="border-r border-line p-5">
          <div className="label">Trust Score</div>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-mono text-[64px] leading-[0.85] font-medium tracking-tight text-accent">23</span>
            <span className="mb-1.5 font-mono text-lg text-dim">/ 100</span>
          </div>
          <div className="mt-4">
            <Meter value={23} />
          </div>
        </div>

        <div className="flex flex-col justify-between p-5">
          <div>
            <div className="label">Status</div>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent anim-pulse" />
              <span className="font-mono text-2xl leading-none font-medium tracking-wide text-accent">HIGH RISK</span>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 font-mono text-[10px] tracking-[0.1em] text-dim uppercase">
            <div>Video · CFO payment request</div>
            <div>NovaFin Technologies · 08 Oct 2026</div>
          </div>
        </div>

        {/* scanning line */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="anim-scan h-full w-full bg-gradient-to-b from-transparent via-accent/[0.07] to-transparent">
            <div className="h-px w-full bg-accent/50" />
          </div>
        </div>
      </div>

      {/* dimension meters */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-line p-5">
        {[
          ['Social Engineering', 94],
          ['Identity Consistency', 88],
          ['Financial Risk', 91],
          ['Media Authenticity', 86],
        ].map(([label, value]) => (
          <div key={label as string}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-mono text-[10px] tracking-[0.1em] text-muted uppercase">{label}</span>
              <span className="font-mono text-[11px] text-ink">{value}</span>
            </div>
            <Meter value={value as number} />
          </div>
        ))}
      </div>

      {/* ticker */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="font-mono text-[10px] tracking-[0.14em] text-crimson uppercase">Log</span>
        <span key={tick} className="anim-fade font-mono text-[11px] text-muted">
          {TICKER[tick]}
          <span className="anim-caret ml-0.5 text-accent">_</span>
        </span>
      </div>

      {/* findings */}
      <div className="divide-y divide-line">
        {SCENARIOS[0].findings.slice(0, 3).map((f) => (
          <div key={f.id} className="flex items-start gap-3 px-4 py-3">
            <span className="mt-0.5 font-mono text-[10px] text-dim">{f.id}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] text-ink">{f.title}</div>
            </div>
            <SeverityBadge severity={f.severity} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   Coverage cards
   ------------------------------------------------------------------------- */
const COVERAGE = [
  { icon: Video, name: 'Video', note: 'Face-swap, lip-sync drift, blink cadence, encoder fingerprint' },
  { icon: AudioLines, name: 'Audio', note: 'Cloned prosody, phase discontinuity, spectral breaks' },
  { icon: ImageIcon, name: 'Image', note: 'Warp residuals, shadow mismatch, provenance gaps' },
  { icon: FileText, name: 'Document', note: 'Metadata mismatch, beneficiary changes, lookalike domains' },
  { icon: MessageSquare, name: 'Message', note: 'Urgency, threats, authority claims, credential requests' },
]

const PIPELINE = [
  {
    n: '01',
    title: 'Analyze',
    body: 'Ingest a video, audio clip, image, document, or pasted message and run six staged checks against it.',
  },
  {
    n: '02',
    title: 'Assess',
    body: 'Receive a trust score, risk dimensions, and itemised findings with severity and quoted evidence.',
  },
  {
    n: '03',
    title: 'Act',
    body: 'Preserve evidence, open a case, escalate to review, or file a report — every step leaves a record.',
  },
]

export default function Landing() {
  return (
    <div>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-backdrop scan-mask pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-crimson/60 to-transparent" />

        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <div className="anim-rise mb-6 inline-flex items-center gap-2.5 border border-line bg-card px-3 py-2">
              <ShieldAlert className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                Financial Communication Trust &amp; Deepfake Detection
              </span>
            </div>

            <h1 className="anim-rise d1 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-ink">
              VERIFY
              <br />
              BEFORE YOU
              <br />
              <span className="text-accent">TRUST.</span>
            </h1>

            <p className="anim-rise d2 mt-7 max-w-xl text-[17px] leading-relaxed font-medium text-ink/90">
              AI-powered protection for financial communications against deepfakes, impersonation, and social
              engineering.
            </p>

            <p className="anim-rise d3 mt-4 max-w-xl text-[14px] leading-relaxed text-muted">
              FIN-SHIELD analyzes financial communications across video, audio, images, documents, and messages to
              identify manipulation, suspicious behavior, and financial fraud signals.
            </p>

            <div className="anim-rise d4 mt-9 flex flex-wrap gap-3">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2.5 border border-crimson bg-crimson px-6 py-3.5 text-[13px] font-medium tracking-[0.08em] text-white uppercase transition-all duration-150 hover:border-accent hover:bg-accent"
              >
                Analyze Communication
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 border border-line px-6 py-3.5 text-[13px] font-medium tracking-[0.08em] text-ink uppercase transition-all duration-150 hover:border-line2 hover:bg-white/[0.03]"
              >
                How It Works
              </Link>
            </div>

            <div className="anim-rise d5 mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-6">
              {[
                ['24', 'Analyzed'],
                ['5', 'High Risk'],
                ['16', 'Verified'],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-2">
                  <span className="font-mono text-lg text-ink">{v}</span>
                  <span className="label">{l}</span>
                </div>
              ))}
              <SyntheticBadge className="ml-auto" />
            </div>
          </div>

          <div className="anim-rise d3">
            <Readout />
            <p className="mt-3 text-center font-mono text-[10px] tracking-[0.12em] text-dim uppercase">
              Illustrative readout · synthetic demo data
            </p>
          </div>
        </div>
      </section>

      {/* ============================ COVERAGE ============================ */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10">
        <SectionHeader
          eyebrow="Detection Coverage"
          title="One intake channel. Five classes of financial communication."
          action={
            <span className="label">Forensic checks staged per media type</span>
          }
        />
        <div className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {COVERAGE.map(({ icon: Icon, name, note }, i) => (
            <div
              key={name}
              className="anim-rise group relative bg-card p-5 transition-colors duration-200 hover:bg-card2"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-crimson transition-colors duration-200 group-hover:text-accent" strokeWidth={1.5} />
                <span className="font-mono text-[10px] text-dim">0{i + 1}</span>
              </div>
              <div className="mt-4 text-sm font-medium tracking-wide text-ink uppercase">{name}</div>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ PIPELINE ============================ */}
      <section className="border-y border-line bg-bg2">
        <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10">
          <SectionHeader eyebrow="Operating Model" title="From intake to record in three moves." />
          <div className="mt-6 grid gap-px bg-line md:grid-cols-3">
            {PIPELINE.map((s) => (
              <div key={s.n} className="bg-bg2 p-6 transition-colors duration-200 hover:bg-card">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-medium text-crimson">{s.n}</span>
                  <span className="h-px flex-1 bg-line" />
                  {s.n === '01' && <ScanLine className="h-4 w-4 text-muted" strokeWidth={1.5} />}
                  {s.n === '02' && <Fingerprint className="h-4 w-4 text-muted" strokeWidth={1.5} />}
                  {s.n === '03' && <Siren className="h-4 w-4 text-muted" strokeWidth={1.5} />}
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SIGNAL SAMPLE ============================ */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="label mb-2">Findings Library</div>
            <h2 className="text-2xl leading-tight font-semibold tracking-tight text-ink">
              Every report quotes the evidence it acted on.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              Findings are itemised with a severity, the exact span that triggered them, and a recommended next step.
              Analysts see why a communication was flagged — never an unexplained score.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Btn to="/analyze" variant="primary" size="md">
                Run a sample analysis
              </Btn>
              <Btn to="/action-center" variant="ghost" size="md">
                Open Action Center
              </Btn>
            </div>
          </div>

          <Panel padded={false}>
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="label">Scenario 04 · Pasted text · FS-DEMO-004316</span>
              <span className="border border-accent/60 bg-accent/10 px-2 py-[3px] font-mono text-[10px] text-accent">
                21 / 100
              </span>
            </div>
            <blockquote className="border-b border-line bg-bg2 px-4 py-5 text-[15px] leading-relaxed text-ink/90">
              <span className="border-b-2 border-accent/70 bg-accent/10">Hi, this is your bank manager.</span>{' '}
              <span className="border-b-2 border-accent/70 bg-accent/10">Your account will be suspended unless</span>{' '}
              you transfer{' '}
              <span className="border-b-2 border-accent/70 bg-accent/10">₹50,000 immediately</span>.
            </blockquote>
            <div className="divide-y divide-line">
              {SCENARIOS[3].findings.slice(0, 4).map((f) => (
                <div key={f.id} className="grid grid-cols-[auto_1fr_auto] items-start gap-3 px-4 py-3">
                  <span className="font-mono text-[10px] text-dim">{f.id}</span>
                  <span className="text-[13px] text-ink">{f.title}</span>
                  <SeverityBadge severity={f.severity} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      {/* ============================ CTA BAND ============================ */}
      <section className="border-t border-line bg-bg2">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <span className="label">Decision support for fraud review teams</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
              Check the communication before it moves the money.
            </h2>
            <p className="mt-2 text-[13px] text-muted">
              Runs entirely in the browser against synthetic demo data — nothing is uploaded anywhere.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn to="/analyze" size="lg" variant="primary">
              <Eye className="h-4 w-4" /> Analyze Communication
            </Btn>
          </div>
        </div>
      </section>
    </div>
  )
}
