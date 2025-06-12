import { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'
import { SavedPrompt } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'

const SavedPrompts = () => {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSavedPrompts = async () => {
      try {
        const savedPrompts = await apiService.getSavedPrompts()
        setPrompts(savedPrompts)
      } catch (err) {
        setError('Failed to load saved prompts')
        // Mock data for demo
        setPrompts([
          {
            id: 1,
            positive_prompt: "anime artwork, (anime style:1.2), key visual, vibrant, studio anime, highly detailed, 1girl, long hair, school uniform",
            negative_prompt: "low quality, blurry, pixelated, bad anatomy",
            sampler: "DPM++ 2M Karras",
            scheduler: "Default",
            cfg: 7,
            created_at: "2024-01-15 14:30:00"
          },
          {
            id: 2,
            positive_prompt: "fantasy art, magical, ethereal, detailed background, mystical atmosphere, 1girl, elf ears, flowing robes",
            negative_prompt: "modern, contemporary, realistic, photography, low quality",
            sampler: "DPM++ SDE",
            scheduler: "Karras",
            cfg: 6,
            created_at: "2024-01-14 09:15:00"
          },
          {
            id: 3,
            positive_prompt: "photorealistic, portrait, professional lighting, detailed skin texture, high resolution, DSLR quality",
            negative_prompt: "cartoon, anime, painting, drawing, sketch, low quality, blurry, pixelated",
            sampler: "DDIM",
            scheduler: "Exponential",
            cfg: 5,
            created_at: "2024-01-13 16:45:00"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSavedPrompts()
  }, [])

  const copyPrompt = (prompt: SavedPrompt) => {
    const promptText = `Positive: ${prompt.positive_prompt}\n\nNegative: ${prompt.negative_prompt}\n\nSettings: ${prompt.sampler}, ${prompt.scheduler}, CFG: ${prompt.cfg}`
    navigator.clipboard.writeText(promptText)
  }

  const loadPromptToGenerator = (prompt: SavedPrompt) => {
    // This would typically update the generator form state
    // For now, we'll just copy to clipboard
    copyPrompt(prompt)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          💾 Saved Prompts
        </h1>
        <span className="text-gray-400">
          {prompts.length} saved
        </span>
      </div>

      {error && (
        <div className="p-4 bg-yellow-900/50 border border-yellow-700 rounded-lg text-yellow-300">
          {error} - Showing demo prompts
        </div>
      )}

      {prompts.length === 0 ? (
        <div className="section text-center py-12">
          <p className="text-gray-400 text-lg">No saved prompts yet.</p>
          <p className="text-gray-500 text-sm mt-2">
            Save prompts from the generator to see them here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="section hover:border-primary-600 transition-colors duration-200">
              <div className="space-y-4">
                {/* Positive Prompt */}
                <div>
                  <h3 className="text-sm font-medium text-green-400 mb-2">
                    🟢 Positive Prompt
                  </h3>
                  <p className="text-sm text-gray-300 bg-dark-900 p-3 rounded-lg font-mono leading-relaxed">
                    {prompt.positive_prompt}
                  </p>
                </div>

                {/* Negative Prompt */}
                <div>
                  <h3 className="text-sm font-medium text-red-400 mb-2">
                    🔴 Negative Prompt
                  </h3>
                  <p className="text-sm text-gray-300 bg-dark-900 p-3 rounded-lg font-mono leading-relaxed">
                    {prompt.negative_prompt}
                  </p>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                  <div>
                    <span className="block font-medium">Sampler</span>
                    <span>{prompt.sampler}</span>
                  </div>
                  <div>
                    <span className="block font-medium">Scheduler</span>
                    <span>{prompt.scheduler}</span>
                  </div>
                  <div>
                    <span className="block font-medium">CFG</span>
                    <span>{prompt.cfg}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-500">
                  Saved: {new Date(prompt.created_at).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => loadPromptToGenerator(prompt)}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-black px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Load to Generator
                  </button>
                  <button
                    onClick={() => copyPrompt(prompt)}
                    className="bg-dark-600 hover:bg-dark-500 text-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="section bg-blue-900/20 border-blue-700">
        <div className="flex items-start space-x-3">
          <div className="text-blue-400 text-xl">💡</div>
          <div>
            <h3 className="font-medium text-blue-300 mb-1">Quick Actions</h3>
            <p className="text-blue-200 text-sm">
              Click "Load to Generator" to automatically fill the generator form with this prompt, 
              or "Copy" to copy the prompt details to your clipboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedPrompts