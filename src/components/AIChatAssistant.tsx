import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Props {
  destination: string
}

export default function AIChatAssistant({ destination }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `你好！我是TravelPal AI助手 🌍\n\n我可以帮你：\n• 规划${destination}的行程\n• 推荐必去景点和美食\n• 回答旅行相关问题\n• 给你实用的旅行建议\n\n有什么想问的，尽管说！`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // 模拟AI回复
    setTimeout(() => {
      const response = generateAIResponse(input, destination)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold">AI 旅行助手</h3>
          <p className="text-xs text-gray-500">在线 • 随时为你服务</p>
        </div>
        <div className="ml-auto">
          <Sparkles className="w-5 h-5 text-purple-500" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-blue-500' 
                : 'bg-gradient-to-br from-purple-400 to-pink-500'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message */}
            <div className={`max-w-[75%] ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block px-4 py-2 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}>
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {message.content}
                </pre>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
              <span className="text-sm text-gray-500">AI正在思考...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入你的问题..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// AI回复生成器（模拟真实AI）
function generateAIResponse(question: string, destination: string): string {
  const q = question.toLowerCase()
  
  // 行程规划相关
  if (q.includes('行程') || q.includes('安排') || q.includes('几天')) {
    return `📋 帮你规划 ${destination} 行程建议：\n\n` +
      `🎯 推荐行程天数：\n` +
      `• 3-4天：经典景点游\n` +
      `• 5-7天：深度体验\n` +
      `• 7天以上：慢节奏探索\n\n` +
      `💡 小贴士：建议每天安排2-3个主要景点，留出时间休息和随机探索！`
  }
  
  // 美食相关
  if (q.includes('吃') || q.includes('美食') || q.includes('餐厅')) {
    return `🍜 ${destination} 美食推荐：\n\n` +
      `🔥 必吃美食：\n` +
      `• 当地特色小吃\n` +
      `• 人气餐厅榜单\n` +
      `• 隐藏美食店\n\n` +
      `💡 建议用大众点评或Google Maps找高分餐厅，提前预约人气店！`
  }
  
  // 景点相关
  if (q.includes('景点') || q.includes('好玩') || q.includes('去哪儿')) {
    return `🏛️ ${destination} 必去景点：\n\n` +
      `⭐ 热门景点：\n` +
      `• 经典地标\n` +
      `• 网红打卡点\n` +
      `• 小众秘境\n\n` +
      `💡 建议早上先去热门景点，下午安排轻松行程！`
  }
  
  // 交通相关
  if (q.includes('交通') || q.includes('怎么去') || q.includes('打车')) {
    return `🚗 ${destination} 交通指南：\n\n` +
      `🚌 推荐方式：\n` +
      `• 地铁/公交：经济实惠\n` +
      `• 打车：方便但较贵\n` +
      `• 步行：探索小街小巷\n\n` +
      `💡 建议下载当地交通APP，出行更方便！`
  }
  
  // 住宿相关
  if (q.includes('住') || q.includes('酒店') || q.includes('民宿')) {
    return `🏨 ${destination} 住宿建议：\n\n` +
      `📍 推荐区域：\n` +
      `• 市中心：交通便利，热闹\n` +
      `• 景区附近：节省时间\n` +
      `• 特色民宿：体验当地风情\n\n` +
      `💡 旺季提前订，淡季可以现场砍价！`
  }
  
  // 购物相关
  if (q.includes('买') || q.includes('购物') || q.includes('伴手礼')) {
    return `🛍️ ${destination} 购物攻略：\n\n` +
      `🎁 必买伴手礼：\n` +
      `• 当地特产\n` +
      `• 网红零食\n` +
      `• 纪念品\n\n` +
      `💡 大型商场可以退税，小店记得讲价！`
  }
  
  // 天气相关
  if (q.includes('天气') || q.includes('带什么') || q.includes('穿')) {
    return `🌤️ ${destination} 出行建议：\n\n` +
      `👕 穿搭建议：\n` +
      `• 查看天气预报准备衣物\n` +
      `• 建议穿舒适鞋子\n` +
      `• 带上薄外套以防降温\n\n` +
      `💡 出行前3天再看天气预报，更准确！`
  }
  
  // 预算相关
  if (q.includes('花') || q.includes('钱') || q.includes('预算')) {
    return `💰 ${destination} 预算参考：\n\n` +
      `📊 每日花费（仅供参考）：\n` +
      `• 经济型：¥300-500/天\n` +
      `• 舒适型：¥500-1000/天\n` +
      `• 豪华型：¥1000+/天\n\n` +
      `💡 建议预留20%备用金，应对意外支出！`
  }
  
  // 默认回复
  return `🤔 关于 ${destination}，让我给你一些建议：\n\n` +
    `我需要了解更多细节才能给你更准确的建议。\n\n` +
    `你可以试试问这些问题：\n` +
    `• "去${destination}玩几天合适？"\n` +
    `• "${destination}有什么好吃的？"\n` +
    `• "${destination}怎么安排行程？"\n` +
    `• "${destination}大概要花多少钱？"\n\n` +
    `还有什么想知道的，尽管问我！😊`
}
