interface CompetitorBenchmarksProps {
  onAddCompetitor: () => void;
}

export default function CompetitorBenchmarks({ onAddCompetitor }: CompetitorBenchmarksProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">Competitor Benchmarks</h2>
        <button className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center">
          <i className="fas fa-sync-alt mr-1"></i> Refresh Data
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Platform</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Handle</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Followers</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Engagement Rate</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Posts (30d)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">VS You</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {/* Competitor 1 */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="social-icon platform-instagram">
                    <i className="fab fa-instagram"></i>
                  </div>
                  <div className="ml-2 text-black dark:text-white">Instagram</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">@competitor1</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-black dark:text-white">32,456</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">+1.2% (7d)</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-black dark:text-white">5.8%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Average 6.1%</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black dark:text-white">12</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="comparison-badge badge-worse">
                  <i className="fas fa-arrow-down mr-1"></i>17% lower
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3" title="Compare">
                  <i className="fas fa-chart-line"></i>
                </button>
                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" title="Remove">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>

            {/* Competitor 2 */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="social-icon platform-facebook">
                    <i className="fab fa-facebook-f"></i>
                  </div>
                  <div className="ml-2 text-black dark:text-white">Facebook</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">@topcompetitor</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-black dark:text-white">45,892</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">+0.8% (7d)</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-black dark:text-white">7.2%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Average 6.5%</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black dark:text-white">8</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="comparison-badge badge-better">
                  <i className="fas fa-arrow-up mr-1"></i>9% higher
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3" title="Compare">
                  <i className="fas fa-chart-line"></i>
                </button>
                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" title="Remove">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>

            {/* Competitor 3 */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="social-icon platform-twitter">
                    <i className="fab fa-twitter"></i>
                  </div>
                  <div className="ml-2 text-black dark:text-white">Twitter</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">@industryleader</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-black dark:text-white">89,123</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">+2.1% (7d)</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-black dark:text-white">3.9%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Average 4.2%</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black dark:text-white">23</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="comparison-badge badge-neutral">
                  <i className="fas fa-equals mr-1"></i>similar
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3" title="Compare">
                  <i className="fas fa-chart-line"></i>
                </button>
                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" title="Remove">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex items-center justify-center border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onAddCompetitor}
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 flex items-center"
          >
            <i className="fas fa-plus-circle mr-2"></i> Add new competitor to track
          </button>
        </div>
      </div>
    </div>
  );
} 