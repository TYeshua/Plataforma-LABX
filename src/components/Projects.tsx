import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';
import { ExternalLink, Calendar, Users, Award, X } from 'lucide-react';

// --- Tipagem e Dados ---
interface Project {
  title: string;
  description: string;
  detailedDescription: string; // Para o modal
  category: string;
  status: 'Concluído' | 'Em Desenvolvimento' | 'Fase de Testes';
  team: number;
  duration: string;
  image: string;
}

const featuredProjects: Project[] = [
  {
    title: "SmartCity AI Platform",
    description: "Plataforma de IA para otimização de recursos urbanos e melhoria da qualidade de vida.",
    detailedDescription: "A SmartCity AI Platform utiliza uma rede de sensores IoT e algoritmos de deep learning para analisar padrões de tráfego, consumo de energia e gestão de resíduos em tempo real. O objetivo é fornecer aos gestores urbanos insights acionáveis para criar cidades mais eficientes, sustentáveis e responsivas às necessidades dos cidadãos.",
    category: "Inteligência Artificial",
    status: "Em Desenvolvimento",
    team: 8,
    duration: "24 meses",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "BioSensor Network",
    description: "Rede de biosensores IoT para monitoramento ambiental e detecção precoce de poluentes.",
    detailedDescription: "Este projeto desenvolve biosensores de baixo custo capazes de detectar poluentes específicos na água e no ar com alta precisão. Os dados são transmitidos via uma rede LoRaWAN para uma plataforma em nuvem que utiliza machine learning para identificar fontes de contaminação e prever eventos de risco ambiental, permitindo ações preventivas mais rápidas.",
    category: "IoT & Biotecnologia",
    status: "Fase de Testes",
    team: 6,
    duration: "18 meses",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  // Adicione 'detailedDescription' para os outros projetos...
  {
    title: "Green Energy Optimizer",
    description: "Sistema de otimização para redes de energia renovável usando algoritmos de ML.",
    detailedDescription: "O Green Energy Optimizer é um software que se integra a redes elétricas inteligentes (smart grids) para otimizar a distribuição e o armazenamento de energia de fontes renováveis, como solar e eólica. Ele prevê a demanda e a geração de energia para minimizar o desperdício e garantir a estabilidade da rede.",
    category: "Energia Renovável",
    status: "Concluído",
    team: 5,
    duration: "12 meses",
    image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "CyberShield Pro",
    description: "Framework avançado de cibersegurança para proteção de infraestruturas críticas.",
    detailedDescription: "O CyberShield Pro é uma suíte de ferramentas de segurança que utiliza IA para detectar e responder a ameaças cibernéticas em tempo real. Ele é projetado para proteger infraestruturas críticas como redes elétricas, sistemas de abastecimento de água e redes de comunicação contra ataques sofisticados.",
    category: "Cibersegurança",
    status: "Em Desenvolvimento",
    team: 10,
    duration: "30 meses",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

// --- Componentes Auxiliares ---

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { damping: 50, stiffness: 100 });

  useEffect(() => { if (isInView) { spring.set(value); } }, [spring, isInView, value]);
  useEffect(() => spring.on("change", (latest) => { if (ref.current) { ref.current.textContent = Math.round(latest).toLocaleString('pt-BR'); } }), [spring]);
  
  return <span ref={ref}>0</span>;
};

const Modal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
    useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/>
            <motion.div className="relative z-10 w-full max-w-4xl bg-gray-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover"/>
                <div className="p-8">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
                    <span className="text-sm font-semibold text-cyan-400">{project.category}</span>
                    <h3 className="text-3xl font-bold text-white mt-2 mb-4">{project.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{project.detailedDescription}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300">
                        <div className="flex items-center gap-2"><Award className="w-5 h-5 text-cyan-400" /> <strong>Status:</strong> {project.status}</div>
                        <div className="flex items-center gap-2"><Users className="w-5 h-5 text-cyan-400" /> <strong>Equipe:</strong> {project.team} pesquisadores</div>
                        <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-cyan-400" /> <strong>Duração:</strong> {project.duration}</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Componente Principal ---
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Concluído': return 'bg-green-500/10 text-green-300 border-green-500/20';
      case 'Em Desenvolvimento': return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
      case 'Fase de Testes': return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20';
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  return (
    <>
      <section id="projetos" className="py-24 bg-black text-white relative">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-4" variants={itemVariants}>
              Projetos em <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Destaque</span>
            </motion.h2>
            <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
              Conheça alguns dos nossos projetos mais inovadores que estão moldando o futuro da tecnologia.
            </motion.p>
          </motion.div>

          <motion.div className="grid lg:grid-cols-2 gap-8 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
            {featuredProjects.map((project) => (
              <motion.button key={project.title} onClick={() => setSelectedProject(project)} variants={itemVariants} className="text-left bg-gray-900/50 rounded-xl overflow-hidden group border border-white/10 transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-2 backdrop-blur-sm">
                <div className="h-48 overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-cyan-400 font-semibold">{project.category}</span>
                  <h3 className="text-2xl font-bold text-white mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /><span>{project.team} pesquisadores</span></div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><span>{project.duration}</span></div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="bg-gray-900/50 border border-white/10 p-10 rounded-2xl text-center backdrop-blur-sm" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4">Reconhecimento e Impacto</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Nossos projetos consolidam nossa posição como referência em inovação.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-white mb-2"><AnimatedNumber value={15} />+</div>
                <div className="text-gray-400">Prêmios Recebidos</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2"><AnimatedNumber value={100} />+</div>
                <div className="text-gray-400">Projetos Realizados</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">R$<AnimatedNumber value={50} />M+</div>
                <div className="text-gray-400">Em Investimentos</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
};

export default Projects;