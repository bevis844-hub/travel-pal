import { useState } from 'react'
import { Plane, Search, Clock, AlertCircle, CheckCircle, MapPin } from 'lucide-react'

interface Flight {
  id: string
  flightNumber: string
  airline: string
  departure: {
    airport: string
    city: string
    time: string
    date: string
  }
  arrival: {
    airport: string
    city: string
    time: string
    date: string
  }
  status: 'scheduled' | 'delayed' | 'boarding' | 'departed' | 'arrived' | 'cancelled'
  terminal?: string
  gate?: string
}

interface Props {
  flights?: Flight[]
  onAddFlight?: (flight: Flight) => void
}

export default function FlightTracker({ flights: initialFlights, onAddFlight }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(false)

  // 模拟航班数据
  const mockFlights: Flight[] = [
    {
      id: '1',
      flightNumber: 'CA123',
      airline: '中国航空',
      departure: {
        airport: 'PEK',
        city: '北京',
        time: '08:30',
        date: '2026-03-15'
      },
      arrival: {
        airport: 'NRT',
        city: '东京',
        time: '12:45',
        date: '2026-03-15'
      },
      status: 'scheduled',
      terminal: 'T3',
      gate: 'A12'
    },
    {
      id: '2',
      flightNumber: 'JL456',
      airline: '日本航空',
      departure: {
        airport: 'NRT',
        city: '东京',
        time: '14:00',
        date: '2026-03-20'
      },
      arrival: {
        airport: 'TSA',
        city: '台北',
        time: '17:30',
        date: '2026-03-20'
      },
      status: 'boarding',
      terminal: 'T2',
      gate: 'C25'
    }
  ]

  const displayFlights = initialFlights || mockFlights

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    // 模拟搜索
    setTimeout(() => {
      const result: Flight = {
        id: 'search',
        flightNumber: searchQuery.toUpperCase(),
        airline: '模拟航空公司',
        departure: {
          airport: 'PEK',
          city: '北京',
          time: '10:00',
          date: '2026-03-15'
        },
        arrival: {
          airport: 'PVG',
          city: '上海',
          time: '12:30',
          date: '2026-03-15'
        },
        status: 'scheduled'
      }
      setSearchResult(result)
      setLoading(false)
    }, 1500)
  }

  const getStatusConfig = (status: Flight['status']) => {
    const configs = {
      scheduled: { color: 'bg-blue-100 text-blue-700', icon: Clock, text: '已排期' },
      delayed: { color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle, text: '延误' },
      boarding: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: '登机中' },
      departed: { color: 'bg-purple-100 text-purple-700', icon: Plane, text: '已起飞' },
      arrived: { color: 'bg-gray-100 text-gray-700', icon: CheckCircle, text: '已到达' },
      cancelled: { color: 'bg-red-100 text-red-700', icon: AlertCircle, text: '已取消' }
    }
    return configs[status]
  }

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        <Plane className="w-5 h-5 text-blue-500" />
        <h3 className="font-bold">✈️ 航班追踪</h3>
      </div>

      {/* Search */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="输入航班号 (如 CA123)"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            查询
          </button>
        </div>
      </div>

      {/* Flight List */}
      <div className="divide-y">
        {displayFlights.map((flight) => {
          const statusConfig = getStatusConfig(flight.status)
          const StatusIcon = statusConfig.icon

          return (
            <div key={flight.id} className="p-4 hover:bg-gray-50 transition-colors">
              {/* Airline & Flight Number */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{flight.flightNumber}</span>
                  <span className="text-sm text-gray-500">{flight.airline}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.text}
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center gap-4">
                {/* Departure */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-lg">{flight.departure.time}</span>
                    <span className="text-sm text-gray-500">{flight.departure.airport}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {flight.departure.city} • {flight.departure.date}
                  </p>
                  {flight.terminal && (
                    <p className="text-xs text-gray-400 mt-1">
                      航站楼: {flight.terminal} / 登机口: {flight.gate}
                    </p>
                  )}
                </div>

                {/* Flight Path */}
                <div className="flex flex-col items-center px-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Plane className="w-4 h-4 text-blue-500 transform rotate-90" />
                  </div>
                  <div className="w-0.5 h-8 bg-gray-200 my-1" />
                  <div className="text-xs text-gray-400">直飞</div>
                </div>

                {/* Arrival */}
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="font-bold text-lg">{flight.arrival.time}</span>
                    <MapPin className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-sm text-gray-600">
                    {flight.arrival.city} • {flight.arrival.date}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              {flight.status === 'boarding' && (
                <div className="mt-3 p-2 bg-green-50 rounded-lg text-sm text-green-700">
                  🎉 正在登机！请前往登机口 {flight.gate}
                </div>
              )}
              
              {flight.status === 'delayed' && (
                <div className="mt-3 p-2 bg-yellow-50 rounded-lg text-sm text-yellow-700">
                  ⚠️ 航班延误，请关注机场信息
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="p-4 border-t bg-blue-50">
          <h4 className="font-medium text-blue-800 mb-2">搜索结果</h4>
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="font-bold">{searchResult.flightNumber}</span>
              <span className="text-sm text-gray-500">{searchResult.airline}</span>
            </div>
            <p className="text-sm mt-1">
              {searchResult.departure.city} → {searchResult.arrival.city}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {searchResult.departure.time} - {searchResult.arrival.time}
            </p>
          </div>
        </div>
      )}

      {/* Add Flight Button */}
      {onAddFlight && (
        <div className="p-4 border-t">
          <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
            <Plane className="w-4 h-4" />
            添加航班
          </button>
        </div>
      )}
    </div>
  )
}
