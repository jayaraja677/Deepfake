import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import ActionCenter from './pages/ActionCenter'
import Analyze from './pages/Analyze'
import Dashboard from './pages/Dashboard'
import Disclosure from './pages/Disclosure'
import Evidence from './pages/Evidence'
import Incidents from './pages/Incidents'
import Institution from './pages/Institution'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import Result from './pages/Result'
import Review from './pages/Review'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analyze" element={<Analyze />} />
        <Route path="analysis/:id" element={<Result />} />
        <Route path="action-center" element={<ActionCenter />} />
        <Route path="evidence" element={<Evidence />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="institution" element={<Institution />} />
        <Route path="review" element={<Review />} />
        <Route path="about" element={<About />} />
        <Route path="about/disclosure" element={<Disclosure />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
