import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import TripDetail from './pages/TripDetail'
import CreateTrip from './pages/CreateTrip'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// 隐藏的"真AI模式"入口
// 在URL后面加 ?olivia=1 来启用

export default function App() {
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

// 导出一个工具函数来判断是否开启"真AI模式"
export function isOliviaMode(): boolean {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).get('olivia') === '1'
  }
  return false
}
