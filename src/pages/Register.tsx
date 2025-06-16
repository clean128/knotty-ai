import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { 
  SparklesIcon,
  UserIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  GiftIcon
} from '@heroicons/react/24/outline'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(username, password, confirmPassword)
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text">
                  Join Knotty AI
                </h1>
                <p className="text-sm text-neutral-400 font-medium">Create your account</p>
              </div>
            </div>
          </div>

          {/* Free Tokens Banner */}
          <div className="mb-8 p-4 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-xl border border-accent-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <GiftIcon className="w-5 h-5 text-accent-400" />
              <span className="font-semibold text-accent-300">Welcome Bonus</span>
            </div>
            <p className="text-center text-accent-200 font-medium">
              40 free tokens when you sign up!
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field pl-12"
                  required
                />
              </div>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12"
                  required
                />
              </div>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="mt-6 p-4 bg-accent-500/20 border border-accent-500/30 rounded-xl text-accent-300 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="font-medium">
                  Registration complete! You can{' '}
                  <Link to="/login" className="underline hover:text-accent-200">
                    login now
                  </Link>
                  .
                </span>
              </div>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-8">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 p-3 bg-dark-700/30 hover:bg-dark-600/30 rounded-xl text-neutral-400 hover:text-neutral-300 transition-all duration-200 font-medium"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register