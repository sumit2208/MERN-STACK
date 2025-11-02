import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const NewsDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) console.error("Error fetching article:", error);
      else setArticle(data);

      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!article) return <p className="text-center mt-10">Article not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-500 mb-4">
        Published on {new Date(article.created_at).toLocaleDateString()}
      </p>

      <img
        src={article.image_url}
        alt={article.title}
        className="w-full rounded-lg mb-6 shadow"
      />

      {article.video_url && (
        <div className="mb-6 aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(article.video_url)}
            title={article.title}
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}

      <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
    </div>
  );
};

export default NewsDetail;
