import { useNavigate } from 'react-router-dom'
import CreateTripModal from '../components/CreateTripModal'

export default function CreateTrip() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <CreateTripModal onClose={() => navigate('/')} />
      </div>
    </div>
  )
}
