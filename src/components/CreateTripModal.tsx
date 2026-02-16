import { useState } from 'react'
import { X, Calendar, MapPin, DollarSign } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { useTravelStore } from '../stores/travelStore'

const tripSchema = z.object({
  name: z.string().min(1, '请输入旅行名称'),
  destination: z.string().min(1, '请输入目的地'),
  startDate: z.string().min(1, '请选择开始日期'),
  endDate: z.string().min(1, '请选择结束日期'),
  budget: z.number().optional(),
  currency: z.string().default('USD'),
  description: z.string().optional(),
})

type TripForm = z.infer<typeof tripSchema>

interface Props {
  onClose: () => void
}

export default function CreateTripModal({ onClose }: Props) {
  const { addTrip, currentUser } = useTravelStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TripForm>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      currency: 'USD'
    }
  })

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const onSubmit = async (data: TripForm) => {
    setIsSubmitting(true)
    
    // 生成日期数组
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = []
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push({
        date: d.toISOString().split('T')[0],
        activities: []
      })
    }

    const newTrip = {
      id: uuidv4(),
      name: data.name,
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
      status: 'planning' as const,
      ownerId: currentUser?.id || 'anonymous',
      collaborators: [],
      budget: data.budget ? {
        total: data.budget,
        currency: data.currency,
        spent: 0,
        categories: {
          accommodation: 0,
          transport: 0,
          food: 0,
          activities: 0,
          shopping: 0,
          other: 0
        }
      } : undefined,
      itinerary: days,
      packingList: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addTrip(newTrip)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">创建新旅行</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* 旅行名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              旅行名称 *
            </label>
            <input
              {...register('name')}
              placeholder="例如：东京之旅"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* 目的地 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              目的地 *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('destination')}
                placeholder="例如：日本东京"
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.destination && (
              <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
            )}
          </div>

          {/* 日期 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                开始日期 *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                结束日期 *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  {...register('endDate')}
                  min={startDate}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 预算 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                预算（可选）
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  {...register('budget', { valueAsNumber: true })}
                  placeholder="5000"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                货币
              </label>
              <select
                {...register('currency')}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="TWD">TWD (NT$)</option>
                <option value="CNY">CNY (¥)</option>
              </select>
            </div>
          </div>

          {/* 描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              描述（可选）
            </label>
            <textarea
              {...register('description')}
              placeholder="这次旅行的特别计划..."
              rows={3}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? '创建中...' : '创建旅行'}
          </button>
        </form>
      </div>
    </div>
  )
}
