import { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'

const EtaDisplay = () => {
  const [etaStatus, setEtaStatus] = useState('✅ Machine Ready')

  useEffect(() => {
    const updateEta = async () => {
      try {
        const status = await apiService.getEtaStatus()
        if (status.eta > 0) {
          setEtaStatus(`⏳ Estimated Wait: ${status.eta}s`)
        } else {
          setEtaStatus(status.status)
        }
      } catch (error) {
        setEtaStatus('❌ Machine Offline')
      }
    }

    // Update immediately
    updateEta()

    // Update every second
    const interval = setInterval(updateEta, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-4 text-center text-gray-400">
      {etaStatus}
    </div>
  )
}

export default EtaDisplay