import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Ban,
  Bell,
  CheckCircle2,
  FileCheck2,
  Inbox,
  PlayCircle,
  ShieldAlert,
  UserCheck,
} from 'lucide-react'
import { Panel, SyntheticBadge } from '../components/ui'
import type { ActionItem, ActionKind, ActionStatus } from '../data/ops'
import { ACTION_ITEMS } from '../data/ops'

const KIND_ICON: Record<ActionKind, typeof Inbox> = {
  Contain: Ban,
  Verify: UserCheck,
  Notify: Bell,
  Report: FileCheck2,
}

const TABS = [
  { key: 'pending', label: 'Pending', match: ['Open', 'In Progress'] as ActionStatus[] },
  { key: 'escalations', label: 'Escalations', match: ['Escalated'] as ActionStatus[] },
  { key: 'filed', label: 'Filed', match: ['Closed'] as ActionStatus[] },
] as const

const SEV_STYLES = {
  CRITICAL: 'border-accent/60 bg-accent/10 text-accent',
  HIGH: 'border-crimson/60 bg-crimson/10 text-crimson',
  MEDIUM: 'border-warn/50 bg-warn/10 text-warn',
}

export default function ActionCenter() {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('pending')
  const [items, setItems] = useState<ActionItem[]>(ACTION_ITEMS)
  const [filter, setFilter] = useState<string>('All')

  const counts = useMemo(
    () => ({
      pending: items.filter((i) => i.status === 'Open' || i.status === 'In Progress').length,
      escalations: items.filter((i) => i.status === 'Escalated').length,
      filed: items.filter((i) => i.status === 'Closed').length,
    }),
    [items],
  )

  const active = TABS.find((t) => t.key === tab)!
  const visible = items.filter((i) => active.match.includes(i.status) && (filter === 'All' || i.kind === filter))

  const advance = (id: string) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: i.status === 'Open' ? 'In Progress' : i.status === 'In Progress' ? 'Escalated' : 'Closed' }
          : i,
      ),
    )

  const escalate = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'Escalated', sla: 'Escalated — 30m SLA' } : i)))

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="label mb-2">Response · Stage 03</div>
          <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold tracking-tight uppercase text-ink">
            Action Center
          </h1>
          <p className="mt-3 max-w-xl text-[15px] text-muted">
            Every flagged communication resolves into a task with an owner, a deadline, and a record.
          </p>
        </div>
        <SyntheticBadge />
      </div>

      {/* summary strip */}
      <div className="mt-6 grid gap-px bg-line sm:grid-cols-4">
        {[
          ['Pending', counts.pending, 'bg-warn'],
          ['Escalations', counts.escalations, 'bg-accent'],
          ['Filed', counts.filed, 'bg-ok'],
          ['Total actions', items.length, 'bg-line2'],
        ].map(([label, value, color]) => (
          <div key={label as string} className="bg-card px-5 py-4">
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
              <span className="label">{label}</span>
            </div>
            <div className="mt-2.5 font-mono text-2xl text-ink">{value}</div>
          </div>
        ))}
      </div>

      {/* tabs + filters */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex border border-line">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors ${
                tab === t.key ? 'bg-crimson/12 text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {t.label}
              <span className="ml-2 text-dim">{counts[t.key as keyof typeof counts]}</span>
              {tab === t.key && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent" />}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Contain', 'Verify', 'Notify', 'Report'].map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
                filter === k ? 'border-crimson bg-crimson/10 text-accent' : 'border-line text-muted hover:text-ink'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* cards */}
      {visible.length === 0 ? (
        <Panel className="mt-6 py-16 text-center">
          <Inbox className="mx-auto h-7 w-7 text-line2" strokeWidth={1.5} />
          <p className="mt-4 text-[14px] text-muted">No actions in this view.</p>
        </Panel>
      ) : (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {visible.map((item, i) => {
            const Icon = KIND_ICON[item.kind]
            const urgent = item.severity === 'CRITICAL'
            return (
              <div
                key={item.id}
                className="anim-rise group flex flex-col border border-line bg-card transition-colors duration-200 hover:border-line2"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border ${SEV_STYLES[item.severity]}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`border px-2 py-[2px] font-mono text-[9px] tracking-[0.12em] ${SEV_STYLES[item.severity]}`}>
                          {item.severity}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.1em] text-dim uppercase">{item.kind}</span>
                      </div>
                      <h3 className="mt-2 text-[15px] font-medium text-ink">{item.title}</h3>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-dim">{item.id}</span>
                </div>

                <p className="flex-1 px-5 py-4 text-[13px] leading-relaxed text-muted">{item.detail}</p>

                <div className="grid grid-cols-3 gap-px border-t border-line bg-line">
                  {[
                    ['Owner', item.owner],
                    ['SLA', item.sla],
                    ['Source', item.source],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-card px-4 py-3">
                      <div className="label">{k}</div>
                      <div className={`mt-1 truncate font-mono text-[11px] ${k === 'SLA' && urgent ? 'text-accent' : 'text-ink'}`}>
                        {v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3.5">
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] uppercase">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.status === 'Closed' ? 'bg-ok' : item.status === 'Escalated' ? 'bg-accent' : 'bg-warn'
                      }`}
                    />
                    <span className={item.status === 'Closed' ? 'text-ok' : item.status === 'Escalated' ? 'text-accent' : 'text-warn'}>
                      {item.status}
                    </span>
                  </span>

                  <div className="flex gap-2">
                    {item.status !== 'Closed' && (
                      <>
                        <button
                          onClick={() => escalate(item.id)}
                          className="border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:border-accent hover:text-accent"
                        >
                          Escalate
                        </button>
                        <button
                          onClick={() => advance(item.id)}
                          className="inline-flex items-center gap-1.5 border border-crimson bg-crimson/10 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-accent uppercase transition-colors hover:bg-crimson hover:text-white"
                        >
                          {item.status === 'Open' ? <PlayCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                          {item.status === 'Open' ? 'Start' : 'Close'}
                        </button>
                      </>
                    )}
                    <Link
                      to={`/analysis/${item.source}`}
                      className="inline-flex items-center gap-1 border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:border-line2 hover:text-ink"
                    >
                      Report <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Panel className="mt-8 flex flex-wrap items-center gap-4">
        <ShieldAlert className="h-5 w-5 shrink-0 text-crimson" strokeWidth={1.5} />
        <p className="flex-1 text-[13px] leading-relaxed text-muted">
          Actions are simulated locally for the prototype — no transaction, notification, or report is actually sent to
          any financial system.
        </p>
        <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] text-warn uppercase">
          Synthetic Demo Data
        </span>
      </Panel>
    </div>
  )
}
