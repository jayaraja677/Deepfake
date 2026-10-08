import { Link } from 'react-router-dom'
import { Activity, ArrowUpRight, Building2, TrendingDown, TrendingUp, Users } from 'lucide-react'
import { Btn, Panel, SectionHeader, SyntheticBadge } from '../components/ui'
import { INSTITUTION } from '../data/ops'

/* --- 30-day trust score trend, hand-built SVG --- */
function TrendChart({ data }: { data: number[] }) {
  const w = 720
  const h = 190
  const pad = { t: 14, r: 8, b: 24, l: 30 }
  const min = 40
  const max = 90
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (w - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b)

  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1).toFixed(1)},${h - pad.b} L${pad.l},${h - pad.b} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[190px] w-full" role="img" aria-label="30 day average trust score trend">
      {[40, 55, 70, 85].map((g) => (
        <g key={g}>
          <line x1={pad.l} y1={y(g)} x2={w - pad.r} y2={y(g)} stroke="#1f1f1f" strokeWidth="1" />
          <text x={4} y={y(g) + 3.5} fill="#5a5a5a" fontSize="9" fontFamily="ui-monospace, monospace">
            {g}
          </text>
        </g>
      ))}
      <path d={area} fill="rgba(177,18,38,0.14)" />
      <path d={line} fill="none" stroke="#b11226" strokeWidth="1.75" />
      {data.map((v, i) =>
        i % 5 === 0 ? <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill="#080808" stroke="#d62839" strokeWidth="1.5" /> : null,
      )}
      <text x={pad.l} y={h - 6} fill="#5a5a5a" fontSize="9" fontFamily="ui-monospace, monospace">
        09 Sep
      </text>
      <text x={w - pad.r - 42} y={h - 6} fill="#5a5a5a" fontSize="9" fontFamily="ui-monospace, monospace">
        08 Oct
      </text>
    </svg>
  )
}

const TONE: Record<string, string> = {
  danger: 'text-accent',
  warn: 'text-warn',
  ok: 'text-ok',
}

export default function Institution() {
  const maxScreened = Math.max(...INSTITUTION.departments.map((d) => d.screened))

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
      <div className="relative overflow-hidden border border-line bg-card px-6 py-6">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 items-center justify-center border border-crimson/60 bg-crimson/10">
              <Building2 className="h-5 w-5 text-accent" strokeWidth={1.5} />
            </span>
            <div>
              <div className="label mb-1.5">Institution Console · Organisation-wide</div>
              <h1 className="text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
                {INSTITUTION.name}
              </h1>
              <p className="mt-2 text-[14px] text-muted">
                {INSTITUTION.window} · screening across six departments and four analysts.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Btn to="/review" variant="danger" size="md">
              Open Review Queue <ArrowUpRight className="h-4 w-4" />
            </Btn>
            <SyntheticBadge />
          </div>
        </div>
      </div>

      {/* headline metrics */}
      <div className="mt-5 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
        {INSTITUTION.headline.map((m, i) => {
          const down = m.delta.startsWith('-')
          return (
            <div key={m.label} className="anim-rise bg-card px-5 py-5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="label">{m.label}</div>
              <div className="mt-3 flex items-end justify-between">
                <span className="font-mono text-3xl leading-none text-ink">{m.value}</span>
                <span
                  className={`flex items-center gap-1 font-mono text-[11px] ${
                    down ? 'text-accent' : 'text-ok'
                  }`}
                >
                  {down ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                  {m.delta}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        {/* trend */}
        <Panel>
          <SectionHeader
            eyebrow="Risk Trend"
            title="Average trust score · 30 days"
            action={
              <span className="border border-line px-2 py-[3px] font-mono text-[10px] text-muted uppercase">
                Daily mean
              </span>
            }
          />
          <div className="mt-4">
            <TrendChart data={INSTITUTION.trend} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-px bg-line">
            {[
              ['Best day', '78', 'text-ok'],
              ['Lowest day', '55', 'text-accent'],
              ['Current', '73', 'text-ink'],
            ].map(([k, v, c]) => (
              <div key={k} className="bg-card px-4 py-3">
                <div className="label">{k}</div>
                <div className={`mt-1.5 font-mono text-lg ${c}`}>{v}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* live feed */}
        <Panel padded={false}>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2.5">
              <Activity className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <span className="label">Live Activity</span>
            </div>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ok anim-pulse" />
              <span className="font-mono text-[10px] text-ok uppercase">Operational</span>
            </span>
          </div>
          <ul className="divide-y divide-line">
            {INSTITUTION.feed.map((f, i) => (
              <li key={i} className="anim-rise flex gap-3 px-5 py-3" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="font-mono text-[11px] text-dim">{f.at}</span>
                <span className={`text-[12.5px] leading-snug ${TONE[f.tone]}`}>{f.text}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        {/* departments */}
        <Panel>
          <SectionHeader
            eyebrow="Exposure by function"
            title="Department breakdown"
            action={<span className="label">Screened · risk rate · mean score</span>}
          />
          <div className="mt-5 space-y-5">
            {INSTITUTION.departments.map((d, i) => (
              <div key={d.name} className="anim-rise" style={{ animationDelay: `${i * 55}ms` }}>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-[13.5px] text-ink">{d.name}</span>
                  <div className="flex items-center gap-5 font-mono text-[11px] text-muted">
                    <span className="text-dim">{d.screened.toLocaleString('en-IN')} screened</span>
                    <span className={d.risk >= 8 ? 'text-accent' : d.risk >= 5 ? 'text-warn' : 'text-ok'}>
                      {d.risk}% at risk
                    </span>
                    <span className="w-8 text-right text-ink">{d.score}</span>
                  </div>
                </div>
                <div className="flex h-[6px] w-full gap-px bg-bg2">
                  <span
                    className={`block h-full ${d.risk >= 8 ? 'bg-accent' : d.risk >= 5 ? 'bg-warn' : 'bg-ok'}`}
                    style={{ width: `${(d.screened / maxScreened) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-line pt-4 text-[12px] leading-relaxed text-dim">
            Bar length represents screening volume; colour represents the share of communications flagged at risk.
          </p>
        </Panel>

        {/* analysts */}
        <Panel padded={false}>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2.5">
              <Users className="h-4 w-4 text-crimson" strokeWidth={1.75} />
              <span className="label">Analyst workload</span>
            </div>
            <span className="font-mono text-[10px] text-dim">{INSTITUTION.window}</span>
          </div>
          <ul className="divide-y divide-line">
            {INSTITUTION.analysts.map((a) => (
              <li key={a.name} className="px-5 py-3.5 transition-colors hover:bg-white/[0.02]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13.5px] text-ink">{a.name}</span>
                  <span className="font-mono text-[11px] text-ok">{a.accuracy}</span>
                </div>
                <div className="mt-2 flex gap-5 font-mono text-[11px] text-dim">
                  <span>{a.reviewed} reviewed</span>
                  <span className="text-crimson">{a.caught} high-risk caught</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-5 py-4">
            <Link
              to="/action-center"
              className="flex items-center justify-between font-mono text-[11px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
            >
              Action Center <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Panel>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 border border-line bg-bg2 px-5 py-4">
        <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] text-warn uppercase">
          AI Detection Status: Simulation / Demo
        </span>
        <p className="flex-1 text-[12.5px] leading-relaxed text-dim">
          All organisation figures, departments, analysts and events on this screen are synthetic demo data.
        </p>
      </div>
    </div>
  )
}
