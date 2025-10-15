import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';
import { BookOpen, Download, ExternalLink, TrendingUp, Users, X } from 'lucide-react';

// --- Tipagem e Dados Atualizados ---
interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  citations: number;
  type: string;
  image: string; // Novo campo de imagem
  abstract: string; // Novo campo para o resumo
}

const recentPublications: Publication[] = [
    { 
      title: "Machine Learning in Smart City Infrastructure", 
      authors: "Silva, A. et al.", 
      journal: "IEEE Transactions on Smart Grid", 
      year: "2024", 
      citations: 45, 
      type: "Journal Article",
      image: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800",
      abstract: "Este artigo apresenta uma arquitetura de aprendizado de máquina para otimizar a infraestrutura de cidades inteligentes. Demonstramos através de simulações e dados reais que nosso modelo pode reduzir o congestionamento de tráfego em até 15% e melhorar a eficiência energética da rede de iluminação pública em 20%, contribuindo para cidades mais sustentáveis e responsivas."
    },
    { 
      title: "Biosensor Networks for Environmental Monitoring", 
      authors: "Santos, M. et al.", 
      journal: "Nature Biotechnology", 
      year: "2024", 
      citations: 32, 
      type: "Review Article",
      image: "https://images.pexels.com/photos/7164010/pexels-photo-7164010.jpeg?auto=compress&cs=tinysrgb&w=800",
      abstract: "Esta revisão abrangente explora os avanços mais recentes em redes de biosensores para monitoramento ambiental. Discutimos diferentes tecnologias de transdutores, estratégias de imobilização de biomoléculas e a integração com sistemas IoT para análise de dados em tempo real, destacando os desafios e oportunidades futuras para a detecção de poluentes em larga escala."
    },
    // Adicione 'image' e 'abstract' para as outras publicações...
];

const publicationStats = [
  { label: "Publicações Totais", value: 250, icon: <BookOpen size={28} /> },
  { label: "Citações", value: 3500, icon: <TrendingUp size={28} /> },
  { label: "Fator H", value: 42, icon: <TrendingUp size={28} /> },
  { label: "Colaborações", value: 85, icon: <Users size={28} /> }
];

// --- Componentes Auxiliares ---

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { damping: 40, stiffness: 100 });

  useEffect(() => { if (isInView) spring.set(value); }, [spring, isInView, value]);
  useEffect(() => spring.on("change", (latest) => { if (ref.current) ref.current.textContent = Math.round(latest).toLocaleString('pt-BR'); }), [spring]);
  
  return <span ref={ref}>0</span>;
};

const Modal = ({ pub, onClose }: { pub: Publication, onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/>
      <motion.div className="relative z-10 w-full max-w-3xl bg-gray-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
        <img src={pub.image} alt={`Imagem para ${pub.title}`} className="w-full h-56 object-cover" />
        <div className="p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
          <span className="bg-cyan-500/10 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block">{pub.type}</span>
          <h3 className="text-2xl font-bold text-white mb-3">{pub.title}</h3>
          <p className="text-sm text-gray-400 mb-4 italic"><strong>{pub.authors}</strong> - {pub.journal} ({pub.year})</p>
          <h4 className="font-semibold text-white mb-2">Resumo:</h4>
          <p className="text-gray-300 leading-relaxed text-sm max-h-48 overflow-y-auto pr-2">{pub.abstract}</p>
          <div className="flex items-center justify-between mt-6 border-t border-white/10 pt-4">
            <span className="flex items-center gap-2 text-sm text-gray-300"><TrendingUp className="w-4 h-4 text-cyan-400" />{pub.citations} citações</span>
            <div className="flex items-center space-x-4">
              <a href="#" className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-cyan-400 transition-colors"><Download className="w-4 h-4" /><span>PDF</span></a>
              <a href="#" className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-cyan-400 transition-colors"><ExternalLink className="w-4 h-4" /><span>Ver Online</span></a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Animações ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

// --- Componente Principal ---
const Publications = () => {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

  return (
    <>
      <section id="publicacoes" className="py-24 bg-gray-900/50 text-white relative">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
            {/* ... (cabeçalho da seção) ... */}
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-4" variants={itemVariants}>
                Produção <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Científica</span>
            </motion.h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
            {/* ... (cards de estatísticas) ... */}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
            <motion.h3 className="text-3xl font-bold text-white mb-8 text-center" variants={itemVariants}>Publicações Recentes</motion.h3>
            <div className="space-y-6">
              {recentPublications.map((pub) => (
                <motion.button
                  key={pub.title}
                  onClick={() => setSelectedPub(pub)}
                  variants={itemVariants}
                  className="w-full text-left bg-black/30 p-4 rounded-xl border border-white/10 transition-all duration-300 hover:bg-gray-900/50 hover:border-cyan-500/50 backdrop-blur-sm group"
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden">
                        <img src={pub.image} alt={pub.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <span className="bg-cyan-500/10 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">{pub.type}</span>
                        <span className="text-sm text-gray-400 font-medium">{pub.year}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mt-3 mb-2">{pub.title}</h4>
                      <p className="text-sm text-gray-400 mb-3 italic">{pub.authors} - {pub.journal}</p>
                      <span className="flex items-center gap-2 text-sm text-gray-300"><TrendingUp className="w-4 h-4 text-cyan-400" />{pub.citations} citações</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            <motion.div className="text-center mt-12" variants={itemVariants}>
              <button className="border border-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-black hover:border-white">
                Ver Todas as Publicações
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedPub && <Modal pub={selectedPub} onClose={() => setSelectedPub(null)} />}
      </AnimatePresence>
    </>
  );
};

export default Publications;