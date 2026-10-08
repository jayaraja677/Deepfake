/* ==========================================================================
   FIN-SHIELD — SYNTHETIC DEMO DATA
   --------------------------------------------------------------------------
   Every record below is fiction created for this hackathon prototype.
   No real customer, bank, or platform data is present or referenced.
   All people, organisations, phone numbers, e-mails, account numbers,
   transaction references and communication IDs are clearly fictional
   placeholders (DEMO-*, TXN-DEMO-*, FS-DEMO-*, *.test, +91 90000 00000).
   ========================================================================== */

export type RiskLevel = 'HIGH' | 'REVIEW' | 'LOW'
export type StatusLabel = 'High Risk' | 'Review Required' | 'Verified'
export type CommType = 'Video' | 'Audio' | 'Image' | 'PDF' | 'Message' | 'SMS' | 'Call'
export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO'

export interface Finding {
  id: string
  severity: Severity
  title: string
  detail: string
  recommendation: string
  /** Exact span highlighted inside the communication body, when applicable. */
  quote?: string
}

export interface Dimension {
  label: string
  /** null = not applicable for this communication type. */
  value: number | null
  note?: string
}

export interface MediaIndicator {
  label: string
  value: string
  flag: 'FLAG' | 'WATCH' | 'OK'
}

export interface RunStep {
  id: string
  label: string
  ms: number
  state: 'ok' | 'warn'
}

export interface Analysis {
  id: string
  title: string
  type: CommType
  risk: RiskLevel
  status: StatusLabel
  trustScore: number
  date: string
  time: string
  channel: string
  actor: string
  org: string
  excerpt: string
  body?: string
  scenario?: '01' | '02' | '03' | '04'
  demoNote?: string
  dimensions: Dimension[]
  findings: Finding[]
  media?: MediaIndicator[]
  run: RunStep[]
  recommended: string[]
  accountRef?: string
  txnRef?: string
}

export const SYNTHETIC_BANNER = 'SYNTHETIC DEMO DATA'
export const PERSON_BANNER = 'SYNTHETIC DEMO — NOT A REAL PERSON OR ORGANIZATION'
export const DEMO_USER = { name: 'Jayaraj', role: 'Fraud Review Analyst' }

/* --------------------------------------------------------------------------
   Fictional organisations used across the prototype
   -------------------------------------------------------------------------- */
export const ORGS = {
  novafin: 'NovaFin Technologies',
  securebank: 'SecureBank Demo',
  meridian: 'Meridian Clearing House (fictional)',
}

/* --------------------------------------------------------------------------
   Standard run log shown on every result (mock timings)
   -------------------------------------------------------------------------- */
export const DEFAULT_RUN: RunStep[] = [
  { id: '01', label: 'Extracting content', ms: 412, state: 'ok' },
  { id: '02', label: 'Analyzing media', ms: 738, state: 'ok' },
  { id: '03', label: 'Checking identity consistency', ms: 564, state: 'warn' },
  { id: '04', label: 'Detecting social engineering', ms: 691, state: 'warn' },
  { id: '05', label: 'Calculating financial risk', ms: 355, state: 'warn' },
  { id: '06', label: 'Generating report', ms: 248, state: 'ok' },
]

/* --------------------------------------------------------------------------
   SCENARIO 01 — Fake CFO video
   -------------------------------------------------------------------------- */
const scenario01: Analysis = {
  id: 'FS-DEMO-001928',
  title: 'CFO Transfer Request',
  type: 'Video',
  risk: 'HIGH',
  status: 'High Risk',
  trustScore: 23,
  date: '08 Oct 2026',
  time: '19:42 IST',
  channel: 'Recorded video message · Vendor payment',
  actor: 'Arjun Mehta',
  org: ORGS.novafin,
  scenario: '01',
  demoNote: PERSON_BANNER,
  accountRef: 'DEMO-XXXX-001',
  txnRef: 'TXN-DEMO-2026-001',
  excerpt: 'Please urgently transfer ₹5,00,000 to the new vendor account before 4 PM.',
  body: 'Please urgently transfer ₹5,00,000 to the new vendor account before 4 PM. I am on a call right now, so reply on this channel and do not reach the finance team directly.',
  dimensions: [
    { label: 'Social Engineering', value: 94, note: 'Urgency + authority + payment demand' },
    { label: 'Identity Consistency', value: 88, note: 'Facial geometry drift vs. enrolment sample' },
    { label: 'Financial Risk', value: 91, note: 'Irreversible rail, new payee, high value' },
    { label: 'Media Authenticity', value: 86, note: 'Synthesis artefacts detected' },
    { label: 'Sender Reputation', value: 72, note: 'Channel not previously used by this actor' },
  ],
  findings: [
    {
      id: 'S-11',
      severity: 'CRITICAL',
      title: 'Face-swap geometry drift at jawline and hairline',
      detail:
        'Landmark deviation of 4.7px sustained across frames 118–402, inconsistent with camera motion or compression.',
      recommendation: 'Treat the speaker identity in this clip as unverified.',
    },
    {
      id: 'S-12',
      severity: 'CRITICAL',
      title: 'Voice prosody cloned from a 9-second sample',
      detail:
        'Fundamental-frequency contour matches a known short-sample cloning pattern; phase continuity breaks at 00:11.',
      recommendation: 'Do not act on verbal approval delivered through this channel.',
    },
    {
      id: 'S-13',
      severity: 'HIGH',
      title: 'Payment pressure with a hard deadline',
      detail:
        'Text reads "before 4 PM" combined with an instruction to bypass the finance team — a classic callback-verification bypass.',
      recommendation: 'Verify through a known internal number, never through the channel that delivered the request.',
    },
    {
      id: 'S-14',
      severity: 'HIGH',
      title: 'New payee, high value, irreversible rail',
      detail:
        'Reference TXN-DEMO-2026-001 targets a first-time vendor account DEMO-XXXX-001 for ₹5,00,000.',
      recommendation: 'Hold disbursement pending dual approval.',
    },
  ],
  media: [
    { label: 'Lip-sync deviation', value: '38 ms', flag: 'FLAG' },
    { label: 'Blink cadence anomaly', value: '0.11 Hz', flag: 'FLAG' },
    { label: 'Face-warp residual', value: '4.7 px', flag: 'FLAG' },
    { label: 'Spectral continuity', value: 'Break @ 00:11', flag: 'WATCH' },
    { label: 'Encoder fingerprint', value: 'Synthetic pipeline', flag: 'FLAG' },
    { label: 'Lighting consistency', value: 'Nominal', flag: 'OK' },
  ],
  run: DEFAULT_RUN,
  recommended: [
    'Freeze transaction TXN-DEMO-2026-001 pending dual approval',
    'Escalate to fraud review queue with evidence attached',
    'Notify the account holder on a registered channel',
    'Preserve clip + report hash to the Evidence Vault',
  ],
}

/* --------------------------------------------------------------------------
   SCENARIO 02 — Fake bank communication
   -------------------------------------------------------------------------- */
const scenario02: Analysis = {
  id: 'FS-DEMO-002741',
  title: 'Bank KYC Message',
  type: 'SMS',
  risk: 'LOW',
  status: 'Verified',
  trustScore: 91,
  date: '07 Oct 2026',
  time: '11:05 IST',
  channel: 'SMS · Service notification',
  actor: 'SecureBank Demo',
  org: ORGS.securebank,
  scenario: '02',
  demoNote: SYNTHETIC_BANNER,
  accountRef: 'DEMO-XXXX-001',
  excerpt: 'Your account requires immediate verification. Please contact our security team.',
  body: 'SecureBank Demo: Your account requires immediate verification. Please contact our security team on the number printed on your card. Ref: FS-DEMO-002741.',
  dimensions: [
    { label: 'Social Engineering', value: 14, note: 'No payment or credential demand' },
    { label: 'Identity Consistency', value: 12, note: 'Sender domain resolves to test range' },
    { label: 'Financial Risk', value: 9, note: 'No transaction requested' },
    { label: 'Media Authenticity', value: null, note: 'Text-only communication' },
    { label: 'Sender Reputation', value: 18, note: 'Consistent with prior verified notices' },
  ],
  findings: [
    {
      id: 'S-21',
      severity: 'MEDIUM',
      title: 'Wording resembles a KYC pretext',
      detail:
        'Phrases such as "immediate verification" are common in pretexting, though this message never asks for credentials.',
      recommendation: 'Monitor — no containment required.',
    },
    {
      id: 'S-22',
      severity: 'INFO',
      title: 'Callback routed to a number the user already holds',
      detail: 'Instruction points to the number printed on the card rather than a number inside the message.',
      recommendation: 'No action. Pattern classified as benign.',
    },
    {
      id: 'S-23',
      severity: 'INFO',
      title: 'Reference identifier present',
      detail: 'Message carries reference FS-DEMO-002741, matching the expected format for service notices.',
      recommendation: 'None.',
    },
  ],
  run: DEFAULT_RUN.map((s) => ({ ...s, state: 'ok' as const })),
  recommended: ['Mark communication as verified', 'Release any hold on the related thread', 'No escalation required'],
}

/* --------------------------------------------------------------------------
   SCENARIO 03 — Fake investment call
   -------------------------------------------------------------------------- */
const scenario03: Analysis = {
  id: 'FS-DEMO-003105',
  title: 'Investment Call',
  type: 'Audio',
  risk: 'REVIEW',
  status: 'Review Required',
  trustScore: 58,
  date: '06 Oct 2026',
  time: '16:27 IST',
  channel: 'Recorded voice call · Unsolicited',
  actor: 'Unknown caller',
  org: 'Meridian Wealth Desk (fictional)',
  scenario: '03',
  demoNote: SYNTHETIC_BANNER,
  excerpt: 'Guaranteed 40% returns if you invest today.',
  body: 'Guaranteed 40% returns if you invest today. Just share the one-time code so we can open the position in your name — the offer closes at market end.',
  dimensions: [
    { label: 'Social Engineering', value: 76, note: 'Unrealistic return claim + OTP request' },
    { label: 'Identity Consistency', value: 44, note: 'Caller identity unverifiable' },
    { label: 'Financial Risk', value: 69, note: 'Credential handoff requested' },
    { label: 'Media Authenticity', value: 31, note: 'No synthesis artefacts found' },
    { label: 'Sender Reputation', value: 58, note: 'Unregistered number, first contact' },
  ],
  findings: [
    {
      id: 'S-31',
      severity: 'CRITICAL',
      title: 'Guaranteed return claim',
      detail: '"Guaranteed 40% returns" is structurally impossible for a regulated instrument.',
      recommendation: 'Do not engage; treat as an unregistered solicitation.',
    },
    {
      id: 'S-32',
      severity: 'CRITICAL',
      title: 'One-time code requested on a call',
      detail: 'No legitimate financial institution requests an OTP or PIN by voice.',
      recommendation: 'Never disclose one-time codes; report the number.',
    },
    {
      id: 'S-33',
      severity: 'HIGH',
      title: 'Artificial scarcity pressure',
      detail: '"Offer closes at market end" removes the evaluation window.',
      recommendation: 'Require cooling-off and independent verification.',
    },
    {
      id: 'S-34',
      severity: 'MEDIUM',
      title: 'Caller identity not verifiable',
      detail: 'Number +91 90000 00000 does not map to a registered entity in the demo registry.',
      recommendation: 'Route to manual review for identity confirmation.',
    },
  ],
  media: [
    { label: 'Spectral continuity', value: 'Nominal', flag: 'OK' },
    { label: 'Background room tone', value: 'Consistent', flag: 'OK' },
    { label: 'Speaker embedding match', value: 'Unenrolled', flag: 'WATCH' },
    { label: 'Compression artefacts', value: 'Nominal', flag: 'OK' },
  ],
  run: DEFAULT_RUN,
  recommended: [
    'Route to manual review — analyst decision required',
    'Flag the originating number in the block list',
    'Warn the account holder about one-time code sharing',
  ],
}

/* --------------------------------------------------------------------------
   Scenario 04 — Text phishing (the pasted message)
   -------------------------------------------------------------------------- */
const scenario04: Analysis = {
  id: 'FS-DEMO-004316',
  title: 'Account Suspension Threat',
  type: 'Message',
  risk: 'HIGH',
  status: 'High Risk',
  trustScore: 21,
  date: '08 Oct 2026',
  time: '20:15 IST',
  channel: 'Pasted message · Text only',
  actor: 'Unverified sender',
  org: 'Claimed: retail banking desk',
  scenario: '04',
  demoNote: SYNTHETIC_BANNER,
  accountRef: 'DEMO-XXXX-001',
  excerpt: 'Hi, this is your bank manager. Your account will be suspended unless you transfer ₹50,000 immediately.',
  body: 'Hi, this is your bank manager. Your account will be suspended unless you transfer ₹50,000 immediately.',
  dimensions: [
    { label: 'Social Engineering', value: 94, note: 'Threat + urgency + payment demand' },
    { label: 'Identity Consistency', value: 88, note: 'Authority claim cannot be verified' },
    { label: 'Financial Risk', value: 91, note: 'Direct instruction to move funds' },
    { label: 'Media Authenticity', value: null, note: 'Text-only communication' },
    { label: 'Sender Reputation', value: 76, note: 'No registered fingerprint for sender' },
  ],
  findings: [
    {
      id: 'S-01',
      severity: 'CRITICAL',
      title: 'Unverifiable authority claim',
      detail:
        'The sender asserts the role "your bank manager" with no branch, employee reference, or registered contact detail to confirm it.',
      recommendation: 'Do not acknowledge the sender. Contact the bank on a number you already hold.',
      quote: 'Hi, this is your bank manager.',
    },
    {
      id: 'S-02',
      severity: 'CRITICAL',
      title: 'Threat plus artificial urgency',
      detail:
        'Account suspension is presented as immediate and conditional — a coercive structure designed to remove the evaluation window.',
      recommendation: 'Treat pressure to act instantly as a hostile signal.',
      quote: 'Your account will be suspended unless',
    },
    {
      id: 'S-03',
      severity: 'CRITICAL',
      title: 'Direct irreversible payment demand',
      detail:
        'A specific amount (₹50,000) is demanded with no invoice, reference, or dispute path attached to it.',
      recommendation: 'Do not transfer. Initiate a report through the Action Center.',
      quote: 'you transfer ₹50,000 immediately',
    },
    {
      id: 'S-04',
      severity: 'HIGH',
      title: 'No legitimacy markers present',
      detail:
        'Legitimate notices carry a masked account number, branch code, or reference ID. This message carries none.',
      recommendation: 'Require reference identifiers before treating any notice as authentic.',
    },
    {
      id: 'S-05',
      severity: 'HIGH',
      title: 'No official verification channel offered',
      detail:
        'The message never directs the recipient to an official number, portal, or branch — only to compliance with its demand.',
      recommendation: 'Verify independently; never through the delivered channel.',
    },
    {
      id: 'S-06',
      severity: 'HIGH',
      title: 'Sender fingerprint unregistered',
      detail: 'No prior verified thread exists for this sender in the demo registry.',
      recommendation: 'Add the sender to the monitored list.',
    },
    {
      id: 'S-07',
      severity: 'MEDIUM',
      title: 'Generic greeting contradicts claimed relationship',
      detail:
        'A claimed personal banking relationship would normally include a masked account detail; this message uses a generic opener.',
      recommendation: 'Record as supporting evidence of impersonation.',
      quote: 'Hi, this is your bank manager.',
    },
  ],
  run: DEFAULT_RUN,
  recommended: [
    'Do not act on this communication',
    'Open a case in the Action Center',
    'Preserve the message to the Evidence Vault',
    'Report the sender to the grievance officer',
  ],
}

/* --------------------------------------------------------------------------
   Recent analyses (dashboard table) — extra fictional rows
   -------------------------------------------------------------------------- */
const extraAnalyses: Analysis[] = [
  {
    id: 'FS-DEMO-005004',
    title: 'Vendor Invoice PDF',
    type: 'PDF',
    risk: 'REVIEW',
    status: 'Review Required',
    trustScore: 62,
    date: '05 Oct 2026',
    time: '14:03 IST',
    channel: 'E-mail attachment · Accounts payable',
    actor: 'billing@meridian-demo.test',
    org: ORGS.meridian,
    demoNote: SYNTHETIC_BANNER,
    accountRef: 'DEMO-XXXX-001',
    txnRef: 'TXN-DEMO-2026-004',
    excerpt: 'Invoice totals ₹2,40,000 — bank details changed this week.',
    body: 'Invoice INV-DEMO-0007 for ₹2,40,000. Please note our banking details have changed effective this week; remit to the new account.',
    dimensions: [
      { label: 'Social Engineering', value: 58, note: 'Beneficiary detail change request' },
      { label: 'Identity Consistency', value: 41, note: 'Sender domain variant mismatch' },
      { label: 'Financial Risk', value: 74, note: 'Payment detail alteration' },
      { label: 'Media Authenticity', value: null, note: 'Document-only communication' },
      { label: 'Sender Reputation', value: 52, note: 'Near-miss domain lookalike' },
    ],
    findings: [
      {
        id: 'S-41',
        severity: 'HIGH',
        title: 'Beneficiary bank details changed',
        detail: 'Account field replaced with DEMO-XXXX-001 against a prior verified invoice for the same vendor.',
        recommendation: 'Confirm change out-of-band before remittance.',
      },
      {
        id: 'S-42',
        severity: 'HIGH',
        title: 'Lookalike sender domain',
        detail: 'meridian-demo.test differs from the verified vendor domain by one character.',
        recommendation: 'Quarantine the message pending domain confirmation.',
      },
      {
        id: 'S-43',
        severity: 'MEDIUM',
        title: 'Document metadata inconsistency',
        detail: 'Author field and creation tool do not match the vendor profile on record.',
        recommendation: 'Request a re-issued invoice through the vendor portal.',
      },
    ],
    run: DEFAULT_RUN,
    recommended: [
      'Hold remittance until beneficiary change is confirmed',
      'Route to accounts-payable review',
      'Preserve the document with its hash',
    ],
  },
  {
    id: 'FS-DEMO-005188',
    title: 'Card Block Alert',
    type: 'SMS',
    risk: 'LOW',
    status: 'Verified',
    trustScore: 94,
    date: '04 Oct 2026',
    time: '08:47 IST',
    channel: 'SMS · Transaction alert',
    actor: 'SecureBank Demo',
    org: ORGS.securebank,
    demoNote: SYNTHETIC_BANNER,
    accountRef: 'DEMO-XXXX-001',
    txnRef: 'TXN-DEMO-2026-006',
    excerpt: 'Card ending 001 blocked after 3 failed attempts.',
    body: 'SecureBank Demo: Card ending 001 blocked after 3 failed attempts. No action needed. Ref FS-DEMO-005188.',
    dimensions: [
      { label: 'Social Engineering', value: 6, note: 'No request made of the recipient' },
      { label: 'Identity Consistency', value: 8, note: 'Matches registered sender template' },
      { label: 'Financial Risk', value: 11, note: 'Informational only' },
      { label: 'Media Authenticity', value: null, note: 'Text-only communication' },
      { label: 'Sender Reputation', value: 9, note: 'Registered service sender' },
    ],
    findings: [
      {
        id: 'S-51',
        severity: 'INFO',
        title: 'Informational notice with no recipient action',
        detail: 'Message requests nothing and links to no destination.',
        recommendation: 'Classify as verified.',
      },
      {
        id: 'S-52',
        severity: 'INFO',
        title: 'Reference identifier present',
        detail: 'Carries FS-DEMO-005188 in the expected format.',
        recommendation: 'None.',
      },
    ],
    run: DEFAULT_RUN.map((s) => ({ ...s, state: 'ok' as const })),
    recommended: ['Mark as verified', 'No further action'],
  },
  {
    id: 'FS-DEMO-005240',
    title: 'Board Update Recording',
    type: 'Video',
    risk: 'LOW',
    status: 'Verified',
    trustScore: 88,
    date: '03 Oct 2026',
    time: '17:31 IST',
    channel: 'Internal recording · Governance',
    actor: 'Internal comms',
    org: ORGS.novafin,
    demoNote: SYNTHETIC_BANNER,
    excerpt: 'Quarterly governance summary with no payment instruction.',
    body: 'Quarterly governance summary. No payment instruction is contained in this recording.',
    dimensions: [
      { label: 'Social Engineering', value: 9, note: 'No request directed at the viewer' },
      { label: 'Identity Consistency', value: 12, note: 'Speaker matches enrolment sample' },
      { label: 'Financial Risk', value: 7, note: 'No funds movement requested' },
      { label: 'Media Authenticity', value: 15, note: 'No synthesis artefacts detected' },
      { label: 'Sender Reputation', value: 11, note: 'Known internal channel' },
    ],
    findings: [
      {
        id: 'S-61',
        severity: 'INFO',
        title: 'No synthesis artefacts detected',
        detail: 'Landmark stability and blink cadence fall within nominal ranges across the full clip.',
        recommendation: 'Classify as verified.',
      },
      {
        id: 'S-62',
        severity: 'INFO',
        title: 'No payment instruction present',
        detail: 'Content scan found no transfer request, credential request, or deadline pressure.',
        recommendation: 'None.',
      },
    ],
    media: [
      { label: 'Lip-sync deviation', value: '6 ms', flag: 'OK' },
      { label: 'Blink cadence anomaly', value: 'Nominal', flag: 'OK' },
      { label: 'Face-warp residual', value: '0.9 px', flag: 'OK' },
      { label: 'Spectral continuity', value: 'Continuous', flag: 'OK' },
      { label: 'Encoder fingerprint', value: 'Hardware capture', flag: 'OK' },
      { label: 'Lighting consistency', value: 'Nominal', flag: 'OK' },
    ],
    run: DEFAULT_RUN.map((s) => ({ ...s, state: 'ok' as const })),
    recommended: ['Classify as verified', 'No escalation required'],
  },
  {
    id: 'FS-DEMO-005311',
    title: 'Payroll Change Request',
    type: 'Message',
    risk: 'HIGH',
    status: 'High Risk',
    trustScore: 19,
    date: '02 Oct 2026',
    time: '09:12 IST',
    channel: 'Chat message · HR impersonation',
    actor: 'Unverified sender',
    org: 'Claimed: payroll desk',
    demoNote: SYNTHETIC_BANNER,
    accountRef: 'DEMO-XXXX-001',
    excerpt: 'Update your salary account today or payroll will be paused.',
    body: 'Update your salary account today or payroll will be paused. Reply with the one-time code sent to your phone to confirm.',
    dimensions: [
      { label: 'Social Engineering', value: 97, note: 'Threat + credential request' },
      { label: 'Identity Consistency', value: 91, note: 'Role impersonation' },
      { label: 'Financial Risk', value: 84, note: 'Payee redirection' },
      { label: 'Media Authenticity', value: null, note: 'Text-only communication' },
      { label: 'Sender Reputation', value: 82, note: 'Unregistered sender' },
    ],
    findings: [
      {
        id: 'S-71',
        severity: 'CRITICAL',
        title: 'One-time code requested over chat',
        detail: 'Requests the OTP forwarded to the recipient’s phone in order to redirect the payee account.',
        recommendation: 'Never share one-time codes. Report immediately.',
      },
      {
        id: 'S-72',
        severity: 'CRITICAL',
        title: 'Payroll interruption threat',
        detail: 'Uses withheld salary as leverage to force an immediate action.',
        recommendation: 'Route to payroll-security review.',
      },
      {
        id: 'S-73',
        severity: 'HIGH',
        title: 'No HR reference or ticket number',
        detail: 'Legitimate payroll changes carry a ticket reference and a dual-confirmation step.',
        recommendation: 'Require ticket reference before any change.',
      },
    ],
    run: DEFAULT_RUN,
    recommended: ['Open a case in the Action Center', 'Notify the payroll desk', 'Preserve message evidence'],
  },
]

export const ALL_ANALYSES: Analysis[] = [scenario01, scenario04, scenario02, scenario03, ...extraAnalyses]

export const SCENARIOS: Analysis[] = [scenario01, scenario02, scenario03, scenario04]

export function getAnalysis(id: string): Analysis | undefined {
  return ALL_ANALYSES.find((a) => a.id === id)
}

export const DASHBOARD_STATS = [
  { label: 'Communications Analyzed', value: 24, tone: 'neutral' as const, hint: 'Last 30 days' },
  { label: 'High Risk', value: 5, tone: 'high' as const, hint: 'Containment recommended' },
  { label: 'Review Required', value: 3, tone: 'review' as const, hint: 'Analyst decision pending' },
  { label: 'Verified', value: 16, tone: 'low' as const, hint: 'No action required' },
]
