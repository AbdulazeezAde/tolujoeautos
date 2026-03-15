import { CheckCircle2, Award, Shield, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <span className="text-brand-red font-bold tracking-widest uppercase text-sm mb-2 block">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-brand-black mb-6 tracking-tight">About Tolujoe Autos</h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            No Stories! Just Clean Cars — A Trial Will Convince You.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://image2url.com/r2/default/images/1773251114614-893f89e0-d36f-48ea-a0fb-9ebd2cb1c110.png" 
                alt="Tolujoe Autos Dealership" 
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-10 -right-10 z-20 w-2/3 rounded-3xl overflow-hidden shadow-2xl border-8 border-brand-gray hidden md:block"
            >
              <img 
                src="https://image2url.com/r2/default/images/1773251307144-af2e2a4b-b162-42c2-b992-27d719d2076b.png" 
                alt="Tolujoe Autos Showroom" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-10"
          >
            <h2 className="text-4xl font-heading font-bold text-brand-black mb-8 tracking-tight">Driven by Excellence</h2>
            <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed mb-10">
              <p>
                Tolujoe Autos specializes in sourcing quality vehicles, repairing and rebuilding them where necessary, and selling clean reliable cars to customers.
              </p>
              <p>
                Our mission is to provide affordable, clean, and trustworthy cars to our customers. We believe that buying a car should be a transparent, hassle-free experience. That's why we thoroughly inspect every vehicle that comes through our doors, ensuring that you drive away with confidence.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-heading font-bold text-brand-black mb-2">150+</h4>
                <p className="text-gray-500 font-light">Point Inspection</p>
              </div>
              <div>
                <h4 className="text-4xl font-heading font-bold text-brand-black mb-2">100%</h4>
                <p className="text-gray-500 font-light">Transparency</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4 tracking-tight">Our Core Values</h3>
            <p className="text-gray-500 font-light max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Transparency', desc: 'We provide full vehicle history and honest assessments.' },
              { icon: Award, title: 'Quality', desc: 'Every car undergoes a rigorous 150-point inspection.' },
              { icon: ThumbsUp, title: 'Customer First', desc: 'Your satisfaction is our ultimate goal.' },
              { icon: CheckCircle2, title: 'Value', desc: 'Premium vehicles at competitive market prices.' }
            ].map((value, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-brand-gray rounded-full flex items-center justify-center mb-6 text-brand-black">
                  <value.icon className="h-8 w-8" />
                </div>
                <h4 className="font-heading font-bold text-xl text-brand-black mb-3">{value.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
