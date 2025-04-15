export default function EngagementOverview() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Engagement Overview</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-lg">Performance Trends</h3>
            <p className="text-gray-600">Last 30 days engagement data</p>
          </div>
          <select 
            className="bg-gray-100 border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            defaultValue="Last 30 days"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Engagement chart will appear here</p>
        </div>
      </div>
    </div>
  );
} 