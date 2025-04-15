'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const { darkMode, toggleDarkMode } = useTheme();
  
  // Mock user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    avatar: 'https://i.pravatar.cc/150?u=johndoe',
    password: '********',
  });
  
  // Mock social accounts
  const [socialAccounts, setSocialAccounts] = useState([
    { id: 1, platform: 'Facebook', handle: '@myBusinessPage', isTracking: true },
    { id: 2, platform: 'Instagram', handle: '@mybusiness', isTracking: true },
    { id: 3, platform: 'Twitter', handle: '@mybusinesstweets', isTracking: true },
    { id: 4, platform: 'LinkedIn', handle: '@my-business-linked', isTracking: true },
  ]);

  const toggleTracking = (id: number) => {
    setSocialAccounts(
      socialAccounts.map(account =>
        account.id === id ? { ...account, isTracking: !account.isTracking } : account
      )
    );
  };

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the server
    alert('Profile updated successfully!');
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the server
    alert('Password changed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-black dark:text-white mb-6">Settings</h2>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'profile' 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'account' 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Account
              </button>
              <button 
                onClick={() => setActiveTab('social')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'social' 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Social Accounts
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'preferences' 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Preferences
              </button>
              <button 
                onClick={() => setActiveTab('help')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'help' 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Help & Support
              </button>
            </nav>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => router.push('/')}
                className="w-full px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white mb-6">Profile Information</h2>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      Change Avatar
                    </button>
                  </div>
                  <div className="flex-1">
                    <form onSubmit={updateProfile} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-black dark:text-white font-medium mb-2">Full Name</label>
                        <input 
                          type="text"
                          id="name"
                          value={user.name}
                          onChange={(e) => setUser({...user, name: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-black dark:text-white font-medium mb-2">Email Address</label>
                        <input 
                          type="email"
                          id="email"
                          value={user.email}
                          onChange={(e) => setUser({...user, email: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="username" className="block text-black dark:text-white font-medium mb-2">Username</label>
                        <input 
                          type="text"
                          id="username"
                          value={user.username}
                          onChange={(e) => setUser({...user, username: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="pt-4">
                        <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Account Section */}
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white mb-6">Account Settings</h2>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Change Password</h3>
                  <form onSubmit={changePassword} className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-black dark:text-white font-medium mb-2">Current Password</label>
                      <input 
                        type="password"
                        id="currentPassword"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-black dark:text-white font-medium mb-2">New Password</label>
                      <input 
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-black dark:text-white font-medium mb-2">Confirm New Password</label>
                      <input 
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="pt-4">
                      <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Danger Zone</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Deleting your account is permanent. All your data will be permanently removed.
                  </p>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Social Accounts Section */}
            {activeTab === 'social' && (
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white mb-6">Social Media Accounts</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Manage your connected social media accounts and tracking preferences.
                </p>
                <div className="space-y-4">
                  {socialAccounts.map(account => (
                    <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className={`social-icon platform-${account.platform.toLowerCase()}`}>
                          <i className={`fab fa-${account.platform.toLowerCase()}`}></i>
                        </div>
                        <div>
                          <h3 className="font-medium text-black dark:text-white">{account.platform}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{account.handle}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <label htmlFor={`tracking-${account.id}`} className="mr-2 text-gray-700 dark:text-gray-300">
                            Tracking
                          </label>
                          <label className="inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              id={`tracking-${account.id}`}
                              checked={account.isTracking} 
                              onChange={() => toggleTracking(account.id)}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Connect New Account
                  </button>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white mb-6">Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Dark Mode</h3>
                      <p className="text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={toggleDarkMode}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Email Notifications</h3>
                      <p className="text-gray-600 dark:text-gray-400">Receive email updates about your account</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Competitor Activity Alerts</h3>
                      <p className="text-gray-600 dark:text-gray-400">Get notified when competitors post new content</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Data Refresh Interval</h3>
                      <p className="text-gray-600 dark:text-gray-400">How often should we fetch new data</p>
                    </div>
                    <select className="dashboard-select bg-white dark:bg-gray-800 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500">
                      <option>Every hour</option>
                      <option>Every 6 hours</option>
                      <option>Every 12 hours</option>
                      <option>Every 24 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Help & Support Section */}
            {activeTab === 'help' && (
              <div>
                <h2 className="text-xl font-bold text-black dark:text-white mb-6">Help & Support</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2 cursor-pointer" 
                      onClick={() => {
                        const docContent = document.getElementById('documentation-content');
                        if (docContent) {
                          docContent.classList.toggle('hidden');
                        }
                      }}
                    >
                      <h3 className="font-medium text-black dark:text-white">Documentation</h3>
                      <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Find detailed guides and documentation for all features.
                    </p>
                    
                    <div id="documentation-content" className="hidden">
                      <div className="mt-4">
                        <div className="flex justify-between items-center cursor-pointer"
                          onClick={() => {
                            const socialContent = document.getElementById('social-accounts-content');
                            if (socialContent) {
                              socialContent.classList.toggle('hidden');
                            }
                          }}
                        >
                          <h4 className="font-medium text-black dark:text-white mb-2">Connect Social Media Accounts</h4>
                          <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <div id="social-accounts-content" className="space-y-6 mt-4 hidden">
                          {/* Facebook */}
                          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                            <div className="bg-blue-50 dark:bg-blue-900 px-4 py-2 flex items-center">
                              <div className="social-icon platform-facebook mr-2">
                                <i className="fab fa-facebook-f"></i>
                              </div>
                              <h5 className="font-medium text-black dark:text-white">Facebook</h5>
                            </div>
                            <div className="p-4">
                              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Facebook Developer Portal</a> and log in</li>
                                <li>Create a new app by clicking "Create App" and select "Business" app type</li>
                                <li>Set up "Facebook Login" product for your app</li>
                                <li>Under Settings &gt; Basic, find your App ID and App Secret</li>
                                <li>Add your redirect URI: {`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/facebook`}</li>
                                <li>Configure "Valid OAuth Redirect URIs" in Facebook Login settings</li>
                                <li>Request permissions: public_profile, pages_show_list, pages_read_engagement, instagram_basic</li>
                                <li>Return to our platform and click "Connect New Account" in Social Accounts settings</li>
                                <li>Select Facebook and authorize the connection</li>
                              </ol>
                            </div>
                          </div>

                          {/* Instagram */}
                          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                            <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 flex items-center">
                              <div className="social-icon platform-instagram mr-2">
                                <i className="fab fa-instagram"></i>
                              </div>
                              <h5 className="font-medium text-black dark:text-white">Instagram</h5>
                            </div>
                            <div className="p-4">
                              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Instagram API access is managed through the Facebook Developer platform</li>
                                <li>Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Facebook Developer Portal</a> and log in</li>
                                <li>Follow steps 2-4 from the Facebook instructions above</li>
                                <li>Add the Instagram Basic Display product to your app</li>
                                <li>Link your Instagram Business Account to your Facebook Page</li>
                                <li>Configure OAuth redirect URI: {`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/instagram`}</li>
                                <li>Request permissions: user_profile, user_media</li>
                                <li>Return to our platform and click "Connect New Account" in Social Accounts settings</li>
                                <li>Select Instagram and authorize the connection</li>
                              </ol>
                            </div>
                          </div>

                          {/* Twitter */}
                          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                            <div className="bg-blue-50 dark:bg-blue-900 px-4 py-2 flex items-center">
                              <div className="social-icon platform-twitter mr-2">
                                <i className="fab fa-twitter"></i>
                              </div>
                              <h5 className="font-medium text-black dark:text-white">Twitter</h5>
                            </div>
                            <div className="p-4">
                              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Go to <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Twitter Developer Portal</a> and log in</li>
                                <li>Create a project and app in the developer portal</li>
                                <li>Change app environment to "Development"</li>
                                <li>Set up User authentication settings:</li>
                                <li>Set App Type to "Web App"</li>
                                <li>Add Callback URI: {`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/twitter`}</li>
                                <li>Request scopes: tweet.read, users.read, follows.read</li>
                                <li>From the "Keys and Tokens" tab, note your API Key (client ID) and API Secret</li>
                                <li>Return to our platform and click "Connect New Account" in Social Accounts settings</li>
                                <li>Select Twitter and authorize the connection</li>
                              </ol>
                            </div>
                          </div>

                          {/* YouTube */}
                          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                            <div className="bg-red-50 dark:bg-red-900 px-4 py-2 flex items-center">
                              <div className="social-icon platform-youtube mr-2">
                                <i className="fab fa-youtube"></i>
                              </div>
                              <h5 className="font-medium text-black dark:text-white">YouTube</h5>
                            </div>
                            <div className="p-4">
                              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Go to <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Cloud Console</a> and log in</li>
                                <li>Create a new project</li>
                                <li>Enable the YouTube Data API v3 from the Library</li>
                                <li>Go to "OAuth consent screen" and configure your app (External use type)</li>
                                <li>Add scopes: youtube.readonly, youtube.force-ssl</li>
                                <li>Create OAuth credentials (OAuth client ID, Web application type)</li>
                                <li>Add authorized redirect URI: {`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/youtube`}</li>
                                <li>Note your Client ID and Client Secret</li>
                                <li>Return to our platform and click "Connect New Account" in Social Accounts settings</li>
                                <li>Select YouTube and authorize the connection</li>
                              </ol>
                            </div>
                          </div>

                          {/* LinkedIn */}
                          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                            <div className="bg-blue-50 dark:bg-blue-900 px-4 py-2 flex items-center">
                              <div className="social-icon platform-linkedin mr-2">
                                <i className="fab fa-linkedin"></i>
                              </div>
                              <h5 className="font-medium text-black dark:text-white">LinkedIn</h5>
                            </div>
                            <div className="p-4">
                              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Go to <a href="https://www.linkedin.com/developers/apps" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LinkedIn Developer Portal</a> and log in</li>
                                <li>Create a new app</li>
                                <li>Complete the required information and app review</li>
                                <li>In Auth tab, add redirect URL: {`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/linkedin`}</li>
                                <li>Request OAuth scopes: r_emailaddress, r_liteprofile, w_member_social</li>
                                <li>Note your Client ID and Client Secret</li>
                                <li>For Company Pages access, also request the r_organization_social scope</li>
                                <li>Return to our platform and click "Connect New Account" in Social Accounts settings</li>
                                <li>Select LinkedIn and authorize the connection</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        const docContent = document.getElementById('documentation-content');
                        if (docContent) {
                          docContent.classList.toggle('hidden');
                        }
                      }}
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 mt-4"
                    >
                      Documentation
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-black dark:text-white mb-2">Frequently Asked Questions</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Find answers to common questions.
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      View FAQs
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-black dark:text-white mb-2">Contact Support</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Need help? Our support team is ready to assist you.
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Contact Support
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-black dark:text-white mb-2">About</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Learn more about our company and mission.
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      About Us
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 