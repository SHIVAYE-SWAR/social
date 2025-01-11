import React, { useState, useEffect } from 'react';
import {
  Search,
  Hash,
  TrendingUp,
  Save,
  Plus,
  AlertCircle,
  CheckCircle,
  Copy,
  Bookmark,
  Share2,
  BarChart2,
  Wand2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface HashtagGroup {
  id: string;
  name: string;
  hashtags: string[];
  platform: string;
}

interface KeywordAnalysis {
  keyword: string;
  density: number;
  competition: number;
  score: number;
  suggestions: string[];
}

function HashtagPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [savedGroups, setSavedGroups] = useState<HashtagGroup[]>([
    {
      id: '1',
      name: 'Social Media Marketing',
      hashtags: ['#socialmedia', '#marketing', '#digitalmarketing', '#contentcreator'],
      platform: 'instagram',
    },
    {
      id: '2',
      name: 'Content Creation',
      hashtags: ['#content', '#creator', '#influencer', '#contentcreation'],
      platform: 'twitter',
    },
  ]);
  const [trendingHashtags] = useState([
    { tag: '#contentcreator', reach: '2.5M', growth: '+15%' },
    { tag: '#socialmediatips', reach: '1.8M', growth: '+8%' },
    { tag: '#digitalmarketing', reach: '3.2M', growth: '+12%' },
  ]);
  const [seoScore, setSeoScore] = useState(0);
  const [keywordAnalysis, setKeywordAnalysis] = useState<KeywordAnalysis[]>([]);

  useEffect(() => {
    analyzeSEO();
  }, [title, description]);

  const analyzeSEO = () => {
    const score = Math.min(
      ((title.length > 0 ? 20 : 0) +
        (description.length > 50 ? 30 : 0) +
        (title.includes('content') ? 25 : 0) +
        (description.includes('content') ? 25 : 0)),
      100
    );
    setSeoScore(score);

    const keywords = [...new Set([...title.split(' '), ...description.split(' ')])];
    const analysis = keywords.map(keyword => ({
      keyword,
      density: Math.random() * 5,
      competition: Math.random() * 100,
      score: Math.random() * 100,
      suggestions: ['content marketing', 'digital strategy', 'social media'],
    }));
    setKeywordAnalysis(analysis);
  };

  const generateTitleSuggestions = async () => {
    if (!title.trim()) {
      toast.error('Please enter a base title first');
      return;
    }

    setIsGenerating(true);
    try {
      // Call Make.com webhook
      await fetch('https://hook.eu2.make.com/5vg4xj5zscng409s2gebsgfz92gizbsk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          platform: selectedPlatform,
          timestamp: new Date().toISOString(),
          action: 'generate_titles'
        })
      });

      // Call Gemini API
      const response = await fetch(import.meta.env.VITE_GEMINI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate 3 engaging, SEO-optimized alternative titles for a social media post. Original title: "${title}". Make them catchy and suitable for ${selectedPlatform}. Return only a JSON array of strings.`,
          type: 'title_suggestions'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate suggestions');
      }

      const data = await response.json();
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setTitleSuggestions(data.suggestions);
        toast.success('Generated new title suggestions!');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating titles:', error);
      toast.error('Failed to generate title suggestions');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveGroup = () => {
    if (hashtag) {
      const newGroup: HashtagGroup = {
        id: Date.now().toString(),
        name: 'New Group',
        hashtags: [hashtag],
        platform: selectedPlatform,
      };
      setSavedGroups([...savedGroups, newGroup]);
      setHashtag('');
      toast.success('Hashtag group saved!');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Analyzer */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-[#2a1959] mb-4">SEO Analyzer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Title
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                    placeholder="Enter your content title"
                  />
                  <button
                    onClick={generateTitleSuggestions}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-[#6e43cb] text-white rounded-lg hover:bg-[#4d2e8e] disabled:opacity-50 flex items-center gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
                {titleSuggestions.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {titleSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                        <span className="text-sm text-[#2a1959]">{suggestion}</span>
                        <button
                          onClick={() => setTitle(suggestion)}
                          className="text-[#6e43cb] text-sm hover:text-[#4d2e8e]"
                        >
                          Use
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                  rows={4}
                  placeholder="Enter your content description"
                />
              </div>
            </div>
          </div>

          {/* SEO Score */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#2a1959]">SEO Score</h3>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
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
            <div className="space-y-4">
              {keywordAnalysis.slice(0, 3).map((analysis, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#2a1959]">{analysis.keyword}</span>
                    <span className="text-sm text-gray-500">
                      Density: {analysis.density.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-[#6e43cb] rounded-full"
                          style={{ width: `${analysis.score}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      Score: {Math.round(analysis.score)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hashtag Manager */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-[#2a1959] mb-4">Hashtag Manager</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={hashtag}
                    onChange={(e) => setHashtag(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6e43cb] focus:border-transparent"
                    placeholder="Enter hashtag"
                  />
                </div>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="px-4 py-2 border rounded-lg bg-white"
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="tiktok">TikTok</option>
                </select>
                <button
                  onClick={handleSaveGroup}
                  className="px-4 py-2 bg-[#6e43cb] text-white rounded-lg hover:bg-[#4d2e8e]"
                >
                  <Save className="w-5 h-5" />
                </button>
              </div>

              {/* Trending Hashtags */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#2a1959] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Hashtags
                </h3>
                <div className="space-y-3">
                  {trendingHashtags.map((hashtag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Hash className="w-5 h-5 text-[#6e43cb]" />
                        <span>{hashtag.tag}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{hashtag.reach}</span>
                        <span className="text-sm text-green-500">{hashtag.growth}</span>
                        <button
                          onClick={() => copyToClipboard(hashtag.tag)}
                          className="p-1 hover:bg-gray-100 rounded-lg"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Saved Groups */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a1959] mb-4">Saved Groups</h3>
            <div className="space-y-4">
              {savedGroups.map((group) => (
                <div key={group.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-[#2a1959]">{group.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{group.platform}</span>
                      <button
                        onClick={() => copyToClipboard(group.hashtags.join(' '))}
                        className="p-1 hover:bg-gray-100 rounded-lg"
                      >
                        <Copy className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-[#6e43cb] rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
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

export default HashtagPage;