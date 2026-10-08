import { ShieldAlert } from 'lucide-react'
import { Btn } from '../components/ui'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <ShieldAlert className="mx-auto h-9 w-9 text-crimson" strokeWidth={1.5} />
      <div className="label mt-6">Error 404</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Route not found</h1>
      <p className="mt-4 text-[14px] leading-relaxed text-muted">
        The requested path does not exist in this prototype. Return to the dashboard or start a new analysis.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Btn to="/dashboard" variant="primary">
          Back to dashboard
        </Btn>
        <Btn to="/analyze" variant="ghost">
          Analyze communication
        </Btn>
      </div>
    </div>
  )
}
