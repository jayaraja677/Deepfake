import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { RiskLevel, Severity, StatusLabel } from '../data/synthetic'
import { SYNTHETIC_BANNER } from '../data/synthetic'

/* ==========================================================================
   FIN-SHIELD UI primitives
   ========================================================================== */

/* ---------- layout ---------- */

export function Panel({
  children,
  className = '',
  padded = true,
  id,
}: {
  children: ReactNode
  className?: string
  padded?: boolean
  id?: string
}) {
  return (
    <section id={id} className={`border border-line bg-card ${padded ? 'p-5' : ''} ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  action,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3 ${className}`}>
      <div>
        {eyebrow && <div className="label mb-1.5">{eyebrow}</div>}
        <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      </div>
      {action}
    </div>
  )
}

/* ---------- badges ---------- */

const RISK_STYLES: Record<RiskLevel, string> = {
  HIGH: 'border-accent/60 bg-accent/10 text-accent',
  REVIEW: 'border-warn/50 bg-warn/10 text-warn',
  LOW: 'border-ok/50 bg-ok/10 text-ok',
}

export function RiskBadge({ risk, className = '' }: { risk: RiskLevel; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-[3px] font-mono text-[10px] font-medium tracking-[0.12em] ${RISK_STYLES[risk]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {risk}
    </span>
  )
}

const STATUS_STYLES: Record<StatusLabel, string> = {
  'High Risk': 'text-accent',
  'Review Required': 'text-warn',
  Verified: 'text-ok',
}

export function StatusText({ status }: { status: StatusLabel }) {
  return <span className={`text-[13px] ${STATUS_STYLES[status]}`}>{status}</span>
}

export const SEVERITY_STYLES: Record<Severity, string> = {
  CRITICAL: 'border-accent/60 bg-accent/10 text-accent',
  HIGH: 'border-crimson/60 bg-crimson/10 text-crimson',
  MEDIUM: 'border-warn/50 bg-warn/10 text-warn',
  INFO: 'border-line2 bg-white/5 text-muted',
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-block border px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] ${SEVERITY_STYLES[severity]}`}
    >
      {severity}
    </span>
  )
}

export function SyntheticBadge({ className = '' }: { className?: string }) {
  return (
    <span
      title="All content in this prototype is fictional and generated for demonstration."
      className={`inline-block border border-dashed border-crimson/50 bg-crimson/8 px-2 py-[3px] font-mono text-[9px] tracking-[0.16em] text-crimson uppercase ${className}`}
    >
      {SYNTHETIC_BANNER}
    </span>
  )
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'danger' | 'ok' }) {
  const tones = {
    neutral: 'border-line2 text-muted',
    danger: 'border-accent/60 text-accent',
    ok: 'border-ok/50 text-ok',
  }
  return (
    <span className={`border px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] uppercase ${tones[tone]}`}>
      {children}
    </span>
  )
}

/* ---------- buttons ---------- */

type BtnProps = {
  children: ReactNode
  onClick?: () => void
  to?: string
  variant?: 'primary' | 'ghost' | 'danger' | 'quiet'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

export function Btn({
  children,
  onClick,
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  type = 'button',
}: BtnProps) {
  const sizes = {
    sm: 'px-3 py-1.5 text-[11px] gap-1.5',
    md: 'px-4 py-2.5 text-xs gap-2',
    lg: 'px-6 py-3.5 text-[13px] gap-2.5',
  }
  const variants = {
    primary: 'bg-crimson text-white hover:bg-accent border border-crimson hover:border-accent',
    danger: 'bg-transparent text-accent border border-accent/60 hover:bg-accent/10',
    ghost: 'bg-transparent text-ink border border-line hover:border-line2 hover:bg-white/[0.03]',
    quiet: 'bg-transparent text-muted border border-transparent hover:text-ink hover:border-line',
  }
  const cls = `inline-flex items-center justify-center font-medium tracking-[0.08em] uppercase transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${sizes[size]} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}

/* ---------- data display ---------- */

export function Meter({ value, tone }: { value: number | null; tone?: 'risk' | 'trust' }) {
  const color =
    tone === 'trust'
      ? value !== null && value >= 75
        ? 'bg-ok'
        : value !== null && value >= 40
          ? 'bg-warn'
          : 'bg-accent'
      : value === null
        ? 'bg-line2'
        : value >= 75
          ? 'bg-accent'
          : value >= 40
            ? 'bg-warn'
            : 'bg-ok'

  return (
    <div className="h-[6px] w-full bg-bg2">
      <div
        className={`h-full ${color} transition-[width] duration-700 ease-out`}
        style={{ width: `${value ?? 0}%` }}
      />
    </div>
  )
}

export function TrustGauge({ score, size = 190 }: { score: number; size?: number }) {
  const r = 78
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, score)) / 100
  const color = score >= 75 ? '#3f8f5b' : score >= 40 ? '#c8871f' : '#d62839'

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" width={size} height={size} className="-rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="#1e1e1e" strokeWidth="12" />
        <circle cx="100" cy="100" r={r} fill="none" stroke="#292929" strokeWidth="1" strokeDasharray="2 6" />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="butt"
          strokeDasharray={`${c * pct} ${c}`}
          style={{ animation: 'fs-dash 1.1s cubic-bezier(0.16,1,0.3,1) both', strokeDashoffset: c }}
        />
        {[0, 25, 50, 75, 100].map((t) => {
          const angle = (t / 100) * 2 * Math.PI - Math.PI / 2
          const x1 = 100 + Math.cos(angle) * 68
          const y1 = 100 + Math.sin(angle) * 68
          const x2 = 100 + Math.cos(angle) * 63
          const y2 = 100 + Math.sin(angle) * 63
          return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a3a3a" strokeWidth="1.5" />
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="label mb-1">Trust Score</div>
        <div className="font-mono text-[40px] leading-none font-medium text-ink">{score}</div>
        <div className="mt-1 font-mono text-xs text-dim">/ 100</div>
      </div>
    </div>
  )
}

export function StatCard({
  label,
  value,
  hint,
  tone = 'neutral',
}: {
  label: string
  value: number | string
  hint?: string
  tone?: 'neutral' | 'high' | 'review' | 'low'
}) {
  const accent = {
    neutral: 'text-ink',
    high: 'text-accent',
    review: 'text-warn',
    low: 'text-ok',
  }[tone]
  const bar = {
    neutral: 'bg-line2',
    high: 'bg-accent',
    review: 'bg-warn',
    low: 'bg-ok',
  }[tone]

  return (
    <div className="anim-rise group relative border border-line bg-card p-4 transition-colors duration-200 hover:border-line2">
      <div className={`absolute top-0 left-0 h-[2px] w-8 ${bar} transition-all duration-300 group-hover:w-full`} />
      <div className="label">{label}</div>
      <div className={`mt-3 font-mono text-3xl leading-none font-medium ${accent}`}>{value}</div>
      {hint && <div className="mt-2 text-[11px] text-dim">{hint}</div>}
    </div>
  )
}

/* ---------- tables ---------- */

export function Th({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <th className={`border-b border-line px-4 py-3 text-left font-mono text-[10px] tracking-[0.14em] text-dim uppercase ${className}`}>
      {children}
    </th>
  )
}

export function Td({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return <td className={`border-b border-line/70 px-4 py-3.5 align-middle text-sm ${className}`}>{children}</td>
}

export function RowLink({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:border-crimson hover:text-accent"
    >
      {label} →
    </button>
  )
}
