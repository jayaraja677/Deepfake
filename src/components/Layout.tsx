import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Activity,
  ChevronRight,
  FileWarning,
  Inbox,
  Menu,
  ShieldCheck,
  User,
  X,
} from 'lucide-react'
import { SyntheticBadge } from './ui'

const NAV = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/evidence', label: 'Evidence' },
  { to: '/incidents', label: 'Incidents' },
  { to: '/institution', label: 'Institution' },
  { to: '/about', label: 'How It Works' },
]

const PROFILE_MENU = [
  { to: '/action-center', label: 'Action Center', icon: Inbox },
  { to: '/review', label: 'Review Queue', icon: FileWarning },
  { to: '/about/disclosure', label: 'AI & Data Disclosure', icon: Activity },
]

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center border border-crimson/70 bg-crimson/10 transition-colors duration-200 group-hover:bg-crimson/20">
        <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.75} />
      </span>
      <span className="font-mono text-[15px] font-semibold tracking-[0.18em] text-ink">
        FIN<span className="text-accent">-</span>SHIELD
      </span>
    </Link>
  )
}

function SystemStatus() {
  return (
    <div className="flex items-center gap-4">
      <span className="hidden items-center gap-2 border border-line bg-bg2 px-2.5 py-1.5 lg:inline-flex">
        <span className="label">Demo Mode</span>
        <span className="h-1 w-1 bg-line2" />
        <span className="font-mono text-[10px] tracking-[0.1em] text-muted uppercase">System Status</span>
        <span className="h-1.5 w-1.5 rounded-full bg-ok anim-pulse" />
        <span className="font-mono text-[10px] tracking-[0.1em] text-ok uppercase">Operational</span>
      </span>
      <span className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 lg:hidden">
        <span className="h-1.5 w-1.5 rounded-full bg-ok anim-pulse" />
        <span className="font-mono text-[10px] text-ok uppercase">Operational</span>
      </span>
    </div>
  )
}

function ProfileMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open profile menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center border border-line bg-card text-muted transition-colors hover:border-line2 hover:text-ink"
      >
        <User className="h-4 w-4" strokeWidth={1.75} />
      </button>

      {open && (
        <div className="anim-fade absolute right-0 z-50 mt-2 w-64 border border-line bg-card shadow-2xl shadow-black/60">
          <div className="border-b border-line px-4 py-3">
            <div className="text-[13px] font-medium text-ink">Jayaraj</div>
            <div className="label mt-1">Fraud Review Analyst</div>
          </div>
          <div className="py-1">
            {PROFILE_MENU.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => {
                  setOpen(false)
                  onNavigate?.()
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                {label}
                <ChevronRight className="ml-auto h-3.5 w-3.5 text-dim" />
              </Link>
            ))}
          </div>
          <div className="border-t border-line px-4 py-3">
            <div className="label leading-relaxed">
              Prototype session only. No authentication server is connected.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (open) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-200 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[82%] max-w-xs border-l border-line bg-bg2 transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-mono text-xs tracking-[0.2em] text-ink">MENU</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center border border-line text-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col p-3">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between border-l-2 px-4 py-3.5 text-sm transition-colors ${
                  isActive
                    ? 'border-accent bg-crimson/10 text-ink'
                    : 'border-transparent text-muted hover:bg-white/[0.03] hover:text-ink'
                }`
              }
            >
              {n.label}
              <ChevronRight className="h-3.5 w-3.5 text-dim" />
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 border-t border-line pt-3">
          <div className="label px-4 pb-2">Workspace</div>
          {PROFILE_MENU.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className="block px-4 py-3 text-[13px] text-muted transition-colors hover:text-ink"
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="absolute right-0 bottom-0 left-0 border-t border-line p-5">
          <SyntheticBadge />
          <p className="mt-3 text-[11px] leading-relaxed text-dim">
            All content shown is synthetic demo data. No real financial records are used.
          </p>
        </div>
      </aside>
    </>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-bg2">
      <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
              AI &amp; Data Disclosure — This hackathon prototype uses synthetic demonstration content and
              AI-assisted analysis concepts. No confidential bank, customer, or platform data is used.
            </p>
            <div className="mt-4">
              <SyntheticBadge />
            </div>
          </div>

          <div>
            <div className="label mb-3">Product</div>
            <ul className="space-y-2 text-[13px] text-muted">
              <li><Link className="transition-colors hover:text-ink" to="/dashboard">Dashboard</Link></li>
              <li><Link className="transition-colors hover:text-ink" to="/analyze">Analyze Communication</Link></li>
              <li><Link className="transition-colors hover:text-ink" to="/action-center">Action Center</Link></li>
              <li><Link className="transition-colors hover:text-ink" to="/review">Review Queue</Link></li>
            </ul>
          </div>

          <div>
            <div className="label mb-3">Transparency</div>
            <ul className="space-y-2 text-[13px] text-muted">
              <li><Link className="transition-colors hover:text-ink" to="/about">How It Works</Link></li>
              <li><Link className="transition-colors hover:text-ink" to="/about/disclosure">Data &amp; Model Disclosure</Link></li>
              <li><Link className="transition-colors hover:text-ink" to="/about/disclosure#a">Data Sources</Link></li>
              <li><Link className="transition-colors hover:text-ink" to="/about/disclosure#h">Limitations</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <div className="label">FIN-SHIELD · Hackathon Prototype · v0.1 · Synthetic Data Only</div>
          <div className="flex items-center gap-4">
            <span className="label">AI Detection Status</span>
            <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[10px] tracking-[0.12em] text-warn uppercase">
              Simulation / Demo
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-[13px] transition-colors duration-150 ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    <span
                      className={`absolute right-3 -bottom-[1px] left-3 h-[2px] transition-all duration-200 ${
                        isActive ? 'bg-accent' : 'bg-transparent'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <SystemStatus />
            <ProfileMenu />
            <button
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center border border-line bg-card text-muted transition-colors hover:text-ink lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={menu} onClose={() => setMenu(false)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
