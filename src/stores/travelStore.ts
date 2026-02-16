import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户偏好类型
interface UserPreferences {
  travelStyle: 'adventure' | 'relaxation' | 'cultural' | 'foodie' | 'mixed'
  accommodation: 'budget' | 'mid-range' | 'luxury'
  transport: 'flight' | 'train' | 'road-trip' | 'mixed'
  activities: string[]
  dietaryRestrictions: string[]
}

// 旅行类型
interface Trip {
  id: string
  name: string
  destination: string
  startDate: string
  endDate: string
  coverImage?: string
  status: 'planning' | 'upcoming' | 'ongoing' | 'completed'
  ownerId: string
  collaborators: Collaborator[]
  budget?: Budget
  itinerary: ItineraryDay[]
  packingList: PackingItem[]
  createdAt: string
  updatedAt: string
}

// 协作者
interface Collaborator {
  userId: string
  email: string
  name?: string
  avatar?: string
  role: 'admin' | 'editor' | 'viewer'
  joinedAt: string
}

// 预算
interface Budget {
  total: number
  currency: string
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

// 每日行程
interface ItineraryDay {
  date: string
  activities: Activity[]
}

// 活动
interface Activity {
  id: string
  time: string
  title: string
  description?: string
  location?: string
  cost?: number
  category: 'sightseeing' | 'food' | 'transport' | 'accommodation' | 'activity' | 'shopping' | 'other'
  notes?: string
}

// 行李清单
interface PackingItem {
  id: string
  name: string
  category: 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'medicine' | 'other'
  quantity: number
  packed: boolean
  assignee?: string // 谁负责带
}

// App状态
interface TravelAppState {
  // 用户信息
  currentUser: User | null
  userPreferences: UserPreferences | null
  
  // 旅行
  trips: Trip[]
  currentTrip: Trip | null
  
  // 邀请
  pendingInvites: string[]
  
  // 通知
  notifications: Notification[]
  
  // Actions
  setCurrentUser: (user: User | null) => void
  setUserPreferences: (prefs: UserPreferences) => void
  addTrip: (trip: Trip) => void
  updateTrip: (tripId: string, updates: Partial<Trip>) => void
  deleteTrip: (tripId: string) => void
  setCurrentTrip: (trip: Trip | null) => void
  addCollaborator: (tripId: string, collaborator: Collaborator) => void
  removeCollaborator: (tripId: string, userId: string) => void
  addActivity: (tripId: string, dayIndex: number, activity: Activity) => void
  togglePacked: (tripId: string, itemId: string) => void
}

// 用户
interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  createdAt: string
}

// 通知
interface Notification {
  id: string
  type: 'invite' | 'update' | 'reminder'
  message: string
  read: boolean
  createdAt: string
}

// 创建Store
export const useTravelStore = create<TravelAppState>()(
  persist(
    (set) => ({
      // 初始状态
      currentUser: null,
      userPreferences: null,
      trips: [],
      currentTrip: null,
      pendingInvites: [],
      notifications: [],
      
      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),
      
      setUserPreferences: (prefs) => set({ userPreferences: prefs }),
      
      addTrip: (trip) => set((state) => ({ 
        trips: [...state.trips, trip] 
      })),
      
      updateTrip: (tripId, updates) => set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId ? { ...trip, ...updates } : trip
        ),
        currentTrip: state.currentTrip?.id === tripId 
          ? { ...state.currentTrip, ...updates }
          : state.currentTrip
      })),
      
      deleteTrip: (tripId) => set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== tripId),
        currentTrip: state.currentTrip?.id === tripId ? null : state.currentTrip
      })),
      
      setCurrentTrip: (trip) => set({ currentTrip: trip }),
      
      addCollaborator: (tripId, collaborator) => set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? { ...trip, collaborators: [...trip.collaborators, collaborator] }
            : trip
        )
      })),
      
      removeCollaborator: (tripId, userId) => set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? { 
                ...trip, 
                collaborators: trip.collaborators.filter(c => c.userId !== userId) 
              }
            : trip
        )
      })),
      
      addActivity: (tripId, dayIndex, activity) => set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                itinerary: trip.itinerary.map((day, idx) =>
                  idx === dayIndex
                    ? { ...day, activities: [...day.activities, activity] }
                    : day
                )
              }
            : trip
        )
      })),
      
      togglePacked: (tripId, itemId) => set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                packingList: trip.packingList.map((item) =>
                  item.id === itemId ? { ...item, packed: !item.packed } : item
                )
              }
            : trip
        )
      }))
    }),
    {
      name: 'travel-pal-storage',
      partialize: (state) => ({
        userPreferences: state.userPreferences,
        trips: state.trips,
        notifications: state.notifications
      })
    }
  )
)
