import { useState } from 'react'
import { apiService } from '../services/apiService'
import { useAuth } from '../contexts/AuthContext'
import StyleSelector from './StyleSelector'
import PromptInputs from './PromptInputs'
import SettingsPanel from './SettingsPanel'
import EtaDisplay from './EtaDisplay'
import { 
  BoltIcon, 
  BookmarkIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const GeneratorForm = () => {
  const { updateTokens } = useAuth()
  const [positivePrompt, setPositivePrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [sampler, setSampler] = useState('DPM++ 2M Karras')
  const [scheduler, setScheduler] = useState('Default')
  const [cfg, setCfg] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | 'loading' | ''>('')

  const handleGenerate = async () => {
    if (!positivePrompt.trim()) {
      setGenerationStatus('Please enter a positive prompt')
      setStatusType('error')
      return
    }

    setIsGenerating(true)
    setGenerationStatus('Generating images...')
    setStatusType('loading')

    try {
      const response = await apiService.generateImage({
        prompt: positivePrompt,
        negative_prompt: negativePrompt,
        sampler,
        scheduler,
        cfg
      })

      if (response.success && response.images) {
        // Auto-download images
        response.images.forEach((base64Image, index) => {
          const imageData = `data:image/png;base64,${base64Image}`
          const randomInt = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0')
          
          const downloadLink = document.createElement('a')
          downloadLink.href = imageData
          downloadLink.download = `${randomInt}_generated_${index + 1}.png`
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        })

        setGenerationStatus('3 images downloaded & saved to history.')
        setStatusType('success')
        
        // Update token count (assuming 1 token per generation)
        const tokenResponse = await apiService.getTokenCount()
        updateTokens(tokenResponse.tokens)
      } else {
        setGenerationStatus(response.error || 'Generation failed')
        setStatusType('error')
      }
    } catch (error) {
      setGenerationStatus('Error occurred during generation')
      setStatusType('error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSavePrompt = async () => {
    try {
      const response = await apiService.savePrompt({
        positive_prompt: positivePrompt,
        negative_prompt: negativePrompt,
        sampler,
        scheduler,
        cfg
      })

      if (response.success) {
        setGenerationStatus('Prompt saved successfully!')
        setStatusType('success')
      } else {
        setGenerationStatus('Failed to save prompt')
        setStatusType('error')
      }
    } catch (error) {
      setGenerationStatus('Error saving prompt')
      setStatusType('error')
    }
  }

  const getStatusIcon = () => {
    switch (statusType) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-accent-400" />
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
      case 'loading':
        return <ClockIcon className="w-5 h-5 text-yellow-400 animate-spin" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Style and Settings Row */}
      <StyleSelector 
        onStyleChange={(prompt, negPrompt) => {
          setPositivePrompt(prev => prev + (prev ? ', ' : '') + prompt)
          setNegativePrompt(prev => prev + (prev ? ', ' : '') + negPrompt)
        }}
      />

      {/* Prompt Inputs */}
      <PromptInputs
        positivePrompt={positivePrompt}
        negativePrompt={negativePrompt}
        onPositiveChange={setPositivePrompt}
        onNegativeChange={setNegativePrompt}
      />

      {/* Save Prompt Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSavePrompt}
          className="btn-accent flex items-center space-x-2"
        >
          <BookmarkIcon className="w-5 h-5" />
          <span>Save Prompt</span>
        </button>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        sampler={sampler}
        scheduler={scheduler}
        cfg={cfg}
        onSamplerChange={setSampler}
        onSchedulerChange={setScheduler}
        onCfgChange={setCfg}
      />

      {/* Generate Section */}
      <div className="section">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
            isGenerating
              ? 'bg-neutral-600 cursor-not-allowed text-neutral-400'
              : 'btn-primary glow-on-hover'
          }`}
        >
          {isGenerating ? (
            <>
              <ClockIcon className="w-6 h-6 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <BoltIcon className="w-6 h-6" />
              <span>Generate Image</span>
            </>
          )}
        </button>

        <EtaDisplay />

        {generationStatus && (
          <div className={`mt-6 p-4 rounded-xl flex items-center space-x-3 ${
            statusType === 'success' ? 'bg-accent-500/20 border border-accent-500/30' :
            statusType === 'error' ? 'bg-red-500/20 border border-red-500/30' :
            statusType === 'loading' ? 'bg-yellow-500/20 border border-yellow-500/30' :
            'bg-dark-700/50 border border-dark-600/50'
          }`}>
            {getStatusIcon()}
            <span className={`font-medium ${
              statusType === 'success' ? 'text-accent-300' :
              statusType === 'error' ? 'text-red-300' :
              statusType === 'loading' ? 'text-yellow-300' :
              'text-neutral-300'
            }`}>
              {generationStatus}
            </span>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://beastgenerator.xyz/generator/guide.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 p-3 bg-dark-700/50 hover:bg-dark-600/50 rounded-xl text-primary-400 hover:text-primary-300 transition-all duration-200 font-medium"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>Full Generator Guide</span>
          </a>
          <a
            href="https://beastgenerator.xyz/generator/prompts.phtml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 p-3 bg-dark-700/50 hover:bg-dark-600/50 rounded-xl text-primary-400 hover:text-primary-300 transition-all duration-200 font-medium"
          >
            <BoltIcon className="w-5 h-5" />
            <span>Prompt Builder</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default GeneratorForm