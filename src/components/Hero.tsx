import React, { useEffect } from 'react';
import { ChevronDown, Zap, Cpu, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Efeito de "spotlight" que segue o mouse
  useEffect(() => {
    interface MouseMoveEvent extends MouseEvent {
      // You can extend or add custom properties if needed
    }

    const handleMouseMove = (e: MouseMoveEvent): void => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Variantes para animação escalonada dos elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Efeito de iluminação (agora com ciano mais vívido) */}
      <div className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: 'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.15), transparent 80%)'
        }}
      ></div>

      {/* Background com padrão de grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Laboratório de
          <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-white bg-clip-text text-transparent">
            Inovação Interdisciplinar
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Conectando mentes brilhantes para criar o futuro através da tecnologia, 
          pesquisa e inovação interdisciplinar.
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          className="flex flex-wrap gap-4 justify-center items-center mb-16"
        >
          {['Inovação', 'Tecnologia', 'Pesquisa'].map((text, i) => (
            <div key={text} className="flex items-center space-x-2 text-gray-200 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
              {i === 0 && <Zap className="w-5 h-5 text-blue-500" />}
              {i === 1 && <Cpu className="w-5 h-5 text-cyan-500" />}
              {i === 2 && <Lightbulb className="w-5 h-5 text-amber-400" />}
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#laboratorio"
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-200 shadow-lg hover:shadow-cyan-500/40"
          >
            Conheça o Laboratório
          </a>
          <a
            href="#projetos"
            className="border-2 border-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-black hover:border-white"
          >
            Ver Projetos
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 10, opacity: [1, 0.8, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
};

export default Hero;