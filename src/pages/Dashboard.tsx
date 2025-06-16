import { useAuth } from "../contexts/AuthContext";
import GeneratorForm from "../components/GeneratorForm";
import TokenCounter from "../components/TokenCounter";
import { SparklesIcon, UserIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="glass-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                Welcome back, <span className="gradient-text">{user?.username}</span>
              </h1>
              <p className="text-neutral-400 font-medium">Ready to create something amazing?</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <TokenCounter />
            <div className="p-2 bg-accent-500/20 rounded-xl">
              <SparklesIcon className="w-6 h-6 text-accent-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Generator Form */}
      <GeneratorForm />
    </div>
  );
};

export default Dashboard;