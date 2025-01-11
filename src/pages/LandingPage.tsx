import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Laptop, CheckCircle, ArrowRight } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f3fc]">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#6e43cb] to-[#4d2e8e] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Elevate Your Content Creation</h1>
              <p className="text-lg mb-8 text-gray-100">Professional content creation services to help you grow your brand. Schedule your consultation with expert content creators today.</p>
              <button 
                onClick={() => navigate('/signup')}
                className="bg-[#cb43a4] hover:bg-[#b93b94] px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
              >
                Start Creating <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80"
                alt="Content creation setup"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#2a1959] mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-8 h-8 text-[#6e43cb]" />,
                title: "Flexible Scheduling",
                description: "Book content creation sessions that fit your schedule"
              },
              {
                icon: <Laptop className="w-8 h-8 text-[#43cbb5]" />,
                title: "Professional Equipment",
                description: "Access to high-end content creation tools"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-[#cb43a4]" />,
                title: "Expert Creators",
                description: "Work with experienced content professionals"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#2a1959]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2a1959] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ContentPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;