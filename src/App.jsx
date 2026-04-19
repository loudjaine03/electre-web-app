import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import InputPage from './pages/InputPage'
import ResultsPage from './pages/ResultsPage'
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/results" element={<ResultsPage />} />
        {/* Redirige toute URL inconnue vers l'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default App