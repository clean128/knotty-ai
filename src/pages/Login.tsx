import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

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
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary-600 mb-2">
              Knotty AI Generator v1.0.37
            </h1>
            <p className="text-gray-400 text-sm">
              Created by kaylabytes/Blackshadows
            </p>
          </div>

          <div className="text-center mb-6">
            <div className="text-sm text-gray-300 leading-relaxed">
              <strong>
                $1.65 | 40 tokens • $5.50 | 150 tokens • $11.50 | 325 tokens •
                $17.75 | 500 tokens
              </strong>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
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
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-2 text-center">
            <Link
              to="/register"
              className="block text-primary-600 hover:text-primary-500 text-sm underline"
            >
              Register Now!
            </Link>
            <a
              href="https://beastgenerator.xyz/buy.phtml"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-500 text-sm underline"
            >
              Buy more tokens
            </a>
            <a
              href="https://beastgenerator.xyz/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-500 text-sm underline"
            >
              Privacy Policy
            </a>
            <a
              href="https://t.me/clean1280"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary-600 hover:text-primary-500 text-sm underline"
            >
              Contact on telegram
            </a>
          </div>

          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg text-blue-300 text-sm">
            <strong>Demo:</strong> Use username "demo" and password "demo" to
            try the application
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
