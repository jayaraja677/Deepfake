import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Clock, Search } from 'lucide-react'
import { Panel, RiskBadge, SectionHeader, StatCard, StatusText, SyntheticBadge, Td, Th } from '../components/ui'
import { DASHBOARD_STATS, DEMO_USER } from '../data/synthetic'
import { useAnalyses } from '../store/analyses'

const GREETING = (() => {
  const h = 20
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
})()

export default function Dashboard() {
  const { analyses } = useAnalyses()
  const navigate = useNavigate()
  const recent = analyses.slice(0, 7)

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
      {/* header */}
      <div className="relative overflow-hidden border border-line bg-card px-6 py-7">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="label mb-2">Workspace · Fraud Review</div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">
              {GREETING}, {DEMO_USER.name}
            </h1>
            <p className="mt-2 text-[14px] text-muted">Review your recent financial communications.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-line bg-bg2 px-3 py-2">
              <Clock className="h-3.5 w-3.5 text-dim" strokeWidth={1.75} />
              <span className="font-mono text-[11px] text-muted">08 Oct 2026 · 20:15 IST</span>
            </span>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 border border-crimson bg-crimson px-4 py-2.5 text-[12px] font-medium tracking-[0.08em] text-white uppercase transition-colors hover:bg-accent hover:border-accent"
            >
              <Search className="h-3.5 w-3.5" /> New Analysis
            </Link>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} tone={s.tone} />
        ))}
      </div>

      {/* recent analyses */}
      <div className="mt-10">
        <SectionHeader
          eyebrow="Recent Analyses"
          title="Communications on your desk"
          action={
            <div className="flex items-center gap-3">
              <SyntheticBadge />
              <Link
                to="/review"
                className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
              >
                Review Queue <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          }
        />

        <Panel padded={false} className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse">
            <thead>
              <tr>
                <Th>Communication</Th>
                <Th>Type</Th>
                <Th>Risk</Th>
                <Th>Trust Score</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th className="text-right">Action</Th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id} className="group transition-colors duration-150 hover:bg-white/[0.025]">
                  <Td>
                    <Link to={`/analysis/${a.id}`} className="block">
                      <span className="text-ink transition-colors group-hover:text-accent">{a.title}</span>
                      <span className="mt-0.5 block font-mono text-[10px] text-dim">{a.id}</span>
                    </Link>
                  </Td>
                  <Td>
                    <span className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{a.type}</span>
                  </Td>
                  <Td>
                    <RiskBadge risk={a.risk} />
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`font-mono text-sm ${
                          a.trustScore < 40 ? 'text-accent' : a.trustScore < 75 ? 'text-warn' : 'text-ok'
                        }`}
                      >
                        {a.trustScore}/100
                      </span>
                      <span className="h-[4px] w-16 bg-bg2">
                        <span
                          className={`block h-full ${
                            a.trustScore < 40 ? 'bg-accent' : a.trustScore < 75 ? 'bg-warn' : 'bg-ok'
                          }`}
                          style={{ width: `${a.trustScore}%` }}
                        />
                      </span>
                    </div>
                  </Td>
                  <Td>
                    <span className="font-mono text-[12px] text-muted">{a.date}</span>
                  </Td>
                  <Td>
                    <StatusText status={a.status} />
                  </Td>
                  <Td className="text-right">
                    <button
                      onClick={() => navigate(`/analysis/${a.id}`)}
                      className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors group-hover:border-crimson group-hover:text-accent"
                    >
                      View Report →
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      {/* lower grid */}
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <Panel>
          <div className="label">Queue Health</div>
          <div className="mt-4 space-y-4">
            {[
              ['High Risk', 5, 24, 'bg-accent'],
              ['Review Required', 3, 24, 'bg-warn'],
              ['Verified', 16, 24, 'bg-ok'],
            ].map(([label, val, total, color]) => (
              <div key={label as string}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-[13px] text-muted">{label}</span>
                  <span className="font-mono text-[12px] text-ink">
                    {val} <span className="text-dim">/ {total}</span>
                  </span>
                </div>
                <div className="h-[6px] w-full bg-bg2">
                  <div
                    className={`h-full ${color}`}
                    style={{ width: `${((val as number) / (total as number)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="label">Next Actions</div>
          <ul className="mt-4 space-y-2.5">
            {[
              ['Freeze TXN-DEMO-2026-001 pending approval', '/action-center'],
              ['Confirm beneficiary change on INV-DEMO-0007', '/review'],
              ['Preserve FS-DEMO-001928 clip to Evidence Vault', '/evidence'],
            ].map(([label, to]) => (
              <li key={label as string}>
                <Link
                  to={to as string}
                  className="flex items-start gap-2.5 border border-line px-3 py-2.5 text-[13px] text-muted transition-colors hover:border-line2 hover:bg-white/[0.03] hover:text-ink"
                >
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crimson" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="label">Transparency</div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            All records on this dashboard are synthetic demo data. Detection output is simulated for the hackathon
            prototype — no model, backend, or customer data is involved.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <SyntheticBadge />
            <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-warn uppercase">
              AI Detection Status: Simulation / Demo
            </span>
          </div>
          <Link
            to="/about/disclosure"
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
          >
            Data &amp; Model Disclosure <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Panel>
      </div>
    </div>
  )
}
