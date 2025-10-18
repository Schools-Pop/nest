'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How do I register for courses this semester?',
    answer: 'Course registration opens at the beginning of each semester through the Student Portal. Log in with your student credentials, navigate to Course Registration, and select your courses before the deadline. Priority registration is given to seniors first, then juniors, etc. Make sure to consult with your academic advisor before registering to ensure you\'re on track for graduation.',
    category: 'academics',
    tags: ['registration', 'courses', 'semester', 'schedule'],
  },
  {
    id: '2',
    question: 'What should I do if I\'m struggling with a course?',
    answer: 'Contact your professor during office hours to discuss your concerns. CMU Africa also offers tutoring services through the Academic Support Center - completely free for all students. Study groups are organized by subject, and peer tutors are available. If you need academic accommodations, visit Student Accessibility Services. Don\'t wait until exam time - reach out early!',
    category: 'academics',
    tags: ['tutoring', 'support', 'struggling', 'grades'],
  },
  {
    id: '3',
    question: 'How do I access the student health center?',
    answer: 'The health center is located on campus and is open Monday-Friday, 8 AM - 5 PM. You can walk in or schedule appointments through the Student Portal under "Health Services." Services include medical consultations, mental health counseling, vaccinations, and emergency care. All services are included in your student fees. For after-hours emergencies, contact the on-campus security who can direct you to nearby hospitals.',
    category: 'services',
    tags: ['health', 'medical', 'counseling', 'wellness'],
  },
  {
    id: '4',
    question: 'How do I join student clubs and organizations?',
    answer: 'Attend the Club Fair held at the beginning of each semester to learn about all available clubs. You can also visit the Student Life office in the Student Center to get a complete list. Most clubs have open memberships and meet regularly. You can join multiple clubs! To start a new club, get 10+ members and submit an application with a faculty advisor to the Student Life office.',
    category: 'student-life',
    tags: ['clubs', 'organizations', 'activities', 'community'],
  },
  {
    id: '5',
    question: 'What are the library hours and services?',
    answer: 'The main library is open Monday-Thursday 7 AM - 10 PM, Friday 7 AM - 8 PM, Saturday 10 AM - 6 PM, and Sunday 12 PM - 8 PM. Services include computer access, quiet study areas, group study rooms, research databases, librarian consultations, and printing. You can reserve study rooms through the library website. The 24-hour study lounge is available with valid student ID.',
    category: 'facilities',
    tags: ['library', 'study', 'resources', 'research'],
  },
  {
    id: '6',
    question: 'How do I request academic accommodations?',
    answer: 'Students requiring accommodations should contact Student Accessibility Services (SAS) in the Student Center. Bring documentation of your needs (medical records, learning disability assessment, etc.). SAS will work with you to determine appropriate accommodations like extended test time, note-taking assistance, or modified coursework. Start this process early in the semester, ideally before the first day of class.',
    category: 'services',
    tags: ['accommodations', 'disability', 'accessibility', 'support'],
  },
  {
    id: '7',
    question: 'What is the process for adding or dropping a course?',
    answer: 'You can add/drop courses through the Student Portal during the Add/Drop period (usually the first two weeks of semester). After the deadline, you need permission from your academic advisor and the professor. Dropped courses don\'t appear on your transcript. If you drop after the deadline, it may show as a withdrawal. Consult your advisor to understand the implications for your academic standing and financial aid.',
    category: 'academics',
    tags: ['add', 'drop', 'course', 'registration'],
  },
  {
    id: '8',
    question: 'How do I apply for financial aid or scholarships?',
    answer: 'The Financial Aid office handles all aid matters. If you haven\'t already, complete your FAFSA (if applicable) and meet with a financial aid counselor. Additional scholarships are available through the university - check the Student Portal for opportunities. Many department-specific scholarships are also available. The deadlines vary, so plan ahead. The Financial Aid office can help you understand your options and maximize available funding.',
    category: 'finances',
    tags: ['financial aid', 'scholarships', 'funding', 'money'],
  },
  {
    id: '9',
    question: 'Where can I find information about internship and career opportunities?',
    answer: 'Visit the Career Services office on the second floor of the Student Center. They offer resume reviews, mock interviews, job search assistance, and maintain partnerships with companies for internship placements. Attend career fairs held each semester. Job postings are available on the Student Portal under "Career Opportunities." Alumni mentoring program connects you with graduates in your field. All services are free!',
    category: 'career',
    tags: ['internship', 'jobs', 'career', 'employment'],
  },
  {
    id: '10',
    question: 'How do I check my grades and GPA?',
    answer: 'Access the Student Portal with your login credentials and click "Academic Records" to view your grades. Grades are posted within 10 business days after finals. Your current GPA is displayed on your transcript. If you have questions about a grade, contact your professor during office hours. Grade appeals must be submitted within 2 weeks of grade posting through the Registrar\'s office.',
    category: 'academics',
    tags: ['grades', 'GPA', 'transcript', 'academic records'],
  },
  {
    id: '11',
    question: 'What technology support is available for students?',
    answer: 'The IT Help Desk is located in the Technology Center and provides support Monday-Friday 9 AM - 6 PM. Services include device troubleshooting, software assistance, password resets, and network issues. You can also submit tickets online through the IT Portal. Student devices are protected by campus WiFi security. Tech workshops on productivity tools are offered regularly - check the Student Portal calendar.',
    category: 'facilities',
    tags: ['IT', 'technology', 'support', 'internet'],
  },
  {
    id: '12',
    question: 'How do I apply for on-campus housing for next year?',
    answer: 'Housing applications open in March for the following academic year. The application period is typically 2-3 weeks. Apply through the Student Portal under "Housing." Priority is given to seniors, then juniors, etc. You can request roommates and housing preferences. Room selection happens in April based on class standing. Housing is affordable and includes utilities. Contact Residential Life for questions about available residence halls.',
    category: 'housing',
    tags: ['housing', 'dorm', 'residence', 'accommodation'],
  },
  {
    id: '13',
    question: 'What mental health resources are available?',
    answer: 'The Counseling Center offers free, confidential counseling for all enrolled students. Services include individual therapy, group therapy, crisis support, and psychiatric consultations. You can schedule appointments through the Student Portal or walk in. Sessions are typically available within 1 week. For immediate crises, call the 24/7 Crisis Line at ext. CRISIS or go to your nearest emergency room. Peer support groups meet weekly.',
    category: 'services',
    tags: ['mental health', 'counseling', 'wellness', 'therapy'],
  },
  {
    id: '14',
    question: 'How do I request transcripts or official documents?',
    answer: 'Submit transcript requests through the Registrar\'s office website or in person. Official transcripts typically take 3-5 business days to process. You can request electronic transcripts for faster delivery. Transcripts cost RWF 2,000 each. You can also request enrollment verification letters, degree audits, and other academic documents. Most requests can be processed online.',
    category: 'services',
    tags: ['transcripts', 'documents', 'registrar', 'records'],
  },
  {
    id: '15',
    question: 'What should I know about academic integrity and plagiarism?',
    answer: 'CMU Africa takes academic integrity seriously. All work submitted must be your own - plagiarism, cheating, and unauthorized collaboration are serious violations. Always cite your sources properly using the required style guide. If you\'re unsure, ask your professor. The Academic Integrity office provides resources and workshops on proper citation and ethical academic practices. Violations can result in course failure or expulsion.',
    category: 'academics',
    tags: ['plagiarism', 'integrity', 'cheating', 'ethics'],
  },
];

interface SearchResult {
  type: 'faq' | 'generated';
  faq?: FAQ;
  generatedAnswer?: string;
  relevanceScore?: number;
}

// Simple semantic search and response generation
const generateResponse = (query: string, faqs: FAQ[]): SearchResult | null => {
  // Convert query to lowercase for matching
  const queryLower = query.toLowerCase().trim();
  
  if (!queryLower) return null;

  // Score FAQs based on relevance
  const scoredFAQs = faqs.map((faq) => {
    let score = 0;
    
    // Exact question match
    if (faq.question.toLowerCase() === queryLower) {
      score += 100;
    }
    
    // Question contains key words
    const questionWords = faq.question.toLowerCase().split(/\s+/);
    const queryWords = queryLower.split(/\s+/);
    
    queryWords.forEach((word) => {
      if (word.length > 3) { // Only match words longer than 3 chars
        if (faq.question.toLowerCase().includes(word)) score += 20;
        if (faq.answer.toLowerCase().includes(word)) score += 10;
        faq.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(word)) score += 15;
        });
      }
    });
    
    // Partial question match
    if (faq.question.toLowerCase().includes(queryLower)) {
      score += 40;
    }
    
    return { faq, score };
  });

  // Find the best match
  const best = scoredFAQs.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  // If we have a good match (score > 15), return it
  if (best.score > 15) {
    return {
      type: 'faq',
      faq: best.faq,
      relevanceScore: Math.min(100, best.score),
    };
  }

  // Generate a response from multiple FAQs if no exact match
  const relevantFAQs = scoredFAQs
    .filter((item) => item.score > 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (relevantFAQs.length > 0) {
    let generatedAnswer = `Based on available resources, here's what we found:\n\n`;
    
    relevantFAQs.forEach((item, index) => {
      generatedAnswer += `• ${item.faq.question}\n${item.faq.answer}\n\n`;
    });
    
    generatedAnswer += `\nIf you need more specific information, please rephrase your question or contact student services.`;

    return {
      type: 'generated',
      generatedAnswer,
      relevanceScore: relevantFAQs[0].score,
    };
  }

  return null;
};

export default function AskPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    { id: 'all', label: 'All Questions', icon: '❓' },
    { id: 'academics', label: 'Academics', icon: '📚' },
    { id: 'services', label: 'Services', icon: '🛠️' },
    { id: 'student-life', label: 'Student Life', icon: '🎉' },
    { id: 'career', label: 'Career', icon: '💼' },
    { id: 'finances', label: 'Finances', icon: '💰' },
    { id: 'facilities', label: 'Facilities', icon: '🏢' },
    { id: 'housing', label: 'Housing', icon: '🏠' },
  ];

  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory = selectedCategory === 'all' || faq.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const result = generateResponse(searchTerm, FAQS);
      setSearchResult(result);
      setHasSearched(true);
      setSelectedCategory('all');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResult(null);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Student Resource Center</h1>
          <p className="text-base sm:text-lg text-indigo-100">
            Ask questions and get instant answers from our knowledge base
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="🤖 Ask a question... (e.g., 'How do I register for courses?')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="text-indigo-600 hover:text-indigo-700 font-bold"
              >
                🔍
              </button>
            </div>
          </div>
        </form>

        {/* AI Response Section */}
        {hasSearched && (
          <div className="mb-8">
            {searchResult ? (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-sm p-6 border-l-4 border-indigo-600">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">🤖</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">AI Assistant Response</h3>
                    {searchResult.relevanceScore && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.round((searchResult.relevanceScore! / 100) * 5)
                                  ? '⭐'
                                  : '☆'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {Math.round(searchResult.relevanceScore!)}% match
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {searchResult.type === 'faq' && searchResult.faq ? (
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {searchResult.faq.question}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {searchResult.faq.answer}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.faq.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {searchResult.generatedAnswer}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-orange-50 rounded-lg shadow-sm p-6 border-l-4 border-orange-600">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❓</span>
                  <div>
                    <h3 className="font-bold text-orange-900 mb-1">No Match Found</h3>
                    <p className="text-orange-800 text-sm">
                      I couldn't find a direct answer to your question. Try:
                    </p>
                    <ul className="text-orange-800 text-sm mt-2 ml-4 list-disc">
                      <li>Rephrasing your question</li>
                      <li>Using simpler keywords</li>
                      <li>Browsing categories below</li>
                      <li>Contacting student services directly</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Category Filter */}
        {!hasSearched && (
          <>
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">BROWSE BY CATEGORY</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-600'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredFAQs.length}</span> question
                {filteredFAQs.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            {/* FAQ List */}
            {filteredFAQs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Questions Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or browse by category to find answers
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 flex items-start justify-between hover:bg-gray-50 transition text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-left">
                          {faq.question}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="ml-4 text-2xl flex-shrink-0 transition-transform">
                        {expandedId === faq.id ? '−' : '+'}
                      </span>
                    </button>

                    {/* Expanded Answer */}
                    {expandedId === faq.id && (
                      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Need personalized help?</h3>
          <p className="text-gray-700 mb-6">
            Speak with a student advisor or visit the appropriate office for more detailed assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:studentservices@africa.cmu.edu"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              ✉️ Email Student Services
            </a>
            <a
              href="tel:+250788123456"
              className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
            >
              📞 Call Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
