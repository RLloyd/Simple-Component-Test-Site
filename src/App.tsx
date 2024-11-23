// src/App.tsx

// import Hero from './components/Hero/Hero';
// import { heroSlides } from './components/Hero/heroData';
import './App.scss';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

const App = () => {
  return (
    <div className="app">
      <main className="main-content">
        {/* <Hero slides={heroSlides} /> */}

        {/* AudioPlayer */}
        <AudioPlayer
            src="src/assets/audio/RiseAbove.wav"
            title="My Audio Track"
            autoPlay={false}
            loop={false}
            initialVolume={0.8}
            onPlay={() => console.log('Playing')}
            onPause={() => console.log('Paused')}
            onEnded={() => console.log('Ended')}
            className="my-custom-class"
            />
      </main>
    </div>
  );
};

export default App;