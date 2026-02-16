import { Collaborator } from '../stores/travelStore'
import { UserPlus, Crown } from 'lucide-react'

interface Props {
  collaborators: Collaborator[]
}

export default function Collaborators({ collaborators }: Props) {
  return (
    <div className="flex items-center gap-2 mt-4">
      {/* Avatars */}
      <div className="flex -space-x-2">
        {collaborators.slice(0, 3).map((collab) => (
          <div
            key={collab.userId}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
            title={collab.name || collab.email}
          >
            {(collab.name || collab.email)[0].toUpperCase()}
          </div>
        ))}
        {collaborators.length > 3 && (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
            +{collaborators.length - 3}
          </div>
        )}
      </div>

      {/* Add Button */}
      <button className="flex items-center gap-1 text-sm text-blue-500">
        <UserPlus className="w-4 h-4" />
        <span>邀请</span>
      </button>
    </div>
  )
}
