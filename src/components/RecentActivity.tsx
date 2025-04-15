export default function RecentActivity() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          <li className="p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center space-x-4">
              <div className="social-icon platform-instagram">
                <i className="fab fa-instagram"></i>
              </div>
              <div className="flex-1">
                <p className="font-medium">New post engagement is higher than average</p>
                <p className="text-gray-500 text-sm">Your last Instagram post has 24% higher engagement than your average</p>
              </div>
              <div className="text-gray-500 text-sm">2 hours ago</div>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center space-x-4">
              <div className="social-icon platform-facebook">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div className="flex-1">
                <p className="font-medium">Now outperforming @competitor1</p>
                <p className="text-gray-500 text-sm">Your Facebook engagement rate surpassed your competitor in this category</p>
              </div>
              <div className="text-gray-500 text-sm">1 day ago</div>
            </div>
          </li>
          <li className="p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-center space-x-4">
              <div className="social-icon platform-twitter">
                <i className="fab fa-twitter"></i>
              </div>
              <div className="flex-1">
                <p className="font-medium">Viral tweet detected</p>
                <p className="text-gray-500 text-sm">Your tweet has been shared 500+ times in the last hour</p>
              </div>
              <div className="text-gray-500 text-sm">3 days ago</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
} 