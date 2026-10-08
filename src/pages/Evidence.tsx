import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AudioLines,
  CheckCircle2,
  Copy,
  FileText,
  Film,
  FolderLock,
  ImageIcon,
  Lock,
  MessageSquare,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react'
import { Btn, Panel, SyntheticBadge } from '../components/ui'
import type { EvidenceItem, EvidenceType } from '../data/ops'
import { EVIDENCE } from '../data/ops'
import { useAnalyses } from '../store/analyses'

const TYPE_ICON: Record<EvidenceType, typeof Film> = {
  Video: Film,
  Audio: AudioLines,
  Image: ImageIcon,
  PDF: FileText,
  Message: MessageSquare,
  SMS: MessageSquare,
}

const FILTERS: ('All' | EvidenceType)[] = ['All', 'Video', 'Audio', 'Image', 'PDF', 'Message', 'SMS']
const EVIDENCE_TYPES: EvidenceType[] = ['Video', 'Audio', 'Image', 'PDF', 'Message', 'SMS']

function randomHash() {
  const hex = '0123456789abcdef'
  let out = ''
  for (let i = 0; i < 64; i++) out += hex[Math.floor(Math.random() * 16)]
  return out
}

export default function Evidence() {
  const { analyses } = useAnalyses()
  const [items, setItems] = useState<EvidenceItem[]>(EVIDENCE)
  const [filter, setFilter] = useState<'All' | EvidenceType>('All')
  const [open, setOpen] = useState<EvidenceItem | null>(null)
  const [modal, setModal] = useState(false)
  const [source, setSource] = useState('')
  const [copied, setCopied] = useState('')
  const [justAdded, setJustAdded] = useState('')

  const visible = useMemo(
    () => items.filter((i) => filter === 'All' || i.type === filter),
    [items, filter],
  )

  const copy = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(hash)
      setTimeout(() => setCopied(''), 1600)
    } catch {
      setCopied('')
    }
  }

  const preserve = () => {
    const a = analyses.find((x) => x.id === source)
    if (!a) return
    const id = `EVD-DEMO-${String(1000 + items.length + 1).slice(1)}`
    const record: EvidenceItem = {
      id,
      label: a.title,
      type: EVIDENCE_TYPES.includes(a.type as EvidenceType) ? (a.type as EvidenceType) : 'Message',
      size: `${(Math.random() * 12 + 0.4).toFixed(1)} MB`,
      hash: randomHash(),
      preserved: `${a.date} · ${a.time}`,
      case: a.id,
      custody: [
        { at: a.time.replace(' IST', ''), by: 'Jayaraj', event: 'Hash generated at intake' },
        { at: a.time.replace(' IST', ''), by: 'System (demo)', event: 'Write-once store confirmed' },
      ],
    }
    setItems((prev) => [record, ...prev])
    setJustAdded(id)
    setModal(false)
    setSource('')
    setTimeout(() => setJustAdded(''), 3000)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="label mb-2">Custody · Write-once store</div>
          <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold tracking-tight uppercase text-ink">
            Evidence Vault
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] text-muted">
            Preserved communications with content hashes and an unbroken chain of custody. Records are append-only —
            nothing already stored can be edited.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Btn variant="primary" size="md" onClick={() => setModal(true)}>
            <Plus className="h-4 w-4" /> Preserve Evidence
          </Btn>
          <SyntheticBadge />
        </div>
      </div>

      {justAdded && (
        <div className="anim-fade mt-5 flex items-center gap-3 border border-ok/50 bg-ok/10 px-4 py-3">
          <CheckCircle2 className="h-4 w-4 text-ok" strokeWidth={1.75} />
          <span className="text-[13px] text-ok">
            Evidence <span className="font-mono">{justAdded}</span> written to the store and hashed.
          </span>
        </div>
      )}

      {/* filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
              filter === f ? 'border-crimson bg-crimson/10 text-accent' : 'border-line text-muted hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] text-dim">
          {visible.length} / {items.length} records
        </span>
      </div>

      {/* grid */}
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item, i) => {
          const Icon = TYPE_ICON[item.type]
          const fresh = justAdded === item.id
          return (
            <div
              key={item.id}
              className={`anim-rise group flex flex-col border bg-card transition-colors duration-200 ${
                fresh ? 'border-ok/60' : 'border-line hover:border-line2'
              }`}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line bg-bg2">
                    <Icon className="h-4 w-4 text-crimson" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-[13.5px] leading-snug font-medium text-ink">{item.label}</div>
                    <div className="mt-1 font-mono text-[10px] text-dim">
                      {item.id} · {item.type} · {item.size}
                    </div>
                  </div>
                </div>
                <Lock className="h-3.5 w-3.5 shrink-0 text-line2 transition-colors group-hover:text-crimson" strokeWidth={1.75} />
              </div>

              <div className="flex-1 px-4 py-3.5">
                <div className="label mb-1.5">SHA-256</div>
                <div className="flex items-start gap-2">
                  <code className="line-clamp-2 flex-1 font-mono text-[11px] leading-relaxed break-all text-muted">
                    {item.hash}
                  </code>
                  <button
                    onClick={() => copy(item.hash)}
                    aria-label="Copy hash"
                    className="flex h-6 w-6 shrink-0 items-center justify-center border border-line text-dim transition-colors hover:border-line2 hover:text-ink"
                  >
                    {copied === item.hash ? (
                      <CheckCircle2 className="h-3 w-3 text-ok" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px border-t border-line bg-line">
                <div className="bg-card px-4 py-2.5">
                  <div className="label">Preserved</div>
                  <div className="mt-1 font-mono text-[11px] text-ink">{item.preserved}</div>
                </div>
                <div className="bg-card px-4 py-2.5">
                  <div className="label">Custody events</div>
                  <div className="mt-1 font-mono text-[11px] text-ink">{item.custody.length}</div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line px-4 py-3">
                <Link
                  to={`/analysis/${item.case}`}
                  className="font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-accent"
                >
                  {item.case}
                </Link>
                <button
                  onClick={() => setOpen(item)}
                  className="border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:border-crimson hover:text-accent"
                >
                  Chain of Custody →
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {visible.length === 0 && (
        <Panel className="mt-6 py-16 text-center">
          <FolderLock className="mx-auto h-7 w-7 text-line2" strokeWidth={1.5} />
          <p className="mt-4 text-[14px] text-muted">No records of this type in the vault.</p>
        </Panel>
      )}

      {/* ---------------- drawer ---------------- */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/70" onClick={() => setOpen(null)} />
          <aside className="anim-fade fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-line bg-bg2">
            <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <div className="label mb-1.5">Chain of Custody</div>
                <h2 className="text-base leading-snug font-semibold text-ink">{open.label}</h2>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close panel"
                className="flex h-8 w-8 shrink-0 items-center justify-center border border-line text-muted hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="border border-line bg-card px-4 py-3">
                <div className="label mb-1.5">SHA-256</div>
                <code className="font-mono text-[11px] leading-relaxed break-all text-muted">{open.hash}</code>
                <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
                  <ShieldCheck className="h-3.5 w-3.5 text-ok" strokeWidth={1.75} />
                  <span className="font-mono text-[10px] tracking-[0.1em] text-ok uppercase">
                    Hash verified · record immutable
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ['Evidence ID', open.id],
                  ['Linked case', open.case],
                  ['Media type', open.type],
                  ['Size', open.size],
                  ['Preserved', open.preserved],
                  ['Store', 'Write-once (demo)'],
                ].map(([k, v]) => (
                  <div key={k} className="border border-line px-3 py-2.5">
                    <div className="label">{k}</div>
                    <div className="mt-1 truncate font-mono text-[11px] text-ink">{v}</div>
                  </div>
                ))}
              </div>

              <div className="label mt-6 mb-3">Custody log</div>
              <ol className="relative border-l border-line pl-5">
                {open.custody.map((c, i) => (
                  <li key={i} className="relative pb-5 last:pb-0">
                    <span
                      className={`absolute top-1 -left-[25px] h-2 w-2 rounded-full ${
                        i === open.custody.length - 1 ? 'bg-accent' : 'bg-line2'
                      }`}
                    />
                    <div className="font-mono text-[11px] text-dim">
                      {c.at} · {c.by}
                    </div>
                    <div className="mt-1 text-[13px] text-ink">{c.event}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-line px-5 py-4">
              <Btn variant="ghost" className="w-full" onClick={() => setOpen(null)}>
                Close
              </Btn>
            </div>
          </aside>
        </>
      )}

      {/* ---------------- preserve modal ---------------- */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5">
          <div className="anim-rise w-full max-w-lg border border-line bg-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2.5">
                <FolderLock className="h-4 w-4 text-accent" strokeWidth={1.75} />
                <span className="label">Preserve Evidence</span>
              </div>
              <button
                onClick={() => setModal(false)}
                aria-label="Close dialog"
                className="flex h-7 w-7 items-center justify-center border border-line text-muted hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="px-5 py-5">
              <p className="text-[13px] leading-relaxed text-muted">
                Select a communication to hash and append to the vault. The record becomes write-once immediately.
              </p>

              <label className="label mt-5 mb-2 block">Source communication</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full border border-line bg-bg2 px-3 py-2.5 font-mono text-[12px] text-ink focus:border-crimson focus:outline-none"
              >
                <option value="">— Select an analysis —</option>
                {analyses.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id} · {a.title} ({a.type})
                  </option>
                ))}
              </select>

              <div className="mt-5 border border-warn/40 bg-warn/8 px-4 py-3">
                <span className="font-mono text-[10px] leading-relaxed tracking-[0.1em] text-warn uppercase">
                  Demonstration only — no file is uploaded or stored outside this browser session.
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-line px-5 py-4">
              <Btn variant="ghost" size="md" onClick={() => setModal(false)}>
                Cancel
              </Btn>
              <Btn variant="primary" size="md" disabled={!source} onClick={preserve}>
                <Lock className="h-4 w-4" /> Hash &amp; Preserve
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
