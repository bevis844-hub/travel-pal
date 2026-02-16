import { Trip } from '../stores/travelStore'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { useState } from 'react'

interface Props {
  trip: Trip
}

export default function ItineraryDay({ trip }: Props) {
  const [expandedDays, setExpandedDays] = useState<number[]>([0])

  const toggleDay = (index: number) => {
    if (expandedDays.includes(index)) {
      setExpandedDays(expandedDays.filter(i => i !== index))
    } else {
      setExpandedDays([...expandedDays, index])
    }
  }

  const addActivity = (dayIndex: number) => {
    // TODO: 添加活动
    console.log('Add activity for day', dayIndex)
  }

  return (
    <div className="space-y-4">
      {trip.itinerary.map((day, index) => (
        <div key={day.date} className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Day Header */}
          <button
            onClick={() => toggleDay(index)}
            className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">Day {index + 1}</span>
              <span className="opacity-90">{format(new Date(day.date), 'MMM d, yyyy')}</span>
            </div>
            {expandedDays.includes(index) ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {/* Activities */}
          {expandedDays.includes(index) && (
            <div className="p-4">
              {day.activities.length > 0 ? (
                <div className="space-y-3">
                  {day.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="text-sm text-gray-500 whitespace-nowrap min-w-[60px]">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        {activity.location && (
                          <div className="text-sm text-gray-500">
                            📍 {activity.location}
                          </div>
                        )}
                      </div>
                      {activity.cost && (
                        <div className="text-green-600 font-medium">
                          ${activity.cost}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  还没有活动，添加一些吧！
                </div>
              )}

              {/* Add Activity */}
              <button
                onClick={() => addActivity(index)}
                className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                添加活动
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
