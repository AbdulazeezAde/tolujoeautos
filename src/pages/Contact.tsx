import React, { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Send, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `*New Inquiry from Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp
    window.open(`https://wa.me/447393435895?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <span className="text-brand-red font-bold tracking-widest uppercase text-sm mb-2 block">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-brand-black mb-6 tracking-tight">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Have a question about a car or want to schedule a viewing? We're here to help you find your perfect vehicle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <div className="bg-brand-black text-white rounded-3xl p-10 shadow-xl relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-brand-red/20 rounded-full blur-2xl"></div>
              
              <h2 className="text-3xl font-heading font-bold mb-8 relative z-10">Contact Info</h2>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-brand-red transition-colors">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Phone / WhatsApp</h3>
                    <a href="tel:+447393435895" className="text-white hover:text-brand-red transition-colors text-lg font-medium">+44 7393435895</a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-brand-red transition-colors">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Email</h3>
                    <a href="mailto:info@tolujoeautos.com" className="text-white hover:text-brand-red transition-colors text-lg font-medium">info@tolujoeautos.com</a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-brand-red transition-colors">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Location</h3>
                    <p className="text-white text-lg font-medium">United Kingdom</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-brand-red transition-colors">
                    <Instagram className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Social Media</h3>
                    <div className="flex flex-col space-y-2">
                      <a href="https://instagram.com/tolujoe_autos" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors text-lg font-medium">@tolujoe_autos (IG)</a>
                      <a href="https://tiktok.com/@tolujoe_autos" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors text-lg font-medium">@tolujoe_autos (TikTok)</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50"
          >
            <h2 className="text-3xl font-heading font-bold text-brand-black mb-2 tracking-tight">Send a Message</h2>
            <p className="text-gray-500 mb-8 font-light">Fill out the form below and we'll reply via WhatsApp.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-black focus:border-brand-black focus:bg-white outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-black focus:border-brand-black focus:bg-white outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-black focus:border-brand-black focus:bg-white outline-none transition-all"
                    placeholder="+44 123 456 7890"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-black focus:border-brand-black focus:bg-white outline-none transition-all resize-none"
                  placeholder="I'm interested in..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white font-bold py-4 px-8 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3 text-lg"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
