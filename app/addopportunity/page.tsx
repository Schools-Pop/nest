'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

type OpportunityCategory = 'internship' | 'event' | 'scholarship';

interface FormData {
  category: OpportunityCategory | '';
  title: string;
  description: string;
  fullDescription: string;
  deadline: string;
  date: string;
  location: string;
  company?: string;
  stipend?: string;
  duration?: string;
  eligibility: string[];
  criteria: string[];
  requirements: string[];
  applicationLink?: string;
}

const categories = [
  { id: 'internship', label: 'Internship', icon: '🎯', color: 'bg-indigo-600', description: 'Post an internship opportunity' },
  { id: 'event', label: 'Event', icon: '📅', color: 'bg-purple-600', description: 'Post an event for students' },
  { id: 'scholarship', label: 'Scholarship', icon: '🏆', color: 'bg-green-600', description: 'Post a scholarship opportunity' },
];

export default function AddOpportunityPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | ''>('');
  const [formData, setFormData] = useState<FormData>({
    category: '',
    title: '',
    description: '',
    fullDescription: '',
    deadline: '',
    date: '',
    location: '',
    eligibility: [''],
    criteria: [''],
    requirements: [''],
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = (categoryId: OpportunityCategory) => {
    setSelectedCategory(categoryId);
    setFormData({ ...formData, category: categoryId });
    setCurrentStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (field: 'eligibility' | 'criteria' | 'requirements', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field: 'eligibility' | 'criteria' | 'requirements') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayField = (field: 'eligibility' | 'criteria' | 'requirements', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty strings from arrays
    const cleanedData = {
      ...formData,
      eligibility: formData.eligibility.filter(e => e.trim()),
      criteria: formData.criteria.filter(c => c.trim()),
      requirements: formData.requirements.filter(r => r.trim()),
    };

    // Here you would typically send the data to your backend
    console.log('Submitting opportunity:', cleanedData);

    setTimeout(() => {
      setLoading(false);
      router.push('/opportunity');
    }, 1000);
  };

  const renderCategoryFields = () => {
    switch (selectedCategory) {
      case 'internship':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name *</label>
              <input
                type="text"
                name="company"
                value={formData.company || ''}
                onChange={handleInputChange}
                placeholder="e.g., Google, Microsoft, Andela"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Stipend/Salary *</label>
              <input
                type="text"
                name="stipend"
                value={formData.stipend || ''}
                onChange={handleInputChange}
                placeholder="e.g., 50,000 RWF/month"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration || ''}
                onChange={handleInputChange}
                placeholder="e.g., 3 months (June - August)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Event Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration || ''}
                onChange={handleInputChange}
                placeholder="e.g., 2 days (Feb 15-16)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Registration Requirements *</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements[0] || ''}
                onChange={(e) => handleArrayInputChange('requirements', 0, e.target.value)}
                placeholder="e.g., Email address, Student ID"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>
          </div>
        );

      case 'scholarship':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Award Amount/Details *</label>
              <input
                type="text"
                name="stipend"
                value={formData.stipend || ''}
                onChange={handleInputChange}
                placeholder="e.g., Full Tuition + 30K RWF/month"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Duration/Period *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration || ''}
                onChange={handleInputChange}
                placeholder="e.g., 2 years (renewable)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      {/* Header */}
      <div className="max-w-7xl mx-auto bg-white shadow-sm border-b py-4 px-6">
        <div className="flex flex-row justify-between ">
          
         <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Opportunity</h1>
          <p className="text-sm sm:text-base text-gray-600">Help students discover amazing opportunities</p>
         </div>
        <div>
          <Link href="/opportunity" className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm mb-2 inline-block">
            ← Back to Opportunities
          </Link>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What type of opportunity are you posting?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id as OpportunityCategory)}
                  className={`p-6 rounded-lg border-2 transition text-center ${
                    selectedCategory === cat.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-600 bg-white hover:bg-indigo-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.label}</h3>
                  <p className="text-xs text-gray-600">{cat.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {currentStep === 2 && selectedCategory && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 h-2 bg-indigo-600 rounded"></div>
              <span className="text-sm font-semibold text-gray-600">Step 2 of 2</span>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
              {/* Category badge */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedCategory('');
                  }}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                >
                  ← Change category
                </button>
              </div>

              {/* Basic Information */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Opportunity Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Software Engineering Internship"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Short Description *</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief one-liner description"
                      maxLength={100}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.description.length}/100 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Description *</label>
                    <textarea
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleInputChange}
                      placeholder="Provide detailed information about this opportunity..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Kigali, Remote, Online"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Category-specific fields */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
                {renderCategoryFields()}
              </div>

              {/* Dates */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Important Dates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Application Deadline *</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Start/Event Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
                <div className="space-y-3">
                  {formData.eligibility.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayInputChange('eligibility', idx, e.target.value)}
                        placeholder="e.g., GPA 3.5 or higher"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm text-gray-900 placeholder-gray-400"
                      />
                      {formData.eligibility.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('eligibility', idx)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('eligibility')}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  >
                    + Add eligibility criterion
                  </button>
                </div>
              </div>

              {/* Selection Criteria */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Selection Criteria</h3>
                <div className="space-y-3">
                  {formData.criteria.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayInputChange('criteria', idx, e.target.value)}
                        placeholder="e.g., Technical interview"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm text-gray-900 placeholder-gray-400"
                      />
                      {formData.criteria.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('criteria', idx)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('criteria')}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  >
                    + Add criterion
                  </button>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Application Requirements</h3>
                <div className="space-y-3">
                  {formData.requirements.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayInputChange('requirements', idx, e.target.value)}
                        placeholder="e.g., Resume"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm text-gray-900 placeholder-gray-400"
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('requirements', idx)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('requirements')}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                  >
                    + Add requirement
                  </button>
                </div>
              </div>

              {/* Application Link */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Application Link</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Official Application URL</label>
                  <input
                    type="url"
                    name="applicationLink"
                    value={formData.applicationLink || ''}
                    onChange={handleInputChange}
                    placeholder="https://careers.example.com/apply"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Submit buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedCategory('');
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
                >
                  {loading ? 'Publishing...' : 'Publish Opportunity'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
