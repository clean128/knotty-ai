import { useState } from 'react'

interface StyleSelectorProps {
  onStyleChange: (prompt: string, negativePrompt: string) => void
}

const STYLES = {
  "None": {
    prompt: "",
    negative_prompt: ""
  },
  "KnottyAI Detailed & vibrant Anime": {
    prompt: "anime artwork, (anime style:1.2), key visual, vibrant, studio anime, highly detailed",
    negative_prompt: "Watermark, Text, censored, deformed, bad anatomy, disfigured, poorly drawn face, mutated, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, disconnected head, malformed hands, long neck, mutated hands and fingers, bad hands, missing fingers, cropped, worst quality, low quality, mutation, poorly drawn, huge calf, bad hands, fused hand, missing hand, disappearing arms, disappearing thigh, disappearing calf, disappearing legs, missing fingers, fused fingers, abnormal eye proportion, Abnormal hands, abnormal legs, abnormal feet, abnormal fingers, photo, deformed, black and white, realism, disfigured, low contrast, bad artist, bad image, bad quality, worst quality, low quality, impossible anatomy, bad anatomy, fingers are melted, no spacing between fingers, fingers are bad looking, hands are weird, hands are bad looking"
  },
  "Realistic Portrait": {
    prompt: "photorealistic, portrait, professional lighting, detailed skin texture, high resolution, DSLR quality",
    negative_prompt: "cartoon, anime, painting, drawing, sketch, low quality, blurry, pixelated"
  },
  "Fantasy Art": {
    prompt: "fantasy art, magical, ethereal, detailed background, mystical atmosphere, high fantasy",
    negative_prompt: "modern, contemporary, realistic, photography, low quality"
  },
  "Digital Art": {
    prompt: "digital art, concept art, detailed, vibrant colors, professional artwork",
    negative_prompt: "traditional media, sketch, unfinished, low quality"
  }
}

const LIGHTING_PROMPTS = {
  "2.7D": "<lora:43stl1ght1ngXLP2:0.7> <lora:zy_AmateurStyle_v2:0.3>, ((dynamic lighting:0.6, low light:1, dim light:1.1))"
}

const DETAIL_LEVELS = {
  "Highly Detailed": {
    prompt: "Details pushed to the extreme, 4k, UHD, FHD, amazing artwork, award winning illustration, masterpiece, clean edges, fully formed face which is beautiful, clothing and accessories are highly detailed and hair is finely detailed",
    negative_prompt: "lowres, blurry, pixelated, jpeg artifacts, sketchy lines, unfinished details, bad clothing textures, messy hair strands, soft focus, incomplete anatomy, low quality texture, lack of detail, muddy shading, washed out, distorted proportions, poorly rendered accessories"
  }
}

const StyleSelector = ({ onStyleChange }: StyleSelectorProps) => {
  const [selectedStyle, setSelectedStyle] = useState("None")
  const [selectedLighting, setSelectedLighting] = useState("None")
  const [selectedDetail, setSelectedDetail] = useState("None")

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style)
    const styleData = STYLES[style as keyof typeof STYLES]
    if (styleData) {
      onStyleChange(styleData.prompt, styleData.negative_prompt)
    }
  }

  const handleLightingChange = (lighting: string) => {
    setSelectedLighting(lighting)
    const lightingPrompt = LIGHTING_PROMPTS[lighting as keyof typeof LIGHTING_PROMPTS]
    if (lightingPrompt) {
      onStyleChange(lightingPrompt, "")
    }
  }

  const handleDetailChange = (detail: string) => {
    setSelectedDetail(detail)
    const detailData = DETAIL_LEVELS[detail as keyof typeof DETAIL_LEVELS]
    if (detailData) {
      onStyleChange(detailData.prompt, detailData.negative_prompt)
    }
  }

  return (
    <div className="section">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Style Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🎨 Style
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => handleStyleChange(e.target.value)}
            className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            {Object.keys(STYLES).map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        {/* Lighting Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            💡 Realistic Setting
          </label>
          <select
            value={selectedLighting}
            onChange={(e) => handleLightingChange(e.target.value)}
            className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option value="None">None</option>
            <option value="2.7D">2.7D Realistic</option>
          </select>
        </div>

        {/* Detail Level Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🎯 Detail Level
          </label>
          <select
            value={selectedDetail}
            onChange={(e) => handleDetailChange(e.target.value)}
            className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option value="None">None</option>
            <option value="Highly Detailed">Highly Detailed</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default StyleSelector