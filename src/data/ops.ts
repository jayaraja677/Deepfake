/* ==========================================================================
   FIN-SHIELD — SYNTHETIC DEMO DATA (operational records)
   --------------------------------------------------------------------------
   Fictional cases, evidence, incidents and queue items created for this
   hackathon prototype. No real customers, accounts, or institutions exist.
   ========================================================================== */

export type ActionStatus = 'Open' | 'In Progress' | 'Escalated' | 'Closed'
export type ActionKind = 'Contain' | 'Verify' | 'Notify' | 'Report'

export interface ActionItem {
  id: string
  title: string
  detail: string
  kind: ActionKind
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM'
  owner: string
  sla: string
  source: string
  status: ActionStatus
}

export const ACTION_ITEMS: ActionItem[] = [
  {
    id: 'ACT-DEMO-0101',
    title: 'Freeze transaction TXN-DEMO-2026-001',
    detail:
      'Hold the ₹5,00,000 outbound transfer to new payee DEMO-XXXX-001 until dual approval is recorded.',
    kind: 'Contain',
    severity: 'CRITICAL',
    owner: 'Jayaraj',
    sla: '2h 14m remaining',
    source: 'FS-DEMO-001928',
    status: 'Open',
  },
  {
    id: 'ACT-DEMO-0102',
    title: 'Confirm beneficiary change on INV-DEMO-0007',
    detail:
      'Vendor bank details were altered in the latest invoice. Confirm out-of-band with the registered vendor contact before remittance.',
    kind: 'Verify',
    severity: 'HIGH',
    owner: 'Jayaraj',
    sla: '6h 40m remaining',
    source: 'FS-DEMO-005004',
    status: 'In Progress',
  },
  {
    id: 'ACT-DEMO-0103',
    title: 'Notify account holder DEMO-XXXX-001',
    detail:
      'Contact the account holder through a registered channel and advise against acting on the suspension demand.',
    kind: 'Notify',
    severity: 'CRITICAL',
    owner: 'Unassigned',
    sla: '48m remaining',
    source: 'FS-DEMO-004316',
    status: 'Open',
  },
  {
    id: 'ACT-DEMO-0104',
    title: 'Report originating number +91 90000 00000',
    detail: 'File the unsolicited investment solicitation with the grievance desk for block-list entry.',
    kind: 'Report',
    severity: 'HIGH',
    owner: 'Priya N. (demo)',
    sla: '1d 3h remaining',
    source: 'FS-DEMO-003105',
    status: 'Escalated',
  },
  {
    id: 'ACT-DEMO-0105',
    title: 'Block lookalike sender domain',
    detail: 'meridian-demo.test differs from the verified vendor domain by a single character.',
    kind: 'Contain',
    severity: 'HIGH',
    owner: 'Jayaraj',
    sla: '4h 05m remaining',
    source: 'FS-DEMO-005004',
    status: 'In Progress',
  },
  {
    id: 'ACT-DEMO-0106',
    title: 'Payroll desk advisory — one-time code request',
    detail: 'Warn the payroll desk of an impersonation attempt requesting OTPs over chat.',
    kind: 'Notify',
    severity: 'CRITICAL',
    owner: 'Unassigned',
    sla: '3h 22m remaining',
    source: 'FS-DEMO-005311',
    status: 'Open',
  },
  {
    id: 'ACT-DEMO-0107',
    title: 'File report FS-DEMO-001928 with incident response',
    detail: 'Attach the preserved clip, run log, and findings to the incident record.',
    kind: 'Report',
    severity: 'MEDIUM',
    owner: 'Priya N. (demo)',
    sla: '2d 6h remaining',
    source: 'FS-DEMO-001928',
    status: 'Closed',
  },
  {
    id: 'ACT-DEMO-0108',
    title: 'Clear verified service notices',
    detail: 'Mark SecureBank Demo service notifications as verified and release related holds.',
    kind: 'Verify',
    severity: 'MEDIUM',
    owner: 'Jayaraj',
    sla: 'Completed',
    source: 'FS-DEMO-005188',
    status: 'Closed',
  },
]

/* ------------------------------- Evidence ------------------------------- */

export type EvidenceType = 'Video' | 'Audio' | 'Image' | 'PDF' | 'Message' | 'SMS'

export interface EvidenceItem {
  id: string
  label: string
  type: EvidenceType
  size: string
  hash: string
  preserved: string
  case: string
  custody: { at: string; by: string; event: string }[]
}

export const EVIDENCE: EvidenceItem[] = [
  {
    id: 'EVD-DEMO-0001',
    label: 'CFO payment request clip',
    type: 'Video',
    size: '18.4 MB',
    hash: 'a3f1c9e7b2d04f58e6a1c7d9b0f3e2a5c8d4f7b1e9a0c3d6f2b5a8e1c4d7f0b9',
    preserved: '08 Oct 2026 · 19:51 IST',
    case: 'FS-DEMO-001928',
    custody: [
      { at: '19:51 IST', by: 'Jayaraj', event: 'Hash generated at intake' },
      { at: '19:53 IST', by: 'Jayaraj', event: 'Attached to case INC-DEMO-0042' },
      { at: '20:07 IST', by: 'System (demo)', event: 'Write-once store confirmed' },
    ],
  },
  {
    id: 'EVD-DEMO-0002',
    label: 'Account suspension message',
    type: 'Message',
    size: '3 KB',
    hash: '7d2b4f8a1c6e3d0b9f5a2e7c4d1b8f6a3e0c9d5b2f7a4e1c8d6b3f0a9e5c2d7b',
    preserved: '08 Oct 2026 · 20:19 IST',
    case: 'FS-DEMO-004316',
    custody: [
      { at: '20:19 IST', by: 'Jayaraj', event: 'Text captured from intake' },
      { at: '20:20 IST', by: 'Jayaraj', event: 'Findings snapshot stored' },
    ],
  },
  {
    id: 'EVD-DEMO-0003',
    label: 'Invoice with altered beneficiary — INV-DEMO-0007',
    type: 'PDF',
    size: '640 KB',
    hash: 'c5e8a1d4f7b0e3c6a9d2f5b8e1c4a7d0f3b6e9c2a5d8f1b4e7c0a3d6f9b2e5c8',
    preserved: '05 Oct 2026 · 14:09 IST',
    case: 'FS-DEMO-005004',
    custody: [
      { at: '14:09 IST', by: 'Jayaraj', event: 'Attachment extracted' },
      { at: '14:12 IST', by: 'Accounts Payable (demo)', event: 'Copy shared for verification' },
      { at: '15:02 IST', by: 'System (demo)', event: 'Write-once store confirmed' },
    ],
  },
  {
    id: 'EVD-DEMO-0004',
    label: 'Unsolicited investment call',
    type: 'Audio',
    size: '4.1 MB',
    hash: 'e9b3c6a0d5f2a8c1e4b7a0d3f6c9e2b5a8d1f4c7e0b3a6d9f2c5e8b1a4d7f0c3',
    preserved: '06 Oct 2026 · 16:33 IST',
    case: 'FS-DEMO-003105',
    custody: [
      { at: '16:33 IST', by: 'Priya N. (demo)', event: 'Recording imported' },
      { at: '16:35 IST', by: 'System (demo)', event: 'Write-once store confirmed' },
    ],
  },
  {
    id: 'EVD-DEMO-0005',
    label: 'Payroll change request chat',
    type: 'Message',
    size: '5 KB',
    hash: 'f0c7a4b1e8d5c2a9f6b3e0d7c4a1f8b5e2d9c6a3f0b7e4d1c8a5f2b9e6d3c0a7',
    preserved: '02 Oct 2026 · 09:18 IST',
    case: 'FS-DEMO-005311',
    custody: [
      { at: '09:18 IST', by: 'Jayaraj', event: 'Text captured from intake' },
      { at: '09:20 IST', by: 'Jayaraj', event: 'Escalated to payroll security' },
    ],
  },
  {
    id: 'EVD-DEMO-0006',
    label: 'Board update recording — cleared',
    type: 'Video',
    size: '22.7 MB',
    hash: 'b6d9e2c5a8f1b4d7c0e3a6f9b2d5c8e1a4f7b0d3c6e9a2f5b8d1c4e7a0f3b6d9',
    preserved: '03 Oct 2026 · 17:36 IST',
    case: 'FS-DEMO-005240',
    custody: [
      { at: '17:36 IST', by: 'System (demo)', event: 'Hash generated at intake' },
      { at: '17:36 IST', by: 'System (demo)', event: 'Marked verified — no further holds' },
    ],
  },
]

/* ------------------------------- Incidents ------------------------------ */

export interface IncidentStep {
  at: string
  title: string
  detail: string
  actor: string
  state: 'done' | 'active' | 'pending'
}

export interface Incident {
  id: string
  title: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM'
  status: 'Contained' | 'Under Review' | 'Filed'
  opened: string
  source: string
  owner: string
  summary: string
  steps: IncidentStep[]
}

export const INCIDENTS: Incident[] = [
  {
    id: 'INC-DEMO-0042',
    title: 'Synthetic CFO video requesting urgent vendor transfer',
    severity: 'CRITICAL',
    status: 'Contained',
    opened: '08 Oct 2026 · 19:47 IST',
    source: 'FS-DEMO-001928',
    owner: 'Jayaraj',
    summary:
      'A recorded video attributed to a fictional CFO requested a ₹5,00,000 transfer to a first-time vendor before 4 PM. Facial and vocal forensics both flagged synthesis.',
    steps: [
      { at: '19:42', title: 'Communication received', detail: 'Video forwarded by the payments desk for verification.', actor: 'Payments desk (demo)', state: 'done' },
      { at: '19:43', title: 'Analysis run', detail: 'Six-stage check completed with trust score 23/100.', actor: 'FIN-SHIELD (simulated)', state: 'done' },
      { at: '19:47', title: 'Incident opened', detail: 'Case INC-DEMO-0042 created and assigned to the fraud review analyst.', actor: 'Jayaraj', state: 'done' },
      { at: '19:51', title: 'Evidence preserved', detail: 'Clip hashed and written to the evidence store.', actor: 'Jayaraj', state: 'done' },
      { at: '19:55', title: 'Disbursement frozen', detail: 'TXN-DEMO-2026-001 placed on hold pending dual approval.', actor: 'Treasury (demo)', state: 'done' },
      { at: '20:10', title: 'Account holder notified', detail: 'Advisory sent through a registered channel.', actor: 'Notify desk (demo)', state: 'active' },
      { at: '—', title: 'Report filed', detail: 'Awaiting grievance officer acknowledgement.', actor: 'Pending', state: 'pending' },
    ],
  },
  {
    id: 'INC-DEMO-0041',
    title: 'Lookalike domain sending altered beneficiary invoices',
    severity: 'HIGH',
    status: 'Under Review',
    opened: '05 Oct 2026 · 14:12 IST',
    source: 'FS-DEMO-005004',
    owner: 'Priya N. (demo)',
    summary:
      'Invoices from meridian-demo.test request remittance to a changed account. The domain differs from the registered vendor by a single character.',
    steps: [
      { at: '14:03', title: 'Attachment received', detail: 'Invoice INV-DEMO-0007 arrives by e-mail.', actor: 'Accounts payable (demo)', state: 'done' },
      { at: '14:05', title: 'Analysis run', detail: 'Trust score 62/100 — beneficiary change flagged.', actor: 'FIN-SHIELD (simulated)', state: 'done' },
      { at: '14:09', title: 'Evidence preserved', detail: 'Document hashed and stored.', actor: 'Jayaraj', state: 'done' },
      { at: '14:12', title: 'Incident opened', detail: 'Remittance held pending out-of-band confirmation.', actor: 'Priya N. (demo)', state: 'done' },
      { at: '—', title: 'Vendor confirmation', detail: 'Awaiting response from the registered vendor contact.', actor: 'Pending', state: 'active' },
      { at: '—', title: 'Domain block', detail: 'Block-list entry not yet applied.', actor: 'Pending', state: 'pending' },
    ],
  },
  {
    id: 'INC-DEMO-0040',
    title: 'OTP harvesting attempt through payroll impersonation',
    severity: 'CRITICAL',
    status: 'Filed',
    opened: '02 Oct 2026 · 09:16 IST',
    source: 'FS-DEMO-005311',
    owner: 'Jayaraj',
    summary:
      'A chat message impersonating the payroll desk demanded a one-time code to redirect salary credits. Contained and reported within four hours.',
    steps: [
      { at: '09:12', title: 'Message received', detail: 'Employee forwards the chat to security.', actor: 'Employee (demo)', state: 'done' },
      { at: '09:14', title: 'Analysis run', detail: 'Trust score 19/100 — credential solicitation detected.', actor: 'FIN-SHIELD (simulated)', state: 'done' },
      { at: '09:16', title: 'Incident opened', detail: 'Case assigned and payroll desk alerted.', actor: 'Jayaraj', state: 'done' },
      { at: '09:18', title: 'Evidence preserved', detail: 'Chat transcript captured and hashed.', actor: 'Jayaraj', state: 'done' },
      { at: '11:40', title: 'Number block-listed', detail: 'Originating sender added to the block list.', actor: 'Jayaraj', state: 'done' },
      { at: '13:05', title: 'Report filed', detail: 'Filed with the grievance officer; acknowledgement recorded.', actor: 'Jayaraj', state: 'done' },
    ],
  },
]

/* ------------------------------ Review queue ---------------------------- */

export interface ReviewItem {
  id: string
  title: string
  type: EvidenceType
  risk: 'HIGH' | 'REVIEW' | 'LOW'
  score: number
  received: string
  sla: string
  confidence: number
  assignee: string
  reason: string
}

export const REVIEW_QUEUE: ReviewItem[] = [
  { id: 'FS-DEMO-005402', title: 'Sudden beneficiary update', type: 'PDF', risk: 'HIGH', score: 27, received: '08 Oct 2026 · 19:58', sla: '38m', confidence: 0.94, assignee: 'Unassigned', reason: 'Payment detail change on an active vendor.' },
  { id: 'FS-DEMO-005397', title: 'Voice note claiming loan closure', type: 'Audio', risk: 'HIGH', score: 33, received: '08 Oct 2026 · 19:31', sla: '1h 12m', confidence: 0.89, assignee: 'Jayaraj', reason: 'Deadline pressure and closure threat in a cloned voice sample.' },
  { id: 'FS-DEMO-005388', title: 'KYC re-verification e-mail', type: 'Message', risk: 'REVIEW', score: 54, received: '08 Oct 2026 · 18:44', sla: '2h 40m', confidence: 0.72, assignee: 'Unassigned', reason: 'Pretext language without a payment demand.' },
  { id: 'FS-DEMO-005371', title: 'Board deck with unknown author', type: 'PDF', risk: 'REVIEW', score: 61, received: '08 Oct 2026 · 17:20', sla: '4h 05m', confidence: 0.68, assignee: 'Priya N. (demo)', reason: 'Document metadata does not match the issuing template.' },
  { id: 'FS-DEMO-005360', title: 'Promo clip — returns claim', type: 'Video', risk: 'REVIEW', score: 66, received: '08 Oct 2026 · 16:02', sla: '5h 30m', confidence: 0.64, assignee: 'Unassigned', reason: 'Fixed-return wording detected; sender is a known partner.' },
  { id: 'FS-DEMO-005344', title: 'Branch service advisory', type: 'SMS', risk: 'LOW', score: 92, received: '08 Oct 2026 · 14:38', sla: 'Cleared', confidence: 0.97, assignee: 'Jayaraj', reason: 'Registered sender, reference identifier present, no action requested.' },
  { id: 'FS-DEMO-005331', title: 'Internal governance summary', type: 'Video', risk: 'LOW', score: 88, received: '08 Oct 2026 · 13:15', sla: 'Cleared', confidence: 0.93, assignee: 'Priya N. (demo)', reason: 'Speaker matches enrolment sample; no funds movement requested.' },
  { id: 'FS-DEMO-005318', title: 'Card block advisory', type: 'SMS', risk: 'LOW', score: 94, received: '08 Oct 2026 · 11:49', sla: 'Cleared', confidence: 0.98, assignee: 'Jayaraj', reason: 'Informational notice from a registered service sender.' },
]

/* --------------------------- Institution metrics ------------------------ */

export const INSTITUTION = {
  name: 'NovaFin Technologies (fictional)',
  window: 'Last 30 days',
  headline: [
    { label: 'Communications Screened', value: '12,480', delta: '+8.2%' },
    { label: 'Threats Blocked', value: '317', delta: '+21.4%' },
    { label: 'Average Trust Score', value: '76', delta: '-3.1%' },
    { label: 'Analyst Coverage', value: '94%', delta: '+2.0%' },
  ],
  trend: [64, 68, 61, 72, 70, 58, 66, 74, 69, 55, 62, 71, 77, 73, 60, 57, 65, 70, 78, 74, 66, 63, 72, 68, 61, 70, 75, 69, 76, 73],
  departments: [
    { name: 'Payments & Treasury', screened: 3420, risk: 8.4, score: 68 },
    { name: 'Accounts Payable', screened: 2110, risk: 6.1, score: 74 },
    { name: 'Retail Banking Desk', screened: 2870, risk: 4.7, score: 81 },
    { name: 'Payroll', screened: 1240, risk: 9.2, score: 63 },
    { name: 'Wealth Advisory', screened: 1650, risk: 5.3, score: 78 },
    { name: 'Corporate Communications', screened: 1190, risk: 3.1, score: 86 },
  ],
  analysts: [
    { name: 'Jayaraj', reviewed: 142, caught: 31, accuracy: '96%' },
    { name: 'Priya N. (demo)', reviewed: 118, caught: 24, accuracy: '94%' },
    { name: 'Rahul S. (demo)', reviewed: 96, caught: 17, accuracy: '91%' },
    { name: 'Meera K. (demo)', reviewed: 84, caught: 12, accuracy: '89%' },
  ],
  feed: [
    { at: '20:14', text: 'FS-DEMO-004316 flagged HIGH — account suspension threat', tone: 'danger' },
    { at: '19:58', text: 'FS-DEMO-005402 queued for analyst review', tone: 'warn' },
    { at: '19:55', text: 'TXN-DEMO-2026-001 placed on hold', tone: 'danger' },
    { at: '19:51', text: 'Evidence EVD-DEMO-0001 written to store', tone: 'ok' },
    { at: '19:47', text: 'Incident INC-DEMO-0042 opened', tone: 'warn' },
    { at: '19:43', text: 'FS-DEMO-001928 analysis completed — 23/100', tone: 'danger' },
    { at: '19:20', text: 'FS-DEMO-005318 cleared — registered sender', tone: 'ok' },
  ],
}
