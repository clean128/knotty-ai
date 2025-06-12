import { useState } from 'react'
import { apiService } from '../services/apiService'
import { useAuth } from '../contexts/AuthContext'
import StyleSelector from './StyleSelector'
import PromptInputs from './PromptInputs'
import SettingsPanel from './SettingsPanel'
import EtaDisplay from './EtaDisplay'

const GeneratorForm = () => {
  const { updateTokens } = useAuth()
  const [positivePrompt, setPositivePrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [sampler, setSampler] = useState('DPM++ 2M Karras')
  const [scheduler, setScheduler] = useState('Default')
  const [cfg, setCfg] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')

  const handleGenerate = async () => {
    if (!positivePrompt.trim()) {
      setGenerationStatus('❌ Please enter a positive prompt')
      return
    }

    setIsGenerating(true)
    setGenerationStatus('⏳ Generating images...')

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

        setGenerationStatus('✅ 3 images downloaded & saved to history.')
        
        // Update token count (assuming 1 token per generation)
        const tokenResponse = await apiService.getTokenCount()
        updateTokens(tokenResponse.tokens)
      } else {
        setGenerationStatus(`❌ ${response.error || 'Generation failed'}`)
      }
    } catch (error) {
      setGenerationStatus('❌ Error occurred during generation')
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
        setGenerationStatus('✅ Prompt saved successfully!')
      } else {
        setGenerationStatus('❌ Failed to save prompt')
      }
    } catch (error) {
      setGenerationStatus('❌ Error saving prompt')
    }
  }

  return (
    <div className="space-y-6">
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
      <div className="text-center">
        <button
          onClick={handleSavePrompt}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          💾 Save Prompt
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
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
            isGenerating
              ? 'bg-gray-600 cursor-not-allowed'
              : 'btn-primary hover:scale-105'
          }`}
        >
          {isGenerating ? '⏳ Generating...' : '⚡ Generate Image'}
        </button>

        <EtaDisplay />

        {generationStatus && (
          <div className="mt-4 p-3 bg-dark-700 rounded-lg text-center">
            {generationStatus}
          </div>
        )}

        <div className="mt-4 space-y-2 text-center">
          <a
            href="https://beastgenerator.xyz/generator/guide.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-primary-600 hover:text-primary-500 text-sm underline"
          >
            📖 Full Generator Guide
          </a>
          <a
            href="https://beastgenerator.xyz/generator/prompts.phtml"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-primary-600 hover:text-primary-500 text-sm underline"
          >
            🧪 Prompt Builder
          </a>
        </div>
      </div>
    </div>
  )
}

export default GeneratorForm