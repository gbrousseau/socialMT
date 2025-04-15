export default function CompetitorComparison() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Performance vs. Competitors</h2>
        <select 
          className="bg-gray-100 border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
          defaultValue="Facebook"
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Twitter</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="chart-container flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center p-6">
            <i className="fas fa-chart-bar text-4xl text-gray-400 mb-3"></i>
            <h3 className="font-medium text-gray-800">Competitor Comparison Chart</h3>
            <p className="text-gray-500 mt-1">Visualize how your performance compares against tracked competitors</p>
            <div className="mt-4 flex space-x-3 justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Your Account</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Competitors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 