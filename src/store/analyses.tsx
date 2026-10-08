import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Analysis } from '../data/synthetic'
import { ALL_ANALYSES } from '../data/synthetic'

/* ==========================================================================
   Local-only in-memory store. No persistence, no network, no backend.
   Seeded entirely with SYNTHETIC DEMO DATA from src/data/synthetic.ts
   ========================================================================== */

interface AnalysesCtx {
  analyses: Analysis[]
  addAnalysis: (a: Analysis) => void
  byId: (id: string) => Analysis | undefined
}

const Ctx = createContext<AnalysesCtx | null>(null)

export function AnalysesProvider({ children }: { children: ReactNode }) {
  const [added, setAdded] = useState<Analysis[]>([])

  const addAnalysis = useCallback((a: Analysis) => {
    setAdded((prev) => (prev.some((x) => x.id === a.id) ? prev : [a, ...prev]))
  }, [])

  const value = useMemo<AnalysesCtx>(() => {
    const analyses = [...added, ...ALL_ANALYSES]
    return {
      analyses,
      addAnalysis,
      byId: (id: string) => analyses.find((a) => a.id === id),
    }
  }, [added, addAnalysis])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAnalyses(): AnalysesCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAnalyses must be used inside AnalysesProvider')
  return ctx
}
