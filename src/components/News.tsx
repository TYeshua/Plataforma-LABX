// src/components/News.tsx

import React, { useState } from 'react';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';

// --- Tipagem para os dados ---
interface NewsItem {
  title: string;
  excerpt: string;
  date: string; // Formato "AAAA-MM-DD"
  category: string;
  image: string;
}

// --- DADOS ---
const news: NewsItem[] = [
    {
      title: "LABX recebe prêmio internacional de inovação em IA",
      excerpt: "Nosso projeto SmartCity AI Platform foi reconhecido como a melhor solução de IA para cidades inteligentes.",
      date: "2025-10-15",
      category: "Prêmios",
      image: "/labxlogo5.png",
    },
    {
      title: "Nova parceria com Google Research",
      excerpt: "Firmamos uma colaboração estratégica para o desenvolvimento de algoritmos de machine learning sustentáveis.",
      date: "2025-10-02",
      category: "Parcerias",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Publicação na Nature Biotechnology",
      excerpt: "Artigo sobre biosensores IoT para monitoramento ambiental é aceito em uma das principais revistas científicas.",
      date: "2025-09-25",
      category: "Publicações",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Inauguração do laboratório de cibersegurança",
      excerpt: "Novo espaço dedicado à pesquisa em segurança digital conta com infraestrutura de última geração.",
      date: "2025-09-18",
      category: "Infraestrutura",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Workshop de Quantum Computing",
      excerpt: "Evento exclusivo reuniu os maiores nomes da computação quântica para um dia de aprendizado e networking.",
      date: "2025-09-10",
      category: "Eventos",
      image: "https://images.pexels.com/photos/8927054/pexels-photo-8927054.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Descoberta de novo material supercondutor",
      excerpt: "Pesquisadores do LABX anunciam avanço significativo na ciência dos materiais com aplicações em energia renovável.",
      date: "2025-08-28",
      category: "Pesquisa",
      image: "https://images.pexels.com/photos/17215286/pexels-photo-17215286.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

// --- COMPONENTES AUXILIARES ---

const CategoryPill: React.FC<{ category: string }> = ({ category }) => {
  const categoryStyles: { [key: string]: string } = {
    'Prêmios': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Parcerias': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Publicações': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Infraestrutura': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Eventos': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Pesquisa': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyles[category] || 'bg-gray-500/10 text-gray-400'}`}>
      {category}
    </span>
  );
};

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const [year, month, day] = item.date.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="keen-slider__slide h-auto">
      <a href="#" className="group block bg-gray-900/50 border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/20 h-full flex flex-col">
        <div className="h-48 overflow-hidden">
          <img
            src={item.image}
            alt={`Imagem da notícia: ${item.title}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-4">
            <CategoryPill category={item.category} />
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="w-4 h-4 mr-1.5" />
              {formattedDate}
            </div>
          </div>
          <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors flex-grow">
            {item.title}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.excerpt}
          </p>
          <div className="mt-4 text-cyan-400 group-hover:text-white transition-colors duration-200 flex items-center space-x-2 font-semibold text-sm">
            <span>Ler mais</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </a>
    </div>
  );
};

// --- ANIMAÇÕES ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } } };

// --- COMPONENTE PRINCIPAL ---
const News = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 30 } },
    },
    slides: { perView: 1, spacing: 15 },
    slideChanged(slider) { setCurrentSlide(slider.track.details.rel); },
    created() { setLoaded(true); },
  });

  return (
    <section id="noticias" className="py-24 bg-black text-white relative">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col md:flex-row justify-between md:items-end mb-12" variants={itemVariants}>
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Últimas
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-white bg-clip-text text-transparent"> Notícias</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              Acompanhe as principais novidades, conquistas e desenvolvimentos do LABX.
            </p>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="relative">
          <div ref={sliderRef} className="keen-slider">
            {news.map((item) => (
              <NewsCard key={item.title} item={item} />
            ))}
          </div>

          {/* Adicionando setas de navegação sobre o carrossel */}
          {loaded && instanceRef.current && (
            <>
              <button
                aria-label="Notícia Anterior"
                onClick={(e) => { e.stopPropagation(); instanceRef.current?.prev(); }}
                className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all duration-200 z-10 border border-white/20"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                aria-label="Próxima Notícia"
                onClick={(e) => { e.stopPropagation(); instanceRef.current?.next(); }}
                className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all duration-200 z-10 border border-white/20"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}
        </motion.div>

        {/* Navegação por pontos (dots) */}
        {loaded && instanceRef.current && (
          <motion.div 
            className="flex items-center justify-center gap-2 mt-8"
            variants={itemVariants}
          >
            {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
              <button
                key={idx}
                aria-label={`Ir para a notícia ${idx + 1}`}
                onClick={() => { instanceRef.current?.moveToIdx(idx); }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  currentSlide === idx ? 'bg-cyan-400 scale-125' : 'bg-white/20 hover:bg-white/40'
                }`}
              ></button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default News;