import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Camera, 
  Image, 
  TestTube, 
  Save, 
  LogOut,
  X
} from 'lucide-react'
import clsx from 'clsx'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, logout } = useAuth()

  const navItems = [
    { to: '/dashboard', icon: Camera, label: '📷 Generator' },
    { to: '/history', icon: Image, label: '🖼️ Image History' },
    { to: '/prompt-examples', icon: TestTube, label: '🧪 Prompt Examples' },
    { to: '/saved-prompts', icon: Save, label: '💾 Saved Prompts' },
  ]

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <>
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-60 bg-dark-800 border-r border-dark-700 transform transition-transform duration-300 ease-in-out',
        'md:translate-x-0 md:static md:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-700">
            <h2 className="text-xl font-bold text-primary-600">Knotty AI</h2>
            <button
              onClick={onClose}
              className="md:hidden p-1 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-primary-600 text-black'
                      : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                  )
                }
              >
                <span className="mr-3">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-dark-700">
            {user && (
              <div className="mb-4 text-sm text-gray-400">
                <div>Welcome, {user.username}</div>
                <div>Tokens: {user.tokens}</div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <LogOut size={16} className="mr-3" />
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar