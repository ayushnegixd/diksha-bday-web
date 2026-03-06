import { motion } from 'framer-motion';
import { GALLERY_CONTENT } from '../constants/content';

export default function Gallery() {
  return (
    <div className="w-full bg-transparent py-8 sm:py-16 px-4 sm:px-8 text-zinc-900 overflow-hidden font-serif">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold italic font-serif mb-6 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent pb-6 leading-relaxed text-center w-full mx-auto block max-w-full">
            {GALLERY_CONTENT.title}
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-rose-600 font-handwriting leading-[2] pb-2 px-2 font-medium">
            {GALLERY_CONTENT.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12 mb-24">
          {GALLERY_CONTENT.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: (index % 3) * 0.15,
                ease: 'easeOut'
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              className="relative group cursor-pointer"
              style={{
                transform: `rotate(${photo.rotation}deg)`
              }}
            >
              <div className="bg-white/30 backdrop-blur-xl border border-white/20 border-t-2 border-t-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-3 sm:p-4 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.1)] transition-shadow duration-300 flex flex-col h-full">
                <div className="aspect-square mb-6 shrink-0 overflow-hidden bg-zinc-100/50 flex items-center justify-center relative border border-gray-100">
                  <span className="text-zinc-300 absolute z-0 select-none font-mono text-xs sm:text-sm leading-none flex items-center justify-center h-full w-full opacity-50">IMAGE {photo.id}</span>
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover relative z-10 filter grayscale-[0.2] contrast-125 sepia-[0.1]"
                  />
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />
                </div>
                <div className="w-full text-center px-2 flex-grow flex items-center justify-center">
                  <p className="font-semibold text-sm sm:text-lg tracking-widest font-mono uppercase transform -rotate-1 opacity-90 text-amber-400 mt-2 pb-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto pb-2"
        >
          <p className="text-xl sm:text-2xl md:text-3xl text-rose-600 font-handwriting leading-[2] pb-8 font-medium">
            {GALLERY_CONTENT.footer}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
