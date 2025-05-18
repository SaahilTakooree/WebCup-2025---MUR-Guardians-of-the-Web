import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // add useNavigate
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import gsap from 'gsap';
import axios from 'axios';
import { supabase } from "./supabaseClient";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from('posts')
        .select('id, message, mood, gif_url, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
      } else {
        setArticles(data);
      }
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    gsap.from(".article", {
      opacity: 0,
      y: 30,
      stagger: 0.3,
      duration: 0.3,
      scrollTrigger: {
        trigger: ".article",
        start: "top 90%",
      },
    });
  }, [articles]);

  // Updated handler: store goodbye data & navigate to goodbye page with id
  const handleArticleClick = async (article) => {
    try {
      // Step 1: Use article.id to fetch post data if you want to call an API
      // Assuming you want to fetch detailed post data from your backend API:
      // Replace `/api/posts/${article.id}` with your actual API endpoint:
      const postResponse = await axios.get(`/api/posts/${article.id}`);
      const postData = postResponse.data;

      // Step 2: Send post data to goodbye API to generate a poster
      const goodbyeResponse = await axios.post('/api/generate-goodbye', postData);
      const { posterUrl } = goodbyeResponse.data;

      // Step 3: Prepare goodbye data object for localStorage
      const goodbyeData = {
        name: postData.name || 'Someone', // fallback if no name
        tone: postData.mood || 'happy', // use mood as tone fallback
        message: postData.message || '',
        image: posterUrl,
      };

      // Save data locally keyed by goodbye-id (use post ID)
      localStorage.setItem(`goodbye-${article.id}`, JSON.stringify(goodbyeData));

      // Navigate to GoodbyePage with this id
      navigate(`/goodbye/${article.id}`);
    } catch (err) {
      console.error("Error handling article click:", err);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full bg-gradient-to-b  flex flex-col items-center overflow-x-hidden"
      style={{ color: '#FFFF00' }}
    >
      {/* Hero Section */}
      <div
        className="w-full h-screen flex flex-col justify-center items-center relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero.jpg')` }}
      >
        {/* Page Title */}
        <h1
          className="text-8xl font-bold mb-14"
          style={{ color: '#002855' }}
        >the end.page</h1>

        <Link to="/add-post">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center bg-opacity-90 p-8 rounded-full shadow-lg cursor-pointer hover:bg-opacity-100 transition duration-300"
            style={{ color: '#FFB400' }}
          >
            <FaPlus
              className="text-4xl"
              style={{ color: '#002855' }}
            />
            <span
              className="mt-2 text-sm font-semibold text-blue-800"
              style={{ color: '#002855' }}
            >Add New Post</span>
          </motion.div>
        </Link>
      </div>

      {/* Articles Feed */}
      <div
        className="w-full max-w-3xl px-4 py-12"
        style={{ color: '#F05ff3' }}
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: '#FF5733' }}
        >
          Hall Of Fame
        </h2>
        <div className="space-y-6">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              className="article p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              {/* Clicking title triggers handleArticleClick */}
              <h3
                onClick={() => handleArticleClick(article)}
                className="text-xl font-semibold mb-2 cursor-pointer"
                style={{ color: '#FF00FF' }}
              >
                {article.message.slice(0, 30) + '...'} {/* example preview */}
              </h3>
              <p
                className="text-gray-600"
                style={{ color: '#FF00FF' }}
              >
                Mood: {article.mood}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
