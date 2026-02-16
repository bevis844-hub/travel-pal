import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Snowflake, Wind, Loader2 } from 'lucide-react'

interface WeatherData {
  temp: number
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy'
  humidity: number
  wind: number
}

interface Props {
  destination: string
  startDate: string
  endDate: string
}

export default function WeatherWidget({ destination, startDate, endDate }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 模拟天气数据（实际可以接OpenWeather API）
  useEffect(() => {
    if (!destination) return

    setLoading(true)
    setError(null)

    // 模拟API调用
    setTimeout(() => {
      // 随机生成天气（实际应该根据目的地查询）
      const conditions: ('sunny' | 'cloudy' | 'rainy' | 'snowy')[] = ['sunny', 'cloudy', 'rainy', 'sunny']
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]

      setWeather({
        temp: Math.round(15 + Math.random() * 15), // 15-30度
        condition: randomCondition,
        humidity: Math.round(40 + Math.random() * 40), // 40-80%
        wind: Math.round(5 + Math.random() * 20) // 5-25 km/h
      })

      setLoading(false)
    }, 800)
  }, [destination])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-12 h-12 text-yellow-500" />
      case 'cloudy':
        return <Cloud className="w-12 h-12 text-gray-400" />
      case 'rainy':
        return <CloudRain className="w-12 h-12 text-blue-500" />
      case 'snowy':
        return <Snowflake className="w-12 h-12 text-cyan-400" />
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />
    }
  }

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return '晴天'
      case 'cloudy':
        return '多云'
      case 'rainy':
        return '下雨'
      case 'snowy':
        return '下雪'
      default:
        return '未知'
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="w-5 h-5" />
        <h3 className="font-bold">🌤️ 天气预览</h3>
        <span className="text-sm opacity-70">（{destination}）</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>正在获取天气...</span>
        </div>
      ) : error ? (
        <div className="text-red-200 text-sm">
          ⚠️ 无法获取天气信息
        </div>
      ) : weather ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-4xl font-bold">{weather.temp}°</div>
              <div className="text-sm opacity-80">{getConditionText(weather.condition)}</div>
            </div>
          </div>

          <div className="text-right text-sm space-y-1">
            <div className="flex items-center gap-1 justify-end">
              <span>💧 湿度 {weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <Wind className="w-4 h-4" />
              <span>{weather.wind} km/h</span>
            </div>
          </div>
        </div>
      ) : null}

      <p className="text-xs opacity-70 mt-4">
        📅 {startDate} - {endDate}
      </p>
    </div>
  )
}
