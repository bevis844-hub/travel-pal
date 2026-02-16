import { useState, useEffect } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { useTravelStore } from '../stores/travelStore'

interface Props {
  destination: string
  days: number
}

export default function AIRecommendation({ destination, days }: Props) {
  const { userPreferences } = useTravelStore()
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // 基于用户偏好生成推荐
  useEffect(() => {
    if (!destination || !userPreferences) return

    setLoading(true)

    // 模拟AI推荐（实际可以接OpenAI API）
    setTimeout(() => {
      const baseRecommendations = [
        `🏛️ ${destination}必游景点巡礼`,
        `🍜 当地美食体验`,
        `📸 最佳拍照地点`,
      ]

      // 根据偏好调整
      if (userPreferences.travelStyle === 'adventure') {
        baseRecommendations.push(
          `🏔️ 户外探险活动`,
          `🚵 徒步路线推荐`
        )
      } else if (userPreferences.travelStyle === 'relaxation') {
        baseRecommendations.push(
          `🧖 SPA放松体验`,
          `🏖️ 海滩/度假村推荐`
        )
      } else if (userPreferences.travelStyle === 'cultural') {
        baseRecommendations.push(
          `🏛️ 历史博物馆之旅`,
          `🎭 当地文化体验`
        )
      } else if (userPreferences.travelStyle === 'foodie') {
        baseRecommendations.push(
          `🍜 当地美食攻略`,
          `🍷 美食美酒体验`
        )
      }

      // 根据预算调整
      if (userPreferences.accommodation === 'luxury') {
        baseRecommendations.push(`⭐ 当地顶级酒店推荐`)
      } else if (userPreferences.accommodation === 'budget') {
        baseRecommendations.push(`💰 性价比住宿推荐`)
      }

      setRecommendations(baseRecommendations)
      setLoading(false)
    }, 1000)
  }, [destination, userPreferences])

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-bold">✨ AI智能推荐</h3>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm opacity-80">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>正在根据你的偏好生成推荐...</span>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm opacity-90 mb-3">
            基于你的旅行风格：
            <span className="font-medium">
              {userPreferences?.travelStyle === 'adventure' ? '冒险' : 
               userPreferences?.travelStyle === 'relaxation' ? '休闲' :
               userPreferences?.travelStyle === 'cultural' ? '文化' :
               userPreferences?.travelStyle === 'foodie' ? '美食' : '混合'}
            </span>
          </p>
          
          <div className="space-y-2">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white/20 rounded-lg px-4 py-2 text-sm hover:bg-white/30 transition-colors cursor-pointer"
              >
                {rec}
              </div>
            ))}
          </div>

          <p className="text-xs opacity-70 mt-4">
            💡 推荐基于你之前喜欢的旅行类型
          </p>
        </div>
      )}
    </div>
  )
}
