import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Github, Mail, Instagram, Briefcase, MessageCircle } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ContactModal from '@/components/ContactModal';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import GlowBackground from '@/components/ui/GlowBackground';

// Header Component with Active Section Indicator
function Header() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = -25;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold font-['Fira_Code']"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 60%, #1e40af 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          &lt;Tian/&gt;
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.name.toLowerCase();
            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 60%, #1e40af 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : {}}
                className={`transition-colors font-medium text-lg font-['Inter'] relative group ${
                  isActive ? '' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </motion.a>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}

// HeroSection Component - Always animates
function HeroSection() {
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const techStack = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Java', color: '#F7DF1E' },
    { name: 'Next.js', color: '#FFFFFF' },
    { name: 'Tailwind', color: '#06B6D4' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Tiann-htz', label: 'GitHub' },
    { icon: Mail, href: 'mailto:christiancarlpaete@gmail.com', label: 'Email' },
    { icon: Instagram, href: 'https://www.instagram.com/htz.tiann', label: 'Instagram' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Slogan with Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-gray-200" />
            <span className="text-lg font-['Fira_Code']"
              style={{
                background: 'linear-gradient(135deg, #c2c7cf 0%, #e0e0e0 30%, #fdfeff 60%, #818182 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Building Digital Experiences
            </span>
          </motion.div>

          {/* Main Titles with Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                '',
                500,
                'Mobile App Developer',
                2000,
                '',
                500,
                'Web Developer',
                2000,
                '',
                500,
              ]}
              wrapper="h1"
              cursor={true}
              repeat={Infinity}
              speed={40}
              className="text-5xl md:text-6xl font-bold text-white font-['Space_Grotesk'] leading-tight"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg font-['Inter'] leading-relaxed"
          >
            Crafting modernized, innovative, and user-friendly applications that bring ideas to life with cutting-edge technology.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <div className="flex gap-4 flex-wrap">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="px-4 py-2 bg-white/5 border border-blue-700/30 rounded-lg text-white font-['Fira_Code'] text-sm hover:border-blue-600/50 transition-colors hover:shadow-lg hover:shadow-blue-700/20"
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 pt-4"
          >
            <button 
              onClick={() => router.push('/projects')}
              className="px-6 py-3 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-700/50 transition-all font-['Inter']"
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 25%, #3b82f6 50%, #2dd4bf 100%)',
              }}
            >
              <Briefcase className="w-5 h-5" />
              View Projects
            </button>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-3 bg-white/5 border border-blue-700/30 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-white/10 hover:border-blue-600/50 transition-all font-['Inter']"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 1 }}
            className="flex gap-4 pt-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-blue-700/30 rounded-lg hover:bg-white/10 hover:border-blue-600/50 transition-all group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ 
            opacity: 1, 
            x: 80,
          }}
          viewport={{ once: false, amount: 0.3 }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.2 },
            x: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          className="relative flex items-center justify-center"
        >
          <div className="w-full max-w-[500px] h-[500px]">
            <DotLottieReact
              src="https://lottie.host/27778986-b35e-4aee-b796-7fa15e21fb72/8ekz2JoJf4.lottie"
              loop
              autoplay
            />
          </div>
        </motion.div>
      </div>

      {/* Contact Modal - Landscape variant */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        variant="landscape"
      />
    </section>
  );
}

// Main Home Page
export default function Home() {
  return (
    <div className="gradient-bg">
      {/* Video Background - fixed so it covers the entire page while scrolling */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(10px)' }}
        >
          <source src="/colorbends1.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay — adjust rgba alpha (0.75) to make it lighter or darker */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.63)' }}
        />
      </div>

      <Header />
      <HeroSection />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}