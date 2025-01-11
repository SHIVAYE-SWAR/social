import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Key,
  Trash2,
  Upload,
  Youtube,
  Instagram,
  Twitter,
  Upload as TikTok,
  RefreshCw,
  Link as LinkIcon,
  Save,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

interface ConnectedPlatform {
  id: string;
  name: string;
  connected: boolean;
  lastSync?: string;
  icon: any;
}

function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    contentReminders: true,
    weeklyDigest: false,
    platformUpdates: true,
  });

  const [platforms, setPlatforms] = useState<ConnectedPlatform[]>([
    { id: '1', name: 'YouTube', connected: true, lastSync: '2024-03-15', icon: Youtube },
    { id: '2', name: 'Instagram', connected: false, icon: Instagram },
    { id: '3', name: 'Twitter', connected: true, lastSync: '2024-03-14', icon: Twitter },
    { id: '4', name: 'TikTok', connected: false, icon: TikTok },
  ]);

  const [apiKeys, setApiKeys] = useState({
    youtubeApiKey: '••••••••••••••••',
    instagramToken: '',
    twitterApiKey: '••••••••••••••••',
    tiktokApiKey: '',
  });

  const handleProfileUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password updated successfully');
    setProfile({ ...profile, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePlatformConnection = (platformId: string) => {
    setPlatforms(platforms.map(platform => {
      if (platform.id === platformId) {
        return {
          ...platform,
          connected: !platform.connected,
          lastSync: platform.connected ? undefined : new Date().toISOString().split('T')[0],
        };
      }
      return platform;
    }));
    toast.success('Platform connection updated');
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirm) {
      toast.success('Account scheduled for deletion');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#2a1959] mb-6">Settings</h1>

        {/* Settings Navigation */}
        <div className="flex gap-4 mb-6">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'platforms', label: 'Platforms', icon: Globe },
            { id: 'api', label: 'API Keys', icon: Key },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-[#6e43cb] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-[#2a1959] mb-4">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-1 bg-[#6e43cb] rounded-full cursor-pointer">
                    <Upload className="w-4 h-4 text-white" />
                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                  </label>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Profile Photo</h3>
                  <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-[#2a1959] mb-4">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={handleProfileUpdate}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-[#6e43cb] text-white rounded-lg hover:bg-[#4d2e8e] disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Password Change */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-[#2a1959] mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={profile.currentPassword}
                    onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-[#6e43cb] text-white rounded-lg hover:bg-[#4d2e8e]"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-100">
              <h2 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Danger Zone
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-[#2a1959] mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Receive notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() =>
                        setNotifications({ ...notifications, [key]: !value })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6e43cb]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6e43cb]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Integration */}
        {activeTab === 'platforms' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-[#2a1959] mb-4">Connected Platforms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map(platform => {
                  const PlatformIcon = platform.icon;
                  return (
                    <div key={platform.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PlatformIcon className="w-6 h-6" />
                          <div>
                            <h3 className="font-medium text-gray-900">{platform.name}</h3>
                            {platform.connected && platform.lastSync && (
                              <p className="text-sm text-gray-500">
                                Last synced: {platform.lastSync}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {platform.connected && (
                            <button
                              onClick={() => toast.success('Sync started')}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => togglePlatformConnection(platform.id)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              platform.connected
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-[#6e43cb] text-white hover:bg-[#4d2e8e]'
                            }`}
                          >
                            {platform.connected ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Auto-posting Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-[#2a1959] mb-4">Auto-posting Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-gray-900">Cross-platform Posting</h3>
                    <p className="text-sm text-gray-500">
                      Automatically share content across connected platforms
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6e43cb]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6e43cb]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-gray-900">Best Time Optimization</h3>
                    <p className="text-sm text-gray-500">
                      Schedule posts for optimal engagement times
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6e43cb]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6e43cb]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Keys */}
        {activeTab === 'api' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-[#2a1959] mb-4">API Key Management</h2>
            <div className="space-y-4">
              {Object.entries(apiKeys).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={value}
                      onChange={(e) => setApiKeys({ ...apiKeys, [key]: e.target.value })}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                    />
                    <button
                      onClick={() => toast.success('API key copied to clipboard')}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;