import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  CircleDashed,
  FileAudio,
  FileText,
  Film,
  ImageIcon,
  MessageSquare,
  Play,
  ShieldAlert,
  TriangleAlert,
  Upload,
  X,
} from 'lucide-react'
import { Btn, Panel, SectionHeader, SyntheticBadge } from '../components/ui'
import type { CommType } from '../data/synthetic'
import { simulateAnalysis } from '../lib/analysis'
import { useAnalyses } from '../store/analyses'

const TYPES: { name: CommType; icon: typeof Film; hint: string }[] = [
  { name: 'Video', icon: Film, hint: 'mp4 · mov · webm' },
  { name: 'Audio', icon: FileAudio, hint: 'mp3 · wav · m4a' },
  { name: 'Image', icon: ImageIcon, hint: 'jpg · png · webp' },
  { name: 'PDF', icon: FileText, hint: 'pdf · doc' },
  { name: 'Message', icon: MessageSquare, hint: 'pasted text' },
]

const STEPS = [
  'Extracting content',
  'Analyzing media',
  'Checking identity consistency',
  'Detecting social engineering',
  'Calculating financial risk',
  'Generating report',
]

const EXAMPLE =
  'Hi, this is your bank manager. Your account will be suspended unless you transfer ₹50,000 immediately.'

export default function Analyze() {
  const navigate = useNavigate()
  const { addAnalysis } = useAnalyses()

  const [type, setType] = useState<CommType>('Message')
  const [fileName, setFileName] = useState('')
  const [dragging, setDragging] = useState(false)
  const [text, setText] = useState('')
  const [running, setRunning] = useState(false)
  const [stepIdx, setStepIdx] = useState(-1)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptFile = (f: File | undefined) => {
    if (!f) return
    if (f.size > 100 * 1024 * 1024) {
      setError('File exceeds the 100 MB limit.')
      return
    }
    setError('')
    setFileName(f.name)
    const ext = f.name.split('.').pop()?.toLowerCase() ?? ''
    if (['mp4', 'mov', 'webm', 'mkv'].includes(ext)) setType('Video')
    else if (['mp3', 'wav', 'm4a', 'ogg'].includes(ext)) setType('Audio')
    else if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) setType('Image')
    else if (['pdf', 'doc', 'docx'].includes(ext)) setType('PDF')
  }

  const canRun = !running && (fileName.trim().length > 0 || text.trim().length > 0)

  const run = () => {
    if (!canRun) {
      setError('Add a file or paste a message before running the analysis.')
      return
    }
    setError('')
    setStepIdx(0)
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    const timers: number[] = []

    STEPS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStepIdx(i), i * 620 + 60))
    })

    timers.push(
      window.setTimeout(
        () => {
          const result = simulateAnalysis({
            text,
            fileName,
            type: fileName ? type : 'Message',
            title: fileName || undefined,
          })
          addAnalysis(result)
          setRunning(false)
          setStepIdx(-1)
          navigate(`/analysis/${result.id}`)
        },
        STEPS.length * 620 + 420,
      ),
    )

    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [running]) // eslint-disable-line react-hooks/exhaustive-deps

  const progress = running ? Math.round(((stepIdx + 1) / STEPS.length) * 100) : 0

  return (
    <div className="mx-auto max-w-[1140px] px-5 py-10 lg:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="label mb-2">Intake · Stage 01</div>
          <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold tracking-tight text-ink uppercase">
            Analyze Communication
          </h1>
          <p className="mt-3 max-w-xl text-[15px] text-muted">
            Upload a financial communication to evaluate authenticity and fraud risk.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <SyntheticBadge />
          <span className="border border-warn/50 bg-warn/10 px-2 py-[3px] font-mono text-[9px] tracking-[0.14em] text-warn uppercase">
            AI Detection Status: Simulation / Demo
          </span>
        </div>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---------------- upload column ---------------- */}
        <div>
          <div className="label mb-3">Supported Formats</div>
          <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {TYPES.map(({ name, icon: Icon, hint }) => {
              const active = type === name
              return (
                <button
                  key={name}
                  onClick={() => setType(name)}
                  className={`group flex flex-col items-center gap-1.5 border px-2 py-3 transition-all duration-150 ${
                    active
                      ? 'border-crimson bg-crimson/10 text-ink'
                      : 'border-line bg-card text-muted hover:border-line2 hover:text-ink'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${active ? 'text-accent' : 'text-crimson group-hover:text-accent'}`}
                    strokeWidth={1.5}
                  />
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase">{name}</span>
                  <span className="font-mono text-[9px] text-dim lowercase">{hint}</span>
                </button>
              )
            })}
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              acceptFile(e.dataTransfer.files?.[0])
            }}
            onClick={() => inputRef.current?.click()}
            className={`relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed px-6 py-10 text-center transition-all duration-200 ${
              dragging ? 'border-accent bg-crimson/8' : 'border-line2 bg-card hover:border-crimson/70 hover:bg-card2'
            }`}
          >
            <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-crimson/8 to-transparent" />

            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-line bg-bg2">
                <Upload className="h-5 w-5 text-crimson" strokeWidth={1.5} />
              </div>
              <p className="text-[15px] font-medium text-ink">Drop your file here</p>
              <p className="mt-1.5 text-[13px] text-muted">
                or{' '}
                <span className="border-b border-crimson text-accent">Browse files</span>
              </p>
              <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-dim uppercase">
                Maximum file size: 100 MB
              </p>
            </div>

            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="video/*,audio/*,image/*,.pdf,.doc,.docx"
              onChange={(e) => acceptFile(e.target.files?.[0])}
            />
          </div>

          {fileName && (
            <div className="anim-fade mt-3 flex items-center justify-between border border-line bg-card px-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-[13px] text-ink">{fileName}</div>
                <div className="label mt-1">Ready for intake · {type}</div>
              </div>
              <button
                onClick={() => setFileName('')}
                aria-label="Remove file"
                className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* ---------------- paste column ---------------- */}
        <Panel className="flex flex-col">
          <SectionHeader
            eyebrow="Alternative Intake"
            title="Paste Message"
            action={<span className="label">Text · SMS · E-mail</span>}
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            placeholder="Paste the text of the communication you want to verify…"
            className="mt-4 min-h-[190px] w-full resize-y border border-line bg-bg2 p-4 font-mono text-[13px] leading-relaxed text-ink placeholder:text-dim focus:border-crimson focus:outline-none"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setText(EXAMPLE)}
              className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent"
            >
              ▸ Load example message
            </button>
            <span className="font-mono text-[10px] text-dim">{text.length} chars</span>
          </div>

          <div className="mt-5 border-t border-line pt-5">
            <Btn onClick={run} disabled={!canRun} variant="primary" size="lg" className="w-full">
              <Play className="h-4 w-4" /> Run Security Analysis
            </Btn>

            {error && (
              <p className="mt-3 flex items-center gap-2 text-[12px] text-accent">
                <TriangleAlert className="h-3.5 w-3.5" /> {error}
              </p>
            )}

            <ul className="mt-5 space-y-2">
              {[
                'Files stay in this browser — nothing is uploaded.',
                'Content scanned against a fixed rule set in demo mode.',
                'Output is illustrative and must not be used for real decisions.',
              ].map((t) => (
                <li key={t} className="flex gap-2 text-[12px] leading-relaxed text-dim">
                  <ShieldAlert className="mt-0.5 h-3 w-3 shrink-0 text-crimson" strokeWidth={1.75} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      {/* ---------------- simulation overlay ---------------- */}
      {running && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-5">
          <div className="anim-rise w-full max-w-lg border border-line bg-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-accent anim-pulse" />
                <span className="label">Analysis in progress</span>
              </div>
              <span className="font-mono text-[11px] text-ink">{progress}%</span>
            </div>

            <div className="h-[3px] w-full bg-bg2">
              <div
                className="h-full bg-crimson transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="divide-y divide-line">
              {STEPS.map((label, i) => {
                const done = i < stepIdx
                const active = i === stepIdx
                return (
                  <div
                    key={label}
                    className={`flex items-center gap-3.5 px-5 py-3.5 transition-colors duration-200 ${
                      active ? 'bg-crimson/8' : ''
                    }`}
                  >
                    <span className="font-mono text-[11px] text-dim">STEP {String(i + 1).padStart(2, '0')}</span>
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 text-ok" strokeWidth={1.75} />
                    ) : active ? (
                      <CircleDashed className="h-4 w-4 text-accent anim-spin" strokeWidth={1.75} />
                    ) : (
                      <CircleDashed className="h-4 w-4 text-line2" strokeWidth={1.75} />
                    )}
                    <span
                      className={`text-[13px] ${
                        done ? 'text-muted' : active ? 'text-ink' : 'text-dim'
                      }`}
                    >
                      {label}
                    </span>
                    {active && <span className="anim-caret ml-auto font-mono text-accent">_</span>}
                    {done && <span className="ml-auto font-mono text-[10px] text-ok">OK</span>}
                  </div>
                )
              })}
            </div>

            <div className="border-t border-line px-5 py-4">
              <div className="flex items-center justify-between">
                <SyntheticBadge />
                <span className="font-mono text-[10px] tracking-[0.12em] text-dim uppercase">
                  Simulation · no model in use
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
