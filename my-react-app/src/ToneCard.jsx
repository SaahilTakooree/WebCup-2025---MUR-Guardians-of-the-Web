import React from 'react';
import PixelCard from './PixelCard';

function ToneCard({ label, variant, sampleMessage, onClick }) {
  return (
    <PixelCard variant={variant} className="tone-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h2>{label}</h2>
      <p>{sampleMessage}</p>
    </PixelCard>
  );
}

export default ToneCard;
