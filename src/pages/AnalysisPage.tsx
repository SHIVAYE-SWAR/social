import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { Calendar, Download, Filter, Share2, TrendingUp, Users, Eye, ThumbsUp, MessageCircle } from 'lucide-react';

// Sample data - replace with real data from your API
const monthlyData = [
  { month: 'Jan', views: 1200, engagement: 850, followers: 320 },
  { month: 'Feb', views: 1900, engagement: 1200, followers: 450 },
  { month: 'Mar', views: 1600, engagement: 1100, followers: 520 },
  { month: 'Apr', views: 2100, engagement: 1400, followers: 680 },
  { month: 'May', views: 2400, engagement: 1800, followers: 750 },
  { month: 'Jun', views: 2800, engagement: 2100, followers: 890 },
];

const contentList = [
  {
    id: 1,
    title: 'Social Media Marketing Tips',
    platform: 'youtube',
    views: 1200,
    engagement: 85,
    shares: 45,
    date: '2024-03-15',
  },
  {
    id: 2,
    title: 'Content Creation Strategies',
    platform: 'instagram',
    views: 800,
    engagement: 92,
    shares: 38,
    date: '2024-03-14',
  },
  {
    id: 3,
    title: 'Digital Marketing Trends',
    platform: 'twitter',
    views: 650,
    engagement: 78,
    shares: 25,
    date: '2024-03-13',
  },
];

function AnalysisPage() {
  const [dateRange, setDateRange] = useState('last30');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('views');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  const handleShare = (contentId: number) => {
    // Implement share functionality
    console.log('Sharing content:', contentId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Controls Section */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <div className="flex gap-4">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Calendar className="w-4 h-4" />
              {dateRange === 'last30' ? 'Last 30 Days' : 'Custom Range'}
            </button>
            {showDatePicker && (
              <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border p-4 z-10">
                {/* Date picker implementation */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setDateRange('last7');
                      setShowDatePicker(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => {
                      setDateRange('last30');
                      setShowDatePicker(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    Last 30 Days
                  </button>
                  <button
                    onClick={() => {
                      setDateRange('last90');
                      setShowDatePicker(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    Last 90 Days
                  </button>
                </div>
              </div>
            )}
          </div>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">All Platforms</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-[#6e43cb] text-white rounded-lg hover:bg-[#4d2e8e]"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Views</p>
              <h3 className="text-2xl font-bold text-[#2a1959] mt-1">125.8K</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Eye className="w-6 h-6 text-[#6e43cb]" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Engagement Rate</p>
              <h3 className="text-2xl font-bold text-[#2a1959] mt-1">24.2%</h3>
            </div>
            <div className="p-3 bg-pink-100 rounded-full">
              <ThumbsUp className="w-6 h-6 text-[#cb43a4]" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5.3%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Followers</p>
              <h3 className="text-2xl font-bold text-[#2a1959] mt-1">45.2K</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8.1%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Comments</p>
              <h3 className="text-2xl font-bold text-[#2a1959] mt-1">2.8K</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+15.2%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-[#2a1959] mb-6">Growth Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stackId="1"
                  stroke="#6e43cb"
                  fill="#6e43cb"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stackId="1"
                  stroke="#cb43a4"
                  fill="#cb43a4"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-[#2a1959] mb-6">Platform Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="followers" fill="#6e43cb" />
                <Bar dataKey="engagement" fill="#cb43a4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Content Performance List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#2a1959]">Content Performance</h3>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="views">Sort by Views</option>
                <option value="engagement">Sort by Engagement</option>
                <option value="date">Sort by Date</option>
              </select>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y">
          {contentList.map((content) => (
            <div key={content.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#2a1959]">{content.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {content.platform} • {content.date}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Views</p>
                    <p className="font-semibold text-[#2a1959]">{content.views}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Engagement</p>
                    <p className="font-semibold text-[#2a1959]">{content.engagement}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Shares</p>
                    <p className="font-semibold text-[#2a1959]">{content.shares}</p>
                  </div>
                  <button
                    onClick={() => handleShare(content.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Share2 className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;