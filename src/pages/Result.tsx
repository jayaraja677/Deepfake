import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  Fingerprint,
  FolderLock,
  Inbox,
  MessageSquareWarning,
  Printer,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'
import {
  Btn,
  Meter,
  Panel,
  RiskBadge,
  SectionHeader,
  SeverityBadge,
  SyntheticBadge,
  TrustGauge,
} from '../components/ui'
import { useAnalyses } from '../store/analyses'

interface Seg {
  t: string
  f: boolean
}

function highlight(body: string, quotes: string[]): Seg[] {
  const ranges: { s: number; e: number }[] = []
  for (const q of quotes) {
    if (!q) continue
    const i = body.indexOf(q)
    if (i >= 0) ranges.push({ s: i, e: i + q.length })
  }
  ranges.sort((a, b) => a.s - b.s)

  const merged: { s: number; e: number }[] = []
  for (const r of ranges) {
    const last = merged[merged.length - 1]
    if (last && r.s <= last.e) last.e = Math.max(last.e, r.e)
    else merged.push({ ...r })
  }

  const out: Seg[] = []
  let cursor = 0
  for (const r of merged) {
    if (r.s > cursor) out.push({ t: body.slice(cursor, r.s), f: false })
    out.push({ t: body.slice(r.s, r.e), f: true })
    cursor = r.e
  }
  if (cursor < body.length) out.push({ t: body.slice(cursor), f: false })
  return out
}

export default function Result() {
  const { id } = useParams()
  const { byId } = useAnalyses()
  const a = id ? byId(id) : undefined

  if (!a) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <ShieldAlert className="mx-auto h-8 w-8 text-crimson" strokeWidth={1.5} />
        <h1 className="mt-5 text-2xl font-semibold text-ink">Report not found</h1>
        <p className="mt-3 text-[14px] text-muted">
          No analysis matches identifier <span className="font-mono text-accent">{id}</span>. Reports exist only for
          the current session.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Btn to="/analyze" variant="primary">
            Run a new analysis
          </Btn>
          <Btn to="/dashboard" variant="ghost">
            Back to dashboard
          </Btn>
        </div>
      </div>
    )
  }

  const quotes = a.findings.map((f) => f.quote ?? '').filter(Boolean)
  const segs = a.body ? highlight(a.body, quotes) : []
  const verdict =
    a.risk === 'HIGH'
      ? 'Do not act on this communication. Contain, preserve evidence, and escalate.'
      : a.risk === 'REVIEW'
        ? 'Insufficient confidence to clear. Route to a human analyst for a decision.'
        : 'No coercive or manipulative structure detected. Safe to proceed with normal checks.'

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-8 lg:px-10">
      {/* breadcrumb */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
      </Link>

      {/* header */}
      <div className="mt-4 border border-line bg-card">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-line px-6 py-5">
          <div>
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <RiskBadge risk={a.risk} />
              <span className="border border-line bg-bg2 px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
                {a.type}
              </span>
              <SyntheticBadge />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink lg:text-3xl">{a.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] text-dim">
              <span>{a.id}</span>
              <span>{a.date} · {a.time}</span>
              <span className="max-w-md truncate">{a.channel}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Btn to="/action-center" variant="danger" size="sm">
              <Inbox className="h-3.5 w-3.5" /> Open Action Center
            </Btn>
            <Btn to="/evidence" variant="ghost" size="sm">
              <FolderLock className="h-3.5 w-3.5" /> Preserve Evidence
            </Btn>
            <Btn variant="ghost" size="sm" onClick={() => window.print()}>
              <Printer className="h-3.5 w-3.5" /> Export
            </Btn>
          </div>
        </div>

        {a.demoNote && (
          <div className="flex items-center gap-3 border-b border-line bg-crimson/8 px-6 py-3">
            <ShieldAlert className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase">{a.demoNote}</span>
          </div>
        )}

        {/* verdict row */}
        <div className="grid gap-0 md:grid-cols-[auto_1fr]">
          <div className="flex items-center justify-center border-b border-line px-8 py-7 md:border-r md:border-b-0">
            <TrustGauge score={a.trustScore} />
          </div>

          <div className="flex flex-col justify-center gap-5 px-6 py-7">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <div className="label mb-2">Status</div>
                <div
                  className={`font-mono text-3xl leading-none font-medium tracking-wide ${
                    a.risk === 'HIGH' ? 'text-accent' : a.risk === 'REVIEW' ? 'text-warn' : 'text-ok'
                  }`}
                >
                  {a.risk === 'HIGH' ? 'HIGH RISK' : a.risk === 'REVIEW' ? 'REVIEW REQUIRED' : 'VERIFIED'}
                </div>
              </div>
              <span className="h-10 w-px bg-line" />
              <div>
                <div className="label mb-2">Recommendation</div>
                <p className="max-w-xl text-[14px] leading-relaxed text-ink/90">{verdict}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Account Ref', a.accountRef ?? '—'],
                ['Transaction', a.txnRef ?? '—'],
                ['Detected Actor', a.actor],
              ].map(([k, v]) => (
                <div key={k} className="border border-line bg-bg2 px-3 py-2.5">
                  <div className="label">{k}</div>
                  <div className="mt-1.5 truncate font-mono text-[12px] text-ink">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* risk dimensions + media forensics */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <SectionHeader
            eyebrow="Risk Breakdown"
            title="Dimension scores"
            action={<span className="label">Higher = higher risk</span>}
          />
          <div className="mt-5 space-y-5">
            {a.dimensions.map((d, i) => (
              <div key={d.label} className="anim-rise" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <span className="text-[13px] text-ink">{d.label}</span>
                  <span className="font-mono text-[12px] text-muted">
                    {d.value === null ? <span className="text-dim">N/A</span> : d.value}
                  </span>
                </div>
                <Meter value={d.value} />
                {d.note && <div className="mt-1.5 text-[11px] text-dim">{d.note}</div>}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionHeader
            eyebrow="Forensic Pass"
            title={a.media ? 'Media indicators' : 'Content indicators'}
            action={
              <span className="border border-line px-2 py-[3px] font-mono text-[10px] text-muted uppercase">
                {a.media ? a.type : 'Text'}
              </span>
            }
          />
          {a.media ? (
            <div className="mt-4 divide-y divide-line border border-line">
              {a.media.map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-[13px] text-muted">{m.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[12px] text-ink">{m.value}</span>
                    <span
                      className={`border px-2 py-[2px] font-mono text-[9px] tracking-[0.12em] ${
                        m.flag === 'FLAG'
                          ? 'border-accent/60 bg-accent/10 text-accent'
                          : m.flag === 'WATCH'
                            ? 'border-warn/50 bg-warn/10 text-warn'
                            : 'border-ok/50 bg-ok/10 text-ok'
                      }`}
                    >
                      {m.flag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 border border-dashed border-line bg-bg2 px-5 py-8 text-center">
              <MessageSquareWarning className="mx-auto h-6 w-6 text-crimson" strokeWidth={1.5} />
              <p className="mt-3 text-[13px] text-muted">
                No media payload — analysis is based on language structure, sender context, and financial intent.
              </p>
            </div>
          )}

          <div className="mt-5 flex items-start gap-2.5 border border-line bg-bg2 px-4 py-3">
            <Fingerprint className="mt-0.5 h-4 w-4 shrink-0 text-crimson" strokeWidth={1.5} />
            <p className="text-[12px] leading-relaxed text-dim">
              Sender fingerprint: {a.org} —{' '}
              {a.risk === 'LOW' ? 'consistent with verified records.' : 'no verified record found in the demo registry.'}
            </p>
          </div>
        </Panel>
      </div>

      {/* communication body + findings */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Panel>
          <SectionHeader eyebrow="Evidence Under Review" title="Communication body" />
          {a.body ? (
            <blockquote className="mt-4 border-l-2 border-crimson bg-bg2 px-4 py-4 text-[15px] leading-relaxed text-ink/90">
              {segs.map((s, i) =>
                s.f ? (
                  <mark key={i} className="bg-accent/15 px-0.5 text-ink" style={{ borderBottom: '2px solid #D62839' }}>
                    {s.t}
                  </mark>
                ) : (
                  <span key={i}>{s.t}</span>
                ),
              )}
            </blockquote>
          ) : (
            <p className="mt-4 text-[13px] text-muted">Media-only submission — no textual body available.</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ['Actor', a.actor],
              ['Organisation', a.org],
              ['Channel', a.channel],
              ['Submitted', `${a.date} · ${a.time}`],
            ].map(([k, v]) => (
              <div key={k} className="border border-line px-3 py-2.5">
                <div className="label">{k}</div>
                <div className="mt-1 truncate text-[12px] text-ink">{v}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel padded={false}>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <div className="label mb-1.5">Findings</div>
              <h2 className="text-lg font-semibold tracking-tight text-ink">
                {a.findings.length} signal{a.findings.length === 1 ? '' : 's'} detected
              </h2>
            </div>
            <SeverityBadge severity={a.findings.some((f) => f.severity === 'CRITICAL') ? 'CRITICAL' : a.findings[0].severity} />
          </div>

          <div className="divide-y divide-line">
            {a.findings.map((f, i) => (
              <div
                key={f.id}
                className="anim-rise group px-5 py-4 transition-colors duration-150 hover:bg-white/[0.02]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] text-dim">{f.id}</span>
                  <SeverityBadge severity={f.severity} />
                  <span className="text-[14px] font-medium text-ink">{f.title}</span>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{f.detail}</p>
                {f.quote && (
                  <div className="mt-2.5 border-l-2 border-accent/60 bg-crimson/8 px-3 py-2 font-mono text-[12px] text-ink/90">
                    “{f.quote}”
                  </div>
                )}
                <div className="mt-2.5 flex items-start gap-2 text-[12px] text-ok">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  <span>{f.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* run log + recommended actions */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel>
          <SectionHeader
            eyebrow="Provenance"
            title="Analysis run log"
            action={<span className="label">Simulated timings</span>}
          />
          <div className="mt-4 divide-y divide-line border border-line">
            {a.run.map((s) => (
              <div key={s.id} className="flex items-center gap-4 px-4 py-2.5">
                <span className="font-mono text-[11px] text-dim">STEP {s.id}</span>
                <span className="flex-1 text-[13px] text-muted">{s.label}</span>
                <span className={`font-mono text-[11px] ${s.state === 'ok' ? 'text-ok' : 'text-warn'}`}>
                  {s.state === 'ok' ? 'CLEAN' : 'FLAGGED'}
                </span>
                <span className="w-16 text-right font-mono text-[11px] text-dim">{s.ms} ms</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2.5 border border-warn/40 bg-warn/8 px-4 py-3">
            <Database className="h-4 w-4 shrink-0 text-warn" strokeWidth={1.5} />
            <span className="font-mono text-[10px] leading-relaxed tracking-[0.1em] text-warn uppercase">
              AI Detection Status: Simulation / Demo — no model executed
            </span>
          </div>
        </Panel>

        <Panel>
          <SectionHeader
            eyebrow="Next Steps"
            title="Recommended actions"
            action={<span className="label">One click each</span>}
          />
          <div className="mt-4 space-y-2.5">
            {a.recommended.map((r, i) => (
              <div
                key={r}
                className="flex items-center gap-3 border border-line bg-bg2 px-4 py-3 transition-colors hover:border-line2"
              >
                <span className="font-mono text-[11px] text-crimson">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-[13px] text-ink">{r}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            <Btn to="/action-center" variant="danger" size="md">
              <Inbox className="h-4 w-4" /> Open Case
            </Btn>
            <Btn to="/evidence" variant="ghost" size="md">
              <FolderLock className="h-4 w-4" /> Preserve
            </Btn>
            <Btn to="/incidents" variant="ghost" size="md">
              <ArrowUpRight className="h-4 w-4" /> Incident Timeline
            </Btn>
            <Btn to="/analyze" variant="primary" size="md">
              New Analysis
            </Btn>
          </div>
        </Panel>
      </div>
    </div>
  )
}
