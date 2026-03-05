'use client';

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";

const Flourish = ({ className, flipped = false }: { className?: string, flipped?: boolean }) => (
  <svg
    width="50" height="15" viewBox="0 0 50 15" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flipped ? 'scale-x-[-1]' : ''}`}
  >
    <path d="M0 7.5 H28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M35 4 L38.5 7.5 L35 11 L31.5 7.5 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M44 5.5 L46 7.5 L44 9.5 L42 7.5 Z" fill="currentColor" opacity="0.6" />
  </svg>
);

const SectionHeading = ({ title }: { title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="flex items-center justify-center gap-4 mb-10"
  >
    <Flourish className="text-earth-900" />
    <h2 className="font-cursive text-5xl md:text-6xl text-earth-900 font-medium tracking-wide">{title}</h2>
    <Flourish className="text-earth-900" flipped />
  </motion.div>
);

const TopDunes = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-px pointer-events-none">
    <svg viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] sm:h-[100px] md:h-[160px]" preserveAspectRatio="none">
      <path d="M0 160V100C120 100 240 110 360 120C480 130 600 140 720 120C840 100 960 50 1080 40C1200 30 1320 60 1440 80V160H0Z" fill="#e6dcc5" fillOpacity="0.8" />
      <path d="M0 160V120C120 120 240 100 360 85C480 70 600 60 720 70C840 80 960 110 1080 125C1200 140 1320 140 1440 130V160H0Z" fill="#efe7d6" fillOpacity="0.9" />
      <path d="M0 160V140C120 140 240 130 360 130C480 130 600 140 720 135C840 130 960 110 1080 95C1200 80 1320 70 1440 75V160H0Z" fill="#fbf9f6" />
    </svg>
  </div>
);

const BottomDunes = () => (
  <div className="w-full overflow-hidden leading-none z-10 -translate-y-[1px] pointer-events-none mt-16 md:mt-32 block">
    <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[80px] sm:h-[140px] md:h-[220px]" preserveAspectRatio="none">
      <path d="M0 10C120 25 240 40 360 45C480 50 600 45 720 30C840 15 960 -10 1080 5C1200 20 1320 80 1440 110V220H0V10Z" fill="#d0924e" />
      <path d="M0 40C120 45 240 50 360 40C480 30 600 5 720 10C840 15 960 50 1080 80C1200 110 1320 135 1440 140V220H0V40Z" fill="#b06132" />
      <path d="M0 70C120 70 240 70 360 85C480 100 600 130 720 140C840 150 960 140 1080 125C1200 110 1320 90 1440 85V220H0V70Z" fill="#904222" />
      <path d="M0 120C120 110 240 100 360 115C480 130 600 170 720 185C840 200 960 190 1080 170C1200 150 1320 120 1440 105V220H0V120Z" fill="#693018" />
    </svg>
  </div>
);

const GallerySection = ({ setSelectedImage }: { setSelectedImage: (src: string) => void }) => {
  const galleryImages = [
    "/gallery-1.png", "/gallery-2.png", "/gallery-3.png", "/gallery-4.png",
    "/gallery-5.png", "/gallery-6.jpg", "/gallery-7.jpg",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="gallery" className="text-center pt-16">
      <SectionHeading title="Photo Gallery" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 mt-12 w-full mx-auto space-y-4"
      >
        {galleryImages.map((src, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="relative w-full break-inside-avoid overflow-hidden cursor-pointer rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500 bg-sand-200 group"
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Gallery image ${idx + 1}`}
              width={800}
              height={800}
              className="w-full h-auto object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out block"
            />
            {/* Dark glass overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-earth-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="absolute bottom-4 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 pointer-events-none">
              <span className="text-white text-sm tracking-widest font-medium uppercase drop-shadow-md">View</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Parallax configuration
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.2]);

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-sand-50 text-earth-900 overflow-hidden font-sans selection:bg-terracotta-500/30 selection:text-earth-900">



      {/* Hero Section */}
      <section className="relative h-[100svh] min-h-[600px] w-full flex flex-col items-center justify-center pt-10 overflow-hidden bg-earth-900">
        <motion.div
          className="absolute inset-0 z-0 will-change-transform"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src="/hero-img.png"
            alt="Rajasthan village landscape"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto -mt-16 sm:-mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-cursive text-6xl sm:text-7xl md:text-8xl lg:text-[100px] text-white drop-shadow-2xl leading-[1.1] mb-6 tracking-wide font-medium">
              Saruparam &<br className="sm:hidden" /> Saraswati Kodecha
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#location"
              className="group inline-flex items-center justify-center px-10 py-4 bg-terracotta-600 hover:bg-terracotta-500 text-white text-sm md:text-base font-medium tracking-wide rounded-full transition-all shadow-xl hover:shadow-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative">View Location</span>
            </a>
          </motion.div>
        </div>

        <TopDunes />
      </section>

      {/* Main Content Area */}
      <div className="bg-sand-50 relative z-20 pb-0 flex flex-col w-full">
        <div className="w-full max-w-6xl mx-auto px-6 space-y-12 md:space-y-20 pt-12 md:pt-20">

          {/* About Us */}
          <section id="about" className="text-center md:text-left pt-8">
            <SectionHeading title="About Owner" />
            <div className="mt-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[280px] md:w-1/3 aspect-[3/4] relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-sand-200 shrink-0"
              >
                <Image
                  src="/owner-img.png"
                  alt="Saruparam Kodecha"
                  fill
                  className="object-cover object-top"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full md:w-2/3 flex flex-col justify-center"
              >
                <p className="text-earth-800 text-lg md:text-xl font-light leading-relaxed md:leading-[1.8]">
                  This home is owned by Saruparam and Saraswati Kodecha.
                  Saruparam serves as a PTI (Physical Training Instructor) teacher at Baytu Bhimji School, where he is actively involved in sports training and physical education for students.
                </p>
              </motion.div>
            </div>
          </section>

          <GallerySection setSelectedImage={setSelectedImage} />

          {/* Our Location */}
          <section id="location" className="text-center pt-16">
            <SectionHeading title="Our Location" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-5xl mx-auto mt-12 aspect-[4/3] sm:aspect-[16/9] md:h-[500px] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden bg-sand-200"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113.8814546522784!2d71.742468!3d25.899455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39441d002ffdea31%3A0x13818f8189a79d42!2sSaruparam%20%26%20Saraswati%20Kodecha!5e1!3m2!1sen!2sin!4v1709628000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </motion.div>
            <a
              href="https://www.google.com/maps/place/Saruparam+%26+Saraswati+Kodecha/@25.8994078,71.7426822,48m/data=!3m1!1e3!4m6!3m5!1s0x39441d002ffdea31:0x13818f8189a79d42!8m2!3d25.899455!4d71.7425821!16s%2Fg%2F11z0wvjbzk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-terracotta-600 hover:bg-terracotta-500 text-white text-sm font-medium rounded-full transition-all shadow-md hover:shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.372 0 0 5.373 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.373 18.628 0 12 0ZM12 16.5C9.515 16.5 7.5 14.485 7.5 12C7.5 9.515 9.515 7.5 12 7.5C14.485 7.5 16.5 9.515 16.5 12C16.5 14.485 14.485 16.5 12 16.5Z" fill="currentColor" />
              </svg>
              Open in Google Maps
            </a>
          </section>

        </div>

        {/* Footer Area with Transition Dunes */}
        <div className="w-full relative flex flex-col mt-0">
          <BottomDunes />
          <footer className="w-full bg-[#693018] text-white text-center pb-16 pt-10 md:pt-16 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

              <p className="text-lg md:text-xl font-light text-white/80 tracking-wide mb-8 leading-relaxed max-w-2xl mx-auto">
                Step away from the noise and embrace the serene rhythm of the desert.
                We warmly invite you to share in the beauty and calm of our village home.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-10 text-white/90">
                <a href="tel:+918619949898" className="flex items-center gap-2 hover:text-terracotta-400 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+91 86199 49898</span>
                </a>
                <a href="mailto:srkodecha@gmail.com" className="flex items-center gap-2 hover:text-terracotta-400 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>srkodecha@gmail.com</span>
                </a>
              </div>

              <a
                href="https://www.google.com/maps/place/Saruparam+%26+Saraswati+Kodecha/@25.8994078,71.7426822,48m/data=!3m1!1e3!4m6!3m5!1s0x39441d002ffdea31:0x13818f8189a79d42!8m2!3d25.899455!4d71.7425821!16s%2Fg%2F11z0wvjbzk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 border border-white/20 hover:border-white/60 hover:bg-white/10 rounded-full transition-all text-sm tracking-widest font-medium"
              >
                Find us on Map
              </a>
            </motion.div>
          </footer>
        </div>
      </div>

      {/* Modern Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-earth-900/90 flex items-center justify-center p-4 md:p-8 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95vw] h-[95vh] rounded-2xl overflow-hidden shadow-2xl bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain drop-shadow-2xl"
                priority // Priority for lightbox image so it opens smoothly
              />
              <button
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center transition-all backdrop-blur-md shadow-lg border border-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main >
  );
}
