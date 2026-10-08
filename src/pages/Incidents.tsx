import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, Radio, ShieldAlert, User } from 'lucide-react'
import { Panel, SyntheticBadge } from '../components/ui'
import { INCIDENTS } from '../data/ops'

const SEV = {
  CRITICAL: 'border-accent/60 bg-accent/10 text-accent',
  HIGH: 'border-crimson/60 bg-crimson/10 text-crimson',
  MEDIUM: 'border-warn/50 bg-warn/10 text-warn',
}

const STATUS = {
  Contained: 'text-ok border-ok/50 bg-ok/10',
  'Under Review': 'text-warn border-warn/50 bg-warn/10',
  Filed: 'text-muted border-line2 bg-white/5',
}

export default function Incidents() {
  const [activeId, setActiveId] = useState(INCIDENTS[0].id)
  const active = INCIDENTS.find((i) => i.id === activeId) ?? INCIDENTS[0]

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="label mb-2">Case history · Append-only</div>
          <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold tracking-tight uppercase text-ink">
            Incident Timeline
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] text-muted">
            A single chronological record of what was detected, who acted, and what changed — from first signal to
            closure.
          </p>
        </div>
        <SyntheticBadge />
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[320px_1fr]">
        {/* incident list */}
        <div className="space-y-3">
          <div className="label px-1">Open &amp; recent cases · {INCIDENTS.length}</div>
          {INCIDENTS.map((inc) => {
            const on = inc.id === activeId
            return (
              <button
                key={inc.id}
                onClick={() => setActiveId(inc.id)}
                className={`w-full border px-4 py-4 text-left transition-all duration-150 ${
                  on ? 'border-crimson bg-crimson/8' : 'border-line bg-card hover:border-line2 hover:bg-card2'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-dim">{inc.id}</span>
                  <span className={`border px-2 py-[2px] font-mono text-[9px] tracking-[0.12em] ${SEV[inc.severity]}`}>
                    {inc.severity}
                  </span>
                </div>
                <div className={`mt-2.5 text-[13.5px] leading-snug ${on ? 'text-ink' : 'text-muted'}`}>{inc.title}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`border px-2 py-[2px] font-mono text-[9px] tracking-[0.1em] uppercase ${STATUS[inc.status]}`}>
                    {inc.status}
                  </span>
                  <span className="font-mono text-[10px] text-dim">{inc.opened.split(' · ')[0]}</span>
                </div>
              </button>
            )
          })}

          <Panel className="pt-4">
            <div className="label">Case summary</div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{active.summary}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="border border-line px-3 py-2.5">
                <div className="label">Owner</div>
                <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-ink">
                  <User className="h-3 w-3 text-dim" /> {active.owner}
                </div>
              </div>
              <div className="border border-line px-3 py-2.5">
                <div className="label">Source</div>
                <Link
                  to={`/analysis/${active.source}`}
                  className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-accent hover:underline"
                >
                  {active.source} <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </Panel>
        </div>

        {/* timeline */}
        <Panel padded={false}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
            <div className="flex items-center gap-2.5">
              <Radio className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <span className="label">Chronology</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-muted">{active.id}</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-dim">
                <Clock className="h-3 w-3" /> Opened {active.opened}
              </span>
            </div>
          </div>

          <div className="relative px-6 py-7">
            <span className="absolute top-8 bottom-8 left-[38px] w-px bg-line" />
            <ol className="space-y-6">
              {active.steps.map((s, i) => (
                <li
                  key={i}
                  className="anim-rise relative flex gap-5"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="relative z-10 flex w-[26px] shrink-0 justify-center pt-1">
                    <span
                      className={`block h-3 w-3 rounded-full border-2 ${
                        s.state === 'done'
                          ? 'border-ok bg-bg2'
                          : s.state === 'active'
                            ? 'border-accent bg-accent anim-pulse'
                            : 'border-line2 bg-bg2'
                      }`}
                    />
                  </div>

                  <div
                    className={`flex-1 border px-4 py-3.5 transition-colors ${
                      s.state === 'active'
                        ? 'border-accent/50 bg-crimson/8'
                        : s.state === 'pending'
                          ? 'border-dashed border-line bg-transparent opacity-60'
                          : 'border-line bg-card'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-crimson">{s.at}</span>
                        <span className="text-[14px] font-medium text-ink">{s.title}</span>
                      </div>
                      <span
                        className={`font-mono text-[9px] tracking-[0.12em] uppercase ${
                          s.state === 'done'
                            ? 'text-ok'
                            : s.state === 'active'
                              ? 'text-accent'
                              : 'text-dim'
                        }`}
                      >
                        {s.state === 'done' ? 'Recorded' : s.state === 'active' ? 'In progress' : 'Pending'}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.detail}</p>
                    <div className="mt-2.5 flex items-center gap-1.5 font-mono text-[10px] text-dim">
                      <User className="h-3 w-3" /> {s.actor}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-line px-6 py-4">
            <ShieldAlert className="h-4 w-4 shrink-0 text-crimson" strokeWidth={1.75} />
            <p className="flex-1 text-[12px] leading-relaxed text-dim">
              Timeline entries are synthetic demo records. No incident response system is connected to this prototype.
            </p>
            <Link
              to="/evidence"
              className="font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
            >
              View evidence →
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  )
}
