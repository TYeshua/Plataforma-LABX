import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube, Code } from 'lucide-react';

const navLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Equipe', href: '#equipe' },
  { name: 'Publicações', href: '#publicacoes' },
];

const socialLinks = [
    { icon: <Linkedin size={20} />, href: '#' },
    { icon: <Twitter size={20} />, href: '#' },
    { icon: <Instagram size={20} />, href: '#' },
    { icon: <Youtube size={20} />, href: '#' },
];

const developers = [
    // Substitua com os nomes e links reais
    { name: 'Thiago Yeshua', linkedin: 'www.linkedin.com/in/thiagoyeshua' },
    { name: 'Josué Dias', linkedin: 'https://www.linkedin.com/in/usuario-colega/' },
];

const Footer = () => {
  return (
    <footer id="contato" className="relative bg-black text-white border-t border-white/10 pt-16 pb-8">
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_100%)]"></div>
      
      <motion.div 
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <a href="#inicio" className="flex items-center space-x-3 mb-6 w-fit">
              <img src="/labx.png" alt="LABX Logo" className="h-10 w-auto" />
              <div>
                <h3 className="text-2xl font-bold tracking-wider">
                  LAB<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">X</span>
                </h3>
                <p className="text-gray-400 text-xs">Laboratório de Inovação Interdisciplinar</p>
              </div>
            </a>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Transformando ideias em soluções que impactam positivamente a sociedade através da tecnologia e pesquisa.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-colors duration-200">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.name}><a href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">{link.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Informações de Contato */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>Universidade Federal</p>
                  <p>Salinópolis, PA - Brasil</p> {/* Localização atualizada */}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400 hover:text-white transition-colors"><a href="tel:+551112345678">+55 (11) 1234-5678</a></span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400 hover:text-white transition-colors"><a href="mailto:contato@labx.edu.br">contato@labx.edu.br</a></span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} LABX. Todos os direitos reservados.
            </p>
            
            {/* Créditos dos Desenvolvedores */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Code size={16} className="text-cyan-400" />
              <div className="flex gap-4">
                {developers.map((dev) => (
                  <a 
                    key={dev.name} 
                    href={dev.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    {dev.name}
                    <Linkedin size={14} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;