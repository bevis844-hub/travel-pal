import { useState, useRef } from 'react'
import { Camera, Upload, Image as ImageIcon, Sparkles, Trash2 } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface Photo {
  id: string
  url: string
  caption: string
  date: string
  location?: string
}

interface Props {
  photos: Photo[]
  onAddPhoto: (photo: Photo) => void
  onDeletePhoto: (photoId: string) => void
}

export default function PhotoAlbum({ photos, onAddPhoto, onDeletePhoto }: Props) {
  const [isAdding, setIsAdding] = useState(false)
  const [newPhotoUrl, setNewPhotoUrl] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return

    const newPhoto: Photo = {
      id: uuidv4(),
      url: newPhotoUrl,
      caption: newCaption || '旅行回忆',
      date: new Date().toISOString().split('T')[0],
      location: newLocation || undefined,
    }

    onAddPhoto(newPhoto)
    setNewPhotoUrl('')
    setNewCaption('')
    setNewLocation('')
    setIsAdding(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">📸 旅行相册</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
        >
          <Camera className="w-5 h-5" />
          <span>添加照片</span>
        </button>
      </div>

      {/* 添加照片表单 */}
      {isAdding && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <input
            type="text"
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            placeholder="粘贴图片URL或使用上传"
            className="w-full px-3 py-2 border rounded-lg mb-2 text-sm"
          />
          
          <div className="flex gap-2 mb-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // 模拟上传，实际应该上传到服务器
                  setNewPhotoUrl(`https://placeholder.com/${uuidv4().slice(0, 8)}.jpg`)
                }
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm"
            >
              <Upload className="w-4 h-4" />
              上传本地图片
            </button>
          </div>

          <input
            type="text"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            placeholder="照片描述（可选，AI会自动生成）"
            className="w-full px-3 py-2 border rounded-lg mb-2 text-sm"
          />

          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="拍摄地点（可选）"
            className="w-full px-3 py-2 border rounded-lg mb-3 text-sm"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAddPhoto}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              添加
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 照片网格 */}
      {photos.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-50" />
          <p>还没有照片</p>
          <p className="text-sm">添加旅行照片，记录美好回忆</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              
              {/* 悬停显示详情 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium truncate">
                    {photo.caption}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    {photo.location && (
                      <span className="text-xs text-gray-300">
                        📍 {photo.location}
                      </span>
                    )}
                    <span className="text-xs text-gray-300">
                      {photo.date}
                    </span>
                  </div>
                </div>
                
                {/* 删除按钮 */}
                <button
                  onClick={() => onDeletePhoto(photo.id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI建议 */}
      {photos.length > 0 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700">AI相册助手</span>
          </div>
          <p className="text-sm text-gray-600">
            已收录 {photos.length} 张旅行回忆。{photos.length >= 5 
              ? '太棒了！可以生成旅行相册了！🎉' 
              : '继续添加更多精彩瞬间吧！✨'}
          </p>
        </div>
      )}
    </div>
  )
}
