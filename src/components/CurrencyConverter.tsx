import { useState, useEffect } from 'react'
import { DollarSign, ArrowRightLeft } from 'lucide-react'

const CURRENCIES = [
  { code: 'USD', name: '美元', symbol: '$' },
  { code: 'EUR', name: '欧元', symbol: '€' },
  { code: 'GBP', name: '英镑', symbol: '£' },
  { code: 'JPY', name: '日元', symbol: '¥' },
  { code: 'CNY', name: '人民币', symbol: '¥' },
  { code: 'TWD', name: '台币', symbol: 'NT$' },
  { code: 'KRW', name: '韩元', symbol: '₩' },
  { code: 'THB', name: '泰铢', symbol: '฿' },
  { code: 'SGD', name: '新加坡币', symbol: 'S$' },
  { code: 'AUD', name: '澳元', symbol: 'A$' },
]

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('JPY')
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  useEffect(() => {
    fetchRate()
  }, [fromCurrency, toCurrency])

  const fetchRate = async () => {
    setLoading(true)
    try {
      // 使用免费汇率API
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
      )
      const data = await response.json()
      
      if (data.rates && data.rates[toCurrency]) {
        setRate(data.rates[toCurrency])
        setLastUpdate(new Date().toLocaleTimeString('zh-CN'))
      }
    } catch (error) {
      console.error('获取汇率失败:', error)
      // 使用静态汇率作为备用
      const staticRates: Record<string, number> = {
        'USD-EUR': 0.92, 'USD-JPY': 149.5, 'USD-CNY': 7.24, 'USD-TWD': 31.5,
        'EUR-USD': 1.09, 'EUR-JPY': 162.5, 'EUR-CNY': 7.87, 'EUR-TWD': 34.2,
        'JPY-USD': 0.0067, 'JPY-EUR': 0.0062, 'JPY-CNY': 0.048, 'JPY-TWD': 0.21,
        'CNY-USD': 0.138, 'CNY-EUR': 0.127, 'CNY-JPY': 20.6, 'CNY-TWD': 4.35,
        'TWD-USD': 0.032, 'TWD-EUR': 0.029, 'TWD-JPY': 4.76, 'TWD-CNY': 0.23,
      }
      const key = `${fromCurrency}-${toCurrency}`
      setRate(staticRates[key] || 1)
      setLastUpdate('静态汇率')
    }
    setLoading(false)
  }

  const convertedAmount = rate && amount 
    ? (parseFloat(amount) * rate).toFixed(2) 
    : '---'

  const fromCurrencyInfo = CURRENCIES.find(c => c.code === fromCurrency)
  const toCurrencyInfo = CURRENCIES.find(c => c.code === toCurrency)

  return (
    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5" />
        <h3 className="font-bold">💱 实时汇率</h3>
        {lastUpdate && (
          <span className="text-xs opacity-75 ml-auto">
            更新: {lastUpdate}
          </span>
        )}
      </div>

      {/* 金额输入 */}
      <div className="mb-4">
        <label className="block text-sm opacity-90 mb-1">金额</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-gray-800 text-lg font-medium"
          placeholder="输入金额"
        />
      </div>

      {/* 货币选择 */}
      <div className="flex items-center gap-2 mb-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg text-gray-800 text-sm"
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
          ))}
        </select>

        <ArrowRightLeft className="w-5 h-5 opacity-75" />

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg text-gray-800 text-sm"
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
          ))}
        </select>
      </div>

      {/* 转换结果 */}
      <div className="bg-white/20 rounded-lg p-4 text-center">
        {loading ? (
          <div className="animate-pulse">正在获取汇率...</div>
        ) : (
          <>
            <div className="text-sm opacity-90 mb-1">
              {fromCurrencyInfo?.symbol}{amount} = 
            </div>
            <div className="text-2xl font-bold">
              {toCurrencyInfo?.symbol}{convertedAmount}
            </div>
            <div className="text-xs opacity-75 mt-1">
              1 {fromCurrency} = {rate?.toFixed(4)} {toCurrency}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
