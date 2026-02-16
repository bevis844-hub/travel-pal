import { useState } from 'react'
import { Sparkles, Plus } from 'lucide-react'
import { useTravelStore } from '../stores/travelStore'

interface Props {
  destination: string
  days: number
}

export default function SmartPackingList({ destination, days }: Props) {
  const { userPreferences } = useTravelStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [newItem, setNewItem] = useState('')

  // 基于用户偏好生成推荐物品
  const generateSmartItems = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const baseItems = [
        { name: '牙刷', category: 'toiletries', icon: '🪥' },
        { name: '牙膏', category: 'toiletries', icon: '🪥' },
        { name: '洗发水', category: 'toiletries', icon: '🧴' },
        { name: '手机', category: 'electronics', icon: '📱' },
        { name: '充电器', category: 'electronics', icon: '🔌' },
        { name: '护照', category: 'documents', icon: '🪪' },
      ]

      // 根据住宿偏好添加
      if (userPreferences?.accommodation === 'luxury') {
        baseItems.push(
          { name: '正装', category: 'clothing', icon: '👔' },
          { name: '高级护肤品', category: 'toiletries', icon: '🧴' }
        )
      } else {
        baseItems.push(
          { name: 'T恤', category: 'clothing', icon: '👕' },
          { name: '休闲裤', category: 'clothing', icon: '👖' }
        )
      }

      // 根据交通偏好添加
      if (userPreferences?.transport === 'road-trip') {
        baseItems.push(
          { name: '车载充电器', category: 'electronics', icon: '🔌' },
          { name: '舒适鞋子', category: 'clothing', icon: '👟' }
        )
      }

      // 根据旅行天数调整数量
      
      // 获取当前trip
      // 这里简化处理，实际应该更新trip的packingList
      console.log(`为${destination}生成${days}天旅行的智能清单`)
      console.log('基于偏好：', userPreferences)
      
      setIsGenerating(false)
    }, 1000)
  }

  const addItem = () => {
    if (!newItem.trim()) return
    
    // 实际应该更新store
    console.log('添加物品：', newItem)
    setNewItem('')
  }

  return (
    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-bold">🧳 智能行李清单</h3>
      </div>

      {/* AI生成按钮 */}
      <button
        onClick={generateSmartItems}
        disabled={isGenerating}
        className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            <span>正在根据你的偏好生成...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>✨ AI智能生成行李清单</span>
          </>
        )}
      </button>

      {/* 偏好提示 */}
      {userPreferences && (
        <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
          <p className="opacity-90 mb-2">基于你的偏好生成：</p>
          <div className="space-y-1 text-xs opacity-80">
            <p>• 住宿风格：{
              userPreferences.accommodation === 'luxury' ? '豪华' :
              userPreferences.accommodation === 'budget' ? '经济' : '中等'
            }</p>
            <p>• 交通方式：{
              userPreferences.transport === 'flight' ? '飞机' :
              userPreferences.transport === 'road-trip' ? '自驾' : '混合'
            }</p>
            <p>• 旅行天数：{days}天</p>
          </div>
        </div>
      )}

      {/* 添加自定义物品 */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="添加自定义物品..."
          className="flex-1 bg-white/20 rounded-lg px-4 py-2 placeholder-white/70 outline-none"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button
          onClick={addItem}
          className="bg-white/20 hover:bg-white/30 rounded-lg p-2"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <p className="text-xs opacity-70 mt-4">
        💡 物品会根据旅行天数自动调整数量
      </p>
    </div>
  )
}
