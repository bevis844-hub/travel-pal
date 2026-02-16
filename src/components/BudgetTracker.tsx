


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
}

export default function BudgetTracker({ budget, currency }: Props) {
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

  const categoryLabels: Record<string, string> = {
    accommodation: '🏨 住宿',
    transport: '✈️ 交通',
    food: '🍜 美食',
    activities: '🎭 活动',
    shopping: '🛍️ 购物',
    other: '📦 其他'
  }

  const formatCurrency = (amount: number) => {
    const symbols: Record<string, string> = {
      USD: '$', EUR: '€', GBP: '£', JPY: '¥', TWD: 'NT$', CNY: '¥'
    }
    return `${symbols[currency] || '$'}${amount.toLocaleString()}`
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">💰 预算追踪</h3>
      </div>

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

      <div className="space-y-3">
        {Object.entries(budget.categories).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{categoryLabels[key]}</span>
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
    </div>
  )
}
