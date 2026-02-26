import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, Share2, Linkedin, Instagram, Github, Facebook, Image as ImageIcon, Clock, Check, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { sendEmail } from '@/lib/emailjs';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [commentData, setCommentData] = useState({
    name: '',
    message: '',
    photo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Email form states
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Real-time comments from Firestore
  const [comments, setComments] = useState([]);

  // Fetch comments from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        commentsData.push({
          id: doc.id,
          name: data.name,
          message: data.message,
          photoUrl: data.photoUrl || null,
          timestamp: data.timestamp,
        });
      });
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, []);

  // Format timestamp to relative time
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const commentTime = timestamp.toDate();
    const diffInSeconds = Math.floor((now - commentTime) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const socialLinks = [
    { 
      icon: Linkedin, 
      title: "Let's Connect", 
      subtitle: 'on LinkedIn',
      link: 'https://linkedin.com',
      color: '#0077B5'
    },
    { 
      icon: Instagram, 
      title: 'Instagram', 
      subtitle: 'htz.tiann',
      link: 'https://www.instagram.com/htz.tiann',
      color: '#E4405F'
    },
    { 
      icon: Github, 
      title: 'GitHub', 
      subtitle: 'Tian-htz',
      link: 'https://github.com/Tiann-htz',
      color: '#FFFFFF'
    },
    { 
      icon: Facebook, 
      title: 'Facebook', 
      subtitle: 'ChrisTian Paete',
      link: 'https://web.facebook.com/Tiannn.s.092',
      color: '#1877F2'
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setEmailError('Please fill in all fields');
      setTimeout(() => setEmailError(''), 3000);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      setTimeout(() => setEmailError(''), 3000);
      return;
    }

    setIsSendingEmail(true);
    setEmailError('');

    try {
      // Send email using EmailJS
      await sendEmail(formData.name, formData.email, formData.message);

      // Show success state
      setEmailSuccess(true);
      
      // Clear form
      setFormData({ name: '', email: '', message: '' });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setEmailSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError('Failed to send message. Please try again.');
      setTimeout(() => setEmailError(''), 3000);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Handle photo selection and upload to Cloudinary
  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    setError('');

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const imageUrl = await uploadImageToCloudinary(file);
      
      // Store Cloudinary URL
      setCommentData({ ...commentData, photo: imageUrl });
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError(error.message || 'Failed to upload photo. Please try again.');
      setPhotoPreview(null);
      setTimeout(() => setError(''), 3000);
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setCommentData({ ...commentData, photo: null });
    setPhotoPreview(null);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: Check if name and message are not empty
    if (!commentData.name.trim() || !commentData.message.trim()) {
      setError('Please fill in both name and message');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Add comment to Firestore with optional photo URL
      await addDoc(collection(db, 'comments'), {
        name: commentData.name.trim(),
        message: commentData.message.trim(),
        photoUrl: commentData.photo || null, // Store Cloudinary URL
        timestamp: serverTimestamp(),
      });

      // Show success state
      setSubmitSuccess(true);
      
      // Clear form
      setCommentData({ name: '', message: '', photo: null });
      setPhotoPreview(null);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to post comment. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="container mx-auto relative z-10">
        {/* Header */}
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
  Contact Me
</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg font-['Inter']"
          >
            Got a question? Send me a message, and I'll get back to you soon.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE - Contact Form & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Get in Touch Form */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <Share2 className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  Get in touch
                </h3>
              </div>
              <p className="text-gray-400 font-['Inter'] mb-6">
                Have something to discuss? Send me a message and let's talk.
              </p>

              {/* Error Message for Email */}
              {emailError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-['Inter']">
                  {emailError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-all font-['Inter']"
                    disabled={isSendingEmail}
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-all font-['Inter']"
                    disabled={isSendingEmail}
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-all resize-none font-['Inter']"
                    disabled={isSendingEmail}
                  />
                </div>

                {/* Submit Button with Loading and Success States */}
                <button
  type="submit"
  disabled={isSendingEmail || emailSuccess}
  style={!emailSuccess ? {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 60%, #1e40af 100%)',
  } : {}}
  className={`w-full px-6 py-3 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all font-['Inter'] hover:shadow-lg hover:shadow-blue-500/50 ${
    emailSuccess 
      ? 'bg-green-600 hover:bg-green-600'
      : ''
  } ${isSendingEmail ? 'opacity-75 cursor-not-allowed' : ''}`}
>
                  {isSendingEmail ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : emailSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {/* Separator */}
              <div className="my-8 border-t border-white/10"></div>

              {/* Connect With Me */}
              <h4 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-4">
                Connect With Me
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group ${
                      socialLinks.length % 2 !== 0 && index === 0 ? 'col-span-2 justify-center' : ''
                    }`}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${social.color}20` }}
                    >
                      <social.icon className="w-6 h-6" style={{ color: social.color }} />
                    </div>
                    <div>
                      <p className="text-white font-semibold font-['Inter'] group-hover:text-blue-400 transition-colors">
                        {social.title}
                      </p>
                      <p className="text-gray-400 text-sm font-['Fira_Code']">
                        {social.subtitle}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Comments Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  Comments
                </h3>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 mb-6">
                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-['Inter']">
                    {error}
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block font-['Inter']">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={commentData.name}
                    onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-all font-['Inter']"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block font-['Inter']">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your message here..."
                    value={commentData.message}
                    onChange={(e) => setCommentData({ ...commentData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-all resize-none font-['Inter']"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Profile Photo (Optional) */}
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block font-['Inter']">
                    Profile photo (optional)
                  </label>
                  
                  {/* Photo Preview */}
                  {photoPreview && (
                    <div className="mb-3 flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                        <Image
                          src={photoPreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="text-red-400 text-sm hover:text-red-300 transition-colors font-['Inter']"
                        disabled={uploadingPhoto || isSubmitting}
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <label className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-white/20 transition-all font-['Inter'] cursor-pointer">
                      {uploadingPhoto ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4" />
                          {photoPreview ? 'Change Photo' : 'Choose Profile Photo'}
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="hidden"
                        disabled={uploadingPhoto || isSubmitting}
                      />
                    </label>
                    <span className="text-gray-500 text-xs font-['Fira_Code']">
                      Max file size: 5MB
                    </span>
                  </div>
                </div>

                {/* Post Comment Button with Loading and Success States */}
                <button
  type="submit"
  disabled={isSubmitting || submitSuccess}
  style={!submitSuccess ? {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 60%, #1e40af 100%)',
  } : {}}
  className={`w-full px-6 py-3 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all font-['Inter'] hover:shadow-lg hover:shadow-blue-500/50 ${
    submitSuccess 
      ? 'bg-green-600 hover:bg-green-600'
      : ''
  } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Posting...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      Posted Successfully!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Post Comment
                    </>
                  )}
                </button>
              </form>

              {/* Comments List - Scrollable with spacing */}
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar mt-8">
                {/* Show message if no comments */}
                {comments.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 font-['Inter']">No comments yet. Be the first to comment!</p>
                  </div>
                )}

                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    {/* Avatar - Show photo if available, otherwise show initial */}
                    {comment.photoUrl ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-500/50">
                        <Image
                          src={comment.photoUrl}
                          alt={comment.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 font-['Space_Grotesk']">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h5 className="text-white font-semibold text-sm font-['Inter']">
                          {comment.name}
                        </h5>
                        <span className="text-gray-500 text-xs flex items-center gap-1 font-['Fira_Code']">
                          <Clock className="w-3 h-3" />
                          {formatTime(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm font-['Inter']">
                        {comment.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </section>
  );
}