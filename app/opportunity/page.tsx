'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { getOpportunities } from '@/lib/supabase/queries';

interface Opportunity {
  id: string;
  title: string;
  category: string;
  description: string;
  full_description: string;
  deadline: string;
  date: string;
  location: string;
  company?: string;
  stipend?: string;
  duration?: string;
  eligibility: string;
  criteria: string;
  requirements: string;
  application_link?: string;
}

const CATEGORY_CONFIG = [
  { id: 'internship', label: 'Internships', icon: '🎯', bgColor: 'bg-indigo-600', borderColor: 'border-indigo-600', lightBg: 'bg-indigo-50', dotColor: 'bg-indigo-600' },
  { id: 'event', label: 'Events', icon: '📅', bgColor: 'bg-purple-600', borderColor: 'border-purple-600', lightBg: 'bg-purple-50', dotColor: 'bg-purple-600' },
  { id: 'scholarship', label: 'Scholarships', icon: '🏆', bgColor: 'bg-green-600', borderColor: 'border-green-600', lightBg: 'bg-green-50', dotColor: 'bg-green-600' },
];

export default function OpportunityPage() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['internship', 'event', 'scholarship']);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fetch opportunities from Supabase
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const response = await getOpportunities();
        if (response.success) {
          setOpportunities(response.data || []);
        } else {
          setError(response.error || 'Failed to load opportunities');
        }
      } catch (err) {
        setError('Failed to load opportunities');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => selectedCategories.includes(opp.category));
  }, [opportunities, selectedCategories]);

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
    opportunities.forEach(opp => {
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
    const cat = CATEGORY_CONFIG.find(c => c.id === category);
    return cat ? { bgColor: cat.bgColor, hoverColor: cat.bgColor.replace('600', '700') } : { bgColor: 'bg-indigo-600', hoverColor: 'bg-indigo-700' };
  };

  const getCategoryIcon = (category: string) => {
    const cat = CATEGORY_CONFIG.find(c => c.id === category);
    return cat?.icon || '📌';
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="max-w-7xl mx-auto bg-white shadow-sm border-b py-4 px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:gap-4">
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
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-6">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-3xl mb-4">⏳</div>
            <p className="text-gray-600">Loading opportunities...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filter by Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CATEGORY_CONFIG.map(cat => {
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
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={`day-${index}`} className="text-center text-xs font-bold text-gray-600 py-2">
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
                                    const cat = CATEGORY_CONFIG.find(c => c.id === catId);
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
                      {CATEGORY_CONFIG.map(cat => (
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
                                <div className="text-3xl sm:text-4xl">📌</div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">{opp.title}</h3>
                                  <p className="text-xs sm:text-sm text-gray-600">{opp.description}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                                  {getCategoryIcon(opp.category)} {opp.category.charAt(0).toUpperCase() + opp.category.slice(1)}
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
          </>
        )}
      </div>
    </div>
  );
}
