interface HeaderProps {
  onAddAccount: () => void;
  onAddCompetitor: () => void;
}

export default function Header({ onAddAccount, onAddCompetitor }: HeaderProps) {
  return (
    <div className="gradient-bg text-white py-8 px-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-chart-line text-2xl"></i>
            <h1 className="text-2xl font-bold">SocialTrack</h1>
          </div>
          <div className="flex space-x-4">
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
            <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-all">
              <i className="fas fa-cog mr-2"></i>Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 