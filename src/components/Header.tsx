import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onAddAccount: () => void;
  onAddCompetitor: () => void;
}

export default function Header({ onAddAccount, onAddCompetitor }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="gradient-bg text-white py-8 px-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <i className="fas fa-chart-line text-2xl"></i>
              <h1 className="text-2xl font-bold">SocialTrack</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="bg-white text-purple-700 p-2 rounded-lg font-semibold hover:bg-purple-100 transition-all"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
            </button>
            <button
              onClick={onAddAccount}
              className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-all"
            >
              <i className="fas fa-plus mr-2"></i>Add Account
            </button>
            <button
              onClick={onAddCompetitor}
              className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-all"
            >
              <i className="fas fa-user-group mr-2"></i>Add Competitor
            </button>
            <Link 
              href="/settings" 
              className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-all flex items-center"
            >
              <i className="fas fa-cog mr-2"></i>Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 