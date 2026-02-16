import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, Share2, Settings } from 'lucide-react'
import { useTravelStore } from '../stores/travelStore'
import { format, differenceInDays } from 'date-fns'
import ItineraryDay from '../components/ItineraryDay'
import PackingList from '../components/PackingList'
import Collaborators from '../components/Collaborators'
import AIRecommendation from '../components/AIRecommendation'
import WeatherWidget from '../components/WeatherWidget'
import SmartPackingList from '../components/SmartPackingList'

export default function TripDetail() {
  const { tripId } = useParams()
  const { trips } = useTravelStore()
  const trip = trips.find(t => t.id === tripId)

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold">旅行不存在</h2>
          <Link to="/" className="text-blue-500 mt-4 inline-block">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const days = differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="relative h-64">
        {trip.coverImage ? (
          <img
            src={trip.coverImage}
            alt={trip.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-8xl">🌍</span>
          </div>
        )}
        
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-4 left-4 bg-white/80 hover:bg-white rounded-full p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-white/80 hover:bg-white rounded-full p-2">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="bg-white/80 hover:bg-white rounded-full p-2">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 -mt-8 relative">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold">{trip.name}</h1>
          
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin className="w-5 h-5" />
            <span>{trip.destination}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <Calendar className="w-5 h-5" />
            <span>
              {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
              ({days}天)
            </span>
          </div>

          {/* Collaborators */}
          {trip.collaborators.length > 0 && (
            <Collaborators collaborators={trip.collaborators} />
          )}
        </div>
      </div>

      {/* Smart Features */}
      <div className="px-4 mt-4 space-y-4">
        {/* AI Recommendation */}
        <AIRecommendation 
          destination={trip.destination} 
          days={days} 
        />
        
        {/* Weather Widget */}
        <WeatherWidget 
          destination={trip.destination}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['行程', '清单', '预算', '照片'].map((tab, idx) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                idx === 0 ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="px-4 mt-4">
        <ItineraryDay trip={trip} />
      </div>

      {/* Packing List */}
      <div className="px-4 mt-6">
        <PackingList trip={trip} />
      </div>

      {/* Smart Packing */}
      <div className="px-4 mt-6">
        <SmartPackingList 
          tripId={trip.id}
          destination={trip.destination}
          days={days}
        />
      </div>
    </div>
  )
}
