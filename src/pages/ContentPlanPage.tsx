import React, { useState } from 'react';
import {
  Calendar,
  Hash,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Youtube,
  Instagram,
  Twitter,
  Upload,
  Image as ImageIcon,
  Link,
  Save,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ContentPlan } from '../types/database.types';

type ViewType = 'month' | 'week' | 'day';
type Platform = 'youtube' | 'instagram' | 'tiktok' | 'twitter';
type ContentStatus = 'draft' | 'scheduled' | 'published';

interface ContentBlock {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  status: ContentStatus;
  scheduledDate: string;
  hashtags: string[];
  thumbnail?: string;
}

const platformIcons = {
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  tiktok: Upload,
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-600',
  scheduled: 'bg-blue-100 text-blue-600',
  published: 'bg-green-100 text-green-600',
};

function ContentPlanPage() {
  const [view, setView] = useState<ViewType>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: '1',
      title: 'Social Media Marketing Tips',
      description: 'Top 10 tips for growing your social media presence',
      platform: 'instagram',
      status: 'scheduled',
      scheduledDate: '2024-03-20',
      hashtags: ['#socialmedia', '#marketing', '#tips'],
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      title: 'Content Creation Workshop',
      description: 'Learn the basics of content creation',
      platform: 'youtube',
      status: 'draft',
      scheduledDate: '2024-03-22',
      hashtags: ['#workshop', '#content', '#learn'],
    },
  ]);

  const [newContent, setNewContent] = useState<Partial<ContentBlock>>({
    title: '',
    description: '',
    platform: 'instagram',
    hashtags: [],
    status: 'draft',
    scheduledDate: new Date().toISOString().split('T')[0],
  });

  const [seoScore, setSeoScore] = useState(0);
  const [suggestedHashtags] = useState([
    { tag: '#contentcreator', reach: '2.5M' },
    { tag: '#socialmedia', reach: '1.8M' },
    { tag: '#digitalmarketing', reach: '3.2M' },
  ]);

  const handleCreateContent = () => {
    if (!newContent.title || !newContent.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const content: ContentBlock = {
      id: Date.now().toString(),
      title: newContent.title!,
      description: newContent.description!,
      platform: newContent.platform as Platform,
      status: newContent.status as ContentStatus,
      scheduledDate: newContent.scheduledDate!,
      hashtags: newContent.hashtags || [],
    };

    setContentBlocks([...contentBlocks, content]);
    setShowCreateModal(false);
    setNewContent({
      title: '',
      description: '',
      platform: 'instagram',
      hashtags: [],
      status: 'draft',
      scheduledDate: new Date().toISOString().split('T')[0],
    });
    toast.success('Content created successfully!');
  };

  const calculateSEOScore = (text: string) => {
    // Simple SEO score calculation
    const score = Math.min(
      ((text.length > 50 ? 30 : 0) +
        (text.includes('content') ? 20 : 0) +
        (text.includes('marketing') ? 20 : 0) +
        (newContent.hashtags?.length || 0) * 10),
      100
    );
    setSeoScore(score);
  };

  const addHashtag = (tag: string) => {
    if (!newContent.hashtags?.includes(tag)) {
      setNewContent({
        ...newContent,
        hashtags: [...(newContent.hashtags || []), tag],
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#2a1959]">Content Planning</h1>
          <p className="text-gray-600">Plan and schedule your content across platforms</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#6e43cb] text-white rounded-lg hover:bg-[#4d2e8e]"
        >
          <Plus className="w-5 h-5" />
          Create Content
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                className="p-1 hover:bg-gray-100 rounded-full"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(selectedDate.getMonth() - 1);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button
                className="p-1 hover:bg-gray-100 rounded-full"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(selectedDate.getMonth() + 1);
                  setSelectedDate(newDate);
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex gap-2">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded-lg ${
                  view === 'month' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded-lg ${
                  view === 'week' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded-lg ${
                  view === 'day' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
                }`}
              >
                Day
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
              className="px-3 py-1.5 border rounded-lg bg-white"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
              <option value="tiktok">TikTok</option>
            </select>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-7 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-4 text-center font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {[...Array(35)].map((_, index) => (
            <div
              key={index}
              className="min-h-[150px] p-2 border-t border-l hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{index + 1}</span>
                <button className="p-1 hover:bg-purple-100 rounded-full">
                  <Plus className="w-4 h-4 text-purple-600" />
                </button>
              </div>
              {contentBlocks
                .filter((block) => new Date(block.scheduledDate).getDate() === index + 1)
                .map((block) => {
                  const PlatformIcon = platformIcons[block.platform];
                  return (
                    <div
                      key={block.id}
                      className="p-2 bg-white rounded-lg shadow-sm border mb-2 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <PlatformIcon className="w-4 h-4" />
                        <span className="text-sm font-medium truncate">{block.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            statusColors[block.status]
                          }`}
                        >
                          {block.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(block.scheduledDate).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#2a1959]">Create New Content</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Content Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newContent.title}
                    onChange={(e) => {
                      setNewContent({ ...newContent, title: e.target.value });
                      calculateSEOScore(e.target.value);
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                    placeholder="Enter content title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newContent.description}
                    onChange={(e) => {
                      setNewContent({ ...newContent, description: e.target.value });
                      calculateSEOScore(e.target.value);
                    }}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                    placeholder="Enter content description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Platform
                    </label>
                    <select
                      value={newContent.platform}
                      onChange={(e) =>
                        setNewContent({ ...newContent, platform: e.target.value as Platform })
                      }
                      className="w-full px-4 py-2 border rounded-lg bg-white"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="twitter">Twitter</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule Date
                    </label>
                    <input
                      type="date"
                      value={newContent.scheduledDate}
                      onChange={(e) =>
                        setNewContent({ ...newContent, scheduledDate: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* SEO Score */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#2a1959]">SEO Score</h3>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      seoScore >= 70
                        ? 'bg-green-100 text-green-600'
                        : seoScore >= 40
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {seoScore}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Title length is optimal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">Add more relevant keywords</span>
                  </div>
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hashtags
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {newContent.hashtags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() =>
                          setNewContent({
                            ...newContent,
                            hashtags: newContent.hashtags?.filter((_, i) => i !== index),
                          })
                        }
                        className="hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Suggested Hashtags</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedHashtags.map((hashtag, index) => (
                      <button
                        key={index}
                        onClick={() => addHashtag(hashtag.tag)}
                        className="px-3 py-1 border rounded-full text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span>{hashtag.tag}</span>
                        <span className="text-xs text-gray-500">{hashtag.reach}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media
                </label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag and drop your media here, or{' '}
                    <button className="text-[#6e43cb] hover:text-[#4d2e8e]">browse</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateContent}
                  className="px-4 py-2 bg-[#6e43cb] text-white rounded-lg hover:bg-[#4d2e8e]"
                >
                  Create Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentPlanPage;