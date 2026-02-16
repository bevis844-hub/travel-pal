import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Plus, User, Settings } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/create', icon: Plus, label: '创建' },
    { path: '/profile', icon: User, label: '我的' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 ${
                  isActive ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
