import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { apiService } from '../services/apiService'
import { 
  CurrencyDollarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

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
    <div className="flex items-center space-x-3 p-4 bg-dark-800/30 rounded-xl backdrop-blur-sm border border-dark-700/30">
      <div className="p-2 bg-primary-500/20 rounded-lg">
        <CurrencyDollarIcon className="w-5 h-5 text-primary-400" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-neutral-400 font-medium">Available Tokens</span>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-primary-400">
            {user?.tokens || 0}
          </span>
          {isUpdating && (
            <ArrowPathIcon className="w-4 h-4 text-primary-400 animate-spin" />
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenCounter