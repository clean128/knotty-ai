import { useState } from 'react'
import { 
  PlusCircleIcon, 
  MinusCircleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

interface PromptInputsProps {
  positivePrompt: string
  negativePrompt: string
  onPositiveChange: (value: string) => void
  onNegativeChange: (value: string) => void
}

const negPresets = {
  default: "abstract, simplistic, inaccurate, non-representational, myneg:1.3, cum is too white, cum is not slightly transparent, textures are not highly detailed, score_5, score_4, score_6, bad artist, worse quality, bad quality, low quality, low resolution, low texture detail, clothing items are bad quality, myneg:1.2, anatomy incorrect, mouth not drawn correctly, weird lips, weird teeth, teeth are not shaped right, lips are not shaped right, mouth is bad, bad face, bad hair, bad eyes, mouth is misshapen , mouth that is open looks wrong, minimalist, minimalistic, ((large or huge boobs:1.3)), BREAK, ((badly drawn fingers:1.3, fingers melted:1.2, melted fingers, artifacts, hands look bad:1.3, band hands, bad fingers, fingers are messy:1.3))",
  pony: "incorrect muzzle shape, wrong nostril placement, deformed ears, fused front hooves, misaligned cutie mark",
  eyes: "wonky pupils, misaligned irises, cross-eyed, iris not centered, glow bleed, overly large pupils",
  hands: "melted fingers, fused knuckles, incorrect palm structure, unnatural wrist pose",
  face: "misshapen mouth, uneven lips, broken jaw, crooked nose, eyes not level",
  render: "pixelated edges, overly smoothed textures, aliasing, color banding, visual glitches",
  nsfw: "visible genitalia, inappropriate anatomy, explicit exposure, graphic details"
}

const PromptInputs = ({ 
  positivePrompt, 
  negativePrompt, 
  onPositiveChange, 
  onNegativeChange 
}: PromptInputsProps) => {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([])

  const handlePresetToggle = (presetKey: string) => {
    const preset = negPresets[presetKey as keyof typeof negPresets]
    const isSelected = selectedPresets.includes(presetKey)

    if (isSelected) {
      // Remove preset
      setSelectedPresets(prev => prev.filter(p => p !== presetKey))
      const regex = new RegExp(`\\s*,?\\s*${preset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g')
      const newValue = negativePrompt.replace(regex, '').replace(/^,\s*|\s*,\s*$|,\s*,/g, ', ').trim()
      onNegativeChange(newValue)
    } else {
      // Add preset
      setSelectedPresets(prev => [...prev, presetKey])
      const newValue = negativePrompt.trim() + (negativePrompt.trim() ? ', ' : '') + preset
      onNegativeChange(newValue)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Positive Prompt */}
      <div className="section">
        <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-200 mb-4">
          <PlusCircleIcon className="w-5 h-5 text-accent-400" />
          <span>Positive Prompt</span>
        </label>
        <textarea
          value={positivePrompt}
          onChange={(e) => onPositiveChange(e.target.value)}
          placeholder="Enter positive prompt..."
          className="textarea-field h-40"
        />
        
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <label className="flex items-center text-sm text-neutral-400 cursor-not-allowed">
            <input type="checkbox" disabled className="mr-2 opacity-50" />
            Anime Faces
          </label>
          <label className="flex items-center text-sm text-neutral-400 cursor-not-allowed">
            <input type="checkbox" disabled className="mr-2 opacity-50" />
            Clothing
          </label>
          <label className="flex items-center text-sm text-neutral-400 cursor-not-allowed">
            <input type="checkbox" disabled className="mr-2 opacity-50" />
            Expressions
          </label>
          <label className="flex items-center text-sm text-neutral-400 cursor-not-allowed">
            <input type="checkbox" disabled className="mr-2 opacity-50" />
            Environment
          </label>
        </div>
      </div>

      {/* Negative Prompt */}
      <div className="section">
        <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-200 mb-4">
          <MinusCircleIcon className="w-5 h-5 text-red-400" />
          <span>Negative Prompt</span>
        </label>
        <textarea
          value={negativePrompt}
          onChange={(e) => onNegativeChange(e.target.value)}
          placeholder="Enter negative prompt..."
          className="textarea-field h-40"
        />
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {Object.keys(negPresets).map((presetKey) => {
            const isSelected = selectedPresets.includes(presetKey)
            return (
              <label 
                key={presetKey} 
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'bg-red-500/20 border border-red-500/30 text-red-300' 
                    : 'bg-dark-700/30 hover:bg-dark-600/30 text-neutral-300 hover:text-white'
                }`}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handlePresetToggle(presetKey)}
                    className="sr-only"
                  />
                  {isSelected ? (
                    <CheckCircleIcon className="w-4 h-4 text-red-400" />
                  ) : (
                    <XCircleIcon className="w-4 h-4 text-neutral-500" />
                  )}
                </div>
                <span className="text-sm font-medium capitalize">
                  {presetKey}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PromptInputs