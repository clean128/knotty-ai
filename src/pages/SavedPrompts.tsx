import { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'
import { SavedPrompt } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'
import { 
  BookmarkIcon,
  ClipboardDocumentIcon,
  PlayIcon,
  CalendarIcon,
  CpuChipIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl">
              <BookmarkIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                Saved Prompts
              </h1>
              <p className="text-neutral-400 font-medium">
                Your creative prompt collection
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-dark-800/30 rounded-xl backdrop-blur-sm">
            <BookmarkIcon className="w-5 h-5 text-neutral-400" />
            <span className="text-neutral-400 font-medium">
              {prompts.length} saved
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-300 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <BookmarkIcon className="w-5 h-5" />
            <span className="font-medium">{error} - Showing demo prompts</span>
          </div>
        </div>
      )}

      {prompts.length === 0 ? (
        <div className="section text-center py-16">
          <div className="p-4 bg-neutral-500/20 rounded-2xl w-fit mx-auto mb-4">
            <BookmarkIcon className="w-12 h-12 text-neutral-400" />
          </div>
          <h3 className="text-xl font-display font-semibold text-neutral-300 mb-2">
            No saved prompts yet
          </h3>
          <p className="text-neutral-500">
            Save prompts from the generator to see them here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="section hover:border-primary-500/30 transition-all duration-300 hover:scale-105">
              <div className="space-y-6">
                {/* Positive Prompt */}
                <div>
                  <h3 className="flex items-center space-x-2 text-sm font-semibold text-accent-400 mb-3">
                    <span className="w-3 h-3 bg-accent-400 rounded-full"></span>
                    <span>Positive Prompt</span>
                  </h3>
                  <div className="bg-dark-900/50 p-4 rounded-xl border border-dark-700/50">
                    <p className="text-sm text-neutral-300 font-mono leading-relaxed">
                      {prompt.positive_prompt}
                    </p>
                  </div>
                </div>

                {/* Negative Prompt */}
                <div>
                  <h3 className="flex items-center space-x-2 text-sm font-semibold text-red-400 mb-3">
                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                    <span>Negative Prompt</span>
                  </h3>
                  <div className="bg-dark-900/50 p-4 rounded-xl border border-dark-700/50">
                    <p className="text-sm text-neutral-300 font-mono leading-relaxed">
                      {prompt.negative_prompt}
                    </p>
                  </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-dark-800/30 rounded-xl">
                    <CpuChipIcon className="w-5 h-5 text-secondary-400 mx-auto mb-1" />
                    <div className="text-xs text-neutral-400 font-medium">Sampler</div>
                    <div className="text-sm text-white font-semibold">{prompt.sampler}</div>
                  </div>
                  <div className="text-center p-3 bg-dark-800/30 rounded-xl">
                    <AdjustmentsHorizontalIcon className="w-5 h-5 text-primary-400 mx-auto mb-1" />
                    <div className="text-xs text-neutral-400 font-medium">Scheduler</div>
                    <div className="text-sm text-white font-semibold">{prompt.scheduler}</div>
                  </div>
                  <div className="text-center p-3 bg-dark-800/30 rounded-xl">
                    <span className="text-accent-400 text-lg font-bold block mb-1">{prompt.cfg}</span>
                    <div className="text-xs text-neutral-400 font-medium">CFG Scale</div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center space-x-2 text-xs text-neutral-500">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Saved: {new Date(prompt.created_at).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => loadPromptToGenerator(prompt)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    <PlayIcon className="w-4 h-4" />
                    <span>Load</span>
                  </button>
                  <button
                    onClick={() => copyPrompt(prompt)}
                    className="flex items-center justify-center space-x-2 bg-dark-600/50 hover:bg-dark-500/50 text-neutral-300 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-200"
                  >
                    <ClipboardDocumentIcon className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions Info */}
      <div className="section bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <PlayIcon className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-300 mb-2 font-display">Quick Actions</h3>
            <p className="text-blue-200 leading-relaxed">
              Click "Load" to automatically fill the generator form with this prompt, 
              or "Copy" to copy the prompt details to your clipboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedPrompts