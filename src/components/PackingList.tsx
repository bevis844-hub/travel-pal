import { Trip } from '../stores/travelStore'
import { CheckCircle, Circle, Plus } from 'lucide-react'
import { useTravelStore } from '../stores/travelStore'

interface Props {
  trip: Trip
}

export default function PackingList({ trip }: Props) {
  const { togglePacked } = useTravelStore()

  // 基础清单
  const categories = [
    { name: '衣物', emoji: '👕', items: [
      { name: '内衣', category: 'clothing' },
      { name: '袜子', category: 'clothing' },
      { name: 'T恤', category: 'clothing' },
      { name: '长裤', category: 'clothing' },
      { name: '外套', category: 'clothing' },
    ]},
    { name: '电子设备', emoji: '📱', items: [
      { name: '手机', category: 'electronics' },
      { name: '充电器', category: 'electronics' },
      { name: '充电宝', category: 'electronics' },
      { name: '耳机', category: 'electronics' },
    ]},
    { name: '洗漱用品', emoji: '🪥', items: [
      { name: '牙刷', category: 'toiletries' },
      { name: '牙膏', category: 'toiletries' },
      { name: '洗发水', category: 'toiletries' },
    ]},
    { name: '证件', emoji: '🪪', items: [
      { name: '护照', category: 'documents' },
      { name: '驾照', category: 'documents' },
      { name: '信用卡', category: 'documents' },
    ]},
  ]

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

      {/* Categories */}
      {trip.packingList.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2">📦</div>
          <p>还没有清单物品</p>
          <p className="text-sm">基于你的旅行类型自动生成</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => {
            const catItems = trip.packingList.filter(i => i.category === cat.category)
            if (catItems.length === 0) return null
            
            const packedCount = catItems.filter(i => i.packed).length
            
            return (
              <div key={cat.name}>
                <h3 className="font-medium text-gray-700 mb-2">
                  {cat.emoji} {cat.name} ({packedCount}/{catItems.length})
                </h3>
                <div className="space-y-2 ml-4">
                  {catItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => togglePacked(trip.id, item.id)}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
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
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
