import { useState } from 'react'

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Positive Prompt */}
      <div className="section">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          🟢 Positive Prompt
        </label>
        <textarea
          value={positivePrompt}
          onChange={(e) => onPositiveChange(e.target.value)}
          placeholder="Enter positive prompt..."
          className="w-full h-36 p-4 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-gray-400 resize-vertical focus:outline-none focus:ring-2 focus:ring-primary-600 font-mono text-sm"
        />
        
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <label className="flex items-center text-sm text-gray-400">
            <input type="checkbox" disabled className="mr-2" />
            Anime Faces
          </label>
          <label className="flex items-center text-sm text-gray-400">
            <input type="checkbox" disabled className="mr-2" />
            Clothing
          </label>
          <label className="flex items-center text-sm text-gray-400">
            <input type="checkbox" disabled className="mr-2" />
            Expressions
          </label>
          <label className="flex items-center text-sm text-gray-400">
            <input type="checkbox" disabled className="mr-2" />
            Environment
          </label>
        </div>
      </div>

      {/* Negative Prompt */}
      <div className="section">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          🔴 Negative Prompt
        </label>
        <textarea
          value={negativePrompt}
          onChange={(e) => onNegativeChange(e.target.value)}
          placeholder="Enter negative prompt..."
          className="w-full h-36 p-4 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-gray-400 resize-vertical focus:outline-none focus:ring-2 focus:ring-primary-600 font-mono text-sm"
        />
        
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {Object.keys(negPresets).map((presetKey) => (
            <label key={presetKey} className="flex items-center text-sm text-gray-300">
              <input
                type="checkbox"
                checked={selectedPresets.includes(presetKey)}
                onChange={() => handlePresetToggle(presetKey)}
                className="mr-2 accent-primary-600"
              />
              {presetKey.charAt(0).toUpperCase() + presetKey.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromptInputs