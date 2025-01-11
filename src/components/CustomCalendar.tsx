import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, X, Calendar, Hash, Upload, Youtube, Instagram, Twitter, Plus } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

type ViewType = 'month' | 'week' | 'day';
type ContentStatus = 'draft' | 'scheduled' | 'published';
type Platform = 'youtube' | 'instagram' | 'tiktok' | 'twitter';

interface ContentBlock {
  id: string;
  title: string;
  platform: Platform;
  status: ContentStatus;
  date: Date;
  thumbnail?: string;
}

const platformIcons = {
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  tiktok: Upload, // Using Upload icon as a temporary replacement for TikTok
};

function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="text-gray-300 p-2 text-center">
          {prevMonthDays - i}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = new Date().getDate() === i && 
                     new Date().getMonth() === month && 
                     new Date().getFullYear() === year;
      
      days.push(
        <div
          key={i}
          className={`min-h-[100px] p-2 border-t border-l ${
            isToday ? 'bg-purple-50' : ''
          }`}
        >
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isToday ? 'font-bold text-purple-600' : ''}`}>
              {i}
            </span>
            <button className="p-1 hover:bg-purple-100 rounded-full">
              <Plus className="w-4 h-4 text-purple-600" />
            </button>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowMonthSelector(!showMonthSelector)}
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-lg"
          >
            <span className="font-medium">
              {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
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

      {/* Month Selector Dropdown */}
      {showMonthSelector && (
        <div className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border p-2">
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, index) => (
              <button
                key={month}
                onClick={() => {
                  setSelectedDate(new Date(selectedDate.setMonth(index)));
                  setShowMonthSelector(false);
                }}
                className="px-3 py-2 text-sm hover:bg-purple-50 rounded-lg"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="border rounded-lg">
        <div className="grid grid-cols-7">
          {DAYS.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 border-b">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}

export default CustomCalendar;