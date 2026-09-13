import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MeetNick from './pages/MeetNick'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meet-nick" element={<MeetNick />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}