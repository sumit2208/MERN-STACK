import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import NewsCard from "../components/NewsCard";
import AdminLogin from "./Login";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAdmin, setShowAdmin] = useState(false);

  const categories = [
    "All",
    "Health",
    "Technology",
    "Sports",
    "Business",
    "Politics",
    "Entertainment",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setErrorMsg(null);

      let query = supabase
        .from("news")
        .select("id, title, slug, image_url, video_url, content, created_at")
        .order("created_at", { ascending: false });

      if (selectedCategory !== "All") {
        query = query.eq("slug", selectedCategory.toLowerCase());
      }

      const { data, error } = await query;

      if (error) {
        console.error("❌ Error fetching news:", error);
        setErrorMsg("Failed to fetch news. Please try again later.");
      } else {
        setNews(data || []);
      }

      setLoading(false);
    };

    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 shadow flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPqEEI_x50vlET-ur5DsLdnNmprdM-L9HTUw&s"
            alt="Logo"
            className="w-14 h-14 rounded-full border-2 border-white shadow-md"
          />
        </div>
 
        <div className="text-center flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold">🗞️ Latest News Updates</h1>
          <p className="text-blue-100 text-sm mt-1">
            Stay informed with the latest stories and breaking headlines.
          </p>
        </div>
 
        <div>
          <button
            onClick={() => setShowAdmin(true)}
            className="bg-white text-blue-700 font-semibold py-2 px-5 rounded-full shadow hover:bg-blue-50 transition-all"
          >
            ADMIN ACCESS
          </button>
        </div>
      </header>
 
      {showAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-[90%] sm:w-[400px]">
           
            <button
              onClick={() => setShowAdmin(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <AdminLogin onLoginSuccess={() => setShowAdmin(false)} />
          </div>
        </div>
      )}

     
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-3 mt-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
 
      <section className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-gray-500 text-center animate-pulse">⏳ Loading news...</p>
        ) : errorMsg ? (
          <p className="text-center text-red-600">{errorMsg}</p>
        ) : news.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                slug={item.slug}
                category={item.slug || "General"}
                image={item.image_url}
                description={
                  item.content
                    ? item.content.slice(0, 150) + "..."
                    : "No content available."
                }
                date={new Date(item.created_at).toLocaleDateString()}
                video_url={item.video_url}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            📰 No news available for "{selectedCategory}".
          </p>
        )}
      </section>
 
      <footer className="bg-gray-100 py-4 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} News Portal — All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
