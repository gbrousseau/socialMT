interface ConnectedAccountsProps {
  onAddAccount: () => void;
}

export default function ConnectedAccounts({ onAddAccount }: ConnectedAccountsProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">My Connected Accounts</h2>
        <div className="flex space-x-2">
          <button className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
            <i className="fas fa-sync-alt mr-1"></i> Refresh Data
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Instagram account card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all card-hover">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="social-icon platform-instagram">
                <i className="fab fa-instagram"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg">Instagram</h3>
                <p className="text-gray-600">@mybusiness</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Followers</span>
                <span className="font-bold">15,678 <span className="text-green-500 text-sm">(+234)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Engagement</span>
                <span className="font-bold text-green-500">6.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New Likes (7d)</span>
                <span className="font-bold">1,234</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
            <button className="text-blue-600 hover:text-blue-800" title="Analytics">
              <i className="fas fa-chart-simple"></i>
            </button>
            <button className="text-purple-600 hover:text-purple-800" title="Edit">
              <i className="fas fa-pen"></i>
            </button>
            <button className="text-red-600 hover:text-red-800" title="Remove">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        {/* Facebook account card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all card-hover">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="social-icon platform-facebook">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg">Facebook</h3>
                <p className="text-gray-600">@mybusinesspage</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Followers</span>
                <span className="font-bold">23,456 <span className="text-green-500 text-sm">(+142)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Engagement</span>
                <span className="font-bold text-green-500">4.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New Likes (7d)</span>
                <span className="font-bold">876</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
            <button className="text-blue-600 hover:text-blue-800" title="Analytics">
              <i className="fas fa-chart-simple"></i>
            </button>
            <button className="text-purple-600 hover:text-purple-800" title="Edit">
              <i className="fas fa-pen"></i>
            </button>
            <button className="text-red-600 hover:text-red-800" title="Remove">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        {/* Add account card */}
        <div
          onClick={onAddAccount}
          className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-purple-500 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <i className="fas fa-plus text-purple-700 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-700 text-center">Connect another social media account</h3>
          <p className="text-gray-500 text-sm text-center mt-1">Track engagement across all platforms</p>
        </div>
      </div>
    </div>
  );
} 