import { useState } from 'react'
import { MapPin, Navigation, Calendar } from 'lucide-react'

interface Location {
  id: string
  name: string
  lat: number
  lng: number
  type: 'sightseeing' | 'food' | 'hotel' | 'activity' | 'transport'
  date?: string
  notes?: string
}

interface Props {
  destination: string
  locations: Location[]
  startDate?: string
  endDate?: string
}

export default function MapView({ destination, locations, startDate, endDate }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [viewMode, setViewMode] = useState<'map' | 'timeline'>('map')

  // 获取地点坐标（模拟，实际应该用真实API）
  const getLocationCoords = (name: string): { lat: number; lng: number } => {
    // 根据目的地返回大致坐标
    const coords: Record<string, { lat: number; lng: number }> = {
      '东京': { lat: 35.6762, lng: 139.6503 },
      '大阪': { lat: 34.6937, lng: 135.5023 },
      '京都': { lat: 35.0116, lng: 135.7681 },
      '首尔': { lat: 37.5665, lng: 126.9780 },
      '台北': { lat: 25.0330, lng: 121.5654 },
      '纽约': { lat: 40.7128, lng: -74.0060 },
      '洛杉矶': { lat: 34.0522, lng: -118.2437 },
      '伦敦': { lat: 51.5074, lng: -0.1278 },
      '巴黎': { lat: 48.8566, lng: 2.3522 },
      '新加坡': { lat: 1.3521, lng: 103.8198 },
      '曼谷': { lat: 13.7563, lng: 100.5018 },
      '香港': { lat: 22.3193, lng: 114.1694 },
    }
    return coords[name] || { lat: 35.6762, lng: 139.6503 } // 默认东京
  }

  const destinationCoords = getLocationCoords(destination)

  const locationIcons = {
    sightseeing: '🏛️',
    food: '🍜',
    hotel: '🏨',
    activity: '🎯',
    transport: '✈️'
  }

  const defaultLocations: Location[] = [
    { id: '1', name: `${destination}市中心`, lat: destinationCoords.lat + 0.01, lng: destinationCoords.lng + 0.01, type: 'sightseeing' },
    { id: '2', name: '当地美食街', lat: destinationCoords.lat - 0.02, lng: destinationCoords.lng + 0.02, type: 'food' },
    { id: '3', name: '推荐住宿区', lat: destinationCoords.lat + 0.02, lng: destinationCoords.lng - 0.02, type: 'hotel' },
  ]

  const displayLocations = locations.length > 0 ? locations : defaultLocations

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold">🗺️ {destination} 地图</h3>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
              viewMode === 'map' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <MapPin className="w-4 h-4" />
            地图
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
              viewMode === 'timeline' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Calendar className="w-4 h-4" />
            时间线
          </button>
        </div>
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="relative">
          {/* 模拟地图背景 */}
          <div 
            className="h-96 w-full bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            {/* 目的地标记 */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-full"
              style={{
                left: '50%',
                top: '50%'
              }}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500/20 rounded-full animate-ping" />
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md whitespace-nowrap text-sm font-medium">
                📍 {destination}
              </div>
            </div>

            {/* 地点标记 */}
            {displayLocations.map((location, idx) => {
              const offsetX = (idx % 3 - 1) * 80 + (Math.random() - 0.5) * 40
              const offsetY = (Math.floor(idx / 3) - 1) * 80 + (Math.random() - 0.5) * 40
              
              return (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `calc(50% + ${offsetX}px)`,
                    top: `calc(50% + ${offsetY}px)`
                  }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                    selectedLocation?.id === location.id ? 'bg-blue-500' : 'bg-white'
                  }`}>
                    <span className="text-lg">{locationIcons[location.type]}</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {location.name}
                  </div>
                </button>
              )
            })}
          </div>

          {/* 图例 */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-2 text-xs">
            <div className="flex gap-3">
              <span className="flex items-center gap-1">
                <span>🏛️</span> 景点
              </span>
              <span className="flex items-center gap-1">
                <span>🍜</span> 美食
              </span>
              <span className="flex items-center gap-1">
                <span>🏨</span> 住宿
              </span>
            </div>
          </div>

          {/* 导航按钮 */}
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="p-4 max-h-96 overflow-y-auto">
          {startDate && (
            <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              行程时间：{startDate} → {endDate || '待定'}
            </div>
          )}
          
          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            {/* 地点列表 */}
            <div className="space-y-4">
              {displayLocations.map((location, idx) => (
                <div 
                  key={location.id}
                  className={`relative pl-10 cursor-pointer transition-all ${
                    selectedLocation?.id === location.id ? 'bg-blue-50 rounded-lg p-2' : ''
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  {/* 时间线点 */}
                  <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 transform -translate-x-1/2 ${
                    idx === 0 ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
                  }`} />
                  
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{locationIcons[location.type]}</span>
                    <div>
                      <h4 className="font-medium text-gray-800">{location.name}</h4>
                      {location.date && (
                        <p className="text-sm text-gray-500">{location.date}</p>
                      )}
                      {location.notes && (
                        <p className="text-sm text-gray-600 mt-1">{location.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 添加地点按钮 */}
          <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            添加更多地点
          </button>
        </div>
      )}

      {/* 选中地点详情 */}
      {selectedLocation && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{locationIcons[selectedLocation.type]}</span>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{selectedLocation.name}</h4>
              <p className="text-sm text-gray-500">
                坐标: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </p>
              {selectedLocation.notes && (
                <p className="text-sm text-gray-600 mt-1">{selectedLocation.notes}</p>
              )}
            </div>
            <button 
              onClick={() => setSelectedLocation(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
