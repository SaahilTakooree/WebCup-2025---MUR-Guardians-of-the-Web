import { useState } from "react";
import { motion } from "framer-motion";

const Section = ({ children }) => (
  <motion.section
    className="h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.6 }}
  >
    {children}
  </motion.section>
);

export const Interface = () => {
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("Happy");
  const [gifFile, setGifFile] = useState(null); // the actual file
  const [gifPreview, setGifPreview] = useState(null); // optional: preview
  const [error, setError] = useState("");

  const handlePost = () => {
    if (!message.trim() || !mood) {
      setError("Please enter a message and select a reaction.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("message", message);
    formData.append("mood", mood);

    if (gifFile) {
      formData.append("file", gifFile);
    }

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Upload success", data);
        // reset form if needed
      })
      .catch((err) => {
        console.error("Upload error", err);
        setError("Failed to upload post.");
      });
  };

  return (
    <div className="flex flex-col items-center w-screen gap-12">
      <MessageSection message={message} setMessage={setMessage} />
      <ReactionSection selected={mood} setSelected={setMood} />
      <AddGifSection setFile={setGifFile} setPreview={setGifPreview} />
      {gifPreview && (
        <img src={gifPreview} alt="Preview" className="w-64 h-auto rounded-xl shadow" />
      )}
      <AddPostButton onClick={handlePost} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

const MessageSection = ({ message, setMessage }) => {
  const baseStyles = "rounded-lg p-4 mb-4 shadow-md";
  const inputStyles =
    "bg-blue-100 text-blue-800 border border-blue-300 resize-none w-80 h-80";

  return (
    <Section>
      <motion.textarea
        className={`${baseStyles} ${inputStyles}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
    </Section>
  );
};

const ReactionSection = ({ selected, setSelected }) => {
  const moods = [
    { label: "Classy", icon: "bx-wine", color: "text-purple-700" },
    { label: "Dramatic", icon: "bx-theater", color: "text-red-600" },
    { label: "Sad", icon: "bx-sad", color: "text-blue-600" },
    { label: "Happy", icon: "bx-smile", color: "text-yellow-500" },
  ];

  return (
    <Section>
      <motion.div
        className="w-full max-w-xl mx-auto p-4 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {moods.map((mood) => (
          <label
            key={mood.label}
            className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl border
                        transition-all duration-200 shadow-sm 
                        ${
                          selected === mood.label
                            ? "bg-gray-100 border-gray-400"
                            : "bg-white border-gray-200 hover:border-gray-400"
                        }`}
          >
            <input
              type="radio"
              name="mood"
              value={mood.label}
              className="hidden"
              checked={selected === mood.label}
              onChange={() => setSelected(mood.label)}
            />
            <i className={`bx ${mood.icon} text-2xl ${mood.color}`}></i>
            <span className="text-lg font-medium">{mood.label}</span>
          </label>
        ))}
      </motion.div>
    </Section>
  );
};

const AddGifSection = ({ setFile, setPreview }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // store the actual file
      setPreview(URL.createObjectURL(file)); // preview
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl hover:border-gray-500 transition duration-200">
        <i className="bx bx-upload text-4xl text-gray-500 mb-2"></i>
        <span className="text-gray-700 font-medium">Click to upload a photo or GIF</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </motion.div>
  );
};

export const AddPostButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="mt-12 px-6 py-3 rounded-full bg-black text-white text-lg font-semibold shadow-md hover:bg-gray-900 transition duration-200 flex items-center gap-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <i className="bx bx-send text-xl"></i>
      Add Post
    </motion.button>
  );
};
