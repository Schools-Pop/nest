'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface Opportunity {
  id: string;
  title: string;
  category: 'internship' | 'event' | 'scholarship';
  description: string;
  deadline: string;
  date: string;
  image: string;
  icon: string;
  company?: string;
  location?: string;
  stipend?: string;
  eligibility?: string[];
  criteria?: string[];
  fullDescription?: string;
  applicationLink?: string;
  duration?: string;
  requirements?: string[];
}

const OPPORTUNITIES: Opportunity[] = [
  // Internships
  { 
    id: '1', 
    title: 'Software Engineering Internship', 
    category: 'internship', 
    description: 'Summer internship with competitive stipend', 
    deadline: '2024-02-15', 
    date: '2024-06-01', 
    image: '💻', 
    icon: '🎯', 
    company: 'Google', 
    location: 'Kigali', 
    stipend: '50,000 RWF/month',
    duration: '3 months (June - August)',
    fullDescription: 'Join Google\'s engineering team for an intensive summer internship. Work on real-world projects, collaborate with experienced engineers, and gain hands-on experience with cutting-edge technologies.',
    eligibility: ['Currently enrolled in Computer Science or related field', 'At least 2nd year student', 'Strong academic record (GPA 3.5+)', 'Proficiency in at least one programming language'],
    criteria: ['Technical interview', 'Coding assessment', 'System design interview', 'Background check'],
    requirements: ['Resume', 'Portfolio or GitHub profile', 'Letter of recommendation', 'Academic transcripts'],
    applicationLink: 'https://careers.google.com/internships'
  },
  { 
    id: '2', 
    title: 'Data Science Internship', 
    category: 'internship', 
    description: 'Work on real-world ML projects', 
    deadline: '2024-02-20', 
    date: '2024-06-15', 
    image: '📊', 
    icon: '🎯', 
    company: 'Microsoft', 
    location: 'Remote', 
    stipend: '45,000 RWF/month',
    duration: '3 months (June - August)',
    fullDescription: 'Microsoft seeks talented data science interns to work on machine learning projects. Develop your skills in data analysis, modeling, and visualization while contributing to impactful projects.',
    eligibility: ['Studying Data Science, Statistics, Mathematics, or related field', 'Proficiency in Python or R', 'Understanding of machine learning basics', 'Strong analytical skills'],
    criteria: ['Technical assessment', 'Data science interview', 'Problem-solving exercise'],
    requirements: ['Resume', 'Portfolio of data science projects', 'Letter of recommendation', 'Academic transcripts'],
    applicationLink: 'https://careers.microsoft.com/internships'
  },
  { 
    id: '3', 
    title: 'Product Management Internship', 
    category: 'internship', 
    description: 'Learn product development from industry experts', 
    deadline: '2024-03-01', 
    date: '2024-07-01', 
    image: '📱', 
    icon: '🎯', 
    company: 'Andela', 
    location: 'Kigali',
    duration: '3 months (July - September)',
    fullDescription: 'Gain insights into product management by working with Andela\'s talented product team. Participate in product strategy, user research, and feature development.',
    eligibility: ['Any major welcome', 'Strong communication skills', 'Interest in technology and product development', 'Problem-solving mindset'],
    criteria: ['Product case study', 'Product sense interview', 'Behavioral interview'],
    requirements: ['Resume', 'Cover letter explaining interest in PM', 'Portfolio or examples of work', 'References'],
    applicationLink: 'https://andela.com/careers'
  },

  // Events
  { 
    id: '4', 
    title: 'Tech Conference 2024', 
    category: 'event', 
    description: 'Annual conference with 50+ speakers', 
    deadline: '2024-01-30', 
    date: '2024-02-15', 
    image: '🎤', 
    icon: '📅', 
    location: 'Kigali Convention Center',
    duration: '2 days (Feb 15-16)',
    fullDescription: 'Join Africa\'s leading tech conference featuring 50+ industry speakers, networking sessions, and workshops on emerging technologies. Connect with innovators, founders, and tech leaders.',
    eligibility: ['Open to all students', 'No prerequisites', 'Early bird discount for first 100 registrants'],
    criteria: ['Online registration', 'Email confirmation required', 'Valid student ID at entrance'],
    requirements: ['Email address', 'Full name', 'University affiliation'],
    applicationLink: 'https://techconference2024.com/register'
  },
  { 
    id: '5', 
    title: 'Coding Bootcamp', 
    category: 'event', 
    description: '2-week intensive coding program', 
    deadline: '2024-02-01', 
    date: '2024-02-20', 
    image: '👨‍💻', 
    icon: '📅', 
    location: 'ALU Campus',
    duration: '2 weeks (Feb 20 - Mar 5)',
    fullDescription: 'Intensive hands-on bootcamp covering full-stack web development. Learn HTML, CSS, JavaScript, React, Node.js and deploy your first web application.',
    eligibility: ['Beginner to intermediate coding level', 'Commitment for full 2 weeks', 'Basic computer proficiency'],
    criteria: ['Coding challenge', 'Interview to assess commitment', 'No technical background required'],
    requirements: ['Application form', 'Laptop (Windows/Mac/Linux)', 'Resume', 'Letter of motivation'],
    applicationLink: 'https://alubootcamp.com/apply'
  },
  { 
    id: '6', 
    title: 'Career Fair', 
    category: 'event', 
    description: 'Meet 100+ companies recruiting', 
    deadline: '2024-02-10', 
    date: '2024-03-05', 
    image: '🤝', 
    icon: '📅', 
    location: 'CMU Africa',
    duration: '1 day (Mar 5, 9 AM - 5 PM)',
    fullDescription: 'Annual career fair with 100+ companies recruiting across tech, finance, consulting, and more. Network with recruiters, attend company talks, and explore job opportunities.',
    eligibility: ['All year levels welcome', 'All majors welcome', 'Graduates also welcome'],
    criteria: ['Online pre-registration recommended', 'Valid student/graduate ID', 'Resume recommended'],
    requirements: ['Student or graduate ID', 'Professional attire recommended', 'Business cards optional'],
    applicationLink: 'https://careerfair.cmua.org'
  },
  { 
    id: '7', 
    title: 'AI Workshop', 
    category: 'event', 
    description: 'Hands-on AI and ML workshop', 
    deadline: '2024-02-28', 
    date: '2024-03-15', 
    image: '🤖', 
    icon: '📅', 
    location: 'Online',
    duration: '3 days (Mar 15-17, 2 hours/day)',
    fullDescription: 'Learn AI and machine learning fundamentals through hands-on projects. Build your first neural network and understand deep learning concepts.',
    eligibility: ['Basic Python knowledge recommended', 'High school level math', 'Passion for AI'],
    criteria: ['Coding assessment', 'Quick interview to confirm basics'],
    requirements: ['Laptop with Python installed', 'Email address', 'GitHub account'],
    applicationLink: 'https://aiworkshop.org/register'
  },

  // Scholarships
  { 
    id: '8', 
    title: 'African Tech Leaders Scholarship', 
    category: 'scholarship', 
    description: 'Full tuition scholarship for top performers', 
    deadline: '2024-03-15', 
    date: '2024-09-01', 
    image: '🎓', 
    icon: '🏆', 
    stipend: 'Full Tuition + 30K RWF/month',
    duration: '2 years (renewable)',
    fullDescription: 'Prestigious scholarship awarded to exceptional students demonstrating academic excellence and leadership. Includes mentorship from industry leaders.',
    eligibility: ['GPA 3.8 or higher', 'African citizen', 'Demonstrated leadership experience', 'Financial need', 'Commit to internship with tech company'],
    criteria: ['Academic records (transcripts)', 'Leadership essay', 'Technical interview', 'Leadership interview', 'Reference letters (3)'],
    requirements: ['Completed application form', 'Academic transcripts', 'Essays (2 required)', '3 letters of recommendation', 'CV/Resume', 'Financial documentation'],
    applicationLink: 'https://africatechleaders.org/apply'
  },
  { 
    id: '9', 
    title: 'Women in Tech Scholarship', 
    category: 'scholarship', 
    description: 'Dedicated funding for women in technology', 
    deadline: '2024-03-20', 
    date: '2024-09-15', 
    image: '👩‍🎓', 
    icon: '🏆', 
    stipend: '50% Tuition + 20K RWF/month',
    duration: '2 years (renewable)',
    fullDescription: 'Empowering women in technology with financial support and mentorship. Join a community of female tech leaders and innovators.',
    eligibility: ['Female students only', 'GPA 3.5 or higher', 'Pursuing STEM degree', 'Demonstrated passion for tech', 'Commitment to mentor other women'],
    criteria: ['Application form', 'Academic records', 'Technical essay', 'Motivation letter', 'Group interview'],
    requirements: ['Application form', 'Transcripts', 'Personal statement', 'Letter of recommendation', 'Proof of gender identity'],
    applicationLink: 'https://womenintechfund.org/scholarship'
  },
  { 
    id: '10', 
    title: 'Excellence in STEM Grant', 
    category: 'scholarship', 
    description: 'Merit-based grant for STEM students', 
    deadline: '2024-04-01', 
    date: '2024-10-01', 
    image: '🔬', 
    icon: '🏆', 
    stipend: '25K RWF/month',
    duration: '1 year (renewable based on performance)',
    fullDescription: 'Award for outstanding STEM students. Support innovation projects and research in science, technology, engineering, and mathematics.',
    eligibility: ['STEM major student', 'GPA 3.6 or higher', 'Active in research or projects', 'Academic standing at institution'],
    criteria: ['STEM GPA verification', 'Research proposal or project description', 'Academic interview', 'Faculty recommendation'],
    requirements: ['Application form', 'Transcripts', 'Research proposal (500 words)', 'Faculty recommendation letter', 'CV'],
    applicationLink: 'https://stemagrant.org/apply'
  },
];

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const opportunity = OPPORTUNITIES.find(opp => opp.id === params.id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Opportunity Not Found</h1>
          <Link href="/opportunity" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, { bg: string; text: string; badge: string }> = {
    internship: { bg: 'bg-indigo-50', text: 'text-indigo-900', badge: 'bg-indigo-100 text-indigo-700' },
    event: { bg: 'bg-purple-50', text: 'text-purple-900', badge: 'bg-purple-100 text-purple-700' },
    scholarship: { bg: 'bg-green-50', text: 'text-green-900', badge: 'bg-green-100 text-green-700' },
  };

  const colors = categoryColors[opportunity.category] || categoryColors.internship;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navigation */}
      <nav className="sticky top-16 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition text-sm"
          >
            ← Back
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <div className={`${colors.bg}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            <div className="text-5xl sm:text-6xl">{opportunity.image}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.badge}`}>
                  {opportunity.icon} {opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1)}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{opportunity.title}</h1>
              <p className="text-gray-700 mb-4">{opportunity.description}</p>
            </div>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {opportunity.deadline && (
              <div className="bg-white/80 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Application Deadline</p>
                <p className="font-bold text-gray-900">{new Date(opportunity.deadline).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            )}
            {opportunity.date && (
              <div className="bg-white/80 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Start Date</p>
                <p className="font-bold text-gray-900">{new Date(opportunity.date).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            )}
            {opportunity.duration && (
              <div className="bg-white/80 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Duration</p>
                <p className="font-bold text-gray-900">{opportunity.duration}</p>
              </div>
            )}
            {opportunity.stipend && (
              <div className="bg-green-100/80 p-4 rounded-lg">
                <p className="text-xs text-green-700 mb-1">Compensation</p>
                <p className="font-bold text-green-900">{opportunity.stipend}</p>
              </div>
            )}
            {opportunity.company && (
              <div className="bg-white/80 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Company</p>
                <p className="font-bold text-gray-900">{opportunity.company}</p>
              </div>
            )}
            {opportunity.location && (
              <div className="bg-white/80 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Location</p>
                <p className="font-bold text-gray-900">{opportunity.location}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {['overview', 'eligibility', 'requirements', 'apply'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 sm:px-6 py-4 font-semibold transition text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'eligibility' && 'Eligibility'}
                {tab === 'requirements' && 'Requirements'}
                {tab === 'apply' && 'Apply'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {opportunity.fullDescription && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">About this Opportunity</h2>
                    <p className="text-gray-700 leading-relaxed">{opportunity.fullDescription}</p>
                  </div>
                )}
                {opportunity.criteria && opportunity.criteria.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Selection Criteria</h3>
                    <ul className="space-y-2">
                      {opportunity.criteria.map((criterion, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-indigo-600 font-bold mt-1">✓</span>
                          <span className="text-gray-700">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Eligibility Tab */}
            {activeTab === 'eligibility' && (
              <div className="space-y-6">
                {opportunity.eligibility && opportunity.eligibility.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
                    <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
                      <ul className="space-y-3">
                        {opportunity.eligibility.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-indigo-600 font-bold mt-1">•</span>
                            <span className="text-gray-900">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Requirements Tab */}
            {activeTab === 'requirements' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Need to Apply</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {opportunity.requirements && opportunity.requirements.map((req, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600">
                        <p className="font-semibold text-gray-900">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Apply Tab */}
            {activeTab === 'apply' && (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🚀</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Apply?</h2>
                <p className="text-gray-700 mb-6 max-w-md mx-auto">
                  Make sure you have all the required documents ready before applying.
                </p>
                {opportunity.applicationLink && (
                  <a
                    href={opportunity.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                  >
                    Apply Now on Official Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
