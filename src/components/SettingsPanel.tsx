import { 
  AdjustmentsHorizontalIcon,
  CpuChipIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

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
        <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-200 mb-4">
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-primary-400" />
          <span>CFG Scale: {cfg}</span>
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="3"
            max="8"
            step="1"
            value={cfg}
            onChange={(e) => onCfgChange(Number(e.target.value))}
            className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((cfg - 3) / 5) * 100}%, #374151 ${((cfg - 3) / 5) * 100}%, #374151 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-neutral-400 font-medium">
            <span>Creative</span>
            <span>Accurate</span>
          </div>
        </div>
      </div>

      {/* Sampler */}
      <div className="section">
        <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-200 mb-4">
          <CpuChipIcon className="w-5 h-5 text-secondary-400" />
          <span>Sampler</span>
        </label>
        <select
          value={sampler}
          onChange={(e) => onSamplerChange(e.target.value)}
          className="w-full p-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 mb-3"
        >
          {Object.keys(samplerDescriptions).map((samplerName) => (
            <option key={samplerName} value={samplerName}>
              {samplerName}
            </option>
          ))}
        </select>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {samplerDescriptions[sampler as keyof typeof samplerDescriptions]}
        </p>
      </div>

      {/* Scheduler */}
      <div className="section">
        <label className="flex items-center space-x-2 text-sm font-semibold text-neutral-200 mb-4">
          <ClockIcon className="w-5 h-5 text-accent-400" />
          <span>Scheduler</span>
        </label>
        <select
          value={scheduler}
          onChange={(e) => onSchedulerChange(e.target.value)}
          className="w-full p-3 bg-dark-700/50 border border-dark-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 mb-3"
        >
          {Object.keys(schedulerDescriptions).map((schedulerName) => (
            <option key={schedulerName} value={schedulerName}>
              {schedulerName}
            </option>
          ))}
        </select>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {schedulerDescriptions[scheduler as keyof typeof schedulerDescriptions]}
        </p>
      </div>
    </div>
  )
}

export default SettingsPanel