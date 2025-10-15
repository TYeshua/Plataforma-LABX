import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Dna, Leaf, Shield, Smartphone, Zap, X } from 'lucide-react';

// --- Tipagem dos Dados ---
interface ResearchLine {
  icon: JSX.Element;
  title: string;
  description: string;
  detailedDescription: string; // Novo campo para o conteúdo do modal
  projects: number;
  colors: {
    bg: string;
    border: string;
    text: string;
  };
}

// --- DADOS ATUALIZADOS ---
const researchLines: ResearchLine[] = [
  {
    icon: <Cpu size={28} />, title: "Inteligência Artificial",
    description: "Algoritmos avançados de machine learning e deep learning.",
    detailedDescription: "Nossa pesquisa em Inteligência Artificial foca no desenvolvimento de modelos de aprendizado profundo para processamento de linguagem natural, visão computacional e análise preditiva. Exploramos arquiteturas de redes neurais, aprendizado por reforço e ética em IA para criar soluções que sejam não apenas poderosas, mas também responsáveis e justas.",
    projects: 15,
    colors: { bg: 'bg-blue-500/10', border: 'hover:border-blue-500/80', text: 'text-blue-400' }
  },
  {
    icon: <Smartphone size={28} />, title: "Internet das Coisas (IoT)",
    description: "Sistemas inteligentes para cidades e automação industrial.",
    detailedDescription: "Em IoT, nosso foco é criar ecossistemas de dispositivos conectados que coletam e analisam dados em tempo real. Desenvolvemos desde sensores de baixo consumo energético até plataformas de software em nuvem para gerenciar frotas de dispositivos, com aplicações diretas em cidades inteligentes, agricultura de precisão e indústria 4.0.",
    projects: 12,
    colors: { bg: 'bg-green-500/10', border: 'hover:border-green-500/80', text: 'text-green-400' }
  },
  {
    icon: <Dna size={28} />, title: "Biotecnologia",
    description: "Tecnologias computacionais em biologia e medicina.",
    detailedDescription: "A linha de Biotecnologia une a ciência da computação com a biologia molecular. Trabalhamos com análise de dados genômicos (genômica), proteômica e metabolômica para acelerar a descoberta de novos medicamentos, desenvolver diagnósticos mais precisos e avançar na medicina personalizada.",
    projects: 8,
    colors: { bg: 'bg-purple-500/10', border: 'hover:border-purple-500/80', text: 'text-purple-400' }
  },
  // Adicione 'detailedDescription' para os outros itens também...
  {
    icon: <Leaf size={28} />, title: "Sustentabilidade",
    description: "Tecnologias verdes e soluções para desafios ambientais.",
    detailedDescription: "Focamos em criar soluções tecnológicas para os maiores desafios ambientais do nosso tempo. Isso inclui o desenvolvimento de modelos de IA para otimização do uso de recursos hídricos e energéticos, sistemas de monitoramento da qualidade do ar e da água baseados em IoT, e pesquisa em materiais sustentáveis.",
    projects: 10,
    colors: { bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/80', text: 'text-emerald-400' }
  },
  {
    icon: <Shield size={28} />, title: "Cibersegurança",
    description: "Pesquisa em segurança digital, criptografia e proteção de dados.",
    detailedDescription: "Nossa equipe de cibersegurança trabalha na vanguarda da proteção digital. A pesquisa abrange desde o desenvolvimento de novos algoritmos de criptografia pós-quântica até a criação de sistemas de detecção de intrusão baseados em IA, garantindo a segurança de infraestruturas críticas e a privacidade dos dados.",
    projects: 7,
    colors: { bg: 'bg-red-500/10', border: 'hover:border-red-500/80', text: 'text-red-400' }
  },
  {
    icon: <Zap size={28} />, title: "Energia Renovável",
    description: "Inovações em sistemas de energia limpa e eficiência energética.",
    detailedDescription: "Esta linha de pesquisa é dedicada a acelerar a transição para uma matriz energética limpa. Desenvolvemos algoritmos para otimização de redes elétricas inteligentes (smart grids), pesquisa em novos materiais para células solares e sistemas de armazenamento de energia mais eficientes e duráveis.",
    projects: 9,
    colors: { bg: 'bg-yellow-500/10', border: 'hover:border-yellow-500/80', text: 'text-yellow-400' }
  }
];


// --- COMPONENTE DO MODAL ---
const Modal = ({ line, onClose }: { line: ResearchLine, onClose: () => void }) => {
  // Efeito para fechar o modal com a tecla 'Escape'
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Painel do Modal */}
      <motion.div
        className="relative z-10 w-full max-w-2xl bg-gray-900 border border-white/20 rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-white ${line.colors.bg}`}>
            {line.icon}
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">{line.title}</h3>
            <span className={`font-semibold ${line.colors.text}`}>{line.projects} projetos ativos</span>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">{line.detailedDescription}</p>
      </motion.div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---
const Research = () => {
  const [selectedLine, setSelectedLine] = useState<ResearchLine | null>(null);

  // ... (Componente AnimatedNumber e outros dados permanecem os mesmos da versão anterior) ...

  return (
    <section id="pesquisa" className="py-24 bg-black text-white relative">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ... (Cabeçalho da Seção) ... */}
        <motion.div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Linhas de 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Pesquisa</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Clique em uma área para explorar em detalhes nossas frentes de inovação.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchLines.map((line) => (
            <motion.button
              key={line.title}
              onClick={() => setSelectedLine(line)}
              className={`text-left group bg-gray-900/50 p-6 rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm ${line.colors.border}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110 ${line.colors.bg}`}>
                  {line.icon}
                </div>
                <span className={`text-sm font-semibold ${line.colors.text}`}>
                  {line.projects} projetos
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{line.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{line.description}</p>
            </motion.button>
          ))}
        </div>

        {/* ... (Bloco de Estatísticas) ... */}
      </div>

      <AnimatePresence>
        {selectedLine && (
          <Modal line={selectedLine} onClose={() => setSelectedLine(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Research;