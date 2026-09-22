import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MeetNick from './pages/MeetNick'
import Privacy from './pages/Privacy'
import Daycare from './pages/Daycare'
import Boarding from './pages/Boarding'
import AtHomeVisits from './pages/AtHomeVisits'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meet-nick" element={<MeetNick />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/daycare" element={<Daycare />} />
        <Route path="/boarding" element={<Boarding />} />
        <Route path="/at-home-visits" element={<AtHomeVisits />} />
      </Routes>
    </BrowserRouter>
  )
}
