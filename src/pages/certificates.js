import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlowBackground from '@/components/ui/GlowBackground';
import Footer from '@/components/Footer';
import { groupedCertificates } from '@/data/Certificates';

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <div className="gradient-bg min-h-screen">
      <GlowBackground />
      
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/10 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="text-3xl font-bold font-['Space_Grotesk'] hover:opacity-80 transition-opacity"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 60%, #1e40af 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            &lt;Tian/&gt;
          </Link>
        </div>
      </motion.header>

      {/* Certificates Section */}
      <section className="px-6 py-32 pt-32">
        <div className="container mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Award className="w-12 h-12 text-gray-200" />
              <h1 
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk']"
                style={{
                  background: 'linear-gradient(135deg, #c2c7cf 0%, #b5adad 30%, #a9a9a9 60%, #818182 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                My Certificates
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-lg font-['Inter'] max-w-3xl mx-auto leading-relaxed"
            >
              A collection of certifications and achievements earned through continuous 
              learning and professional development across various platforms and institutions.
            </motion.p>
          </motion.div>

          {/* Certificates grouped by institution */}
          <div className="space-y-16">
            {Object.entries(groupedCertificates).map(([institution, certs], groupIndex) => (
              <motion.div
                key={institution}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + groupIndex * 0.1 }}
              >
                {/* Institution Name */}
                <h2 className="text-3xl font-bold text-white font-['Space_Grotesk'] mb-6">
                  {institution}
                </h2>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {certs.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.6 + groupIndex * 0.1 + index * 0.1,
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                      onClick={() => setSelectedCertificate(cert)}
                      className="rounded-3xl overflow-hidden transition-all cursor-pointer border-2 border-white/20 hover:border-white/40"
                    >
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-scale-down hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State if no certificates */}
          {Object.keys(groupedCertificates).length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-20"
            >
              <Award className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-['Inter']">
                No certificates available yet. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* CERTIFICATE MODAL */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[90vh] rounded-3xl border-1 border-white overflow-hidden bg-white shadow-2xl"
            >
              {/* Certificate Image */}
              <div className="relative w-full h-[85vh]">
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}