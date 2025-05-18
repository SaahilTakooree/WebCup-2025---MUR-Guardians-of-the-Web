import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import gsap from 'gsap';
import axios from 'axios';


function HomePage() {

    const [articles, setArticles] = useState([]);

    const [posterUrl, setPosterUrl] = useState(null);

    useEffect(() => {
        // Fetch articles from the API
        /*
            {
                "id": 1,
                "name": "name",
                "link": *link will be the api that get the data from the dabasebase on an id[...../id/{id}]),
                "like": *number of likes that article have,
                "createdAt": "2025-05-17T14:00:00Z"
            }
        */
        axios.get('/api/articles')
        .then(response => {
            // Sort articles by createdAt descending (newest first)
            const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setArticles(sorted);
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });
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
    }, [articles]); // re-run animation when articles are updated


    //  Main logic for handling article click
    const handleArticleClick = async (postApiLink) => {
        try {
            // Step 1: Get post data (message, mood, media)
            const postResponse = await axios.get(postApiLink);
            const postData = postResponse.data;

            // Step 2: Send post data to goodbye API to generate a poster
            const goodbyeResponse = await axios.post('/api/generate-goodbye', postData);
            const { posterUrl } = goodbyeResponse.data;

            // Step 3: Show the poster
            setPosterUrl(posterUrl);

            // Optional: Open in new tab
            window.open(posterUrl, '_blank');
        } catch (err) {
            console.error("Error handling article click:", err);
        }
    };

return (
    <div 
        className="absolute top-0 left-0 w-full bg-gradient-to-b  flex flex-col items-center overflow-x-hidden"
        style={{ color: '#FFFF00' }} // Replace with your custom color
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
            style={{ color: '#F05ff3' }} // Replace with your custom color
        >
        <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: '#FF5733' }} // Replace with your custom color
        >
            Live Updates
        </h2>
        <div className="space-y-6">
        {articles.map((article, idx) => (
            <motion.div
            key={idx}
            className="article p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
            <h3 
                onClick={() => handleArticleClick(article.link)}
                className="text-xl font-semibold mb-2 cursor-pointer"
                style={{ color: '#FF00FF' }}
            >
                {article.name}
            </h3>
            <p 
                className="text-gray-600"
                style={{ color: '#FF00FF' }} // Replace with your custom color
                >{article.link}</p>
            </motion.div>
        ))}
        </div>
    </div>
    </div>
);
}


export default HomePage;