import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, MapPin, Calendar, Users, Search, Filter } from 'lucide-react'
import { useTravelStore } from '../stores/travelStore'
import TripCard from '../components/TripCard'
import CreateTripModal from '../components/CreateTripModal'

export default function Home() {
  const { trips } = useTravelStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'planning' | 'upcoming' | 'completed'>('all')

  // 过滤旅行
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || trip.status === filter
    return matchesSearch && matchesFilter
  })

  // 分类显示
  const planningTrips = filteredTrips.filter(t => t.status === 'planning')
  const upcomingTrips = filteredTrips.filter(t => t.status === 'upcoming')
  const completedTrips = filteredTrips.filter(t => t.status === 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌍 TravelPal
          </h1>
          <p className="text-xl opacity-90 mb-8">
            有灵魂的旅行规划，记住你的每一次冒险
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto flex gap-2">
            <div className="flex-1 flex items-center bg-white/20 rounded-full px-4 py-3">
              <Search className="w-5 h-5 opacity-70" />
              <input
                type="text"
                placeholder="搜索旅行..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none ml-2 text-white placeholder-white/70 w-full"
              />
            </div>
            <button className="bg-white/20 hover:bg-white/30 rounded-full p-3">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto -mt-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{trips.length}</div>
            <div className="text-gray-500">总旅行</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {trips.filter(t => t.status === 'upcoming').length}
            </div>
            <div className="text-gray-500">即将出发</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {trips.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-gray-500">已完成</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-4 px-6 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-6 h-6" />
          <span className="text-lg font-semibold">创建新旅行</span>
        </button>
      </div>

      {/* Trips List */}
      <div className="max-w-4xl mx-auto mt-8 px-4 pb-16">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'planning', 'upcoming', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f === 'all' ? '全部' : f === 'planning' ? '规划中' : f === 'upcoming' ? '即将出发' : '已完成'}
            </button>
          ))}
        </div>

        {/* Planning */}
        {planningTrips.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 规划中</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {planningTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming */}
        {upcomingTrips.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">✈️ 即将出发</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        )}

        {/* Completed */}
        {completedTrips.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">✅ 已完成</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {completedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              还没有旅行计划
            </h3>
            <p className="text-gray-500 mb-6">
              创建你的第一个旅行，开始冒险吧！
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              创建旅行
            </button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateTripModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}
