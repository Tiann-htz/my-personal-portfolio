import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, Info, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlowBackground from '@/components/ui/GlowBackground';
import Footer from '@/components/Footer';
import { getSortedProjects } from '@/data/Projects';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);

  const projects = getSortedProjects();

  const openModal = (project) => {
    setSelectedProject(project);
    setSelectedImage(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedImage(0);
  };

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

      {/* Projects Section */}
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
              <FolderGit2 className="w-12 h-12 text-gray-200" />
              <h1 
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk']"
                style={{
                  background: 'linear-gradient(135deg, #c2c7cf 0%, #b5adad 30%, #a9a9a9 60%, #818182 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                My Projects
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-lg font-['Inter'] max-w-3xl mx-auto leading-relaxed"
            >
              Explore my collection of web and mobile applications. Each project represents 
              a unique challenge solved with modern technologies and innovative solutions.
            </motion.p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.6 + index * 0.15,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => openModal(project)}
                className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-gray-900/50">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  {/* Type Badge */}
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-blue-400 text-xs font-semibold rounded-full font-['Fira_Code']">
                    {project.type}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Details Button */}
                  <button 
                    onClick={() => openModal(project)}
                    className="w-full mt-4 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all font-['Inter']"
                  >
                    <Info className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State if no projects */}
          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-20"
            >
              <FolderGit2 className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-['Inter']">
                No projects available yet. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left Side - Images */}
                <div className="space-y-4">
                  {/* Main Image - Clickable */}
                  <div 
                    className="relative w-full h-[500px] rounded-lg overflow-hidden bg-gray-900/50 cursor-pointer"
                    onClick={() => setSelectedProjectImage(selectedProject.images[selectedImage])}
                  >
                    <Image
                      src={selectedProject.images[selectedImage]}
                      alt={selectedProject.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="grid grid-cols-6 gap-2">
                    {selectedProject.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-16 rounded overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-blue-500' 
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="space-y-6">
                  {/* Type Badge */}
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-blue-400 text-sm font-semibold rounded-full font-['Fira_Code']">
                    {selectedProject.type}
                  </span>

                  {/* Title */}
                  <h2 className="text-4xl font-bold text-white font-['Space_Grotesk']">
                    {selectedProject.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 font-['Inter'] leading-relaxed">
                    {selectedProject.shortDescription}
                  </p>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white font-['Space_Grotesk']">
                      Tech Stack Used:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-['Fira_Code'] rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visit Site Button */}
                  {selectedProject.visitSite && (
                    <a
                      href={selectedProject.visitSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all font-['Inter']"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     {/* PROJECT IMAGE ZOOM MODAL */}
<AnimatePresence>
  {selectedProjectImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedProjectImage(null)}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl w-full max-h-[90vh] rounded-3xl border-2 border-white/30 overflow-hidden bg-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Project Image */}
        <div className="relative w-full h-[85vh]">
          <Image
            src={selectedProjectImage}
            alt="Project preview"
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