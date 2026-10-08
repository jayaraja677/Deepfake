import type { Analysis, CommType, Dimension, Finding, MediaIndicator, RiskLevel, Severity, StatusLabel } from '../data/synthetic'
import { DEFAULT_RUN, SYNTHETIC_BANNER } from '../data/synthetic'

/* ==========================================================================
   SIMULATED ANALYSIS ENGINE — DEMO ONLY
   --------------------------------------------------------------------------
   There is no model, no backend, and no network call behind this. It is a
   deterministic keyword heuristic so the prototype can demonstrate a full
   Analyze -> Result flow with plausible-looking output.
   AI Detection Status: Simulation / Demo
   ========================================================================== */

interface Rule {
  test: RegExp
  id: string
  severity: Severity
  title: string
  detail: string
  recommendation: string
}

const TEXT_RULES: Rule[] = [
  {
    test: /\b(manager|officer|representative|executive|director|cfo|ceo|team|desk|department)\b/i,
    id: 'S-01',
    severity: 'CRITICAL',
    title: 'Unverifiable authority claim',
    detail:
      'The sender asserts a role or institutional position with no branch code, employee reference, or registered contact detail to confirm it.',
    recommendation: 'Do not acknowledge the sender. Contact the institution on a number you already hold.',
  },
  {
    test: /\b(suspend|blocked|block|close[d]?|legal|arrest|penalty|freeze|terminate|disable)\b/i,
    id: 'S-02',
    severity: 'CRITICAL',
    title: 'Threat-based pressure',
    detail: 'Consequence is presented as immediate and conditional, designed to remove the evaluation window.',
    recommendation: 'Treat pressure to act instantly as a hostile signal.',
  },
  {
    test: /\b(urgent|immediately|immediate|now|today|before\s+\d|last date|asap|expires?|within \d+ (?:hour|minute))\b/i,
    id: 'S-03',
    severity: 'HIGH',
    title: 'Artificial urgency',
    detail: 'A compressed deadline is attached to a financial action, preventing independent verification.',
    recommendation: 'Insist on a documented deadline before taking any action.',
  },
  {
    test: /(₹|rs\.?|inr|\$|usd|eur)\s?[\d,]+|\b\d[\d,]*\s?(?:rupees|dollars)\b/i,
    id: 'S-04',
    severity: 'CRITICAL',
    title: 'Direct payment demand',
    detail: 'A specific monetary amount is requested with no invoice, dispute path, or reference attached.',
    recommendation: 'Do not transfer funds based on this communication alone.',
  },
  {
    test: /\b(transfer|pay\b|payment|upi|neft|rtgs|imps|remit|deposit|beneficiary|bank account|account number)\b/i,
    id: 'S-05',
    severity: 'HIGH',
    title: 'Irreversible payment instruction',
    detail: 'Communication directs funds movement over a rail that cannot be recalled by the sender.',
    recommendation: 'Require dual approval and out-of-band confirmation before releasing funds.',
  },
  {
    test: /\b(otp|one[- ]time|password|pin\b|cvv|credential|secret code|verification code|share the code)\b/i,
    id: 'S-06',
    severity: 'CRITICAL',
    title: 'Credential or one-time code solicitation',
    detail: 'Requests material that no legitimate institution asks for over an unverified channel.',
    recommendation: 'Never disclose one-time codes, PINs, or passwords. Report the request.',
  },
  {
    test: /\bguaranteed\b|\b\d{2,3}%\s*(?:returns?|profit|yield|gains?)|double your money|\b100%\s*return/i,
    id: 'S-07',
    severity: 'CRITICAL',
    title: 'Unrealistic return claim',
    detail: 'Promises a fixed, high return with no risk disclosure — structurally incompatible with regulated instruments.',
    recommendation: 'Treat as an unregistered solicitation and disengage.',
  },
  {
    test: /\b(verify|verification|kyc|update your|confirm your|validate|reactivate|unusual activity)\b/i,
    id: 'S-08',
    severity: 'MEDIUM',
    title: 'Pretext for data collection',
    detail: 'Verification framing is the most common opening for credential and identity harvesting.',
    recommendation: 'Initiate verification yourself through an official channel.',
  },
  {
    test: /\b(call back?|contact us|reach us|whatsapp|reply to this|click (?:here|the link)|bit\.ly|tinyurl)\b/i,
    id: 'S-09',
    severity: 'MEDIUM',
    title: 'Off-platform or reply-driven contact',
    detail: 'Recipient is steered away from official channels toward a channel the sender controls.',
    recommendation: 'Use only contact details you already hold independently.',
  },
  {
    test: /\b(do not|don't|without)\s+(?:tell|inform|mention|share|contact|reach|notify|tell anyone)\b/i,
    id: 'S-10',
    severity: 'HIGH',
    title: 'Isolation instruction',
    detail: 'Explicit direction to keep the interaction secret from colleagues or family.',
    recommendation: 'Break the isolation immediately and involve a second party.',
  },
]

const SEVERITY_WEIGHT: Record<Severity, number> = { CRITICAL: 16, HIGH: 8, MEDIUM: 4, INFO: 0 }

const LEGIT_MARKERS = [
  /ref(?:erence)?[:\s]+FS-DEMO-\d+/i,
  /DEMO-XXXX-\d+/,
  /printed on your card/i,
  /registered (?:channel|number|address)/i,
]

function detectType(explicit?: CommType, text = '', fileName = ''): CommType {
  if (explicit) return explicit
  const ext = fileName.split('.').pop()?.toLowerCase() ?? ''
  if (['mp4', 'mov', 'webm', 'mkv'].includes(ext)) return 'Video'
  if (['mp3', 'wav', 'm4a', 'ogg', 'flac'].includes(ext)) return 'Audio'
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic'].includes(ext)) return 'Image'
  if (['pdf', 'doc', 'docx'].includes(ext)) return 'PDF'
  if (text.trim().length > 0) return 'Message'
  return 'Message'
}

function buildMediaIndicators(type: CommType, risky: boolean): MediaIndicator[] | undefined {
  const bad = (n: number) => risky || n > 0
  switch (type) {
    case 'Video':
      return [
        { label: 'Lip-sync deviation', value: risky ? '41 ms' : '7 ms', flag: bad(1) && risky ? 'FLAG' : 'OK' },
        { label: 'Blink cadence anomaly', value: risky ? '0.13 Hz' : 'Nominal', flag: risky ? 'FLAG' : 'OK' },
        { label: 'Face-warp residual', value: risky ? '3.9 px' : '1.1 px', flag: risky ? 'FLAG' : 'OK' },
        { label: 'Spectral continuity', value: risky ? 'Break @ 00:07' : 'Continuous', flag: risky ? 'WATCH' : 'OK' },
        { label: 'Encoder fingerprint', value: risky ? 'Synthetic pipeline' : 'Hardware capture', flag: risky ? 'FLAG' : 'OK' },
        { label: 'Lighting consistency', value: 'Nominal', flag: 'OK' },
      ]
    case 'Audio':
      return [
        { label: 'Spectral continuity', value: risky ? 'Phase break' : 'Continuous', flag: risky ? 'WATCH' : 'OK' },
        { label: 'Speaker embedding match', value: 'Unenrolled', flag: 'WATCH' },
        { label: 'Room tone', value: 'Consistent', flag: 'OK' },
        { label: 'Compression artefacts', value: 'Nominal', flag: 'OK' },
      ]
    case 'Image':
      return [
        { label: 'Face-warp residual', value: risky ? '4.2 px' : '0.8 px', flag: risky ? 'FLAG' : 'OK' },
        { label: 'Shadow direction', value: risky ? 'Mismatch' : 'Consistent', flag: risky ? 'FLAG' : 'OK' },
        { label: 'EXIF provenance', value: 'Stripped', flag: 'WATCH' },
        { label: 'Noise pattern', value: 'Non-uniform', flag: risky ? 'WATCH' : 'OK' },
      ]
    case 'PDF':
      return [
        { label: 'Document metadata', value: risky ? 'Mismatch' : 'Consistent', flag: risky ? 'FLAG' : 'OK' },
        { label: 'Author field', value: risky ? 'Unknown editor' : 'Registered', flag: risky ? 'FLAG' : 'OK' },
        { label: 'Embedded link targets', value: risky ? 'Off-domain' : 'None', flag: risky ? 'WATCH' : 'OK' },
        { label: 'Font fingerprint', value: 'Consistent', flag: 'OK' },
      ]
    default:
      return undefined
  }
}

function scoreToRisk(score: number): { risk: RiskLevel; status: StatusLabel } {
  if (score < 40) return { risk: 'HIGH', status: 'High Risk' }
  if (score < 75) return { risk: 'REVIEW', status: 'Review Required' }
  return { risk: 'LOW', status: 'Verified' }
}

function makeDimensions(type: CommType, se: number, id: number, fin: number, send: number, media: number | null): Dimension[] {
  return [
    { label: 'Social Engineering', value: se, note: se > 60 ? 'Coercive structure detected' : 'No coercive structure' },
    { label: 'Identity Consistency', value: id, note: id > 60 ? 'Claim cannot be verified' : 'Consistent with record' },
    { label: 'Financial Risk', value: fin, note: fin > 60 ? 'Funds movement requested' : 'No funds movement requested' },
    {
      label: 'Media Authenticity',
      value: type === 'Message' || type === 'SMS' ? null : media,
      note: type === 'Message' || type === 'SMS' ? 'Text-only communication' : 'Forensic pass complete',
    },
    { label: 'Sender Reputation', value: send, note: send > 60 ? 'Unregistered sender' : 'Registered service sender' },
  ]
}

export interface AnalysisInput {
  text?: string
  fileName?: string
  type?: CommType
  title?: string
}

export function simulateAnalysis({ text = '', fileName = '', type, title }: AnalysisInput): Analysis {
  const haystack = `${text} ${fileName}`
  const detectedType = detectType(type, text, fileName)
  const matches = TEXT_RULES.filter((r) => r.test.test(haystack))

  // Filename-only runs get a default medium/high set so the demo never
  // produces an empty report when a file is dropped without pasted text.
  const findings: Finding[] =
    matches.length > 0
      ? matches.map((r) => ({
          id: r.id,
          severity: r.severity,
          title: r.title,
          detail: r.detail,
          recommendation: r.recommendation,
          quote: r.test.exec(text)?.[0],
        }))
      : [
          {
            id: 'S-00',
            severity: 'INFO',
            title: 'No coercive language pattern detected',
            detail: 'The scanned content contains no payment demand, credential request, or deadline pressure.',
            recommendation: 'Continue routine monitoring.',
          },
        ]

  const penalty = findings.reduce((sum, f) => sum + SEVERITY_WEIGHT[f.severity], 0)
  const hasLegitMarker = LEGIT_MARKERS.some((m) => m.test(text))
  const trustScore = Math.max(4, Math.min(97, 86 - penalty + (hasLegitMarker ? 9 : 0)))
  const { risk, status } = scoreToRisk(trustScore)

  const mediaScore = detectedType === 'Message' || detectedType === 'SMS' ? null : Math.min(96, penalty + 18)
  const dimensions = makeDimensions(
    detectedType,
    Math.min(97, penalty + 18),
    Math.min(94, penalty + 12),
    Math.min(95, penalty + 8),
    Math.min(90, penalty + 14),
    mediaScore,
  )

  const now = new Date(2026, 9, 8, 20, 15)
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} IST`
  const seq = 5000 + Math.floor(Math.random() * 900)
  const id = `FS-DEMO-00${seq}`

  const recommended =
    risk === 'HIGH'
      ? [
          'Do not act on this communication',
          'Open a case in the Action Center',
          'Preserve the communication to the Evidence Vault',
          'Report the sender to the grievance officer',
        ]
      : risk === 'REVIEW'
        ? ['Route to manual review — analyst decision required', 'Preserve the communication', 'Request out-of-band verification']
        : ['Mark communication as verified', 'No escalation required']

  return {
    id,
    title: title?.trim() || `${detectedType} Communication`,
    type: detectedType,
    risk,
    status,
    trustScore,
    date,
    time,
    channel: `${detectedType} · ${fileName || 'Pasted text'}`,
    actor: 'Unverified sender',
    org: 'Not established',
    demoNote: SYNTHETIC_BANNER,
    excerpt: (text.trim() || fileName).slice(0, 160),
    body: text.trim() || undefined,
    dimensions,
    findings,
    media: buildMediaIndicators(detectedType, risk !== 'LOW'),
    run: DEFAULT_RUN.map((s) => ({ ...s, state: risk === 'LOW' ? ('ok' as const) : s.state })),
    recommended,
    accountRef: 'DEMO-XXXX-001',
    txnRef: 'TXN-DEMO-2026-001',
  }
}
