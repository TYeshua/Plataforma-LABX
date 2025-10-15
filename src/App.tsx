// src/App.tsx

import React from 'react';

// Importação de todos os componentes que formam a página
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Objectives from './components/Objectives';
import Mission from './components/Mission';
import News from './components/News';
import Research from './components/Research';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Partnerships from './components/Partnerships';
import Researchers from './components/Researchers';
import Footer from './components/Footer';

function App() {
  return (
    // A classe 'bg-black' no container principal garante um fundo consistente
    <div className="bg-black">
      {/* O Header fica fora do 'main' para poder ser fixo sobre todo o conteúdo */}
      <Header />

      {/* 'main' agrupa o conteúdo principal da página */}
      <main>
        <Hero />
        <About />
        <Objectives />
        <Mission />
        <News />
        <Research />
        <Projects />
        <Publications />
        <Partnerships />
        <Researchers />
      </main>

      {/* O Footer também fica fora do 'main' para uma clara separação semântica */}
      <Footer />
    </div>
  );
}

export default App;