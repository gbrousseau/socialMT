interface AddCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCompetitorModal({ isOpen, onClose }: AddCompetitorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md transition-all transform">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Track Competitor Account</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Platform</label>
              <div className="grid grid-cols-3 gap-3">
                <button className="platform-facebook p-3 rounded-lg text-white flex flex-col items-center">
                  <i className="fab fa-facebook-f text-xl mb-1"></i>
                  <span className="text-sm">Facebook</span>
                </button>
                <button className="platform-twitter p-3 rounded-lg text-white flex flex-col items-center">
                  <i className="fab fa-twitter text-xl mb-1"></i>
                  <span className="text-sm">Twitter</span>
                </button>
                <button className="platform-instagram p-3 rounded-lg text-white flex flex-col items-center">
                  <i className="fab fa-instagram text-xl mb-1"></i>
                  <span className="text-sm">Instagram</span>
                </button>
                <button className="platform-linkedin p-3 rounded-lg text-white flex flex-col items-center">
                  <i className="fab fa-linkedin-in text-xl mb-1"></i>
                  <span className="text-sm">LinkedIn</span>
                </button>
                <button className="platform-youtube p-3 rounded-lg text-white flex flex-col items-center">
                  <i className="fab fa-youtube text-xl mb-1"></i>
                  <span className="text-sm">YouTube</span>
                </button>
                <button className="bg-gray-200 p-3 rounded-lg text-gray-700 flex flex-col items-center">
                  <i className="fas fa-plus text-xl mb-1"></i>
                  <span className="text-sm">Other</span>
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="competitorHandle" className="block text-gray-700 mb-2">Competitor's Handle</label>
              <input
                type="text"
                id="competitorHandle"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g. @competitor"
              />
            </div>
            <div>
              <label htmlFor="yourHandle" className="block text-gray-700 mb-2">Compare With Your Account</label>
              <select
                id="yourHandle"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                defaultValue="@mybusinesspage (Facebook)"
              >
                <option>@mybusiness (Instagram)</option>
                <option>@mybusinesspage (Facebook)</option>
                <option>@mybusinesstweets (Twitter)</option>
              </select>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Receive alerts when this competitor posts</span>
              </label>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all">
                Track Competitor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 