import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import TripDetail from './pages/TripDetail'
import CreateTrip from './pages/CreateTrip'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="trip/:tripId" element={<TripDetail />} />
        <Route path="create" element={<CreateTrip />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
