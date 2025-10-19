'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function AboutPage() {
  const team = [
    {
      id: 1,
      name: 'Emmilly Immaculate Namuganga',
      role: 'Founder & Technical Lead',
      image: '👩‍💻',
      bio: 'Full-stack developer with 5+ years of experience in building scalable applications. Specializes in Next.js, React, and cloud infrastructure.',
      expertise: ['Full-Stack Development', 'System Architecture', 'Cloud Infrastructure', 'Database Design'],
      email: 'enamugan@andrew.cmu.edu',
    },
    {
      id: 2,
      name: 'Bellah Ellam',
      role: 'Founder & Business Lead',
      image: '👨‍💼',
      bio: 'Business strategist and finance expert with experience in startup scaling, financial planning, and market expansion. Focused on sustainable growth strategy and partnerships across Africa.',
      expertise: ['Business Strategy', 'Financial Planning', 'Market Expansion', 'Partnerships', 'Growth Strategy'],
      email: 'bellam@andrew.cmu.edu',
    },
    {
      id: 3,
      name: 'Odunayo Wuraola Akinlade',
      role: 'Founder & Product Lead',
      image: '👩‍💼',
      bio: 'Product and user experience specialist with expertise in user experience and community building. Ensures StudentNest serves students effectively.',
      expertise: ['Product Management', 'Community Building', 'Operations', 'User Experience'],
      email: 'oakinlad@andrew.cmu.edu',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            About StudentNest
          </h1>
          <p className="text-2xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Simplifying student life across CMU Africa, one platform at a time
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              StudentNest is on a mission to empower international students at CMU Africa  
              by providing a centralized platform that simplifies housing, dining, community building, and 
              career development. We believe every student deserves access to reliable information and a 
              supportive community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: '🎯',
                title: 'Accessibility',
                desc: 'Making essential student services easily accessible in one place',
              },
              {
                icon: '🤝',
                title: 'Community',
                desc: 'Building supportive communities where students help each other thrive',
              },
              {
                icon: '⚡',
                title: 'Innovation',
                desc: 'Using technology to solve real problems faced by students daily',
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals working together to simplify student life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                {/* Image Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-12 flex items-center justify-center">
                  <div className="text-8xl">{member.image}</div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-4">{member.role}</p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-600 mb-2">EXPERTISE</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`mailto:${member.email}`}
                    className="w-full block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-center text-sm"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              StudentNest was born from a simple observation: international students at CMU Africa were 
              struggling to find reliable information about housing, opportunities and other resources. 
              They were scattered across multiple platforms, missing out on peer recommendations and 
              support from fellow students.
            </p>

            <p>
              Our founding team—Emmilly (tech), Ellam (business), and Wuraola (product)—came together 
              with a shared vision: create a single, unified platform that puts students first. 
              What started as a conversation became a mission.
            </p>

            {/* <p>
              Today, StudentNest serves thousands of students across Rwanda, providing verified housing 
              listings, authentic restaurant recommendations, career opportunities, and a thriving community. 
              We're just getting started, with plans to expand across all of Africa.
            </p> */}

            <p>
              Every feature we build, every partnership we forge, and every student we serve is a step 
              toward our mission: a world where international students feel supported, connected, and ready 
              to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-16 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '💡',
                title: 'Student-First',
                desc: 'Every decision we make is guided by what\'s best for our student community',
              },
              {
                icon: '🔒',
                title: 'Trust & Safety',
                desc: 'We prioritize safety and verify all listings to ensure a secure community',
              },
              {
                icon: '🌍',
                title: 'Inclusivity',
                desc: 'We celebrate diversity and create a welcoming space for all international students',
              },
              {
                icon: '🚀',
                title: 'Innovation',
                desc: 'We continuously improve and adapt to serve our users better',
              },
              {
                icon: '🤝',
                title: 'Community',
                desc: 'We foster connections and peer support that make student life better',
              },
              {
                icon: '📈',
                title: 'Growth',
                desc: 'We invest in our platform and team to expand opportunities across Africa',
              },
            ].map((value, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="text-4xl flex-shrink-0">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-2xl text-indigo-100 mb-8">
            Help us simplify student life across Africa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="px-12 py-4 bg-white text-indigo-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="px-12 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-indigo-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4">&copy; 2025 StudentNest. Simplifying student life at CMU Africa.</p>
          <p className="text-sm">Built with ❤️ for students, by students</p>
        </div>
      </footer>
    </div>
  );
}
