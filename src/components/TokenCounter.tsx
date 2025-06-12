import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { apiService } from '../services/apiService'

const TokenCounter = () => {
  const { user, updateTokens } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const updateTokenCount = async () => {
      if (isUpdating) return
      
      setIsUpdating(true)
      try {
        const response = await apiService.getTokenCount()
        updateTokens(response.tokens)
      } catch (error) {
        console.error('Failed to update token count:', error)
      } finally {
        setIsUpdating(false)
      }
    }

    // Update every 3 seconds
    const interval = setInterval(updateTokenCount, 3000)

    return () => clearInterval(interval)
  }, [updateTokens, isUpdating])

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-400">Tokens:</span>
      <span className="text-primary-600 font-bold text-lg">
        {user?.tokens || 0}
      </span>
      {isUpdating && (
        <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      )}
    </div>
  )
}

export default TokenCounter