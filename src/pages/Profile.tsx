import { useState } from 'react'
import { Heart, Settings, Bell, Shield, HelpCircle, MapPin } from 'lucide-react'
import { useTravelStore } from '../stores/travelStore'

export default function Profile() {
  const { currentUser, userPreferences } = useTravelStore()
  const [isEditing, setIsEditing] = useState(false)

  const menuItems = [
    { icon: Heart, label: '我的偏好', color: 'text-pink-500' },
    { icon: MapPin, label: '去过的地方', color: 'text-green-500' },
    { icon: Bell, label: '通知设置', color: 'text-yellow-500' },
    { icon: Shield, label: '隐私与安全', color: 'text-blue-500' },
    { icon: HelpCircle, label: '帮助与反馈', color: 'text-purple-500' },
    { icon: Settings, label: '应用设置', color: 'text-gray-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl">
            🐶
          </div>
          
          <div className="flex-1">
            {currentUser ? (
              <>
                <h2 className="text-xl font-bold">{currentUser.name || '旅行者'}</h2>
                <p className="opacity-80">{currentUser.email}</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">登录账户</h2>
                <p className="opacity-80">登录后同步你的旅行数据</p>
              </>
            )}
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg"
          >
            {isEditing ? '完成' : '编辑'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-xl shadow-lg p-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-500">规划中</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-500">已去过</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-500">协作了</div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      {userPreferences && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-bold text-gray-800 mb-3">🎯 旅行偏好</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">风格：</span>
                <span className="font-medium">{userPreferences.travelStyle}</span>
              </div>
              <div>
                <span className="text-gray-500">住宿：</span>
                <span className="font-medium">{userPreferences.accommodation}</span>
              </div>
              <div>
                <span className="text-gray-500">交通：</span>
                <span className="font-medium">{userPreferences.transport}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 hover:bg-gray-50"
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="flex-1 text-left font-medium">{item.label}</span>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 mt-8 text-center text-gray-400 text-sm">
        <p>🌍 TravelPal v1.0</p>
        <p className="mt-1">一个有灵魂的旅行App</p>
      </div>
    </div>
  )
}
