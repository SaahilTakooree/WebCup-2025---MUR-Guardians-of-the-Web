// GoodbyeForm.jsx
import React, { useState } from 'react';
import './GoodbyeForm.css'; // You can style as needed
import { useNavigate } from 'react-router-dom';
import PixelCard from './PixelCard';

function GoodbyeForm() {
  const [name, setName] = useState('');
  const [tone, setTone] = useState('dramatic');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const goodbyeData = {
      name,
      tone,
      message,
      image: image ? URL.createObjectURL(image) : null,
    };

    // Save data in localStorage or global state (quick for now)
    const id = Date.now().toString();
    localStorage.setItem(`goodbye-${id}`, JSON.stringify(goodbyeData));

    // Redirect to goodbye page
    navigate(`/goodbye/${id}`);
  };

  return (
    <form className="goodbye-form" onSubmit={handleSubmit}>

      <h2>Create Your Goodbye</h2>

      <label>Name / Username :</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. AnonymousDonkey47"
        required
      />

      <label>Goodbye Tone:</label>
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option value="dramatic">Dramatic</option>
        <option value="ironic">Ironic</option>
        <option value="touching">Touching</option>
        <option value="absurd">Absurd</option>
        <option value="passive-aggressive">Passive-Aggressive</option>
        <option value="cringe">Cringe</option>
        <option value="honest">Honest</option>
        <option value="melancholy">Melancholy</option>
      </select>

      <label>Your Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="5"
        placeholder="Say what needs to be said..."
        required
      />

      <label>Upload a GIF or Image (optional):</label>
      <input
        type="file"
        accept="image/*, .gif"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Create Goodbye Page</button>
    </form>
  );
}

export default GoodbyeForm;
