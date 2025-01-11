import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  BarChart2,
  Hash,
  Settings,
  User,
  Bell,
  MessageCircle,
  LogOut,
  Layout,
  Search,
  ChevronDown,
  Plus,
  ChevronLeft,
  Eye,
  ThumbsUp,
  TrendingUp,
  Users,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomCalendar from '../components/CustomCalendar';
import AnalysisPage from './AnalysisPage';
import ContentPlanPage from './ContentPlanPage';
import HashtagPage from './HashtagPage';
import SettingsPage from './SettingsPage';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'Your next content strategy session is tomorrow at 10 AM', time: '2h ago' },
    { id: 2, text: 'New service available: Video Production Package', time: '4h ago' },
    { id: 3, text: 'Trending topic alert: #ContentCreation is gaining traction', time: '6h ago' },
  ]);

  const quickStats = [
    { title: 'Total Views', value: '45.2K', change: '+12.5%', icon: Eye },
    { title: 'Engagement Rate', value: '24.3%', change: '+5.8%', icon: ThumbsUp },
    { title: 'Growth Rate', value: '18.7%', change: '+3.2%', icon: TrendingUp },
    { title: 'Followers', value: '12.4K', change: '+8.9%', icon: Users },
  ];

  const upcomingContent = [
    { id: 1, title: 'Social Media Strategy', platform: 'YouTube', date: '2024-03-20' },
    { id: 2, title: 'Content Creation Tips', platform: 'Instagram', date: '2024-03-22' },
    { id: 3, title: 'Marketing Trends', platform: 'Twitter', date: '2024-03-25' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'analysis':
        return <AnalysisPage />;
      case 'content':
        return <ContentPlanPage />;
      case 'hashtags':
        return <HashtagPage />;
      case 'settings':
        return <SettingsPage />;
      case 'home':
      default:
        return (
          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-[#2a1959] mt-1">{stat.value}</h3>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <stat.icon className="w-6 h-6 text-[#6e43cb]" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-green-500 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Widget */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#2a1959] mb-4">Content Calendar</h2>
                <CustomCalendar />
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-6">
                {/* Upcoming Content */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[#2a1959]">Upcoming Content</h2>
                    <button className="text-[#6e43cb] hover:text-[#4d2e8e] text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {upcomingContent.map((content) => (
                      <div
                        key={content.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <h3 className="font-medium text-[#2a1959]">{content.title}</h3>
                          <p className="text-sm text-gray-500">{content.platform}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{content.date}</p>
                          <button className="text-[#6e43cb] text-sm flex items-center gap-1 mt-1">
                            Details <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-[#2a1959] mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 mt-2 rounded-full bg-[#6e43cb]" />
                        <div>
                          <p className="text-sm text-gray-600">{notification.text}</p>
                          <span className="text-xs text-gray-400 mt-1">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3fc] flex">
      {/* Sidebar */}
      <nav className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-lg transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-2xl font-bold text-[#2a1959] ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              ContentPro
            </h2>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className={`w-5 h-5 transform transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <ul className="space-y-2">
            {[
              { icon: Home, label: 'Dashboard', page: 'home' },
              { icon: Layout, label: 'Content Planning', page: 'content' },
              { icon: BarChart2, label: 'Analytics', page: 'analysis' },
              { icon: Hash, label: 'Hashtag Manager', page: 'hashtags' },
              { icon: Settings, label: 'Settings', page: 'settings' },
            ].map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setCurrentPage(item.page)}
                  className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} ${
                    currentPage === item.page ? 'text-[#6e43cb]' : 'text-gray-600'
                  } hover:bg-[#f5f3fc] w-full p-2 rounded-lg group relative`}
                >
                  <item.icon className="w-5 h-5" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <h1 className="text-2xl font-semibold text-[#2a1959]">
                Welcome, {user?.firstName}
              </h1>
              <div className="max-w-xl flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-[#6e43cb] text-white rounded-lg hover:bg-[#4d2e8e]">
                <Plus className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="p-2 hover:bg-[#f5f3fc] rounded-full">
                  <Bell className="w-6 h-6 text-[#6e43cb]" />
                  <span className="absolute top-0 right-0 bg-[#cb43a4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#6e43cb] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-[#2a1959] font-medium">
                    {user?.username}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-[#f5f3fc]"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}

        {/* Chatbot */}
        <div className="fixed bottom-4 right-4">
          {showChatbot ? (
            <div className="bg-white rounded-lg shadow-lg w-80 h-96 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-[#2a1959]">Content Assistant</h3>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="h-72 overflow-y-auto border-t border-b p-4">
                <div className="text-gray-600">
                  Hi! Need help with your content strategy?
                </div>
              </div>
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:border-[#6e43cb]"
                />
                <button className="bg-[#6e43cb] text-white px-4 py-2 rounded-r-lg">
                  Send
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowChatbot(true)}
              className="bg-[#6e43cb] text-white p-3 rounded-full shadow-lg hover:bg-[#4d2e8e]"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;