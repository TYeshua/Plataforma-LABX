import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { Users, Target, Microscope, Globe } from 'lucide-react';

// Componente para animar os números
const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, isInView, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString('pt-BR');
      }
    });
  }, [spring]);

  return <span ref={ref}>0</span>;
};

const stats = [
    { icon: <Users size={32} />, value: 50, label: 'Pesquisadores' },
    { icon: <Target size={32} />, value: 100, label: 'Projetos Concluídos' },
    { icon: <Microscope size={32} />, value: 25, label: 'Publicações de Impacto' },
    { icon: <Globe size={32} />, value: 15, label: 'Parcerias Globais' },
];

const tags = ["Inteligência Artificial", "IoT", "Biotecnologia", "Sustentabilidade"];

const About = () => {
  return (
    <section id="sobre" className="relative py-24 bg-black text-white">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Conheça o 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Laboratório</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
            O LABX é um centro de excelência interdisciplinar dedicado a resolver os desafios mais complexos do nosso tempo através da convergência entre ciência de dados, IA e pesquisa aplicada.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Inovação que Transforma</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Nosso laboratório representa a convergência entre diferentes áreas do conhecimento, onde pesquisadores e profissionais trabalham juntos para desenvolver tecnologias que impactam positivamente a sociedade.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Equipado com infraestrutura de ponta e metodologias avançadas, o LABX é um ambiente propício para a experimentação e validação de ideias revolucionárias.
            </p>
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <span key={tag} className="bg-cyan-500/10 text-cyan-300 text-sm font-medium px-4 py-1.5 rounded-full border border-cyan-500/30">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="bg-gray-900/50 border border-white/10 p-6 rounded-xl text-center backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="text-cyan-400 mx-auto mb-4 w-fit">{stat.icon}</div>
                <h4 className="text-4xl font-bold text-white mb-2">
                  <AnimatedNumber value={stat.value} />+
                </h4>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;