import { Trip } from '../stores/travelStore'
import { CheckCircle, Circle, Plus } from 'lucide-react'
import { useTravelStore } from '../stores/travelStore'

interface Props {
  trip: Trip
}

export default function PackingList({ trip }: Props) {
  const { togglePacked } = useTravelStore()

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">📦 行李清单</h2>
        <button className="flex items-center gap-1 text-blue-500">
          <Plus className="w-4 h-4" />
          <span className="text-sm">添加</span>
        </button>
      </div>

      {/* Progress */}
      {trip.packingList.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
            <span>已打包</span>
            <span>
              {trip.packingList.filter(i => i.packed).length} / {trip.packingList.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{
                width: `${(trip.packingList.filter(i => i.packed).length / trip.packingList.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Items List */}
      {trip.packingList.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">📦</div>
          <p>还没有清单物品</p>
          <p className="text-sm">基于你的旅行类型自动生成</p>
        </div>
      ) : (
        <div className="space-y-2">
          {trip.packingList.map((item) => (
            <button
              key={item.id}
              onClick={() => togglePacked(trip.id, item.id)}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              {item.packed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300" />
              )}
              <span className={item.packed ? 'line-through text-gray-400' : 'text-gray-700'}>
                {item.name}
              </span>
              <span className="text-gray-400 text-sm ml-auto">x{item.quantity}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
