import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  CameraIcon,
  PhotoIcon,
  BeakerIcon,
  BookmarkIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: "/dashboard", icon: CameraIcon, label: "Generator" },
    { to: "/history", icon: PhotoIcon, label: "Image History" },
    { to: "/prompt-examples", icon: BeakerIcon, label: "Prompt Examples" },
    { to: "/saved-prompts", icon: BookmarkIcon, label: "Saved Prompts" },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-72 bg-dark-900/95 backdrop-blur-xl border-r border-dark-700/50 transform transition-transform duration-300 ease-in-out shadow-2xl",
          "md:translate-x-0 md:static md:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-700/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold gradient-text">
                  Knotty AI
                </h2>
                <p className="text-xs text-neutral-400 font-medium">v1.0.37</p>
              </div>
            </div>
            <button onClick={onClose} className="md:hidden icon-button">
              <XMarkIcon className="w-5 h-5" />
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
                    "flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow"
                      : "text-neutral-300 hover:bg-dark-700/50 hover:text-white"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={clsx(
                        "w-5 h-5 mr-3 transition-colors duration-200",
                        isActive
                          ? "text-white"
                          : "text-neutral-400 group-hover:text-white"
                      )}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-dark-700/50">
            {user && (
              <div className="mb-4 p-4 bg-dark-800/30 rounded-xl backdrop-blur-sm">
                <div className="text-sm font-medium text-neutral-200 mb-1">
                  Welcome, {user.username}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-neutral-400">
                    <span className="font-semibold text-accent-400">
                      {user.tokens}
                    </span>{" "}
                    tokens
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-xl hover:from-red-500 hover:to-red-400 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dark-950"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
