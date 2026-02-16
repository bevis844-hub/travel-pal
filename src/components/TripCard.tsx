import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { Trip } from '../stores/travelStore'

interface Props {
  trip: Trip
}

export default function TripCard({ trip }: Props) {
  const days = differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1
  
  const statusColors = {
    planning: 'bg-yellow-100 text-yellow-800',
    upcoming: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  }

  const statusText = {
    planning: '规划中',
    upcoming: '即将出发',
    ongoing: '进行中',
    completed: '已完成'
  }

  return (
    <Link to={`/trip/${trip.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
        {/* Cover Image */}
        {trip.coverImage ? (
          <img
            src={trip.coverImage}
            alt={trip.name}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-6xl">🌍</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Status */}
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[trip.status]}`}>
            {statusText[trip.status]}
          </span>

          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-800 mt-2 line-clamp-1">
            {trip.name}
          </h3>

          {/* Destination */}
          <div className="flex items-center gap-1 text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{trip.destination}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1 text-gray-500 mt-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <span className="text-sm text-gray-500">
              {days} {days === 1 ? '天' : '天'}
            </span>
            
            {trip.collaborators.length > 0 && (
              <div className="flex items-center gap-1 text-gray-500">
                <Users className="w-4 h-4" />
                <span className="text-sm">{trip.collaborators.length + 1}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
