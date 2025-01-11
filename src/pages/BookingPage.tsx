import React, { useEffect, useState } from 'react';
import { Calendar, Video, Users, Pencil, Camera, Laptop, Megaphone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Service } from '../types/database.types';
import { toast } from 'react-hot-toast';

const serviceIcons = {
  'Content Strategy Session': Pencil,
  'Video Production': Video,
  'Photography Session': Camera,
  'Social Media Planning': Megaphone,
  'Group Workshop': Users,
  'Tech Setup Consultation': Laptop,
};

function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Transform healthcare services to content creation services
      const contentServices = [
        {
          id: '1',
          title: 'Content Strategy Session',
          description: 'Develop a comprehensive content strategy tailored to your brand and audience',
          duration: 60,
          price: 150,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Video Production',
          description: 'Professional video shooting and editing for your content needs',
          duration: 120,
          price: 300,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Photography Session',
          description: 'High-quality photo content creation for your brand',
          duration: 90,
          price: 200,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Social Media Planning',
          description: 'Strategic planning for your social media content calendar',
          duration: 45,
          price: 100,
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          title: 'Group Workshop',
          description: 'Interactive workshop on content creation best practices',
          duration: 180,
          price: 250,
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          title: 'Tech Setup Consultation',
          description: 'Expert advice on your content creation technical setup',
          duration: 60,
          price: 120,
          created_at: new Date().toISOString()
        }
      ];
      
      setServices(contentServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (serviceId: string) => {
    try {
      toast.success('Booking feature coming soon!');
    } catch (error) {
      console.error('Error booking service:', error);
      toast.error('Failed to book service');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6e43cb]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2a1959] mb-2">Book a Content Creation Service</h1>
        <p className="text-gray-600">Choose from our range of professional content creation services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = serviceIcons[service.title as keyof typeof serviceIcons] || Pencil;
          
          return (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-[#6e43cb] to-[#4d2e8e] p-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {service.duration} min
                  </div>
                  <span className="font-semibold text-[#2a1959]">${service.price}</span>
                </div>
                <button 
                  onClick={() => handleBooking(service.id)}
                  className="w-full bg-[#6e43cb] text-white py-2 rounded-lg hover:bg-[#4d2e8e] transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingPage;