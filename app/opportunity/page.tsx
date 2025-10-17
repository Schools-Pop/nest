'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface Opportunity {
  id: string;
  title: string;
  category: 'internship' | 'event' | 'scholarship';
  description: string;
  deadline: string; // YYYY-MM-DD format
  date: string; // YYYY-MM-DD format
  image: string;
  icon: string;
  company?: string;
  location?: string;
  stipend?: string;
}

const OPPORTUNITIES: Opportunity[] = [
  // Internships
  { id: '1', title: 'Software Engineering Internship', category: 'internship', description: 'Summer internship with competitive stipend', deadline: '2024-02-15', date: '2024-06-01', image: '💻', icon: '🎯', company: 'Google', location: 'Kigali', stipend: '50,000 RWF/month' },
  { id: '2', title: 'Data Science Internship', category: 'internship', description: 'Work on real-world ML projects', deadline: '2024-02-20', date: '2024-06-15', image: '📊', icon: '🎯', company: 'Microsoft', location: 'Remote', stipend: '45,000 RWF/month' },
  { id: '3', title: 'Product Management Internship', category: 'internship', description: 'Learn product development from industry experts', deadline: '2024-03-01', date: '2024-07-01', image: '📱', icon: '🎯', company: 'Andela', location: 'Kigali' },

  // Events
  { id: '4', title: 'Tech Conference 2024', category: 'event', description: 'Annual conference with 50+ speakers', deadline: '2024-01-30', date: '2024-02-15', image: '🎤', icon: '📅', location: 'Kigali Convention Center' },
  { id: '5', title: 'Coding Bootcamp', category: 'event', description: '2-week intensive coding program', deadline: '2024-02-01', date: '2024-02-20', image: '👨‍💻', icon: '📅', location: 'ALU Campus' },
  { id: '6', title: 'Career Fair', category: 'event', description: 'Meet 100+ companies recruiting', deadline: '2024-02-10', date: '2024-03-05', image: '🤝', icon: '📅', location: 'CMU Africa' },
  { id: '7', title: 'AI Workshop', category: 'event', description: 'Hands-on AI and ML workshop', deadline: '2024-02-28', date: '2024-03-15', image: '🤖', icon: '📅', location: 'Online' },

  // Scholarships
  { id: '8', title: 'African Tech Leaders Scholarship', category: 'scholarship', description: 'Full tuition scholarship for top performers', deadline: '2024-03-15', date: '2024-09-01', image: '🎓', icon: '🏆', stipend: 'Full Tuition + 30K RWF/month' },
  { id: '9', title: 'Women in Tech Scholarship', category: 'scholarship', description: 'Dedicated funding for women in technology', deadline: '2024-03-20', date: '2024-09-15', image: '👩‍🎓', icon: '🏆', stipend: '50% Tuition + 20K RWF/month' },
  { id: '10', title: 'Excellence in STEM Grant', category: 'scholarship', description: 'Merit-based grant for STEM students', deadline: '2024-04-01', date: '2024-10-01', image: '🔬', icon: '🏆', stipend: '25K RWF/month' },
];

export default function OpportunityPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['internship', 'event', 'scholarship']);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 1)); // February 2024

  const categories = [
    { id: 'internship', label: 'Internships', icon: '🎯', bgColor: 'bg-indigo-600', borderColor: 'border-indigo-600', lightBg: 'bg-indigo-50', dotColor: 'bg-indigo-600' },
    { id: 'event', label: 'Events', icon: '📅', bgColor: 'bg-purple-600', borderColor: 'border-purple-600', lightBg: 'bg-purple-50', dotColor: 'bg-purple-600' },
    { id: 'scholarship', label: 'Scholarships', icon: '🏆', bgColor: 'bg-green-600', borderColor: 'border-green-600', lightBg: 'bg-green-50', dotColor: 'bg-green-600' },
  ];

  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITIES.filter(opp => selectedCategories.includes(opp.category));
  }, [selectedCategories]);

  // Get opportunities for specific date
  const opportunitiesForDate = selectedDate
    ? filteredOpportunities.filter(opp => opp.deadline === selectedDate || opp.date === selectedDate)
    : [];

  // Get days with opportunities
  const daysWithOpportunities = useMemo(() => {
    const days = new Set<string>();
    filteredOpportunities.forEach(opp => {
      days.add(opp.deadline);
      days.add(opp.date);
    });
    return days;
  }, [filteredOpportunities]);

  // Get unique categories with opportunities for a specific date
  const getCategoriesForDate = (dateStr: string) => {
    const cats = new Set<string>();
    OPPORTUNITIES.forEach(opp => {
      if ((opp.deadline === dateStr || opp.date === dateStr) && selectedCategories.includes(opp.category)) {
        cats.add(opp.category);
      }
    });
    return Array.from(cats);
  };

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const formatDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? { bgColor: cat.bgColor, hoverColor: cat.bgColor.replace('600', '700') } : { bgColor: 'bg-indigo-600', hoverColor: 'bg-indigo-700' };
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="max-w-7xl mx-auto bg-white shadow-sm border-b py-4 px-8">
        <div className="  flex flex-col sm:flex-row justify-between items-start sm:items-center sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Opportunities</h1>
            <p className="text-sm sm:text-base text-gray-600">Internships, Events & Scholarships</p>
          </div>
          <Link
            href="/addopportunity"
            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base text-center"
          >
            + Add Opportunity
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Filter by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {categories.map(cat => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-4 py-3 rounded-lg font-semibold transition text-sm sm:text-base flex items-center justify-center gap-2 border-2 ${
                    isSelected
                      ? `${cat.bgColor} ${cat.borderColor} text-white border-current shadow-lg`
                      : `bg-white ${cat.borderColor} text-gray-700 border-2 hover:${cat.lightBg}`
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-white/20' : 'bg-gray-200'}`}>
                    {isSelected ? '✓' : '○'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-base sm:text-lg text-gray-900">{monthYear}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition font-semibold"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition font-semibold"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, idx) => {
                  const dateStr = day ? formatDate(day) : '';
                  const hasOpps = dateStr && daysWithOpportunities.has(dateStr);
                  const isSelected = dateStr && selectedDate === dateStr;
                  const categoriesForDate = dateStr ? getCategoriesForDate(dateStr) : [];

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(dateStr || null)}
                      disabled={!day}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition relative ${
                        !day
                          ? 'bg-transparent cursor-default'
                          : isSelected
                          ? 'bg-indigo-600 text-white border-2 border-indigo-700 shadow-md'
                          : hasOpps
                          ? 'bg-indigo-50 text-indigo-900 border-2 border-indigo-200 hover:bg-indigo-100'
                          : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {day && (
                        <>
                          <span>{day}</span>
                          {hasOpps && (
                            <div className="flex gap-1 mt-0.5">
                              {categoriesForDate.map(catId => {
                                const cat = categories.find(c => c.id === catId);
                                return (
                                  <div
                                    key={catId}
                                    className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : cat?.dotColor}`}
                                    title={cat?.label}
                                  ></div>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t text-xs text-gray-600 space-y-2">
                <p><span className="inline-block w-3 h-3 bg-indigo-50 border border-indigo-200 rounded mr-2"></span>Has opportunities</p>
                <p><span className="inline-block w-3 h-3 bg-indigo-600 rounded mr-2"></span>Selected date</p>
                <div className="pt-2 border-t">
                  <p className="font-semibold mb-1">Dot colors:</p>
                  {categories.map(cat => (
                    <p key={cat.id} className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${cat.dotColor}`}></span>
                      <span>{cat.label}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Opportunities List */}
          <div className="lg:col-span-2">
            {selectedDate ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {new Date(selectedDate + 'T00:00:00').toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {opportunitiesForDate.length} opportunity{opportunitiesForDate.length !== 1 ? 'ies' : ''} for this day
                  </p>
                </div>

                {opportunitiesForDate.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="text-gray-600">No opportunities on this date</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {opportunitiesForDate.map(opp => {
                      const categoryColor = getCategoryColor(opp.category);
                      return (
                        <div key={opp.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-lg transition border-l-4 border-indigo-600">
                          <div className="flex items-start gap-3 sm:gap-4 mb-3">
                            <div className="text-3xl sm:text-4xl">{opp.image}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">{opp.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-600">{opp.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                              {opp.icon} {opp.category.charAt(0).toUpperCase() + opp.category.slice(1)}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                            {opp.company && (
                              <div className="bg-gray-50 p-2 rounded">
                                <p className="text-gray-600">Company</p>
                                <p className="font-semibold text-gray-900">{opp.company}</p>
                              </div>
                            )}
                            {opp.location && (
                              <div className="bg-gray-50 p-2 rounded">
                                <p className="text-gray-600">Location</p>
                                <p className="font-semibold text-gray-900">{opp.location}</p>
                              </div>
                            )}
                            {opp.stipend && (
                              <div className="bg-green-50 p-2 rounded col-span-2">
                                <p className="text-green-600">Compensation</p>
                                <p className="font-semibold text-green-900">{opp.stipend}</p>
                              </div>
                            )}
                          </div>

                          <Link
                            href={`/opportunity/${opp.id}`}
                            className={`w-full inline-block px-4 py-2 ${categoryColor.bgColor} text-white font-semibold rounded-lg hover:${categoryColor.hoverColor} transition text-sm text-center`}
                          >
                            Learn More
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Select a Date</h3>
                <p className="text-sm sm:text-base text-gray-600">Click on a date in the calendar to view opportunities and deadlines</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
