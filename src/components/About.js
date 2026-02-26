import { motion } from 'framer-motion';
import { Sparkles, FileText, Briefcase, FolderGit2, Award, Calendar } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ContactModal from './ContactModal';
import GlareHover from '@/components/ui/GlareHover';

export default function About({ onNavigateToProjects }) {
  const [tiltStyle, setTiltStyle] = useState({});
const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Add this line
  const router = useRouter(); // Add this line

  // Portfolio data - should match your Portfolio.js
  const projects = [
    {
      id: 1,
      title: 'Book Borrowing Platform Website',
      type: 'Web System',
    },
    // Add more projects here as they're added to Portfolio.js
  ];

  const certificates = [
    { id: 1, image: '/certificates/phpmysql.jpg' },
    // Add more certificates here as they're added to Portfolio.js
  ];

  const stats = [
    { 
      number: projects.length.toString(), 
      label: 'Total Projects',
      description: 'Innovative solutions delivered',
      icon: FolderGit2
    },
    { 
      number: certificates.length.toString(), 
      label: 'Certificates',
      description: 'Professional certifications earned',
      icon: Award
    },
    { 
      number: '2', 
      label: 'Years Experience',
      description: 'Building digital products',
      icon: Calendar
    },
  ];

  const handleViewCV = () => {
    // Open CV in new tab
    window.open('/pdf/Christian Carl S. Paete CV.pdf', '_blank');
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.3s ease-out',
    });
  };

  const handleViewProjects = () => {
  // Navigate to projects page
  router.push('/projects');
};

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="container mx-auto relative z-10">
        {/* Header - Center with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.h2 
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] mb-4"
  style={{
    background: 'linear-gradient(135deg, #c2c7cf 0%, #b5adad 30%, #a9a9a9 60%, #818182 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  About Me
</motion.h2>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-gray-100"
          >
            <Sparkles className="w-5 h-5" />
<p className="text-lg font-['Fira_Code']"
  style={{
    background: 'linear-gradient(135deg, #c2c7cf 0%, #e0e0e0 30%, #fdfeff 60%, #818182 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  Passionate about crafting exceptional digital experiences
</p>          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Introduction */}
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg font-['Inter']"
              >
                Hello, I'm
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk']"
              >
                Christian Carl Paete
              </motion.h3>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg font-['Inter'] leading-relaxed"
            >
              I'm a passionate web and mobile app developer on a journey of creating impactful digital solutions. 
              With extensive experience in building full-scale projects, I specialize in developing modern websites 
              and applications that combine functionality with stunning design. My work focuses on delivering 
              user-centric experiences that solve real-world problems through innovative technology and clean code.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 pt-4"
            >
              <button 
  onClick={handleViewCV}
  className="px-6 py-3 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-700/50 transition-all font-['Inter']"
  style={{
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 60%, #1e40af 100%)',
  }}
>
  <FileText className="w-5 h-5" />
  View CV
</button>
             <button 
  onClick={handleViewProjects}
  className="px-6 py-3 bg-white/5 border border-blue-700/30 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10 hover:border-blue-600/50 transition-all font-['Inter']"
>
  <Briefcase className="w-5 h-5" />
  My Projects
</button>
            </motion.div>
          </motion.div>

         {/* Right Side - Profile Card with GlareHover - SLIDE FROM RIGHT */}
<motion.div
  initial={{ opacity: 0, x: 150 }}
  whileInView={{ opacity: 1, x: 300 }}  
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="flex items-center justify-center md:justify-start"
>
  <GlareHover
    width="320px"
    height="384px"
    background="transparent"
    borderRadius="16px"
    borderColor="rgba(59, 130, 246, 0.3)"
    glareColor="#a5a5a5ff"
    glareOpacity={0.7}
    glareAngle={-30}
    glareSize={400}
    transitionDuration={3500}
    playOnce={false}
    className="animated-border p-1"
    style={tiltStyle}
  >
    <div
      className="relative w-full h-full rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
              {/* Card Content with Image as Background */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {/* Background Image - Full Card */}
                <div className="absolute inset-0">
                  <Image
                    src="/image/image1.jpg"
                    alt="Christian Carl Paete"
                    fill
                    className="object-cover"
                    style={{ 
                      objectPosition: 'center 85%'
                    }}
                  />
                </div>

                {/* Bottom Section - Blur White Container */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-white/10 backdrop-blur-sm p-4 flex items-center justify-between border-t border-white/20">
                  <div className="flex items-center gap-3">
                    {/* Small Circle Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 flex-shrink-0">
                      <Image
                        src="/image/image1.jpg"
                        alt="Christian Carl Paete"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* User Info */}
                    <div>
                      <p className="text-white font-semibold text-sm font-['Inter'] drop-shadow-md">@Tiann.s092</p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                        <span className="text-white text-xs font-['Fira_Code'] drop-shadow-md">Online</span>
                      </div>
                    </div>
                  </div>

                 {/* Contact Button - Blur White */}
<button 
  onClick={() => setIsContactModalOpen(true)}
  className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition-all font-['Inter'] drop-shadow-lg"
>
  Contact Me
</button>
                </div>
            </div>
            </div>
          </GlareHover>
        </motion.div>
      </div>

        {/* Stats Cards - Bottom Row (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white/5 border border-blue-700/30 rounded-xl p-6 hover:border-blue-600/50 transition-all hover:shadow-lg hover:shadow-blue-700/20 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <stat.icon className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />
                <h4 className="text-4xl font-bold font-['Space_Grotesk']"
  style={{
    background: 'linear-gradient(135deg, #c2c7cf 0%, #e0e0e0 30%, #fdfeff 60%, #818182 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  {stat.number}
</h4>
              </div>
              <p className="text-white text-base font-semibold font-['Inter'] mb-2">
                {stat.label}
              </p>
              <p className="text-gray-500 text-sm font-['Fira_Code']">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
     </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
}