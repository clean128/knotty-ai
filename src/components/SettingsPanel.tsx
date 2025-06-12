interface SettingsPanelProps {
  sampler: string
  scheduler: string
  cfg: number
  onSamplerChange: (value: string) => void
  onSchedulerChange: (value: string) => void
  onCfgChange: (value: number) => void
}

const samplerDescriptions = {
  "DPM++ 2M": "Balanced, high quality output. Great for general use.",
  "DPM++ 2M Karras": "Sharper edges, faster convergence. Works well with low steps.",
  "DPM++ SDE": "Stable at higher CFG values. Good for realism.",
  "DPM++ SDE Karras": "Sharper and smoother mix. Great for portraits.",
  "DDIM": "Fast and smooth, slightly softer images."
}

const schedulerDescriptions = {
  "Default": "Simple linear noise reduction schedule.",
  "Karras": "Smooth Karras curve, often improves detail.",
  "Exponential": "Quick denoising at start, slows near the end.",
  "Polyexponential": "Experimental hybrid curve with strong detail buildup.",
  "Normal": "Basic normal distribution curve. Balanced and safe."
}

const SettingsPanel = ({
  sampler,
  scheduler,
  cfg,
  onSamplerChange,
  onSchedulerChange,
  onCfgChange
}: SettingsPanelProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* CFG Scale */}
      <div className="section">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          CFG Scale: {cfg}
        </label>
        <input
          type="range"
          min="3"
          max="8"
          step="1"
          value={cfg}
          onChange={(e) => onCfgChange(Number(e.target.value))}
          className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="text-center mt-2 text-sm text-gray-400">
          ← Creative | Accurate →
        </div>
      </div>

      {/* Sampler */}
      <div className="section">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Sampler
        </label>
        <select
          value={sampler}
          onChange={(e) => onSamplerChange(e.target.value)}
          className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
        >
          {Object.keys(samplerDescriptions).map((samplerName) => (
            <option key={samplerName} value={samplerName}>
              {samplerName}
            </option>
          ))}
        </select>
        <div className="mt-2 text-xs text-gray-400">
          {samplerDescriptions[sampler as keyof typeof samplerDescriptions]}
        </div>
      </div>

      {/* Scheduler */}
      <div className="section">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Scheduler
        </label>
        <select
          value={scheduler}
          onChange={(e) => onSchedulerChange(e.target.value)}
          className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
        >
          {Object.keys(schedulerDescriptions).map((schedulerName) => (
            <option key={schedulerName} value={schedulerName}>
              {schedulerName}
            </option>
          ))}
        </select>
        <div className="mt-2 text-xs text-gray-400">
          {schedulerDescriptions[scheduler as keyof typeof schedulerDescriptions]}
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel