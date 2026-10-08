import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2, Filter, Inbox, XCircle, Zap } from 'lucide-react'
import { Panel, RiskBadge, SyntheticBadge, Td, Th } from '../components/ui'
import type { ReviewItem } from '../data/ops'
import { REVIEW_QUEUE } from '../data/ops'

type Decision = 'Pending' | 'Approved' | 'Escalated' | 'Dismissed'
type RiskFilter = 'All' | 'HIGH' | 'REVIEW' | 'LOW'

export default function Review() {
  const [items, setItems] = useState<(ReviewItem & { decision: Decision })[]>(
    REVIEW_QUEUE.map((r) => ({ ...r, decision: 'Pending' as Decision })),
  )
  const [risk, setRisk] = useState<RiskFilter>('All')
  const [selected, setSelected] = useState<string[]>([])
  const [open, setOpen] = useState<(ReviewItem & { decision: Decision }) | null>(null)

  const visible = useMemo(() => items.filter((i) => risk === 'All' || i.risk === risk), [items, risk])

  const decide = (id: string, decision: Decision) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, decision } : i)))
    setOpen(null)
    setSelected((prev) => prev.filter((s) => s !== id))
  }

  const bulkEscalate = () => {
    setItems((prev) => prev.map((i) => (selected.includes(i.id) ? { ...i, decision: 'Escalated' } : i)))
    setSelected([])
  }

  const allChecked = visible.length > 0 && visible.every((v) => selected.includes(v.id))
  const toggleAll = () =>
    setSelected(allChecked ? [] : visible.map((v) => v.id))

  const pending = items.filter((i) => i.decision === 'Pending').length
  const cleared = items.filter((i) => i.decision === 'Approved').length
  const escalated = items.filter((i) => i.decision === 'Escalated').length
  const dismissed = items.filter((i) => i.decision === 'Dismissed').length

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="label mb-2">Triage · Human decision required</div>
          <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold tracking-tight uppercase text-ink">
            Review Queue
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] text-muted">
            Communications whose automated score is not decisive. An analyst decides — the system never closes these on
            its own.
          </p>
        </div>
        <SyntheticBadge />
      </div>

      {/* counters */}
      <div className="mt-6 grid gap-px bg-line sm:grid-cols-4">
        {[
          ['Pending', pending, 'text-warn'],
          ['Escalated', escalated, 'text-accent'],
          ['Cleared', cleared, 'text-ok'],
          ['Dismissed', dismissed, 'text-muted'],
        ].map(([label, value, tone]) => (
          <div key={label as string} className="bg-card px-5 py-4">
            <div className="label">{label}</div>
            <div className={`mt-2.5 font-mono text-2xl ${tone}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 pr-1 font-mono text-[10px] tracking-[0.12em] text-dim uppercase">
            <Filter className="h-3 w-3" /> Risk
          </span>
          {(['All', 'HIGH', 'REVIEW', 'LOW'] as RiskFilter[]).map((r) => (
            <button
              key={r}
              onClick={() => setRisk(r)}
              className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
                risk === r ? 'border-crimson bg-crimson/10 text-accent' : 'border-line text-muted hover:text-ink'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-dim">{selected.length} selected</span>
          <button
            disabled={selected.length === 0}
            onClick={bulkEscalate}
            className="inline-flex items-center gap-1.5 border border-crimson bg-crimson/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-accent uppercase transition-colors hover:bg-crimson hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-crimson/10 disabled:hover:text-accent"
          >
            <Zap className="h-3 w-3" /> Escalate selected
          </button>
        </div>
      </div>

      {/* table */}
      <Panel padded={false} className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr>
              <Th className="w-10">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-crimson" />
              </Th>
              <Th>Communication</Th>
              <Th>Type</Th>
              <Th>Risk</Th>
              <Th>Score</Th>
              <Th>Confidence</Th>
              <Th>Received</Th>
              <Th>SLA</Th>
              <Th>Assignee</Th>
              <Th className="text-right">Decision</Th>
            </tr>
          </thead>
          <tbody>
            {visible.map((item) => (
              <tr
                key={item.id}
                className={`group transition-colors duration-150 hover:bg-white/[0.025] ${
                  selected.includes(item.id) ? 'bg-crimson/6' : ''
                }`}
              >
                <Td>
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() =>
                      setSelected((prev) => (prev.includes(item.id) ? prev.filter((s) => s !== item.id) : [...prev, item.id]))
                    }
                    className="accent-crimson"
                  />
                </Td>
                <Td>
                  <div className="text-ink transition-colors group-hover:text-accent">{item.title}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-dim">{item.id}</div>
                </Td>
                <Td>
                  <span className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{item.type}</span>
                </Td>
                <Td>
                  <RiskBadge risk={item.risk} />
                </Td>
                <Td>
                  <span
                    className={`font-mono text-sm ${
                      item.score < 40 ? 'text-accent' : item.score < 75 ? 'text-warn' : 'text-ok'
                    }`}
                  >
                    {item.score}
                  </span>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <span className="h-[4px] w-14 bg-bg2">
                      <span
                        className={`block h-full ${item.confidence >= 0.85 ? 'bg-ok' : 'bg-warn'}`}
                        style={{ width: `${item.confidence * 100}%` }}
                      />
                    </span>
                    <span className="font-mono text-[11px] text-muted">{item.confidence.toFixed(2)}</span>
                  </div>
                </Td>
                <Td>
                  <span className="font-mono text-[11px] text-muted">{item.received}</span>
                </Td>
                <Td>
                  <span
                    className={`font-mono text-[11px] ${
                      item.sla === 'Cleared' ? 'text-ok' : item.sla.includes('m') && !item.sla.includes('h') ? 'text-accent' : 'text-warn'
                    }`}
                  >
                    {item.sla}
                  </span>
                </Td>
                <Td>
                  <span className="font-mono text-[11px] text-muted">{item.assignee}</span>
                </Td>
                <Td className="text-right">
                  {item.decision === 'Pending' ? (
                    <button
                      onClick={() => setOpen(item)}
                      className="border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors group-hover:border-crimson group-hover:text-accent"
                    >
                      Review →
                    </button>
                  ) : (
                    <span
                      className={`font-mono text-[10px] tracking-[0.1em] uppercase ${
                        item.decision === 'Escalated'
                          ? 'text-accent'
                          : item.decision === 'Approved'
                            ? 'text-ok'
                            : 'text-dim'
                      }`}
                    >
                      {item.decision}
                    </span>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && (
          <div className="py-16 text-center">
            <Inbox className="mx-auto h-7 w-7 text-line2" strokeWidth={1.5} />
            <p className="mt-4 text-[14px] text-muted">Nothing in this filter.</p>
          </div>
        )}
      </Panel>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] text-warn uppercase">
          AI Detection Status: Simulation / Demo
        </span>
        <p className="flex-1 text-[12.5px] text-dim">
          Confidence values are illustrative. No automated decision is executed against any real customer.
        </p>
        <Link
          to="/incidents"
          className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
        >
          Incident timeline <ArrowUpRight className="inline h-3.5 w-3.5" />
        </Link>
      </div>

      {/* decision drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/70" onClick={() => setOpen(null)} />
          <aside className="anim-fade fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-line bg-bg2">
            <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <div className="label mb-1.5">Analyst decision</div>
                <h2 className="text-base leading-snug font-semibold text-ink">{open.title}</h2>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close panel"
                className="flex h-8 w-8 shrink-0 items-center justify-center border border-line text-muted hover:text-ink"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="flex flex-wrap items-center gap-2">
                <RiskBadge risk={open.risk} />
                <span className="border border-line bg-card px-2 py-[3px] font-mono text-[10px] text-muted uppercase">
                  {open.type}
                </span>
                <span className="border border-line bg-card px-2 py-[3px] font-mono text-[10px] text-muted">
                  {open.id}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ['Trust score', `${open.score} / 100`],
                  ['Model confidence', open.confidence.toFixed(2)],
                  ['Received', open.received],
                  ['SLA remaining', open.sla],
                  ['Assignee', open.assignee],
                  ['Decision', open.decision],
                ].map(([k, v]) => (
                  <div key={k} className="border border-line bg-card px-3 py-2.5">
                    <div className="label">{k}</div>
                    <div className="mt-1 truncate font-mono text-[12px] text-ink">{v}</div>
                  </div>
                ))}
              </div>

              <div className="label mt-5 mb-2">Why it surfaced</div>
              <p className="border-l-2 border-crimson bg-card px-4 py-3 text-[13px] leading-relaxed text-muted">
                {open.reason}
              </p>

              <div className="label mt-5 mb-2">Source record</div>
              <Link
                to={`/analysis/${open.id}`}
                className="flex items-center justify-between border border-line bg-card px-4 py-3 text-[13px] text-ink transition-colors hover:border-line2"
              >
                Open full analysis report
                <ArrowUpRight className="h-4 w-4 text-crimson" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-px border-t border-line bg-line">
              <button
                onClick={() => decide(open.id, 'Dismissed')}
                className="bg-bg2 px-4 py-3.5 font-mono text-[11px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-ink"
              >
                Dismiss
              </button>
              <button
                onClick={() => decide(open.id, 'Escalated')}
                className="bg-bg2 px-4 py-3.5 font-mono text-[11px] tracking-[0.1em] text-warn uppercase transition-colors hover:text-accent"
              >
                Escalate
              </button>
              <button
                onClick={() => decide(open.id, 'Approved')}
                className="flex items-center justify-center gap-1.5 bg-crimson px-4 py-3.5 font-mono text-[11px] tracking-[0.1em] text-white uppercase transition-colors hover:bg-accent"
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> Approve
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
