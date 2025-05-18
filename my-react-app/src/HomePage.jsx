import React from 'react';
import { tones } from './tones';
import ToneCard from './ToneCard';
import './Homepage.css';
import SplitText from "./SplitText";

function Homepage() {
  const handleToneClick = (toneId) => {
    console.log('Tone clicked:', toneId);
    // e.g., navigate(`/create/${toneId}`);
  };

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div className="homepage-container">
      <SplitText
        text="Choose Your Goodbye Tone"
        className="my-heading"
        delay={150}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      <div className="tone-grid">
        {tones.map((tone) => (
          <ToneCard
            key={tone.id}
            label={tone.label}
            variant={tone.variant}
            sampleMessage={tone.sampleMessage}
            onClick={() => handleToneClick(tone.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
