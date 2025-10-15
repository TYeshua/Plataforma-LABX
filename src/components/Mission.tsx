import React, { useState } from 'react';
import { Eye, Heart, Star, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Estrutura de dados para o conteúdo das abas
const content = [
  {
    id: 'Missão',
    icon: <Heart size={28} />,
    title: 'Missão',
    text: 'Promover a pesquisa interdisciplinar de excelência, desenvolvendo soluções tecnológicas inovadoras que contribuam para o avanço científico e o bem-estar da sociedade, através da formação de pesquisadores e da colaboração estratégica.',
  },
  {
    id: 'Visão',
    icon: <Eye size={28} />,
    title: 'Visão',
    text: 'Ser um centro de referência internacional em pesquisa interdisciplinar e inovação, liderando transformações positivas na sociedade através do conhecimento científico aplicado.',
  },
  {
    id: 'Valores',
    icon: <Star size={28} />,
    title: 'Valores',
    values: [
      'Excelência: Busca constante pela qualidade.',
      'Inovação: Criatividade e pensamento disruptivo.',
      'Colaboração: Trabalho em equipe interdisciplinar.',
      'Ética: Integridade em todas as ações.',
      'Sustentabilidade: Responsabilidade socioambiental.',
    ],
  },
];

const Mission = () => {
  const [activeTab, setActiveTab] = useState(content[0]);

  return (
    <section id="missao" className="relative py-24 bg-black text-white">
      {/* Fundo com efeito Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/957024/berchtesgaden-alpine-watzmann-berchtesgaden-national-park-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Pilares</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A base que orienta nossa jornada em direção à excelência em pesquisa e inovação.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Abas de Navegação */}
          <div className="flex justify-center border border-white/10 rounded-xl p-1 mb-10 bg-black/30 backdrop-blur-sm">
            {content.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item)}
                className={`relative w-full px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-300 ${activeTab.id === item.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {activeTab.id === item.id && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {item.icon} {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Conteúdo das Abas com Animação */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {activeTab.text ? (
                  <p className="text-xl text-gray-200 leading-relaxed font-light">
                    {activeTab.text}
                  </p>
                ) : (
                  <ul className="space-y-3 text-left inline-block">
                    {activeTab.values?.map(value => (
                      <li key={value} className="flex items-start text-lg text-gray-200 font-light">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;