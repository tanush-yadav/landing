'use client'

import { motion } from 'framer-motion'

const companies = [
  'TechCrunch',
  'Product Hunt',
  'Y Combinator', 
  'Forbes',
  'Sequoia',
  'Andreessen Horowitz',
  'First Round',
  'Benchmark',
  'Accel',
  'Index Ventures',
  // Duplicate for seamless loop
  'TechCrunch',
  'Product Hunt',
  'Y Combinator',
  'Forbes',
  'Sequoia',
]

export default function LogoParade() {
  return (
    <section className="relative py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-8"
        >
          Used by Founders from
        </motion.p>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {companies.map((company, index) => (
              <div
                key={`${company}-${index}`}
                className="flex-shrink-0 h-12 px-6 flex items-center justify-center"
              >
                <span className="text-gray-400 font-medium text-lg whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}