import React from 'react';
import { motion } from 'framer-motion';
import { Building2, School, Globe2, Handshake } from 'lucide-react';

// --- Tipagem e Dados Atualizados com Logos ---
interface Partner {
  name: string;
  logo: string; // Caminho para o logo, ex: '/logos/partners/usp.svg'
}

interface PartnershipType {
  icon: JSX.Element;
  title: string;
  description: string;
  partners: Partner[];
}

const partnershipTypes: PartnershipType[] = [
  {
    icon: <School size={32} />,
    title: "Universidades",
    description: "Colaborações acadêmicas com instituições de ponta.",
    partners: [
      { name: "USP", logo: "/logos/partners/usp.svg" },
      { name: "UNICAMP", logo: "/logos/partners/unicamp.svg" },
      { name: "MIT", logo: "/logos/partners/mit.svg" },
      { name: "Stanford", logo: "/logos/partners/stanford.svg" },
    ]
  },
  {
    icon: <Building2 size={32} />,
    title: "Empresas",
    description: "Parcerias estratégicas com líderes da indústria tecnológica.",
    partners: [
        { name: "Google", logo: "/logos/partners/google.svg" },
        { name: "Microsoft", logo: "/logos/partners/microsoft.svg" },
        { name: "Nvidia", logo: "/logos/partners/nvidia.svg" },
        { name: "Amazon", logo: "/logos/partners/amazon.svg" },
    ]
  },
  {
    icon: <Globe2 size={32} />,
    title: "Organizações",
    description: "Cooperação com órgãos governamentais e ONGs.",
    partners: [
        { name: "CNPq", logo: "/logos/partners/cnpq.svg" },
        { name: "FAPESP", logo: "/logos/partners/fapesp.svg" },
        { name: "UNESCO", logo: "/logos/partners/unesco.svg" },
        { name: "ONU", logo: "/logos/partners/onu.svg" },
    ]
  },
  {
    icon: <Handshake size={32} />,
    title: "Startups",
    description: "Incubação e mentoria para empresas de base tecnológica.",
    partners: [
        { name: "TechStart", logo: "/logos/partners/techstart.svg" },
        { name: "InnovaLab", logo: "/logos/partners/innovalab.svg" },
        { name: "FutureTech", logo: "/logos/partners/futuretech.svg" },
        { name: "NextGen", logo: "/logos/partners/nextgen.svg" },
    ]
  }
];

// --- Animações ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } } };

// --- Componente Principal ---
const Partnerships = () => {
  return (
    <section id="parcerias" className="py-24 bg-black text-white relative">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}>
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4" variants={itemVariants}>
            Nossa Rede de <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Parcerias</span>
          </motion.h2>
          <motion.p className="text-xl text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
            Construímos uma rede sólida de colaborações que amplifica nosso impacto e acelera a inovação.
          </motion.p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
          {partnershipTypes.map((type) => (
            <motion.div key={type.title} variants={itemVariants} className="bg-gray-900/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-400">{type.icon}</div>
                <h3 className="text-xl font-bold text-white">{type.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 flex-grow">{type.description}</p>
              
              <motion.div className="grid grid-cols-2 gap-4" variants={containerVariants}>
                {type.partners.map((partner) => (
                  <motion.div key={partner.name} variants={itemVariants} className="flex items-center justify-center h-16 bg-black/30 rounded-lg p-2">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="bg-gray-900/50 border border-white/10 p-12 rounded-2xl text-center backdrop-blur-sm" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
          <h3 className="text-3xl font-bold text-white mb-4">Interessado em uma Parceria?</h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Estamos sempre abertos a novas colaborações que possam gerar impacto positivo através da inovação.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-200 shadow-lg hover:shadow-cyan-500/30">
            Entre em Contato
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;