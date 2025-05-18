import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import dramaticToneAnimation from './assets/animations/dramaticTone.json';
import cloudAnimation from './assets/animations/cloudAnimation.json';
import './GoodbyePage.css';
import confettiAnimation from './assets/animations/confetti.json'; 


function GoodbyePage() {
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem(`goodbye-${id}`));

  if (!data) return <p>Goodbye not found.</p>;

  // Retrieved form data.
  const { name, tone, message, image } = data;

  // Tone-based conditions.
  const showRain = tone === 'melancholy' || tone === 'sad';
  const showDramaticLottie = tone === 'dramatic';
  const showCloudLottie = tone === 'melancholy' || tone === 'sad';
  const showConfetti = tone === 'happy';


  // Conditional rendering based on tone.
 return (
  <div className="goodbye-page-main-container">
    {showCloudLottie && (
      <div className="lottie-cloud-container">
        <Lottie
          animationData={cloudAnimation}  
          loop={true}
          autoplay={true}
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>
    )}
    {showDramaticLottie && (
      <div className="lottie-container">
        <Lottie 
          animationData={dramaticToneAnimation} 
          loop={false} 
          autoplay={true} 
          style={{ width: '100vw', height: '100vh' }} 
        />
      </div>
    )}
    {showConfetti && (
      <div className="lottie-container">
        <Lottie
          animationData={confettiAnimation} 
          loop={true} 
          autoplay={true} 
          style={{ width: '100vw', height: '100vh' }} 
        />
      </div>
    )}

    <div className={`goodbye-page tone-${tone}`}>
      {showRain && <Rain />}
      <h1>👋 Goodbye from {name}</h1>
      <p className="goodbye-message">{message}</p>

      <div className='goodbye-image-container'>
        {image && <img src={image} alt="Goodbye visual" className="goodbye-image" />}
      </div>

      <footer className="goodbye-footer">
        <p>This was {tone.toUpperCase()}.</p>
        <p>Share this page: <span>{window.location.href}</span></p>
      </footer>
    </div>
  </div>
);

}



function Rain() {
  const drops = Array.from({ length: 50 });

  return (
    <div className="rain-container" aria-hidden="true">
      {drops.map((_, i) => (
        <div
          key={i}
          className="raindrop"
          style={{
            left: `${i * 2}%`,
            animationDelay: `${(i % 10) * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default GoodbyePage;
