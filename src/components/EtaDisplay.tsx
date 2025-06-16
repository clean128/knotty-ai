import { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  SignalSlashIcon
} from '@heroicons/react/24/outline'

const EtaDisplay = () => {
  const [etaStatus, setEtaStatus] = useState('Machine Ready')
  const [statusType, setStatusType] = useState<'ready' | 'waiting' | 'error' | 'offline'>('ready')

  useEffect(() => {
    const updateEta = async () => {
      try {
        const status = await apiService.getEtaStatus()
        if (status.eta > 0) {
          setEtaStatus(`Estimated Wait: ${status.eta}s`)
          setStatusType('waiting')
        } else {
          setEtaStatus(status.status)
          setStatusType('ready')
        }
      } catch (error) {
        setEtaStatus('Machine Offline')
        setStatusType('offline')
      }
    }

    // Update immediately
    updateEta()

    // Update every second
    const interval = setInterval(updateEta, 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (statusType) {
      case 'ready':
        return <CheckCircleIcon className="w-5 h-5 text-accent-400" />
      case 'waiting':
        return <ClockIcon className="w-5 h-5 text-yellow-400 animate-pulse" />
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
      case 'offline':
        return <SignalSlashIcon className="w-5 h-5 text-neutral-500" />
      default:
        return <CheckCircleIcon className="w-5 h-5 text-accent-400" />
    }
  }

  const getStatusColor = () => {
    switch (statusType) {
      case 'ready':
        return 'text-accent-400'
      case 'waiting':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      case 'offline':
        return 'text-neutral-500'
      default:
        return 'text-accent-400'
    }
  }

  return (
    <div className="mt-6 flex items-center justify-center space-x-3 p-4 bg-dark-800/30 rounded-xl backdrop-blur-sm border border-dark-700/30">
      {getStatusIcon()}
      <span className={`font-medium ${getStatusColor()}`}>
        {etaStatus}
      </span>
    </div>
  )
}

export default EtaDisplay