// src/App.tsx

import Hero from './components/Hero/Hero';
import { heroSlides } from './components/Hero/heroData';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <main className="main-content">
        <Hero slides={heroSlides} />
      </main>
    </div>
  );
};

export default App;