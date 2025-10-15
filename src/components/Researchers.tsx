import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import { Mail, Linkedin, GraduationCap, ArrowLeft, ArrowRight, User } from 'lucide-react';
import "keen-slider/keen-slider.min.css"; // Certifique-se de que este CSS está importado

// --- Tipagem e Dados Hierárquicos (Ajustados com mais detalhes e links) ---
interface Member {
  name: string;
  role: string;
  specialization: string; // Adicionado
  education: string;
  image: string;
  email?: string;
  linkedin?: string;
}

const team = {
  coordenadores: [
    { name: "Dra. Ana Silva", role: "Coordenadora Geral", specialization: "Inteligência Artificial & IoT", education: "PhD em Ciência da Computação - MIT", image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400", email: "ana.s@labx.com", linkedin: "#" },
    { name: "Dr. Carlos Santos", role: "Coordenador de Pesquisa", specialization: "Robótica & Automação", education: "PhD em Engenharia Elétrica - Stanford", image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400", email: "carlos.s@labx.com", linkedin: "#" },
    { name: "Dra. Laura Mendes", role: "Coordenadora de Projetos", specialization: "Biotecnologia & Saúde", education: "PhD em Biotecnologia - Harvard", image: "https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=400", email: "laura.m@labx.com", linkedin: "#" },
  ],
  bolsistas: [
    { name: "Mariana Lima", role: "Bolsista de Doutorado", specialization: "Processamento de Imagens", education: "Doutoranda em Bioinformática", image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400", email: "mariana.l@labx.com", linkedin: "#" },
    { name: "João Pereira", role: "Bolsista de Mestrado", specialization: "Segurança de Redes", education: "Mestrando em Cibersegurança", image: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=400", email: "joao.p@labx.com", linkedin: "#" },
    { name: "Sofia Alves", role: "Bolsista de IC", specialization: "Energias Renováveis", education: "Graduanda em Eng. de Energia", image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400", email: "sofia.a@labx.com", linkedin: "#" },
    { name: "Lucas Mendes", role: "Bolsista de IC", specialization: "Big Data & Analytics", education: "Graduando em Ciência de Dados", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400", email: "lucas.m@labx.com", linkedin: "#" },
    { name: "Carla Pinho", role: "Bolsista de Doutorado", specialization: "Machine Learning", education: "Doutoranda em Ciência da Computação", image: "https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=400", email: "carla.p@labx.com", linkedin: "#" },
  ],
  voluntarios: [
    { name: "Beatriz Ribeiro", role: "Pesquisadora Voluntária", specialization: "Design de Interação", education: "Mestranda em Design de Interação", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400", email: "bia.r@labx.com", linkedin: "#" },
    { name: "Ricardo Almeida", role: "Pesquisador Voluntário", specialization: "Desenvolvimento de Software", education: "Graduando em Eng. de Software", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400", email: "ricardo.a@labx.com", linkedin: "#" },
    { name: "Fernanda Costa", role: "Pesquisadora Voluntária", specialization: "Sustentabilidade", education: "Graduanda em Gestão Ambiental", image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400", email: "fernanda.c@labx.com", linkedin: "#" },
  ],
};

const teamStats = [
  { label: "Doutores", value: 25, unit: "+" },
  { label: "Mestrandos", value: 35, unit: "+" },
  { label: "Graduandos", value: 40, unit: "+" },
  { label: "Colaboradores", value: 100, unit: "+" }
];

// --- Componentes Auxiliares ---

const AnimatedNumber = ({ value, unit = '' }: { value: number, unit?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { damping: 40, stiffness: 100 });
  useEffect(() => { if (isInView) spring.set(value); }, [spring, isInView, value]);
  useEffect(() => spring.on("change", (latest) => { if (ref.current) ref.current.textContent = Math.round(latest).toLocaleString('pt-BR'); }), [spring]);
  return <span ref={ref}>{value === 0 ? '0' : ''}{unit}</span>; // Initial 0 and unit for SSR safety
};

const ResearcherCard = ({ member }: { member: Member }) => (
  <motion.div 
    className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center h-full backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5 }}
  >
    <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-transparent group-hover:border-cyan-500/50 transition-colors duration-300" />
    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
    <p className="text-cyan-400 text-sm font-medium mb-1">{member.role}</p>
    <p className="text-gray-400 text-xs mb-3 italic">{member.specialization}</p>
    <div className="flex items-start gap-2 text-gray-400 text-xs mb-4 flex-grow">
      <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/50" />
      <span>{member.education}</span>
    </div>
    <div className="flex items-center space-x-4 mt-auto border-t border-white/10 pt-4 w-full justify-center">
      {member.email && (
        <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-white transition-colors">
          <Mail size={20} />
        </a>
      )}
      {member.linkedin && (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin size={20} />
        </a>
      )}
    </div>
  </motion.div>
);

const TeamCarousel = ({ title, members }: { title: string, members: Member[] }) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true, // Adiciona loop para carrossel infinito
    mode: "free-snap",
    slides: {
      perView: 'auto',
      spacing: 24,
    },
    breakpoints: {
      '(min-width: 640px)': { slides: { perView: 2, spacing: 24 } },
      '(min-width: 1024px)': { slides: { perView: 3, spacing: 32 } },
      '(min-width: 1280px)': { slides: { perView: 4, spacing: 32 } },
    }
  });

  return (
    <motion.div className="mb-16 last:mb-0" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
      <div className="flex justify-between items-center mb-8">
        <motion.h3 className="text-3xl md:text-4xl font-extrabold text-white" variants={itemVariants}>{title}</motion.h3>
        <motion.div className="flex gap-4" variants={itemVariants}>
          <button 
            onClick={() => instanceRef.current?.prev()} 
            className="p-3 rounded-full bg-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-md"
            aria-label="Anterior"
          >
            <ArrowLeft size={20}/>
          </button>
          <button 
            onClick={() => instanceRef.current?.next()} 
            className="p-3 rounded-full bg-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-md"
            aria-label="Próximo"
          >
            <ArrowRight size={20}/>
          </button>
        </motion.div>
      </div>
      <div ref={sliderRef} className="keen-slider">
        {members.map((member) => (
          <div key={member.name} className="keen-slider__slide">
            <ResearcherCard member={member} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};


// --- Animações Gerais ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

// --- Componente Principal Researchers ---
const Researchers = () => {
  return (
    <section id="equipe" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
          <motion.h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight" variants={itemVariants}>
            Conheça Nossa <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Equipe</span> de Inovadores
          </motion.h2>
          <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
            Nossos talentos impulsionam a pesquisa e o desenvolvimento, moldando o futuro da tecnologia.
          </motion.p>
        </motion.div>

        {/* Team Statistics */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
          {teamStats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="bg-gray-900/50 p-6 rounded-2xl text-center backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-colors duration-300">
              <div className="text-5xl font-extrabold text-cyan-400 mb-2 leading-none"><AnimatedNumber value={stat.value} unit={stat.unit} /></div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousels for each hierarchy */}
        <div className="space-y-20"> {/* Aumenta o espaçamento entre os carrosséis */}
          <TeamCarousel title="Coordenadores" members={team.coordenadores} />
          <TeamCarousel title="Bolsistas" members={team.bolsistas} />
          <TeamCarousel title="Voluntários" members={team.voluntarios} />
        </div>
        
        {/* Call to Action */}
        <motion.div className="bg-gradient-to-br from-gray-900/70 to-black/70 border border-white/10 p-12 rounded-2xl text-center mt-20 backdrop-blur-md shadow-xl shadow-gray-900/30" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
           <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Junte-se à Nossa Missão Inovadora</h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Estamos sempre em busca de talentos excepcionais para fortalecer nossa equipe de pesquisa e inovação. Se você é apaixonado por tecnologia e quer fazer a diferença, seu lugar é aqui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-cyan-700 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2">
              <User size={20} /> Oportunidades de Pesquisa
            </button>
            <button className="border border-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-black hover:border-white flex items-center justify-center gap-2">
              <GraduationCap size={20} /> Programas de Pós-Graduação
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Researchers;