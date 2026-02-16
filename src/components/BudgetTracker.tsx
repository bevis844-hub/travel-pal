import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react'

interface BudgetData {
  total: number
  spent: number
  categories: {
    accommodation: number
    transport: number
    food: number
    activities: number
    shopping: number
    other: number
  }
}

interface Props {
  budget: BudgetData
  currency: string
  onUpdate?: (categories: BudgetData['categories']) => void
}

export default function BudgetTracker({ budget, currency, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempCategories, setTempCategories] = useState(budget.categories)

  const percentage = Math.round((budget.spent / budget.total) * 100)
  
  const getStatusColor = () => {
    if (percentage < 50) return 'text-green-500'
    if (percentage < 80) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getProgressColor = () => {
    if (percentage < 50) return 'bg-green-500'
    if (percentage < 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const categoryLabels = {
    accommodation: '🏨 住宿',
    transport: '✈️ 交通',
    food: '🍜 美食',
    activities: '🎭 活动',
    shopping: '🛍️ 购物',
    other: '📦 其他'
  }

  const formatCurrency = (amount: number) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      TWD: 'NT$',
      CNY: '¥'
    }
    return `${symbols[currency] || '$'}${amount.toLocaleString()}`
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">💰 预算追踪</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          {isEditing ? '完成' : '编辑'}
        </button>
      </div>

      {/* 总体进度 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">已花费</span>
          <span className={`font-bold ${getStatusColor()}`}>
            {formatCurrency(budget.spent)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">总预算</span>
          <span className="font-medium">{formatCurrency(budget.total)}</span>
        </div>

        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-xs mt-2">
          <span className={getStatusColor()}>
            {percentage <= 100 ? `${percentage}%` : `${percentage}% (超支!)`}
          </span>
          <span className="text-gray-400">
            {formatCurrency(budget.total - budget.spent)} 剩余
          </span>
        </div>
      </div>

      {/* 分类明细 */}
      <div className="space-y-3">
        {Object.entries(budget.categories).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{categoryLabels[key as keyof typeof categoryLabels]}</span>
              <span className="font-medium">{formatCurrency(value)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400"
                style={{
                  width: `${budget.total > 0 ? (value / budget.total) * 100 : 0}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 提示 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-600">
        💡 提示：根据你的{currency}预算，建议每天花费不超过 {formatCurrency(Math.round(budget.total / 7))}
      </div>
    </div>
  )
}
