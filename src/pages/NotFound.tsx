import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-8xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">页面不存在</h1>
        <p className="text-gray-500 mb-6">你访问的页面不存在或已被移除</p>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
