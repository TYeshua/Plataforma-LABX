import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Objetivos', href: '#objetivos' },
  { name: 'Pilares', href: '#missao' },
  { name: 'Notícias', href: '#noticias' },
  { name: 'Pesquisa', href: '#pesquisa' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Publicações', href: '#publicacoes' },
  { name: 'Equipe', href: '#equipe' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('Início');

  // Efeito para detectar o scroll e mudar o fundo do header
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito para detectar a seção ativa (Scrollspy)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const navItem = navItems.find(item => `#${entry.target.id}` === item.href);
            if (navItem) {
              setActiveSection(navItem.name);
            }
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } // Ativa quando a seção está no meio da tela
    );

    navItems.forEach(item => {
      const element = document.querySelector(item.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);


  // Efeito para bloquear o scroll do body quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);
  
  // Variantes de animação para o Framer Motion
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.05 }},
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-md border-b border-gray-800 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          <a href="#inicio" className="cursor-pointer">
            <img src="./labxlogo5.png" alt="LABX Logo" className="h-20 w-auto" />
          </a>

          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium relative group transition-colors duration-300 ${
                  activeSection === item.name ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 transition-transform duration-300 ease-out origin-left ${
                  activeSection === item.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white z-50"
            aria-label="Abrir menu"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isMenuOpen ? 'x' : 'menu'}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-0 left-0 w-full bg-black/95 backdrop-blur-md border-b border-gray-800"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ paddingTop: '80px', height: '100vh', overflowY: 'auto' }}
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-3 text-lg text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  variants={menuItemVariants}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;