import React from 'react';
import { Rocket, Brain, Network, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const objectives = [
  {
    icon: <Rocket size={32} />,
    title: "Fomentar a Inovação",
    description: "Desenvolver soluções tecnológicas disruptivas que atendam às demandas da sociedade contemporânea."
  },
  {
    icon: <Brain size={32} />,
    title: "Pesquisa Interdisciplinar",
    description: "Promover a integração entre diferentes áreas do conhecimento para gerar insights únicos e soluções holísticas."
  },
  {
    icon: <Network size={32} />,
    title: "Colaboração Estratégica",
    description: "Estabelecer parcerias com instituições e empresas para maximizar o impacto e a aplicabilidade das pesquisas."
  },
  {
    icon: <Award size={32} />,
    title: "Excelência Acadêmica",
    description: "Formar pesquisadores de alto nível e contribuir para o avanço científico nacional e internacional."
  }
];

// --- ANIMAÇÕES ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Objectives = () => {
  return (
    <section id="objetivos" className="py-24 bg-gray-900/50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Nossos 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Objetivos</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Direcionamos nossos esforços para alcançar metas ambiciosas que impulsionam a inovação e o desenvolvimento.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {objectives.map((objective) => (
            <motion.div
              key={objective.title}
              variants={itemVariants}
              className="group bg-black/30 p-8 rounded-xl border border-white/10 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm"
            >
              <div className="text-cyan-400 mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {objective.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {objective.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {objective.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Objectives;