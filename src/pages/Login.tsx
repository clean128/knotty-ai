import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { 
  SparklesIcon,
  UserIcon,
  LockClosedIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text">
                  Knotty AI Generator
                </h1>
                <p className="text-sm text-neutral-400 font-medium">v1.0.37</p>
              </div>
            </div>
            <p className="text-neutral-400 text-sm font-medium">
              Created by kaylabytes/Blackshadows
            </p>
          </div>

          {/* Pricing Info */}
          <div className="text-center mb-8 p-4 bg-dark-800/30 rounded-xl backdrop-blur-sm border border-dark-700/30">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <CurrencyDollarIcon className="w-5 h-5 text-primary-400" />
              <span className="text-sm font-semibold text-neutral-200">Token Packages</span>
            </div>
            <div className="text-sm text-neutral-300 leading-relaxed space-y-1">
              <div className="flex justify-between">
                <span>40 tokens</span>
                <span className="font-semibold text-primary-400">$1.65</span>
              </div>
              <div className="flex justify-between">
                <span>150 tokens</span>
                <span className="font-semibold text-primary-400">$5.50</span>
              </div>
              <div className="flex justify-between">
                <span>325 tokens</span>
                <span className="font-semibold text-primary-400">$11.50</span>
              </div>
              <div className="flex justify-between">
                <span>500 tokens</span>
                <span className="font-semibold text-primary-400">$17.75</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
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
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/register"
                className="flex items-center justify-center space-x-2 p-3 bg-accent-600/20 hover:bg-accent-600/30 border border-accent-600/30 rounded-xl text-accent-300 hover:text-accent-200 transition-all duration-200 font-medium"
              >
                <UserPlusIcon className="w-4 h-4" />
                <span>Register</span>
              </Link>
              <a
                href="https://beastgenerator.xyz/buy.phtml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-3 bg-primary-600/20 hover:bg-primary-600/30 border border-primary-600/30 rounded-xl text-primary-300 hover:text-primary-200 transition-all duration-200 font-medium"
              >
                <CurrencyDollarIcon className="w-4 h-4" />
                <span>Buy Tokens</span>
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://beastgenerator.xyz/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-3 bg-dark-700/30 hover:bg-dark-600/30 rounded-xl text-neutral-400 hover:text-neutral-300 transition-all duration-200 text-sm font-medium"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Privacy</span>
              </a>
              <a
                href="https://t.me/clean1280"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-3 bg-dark-700/30 hover:bg-dark-600/30 rounded-xl text-neutral-400 hover:text-neutral-300 transition-all duration-200 text-sm font-medium"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;