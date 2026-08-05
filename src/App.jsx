import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MeetNick from './pages/MeetNick'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meet-nick" element={<MeetNick />} />
      </Routes>
    </BrowserRouter>
  )
}