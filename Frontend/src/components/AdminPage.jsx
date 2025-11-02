import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const AdminPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    image_url: "",
    video_url: "",
    content: "",
  });
 
  const categories = [
    "health",
    "technology",
    "sports",
    "business",
    "politics",
    "entertainment",
  ];
 
  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(" Error fetching:", error);
    else setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);
 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this news?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) alert(" Failed to delete news");
    else {
      alert("✅ News deleted successfully!");
      fetchNews();
    }
  };
 
  const handleEdit = (item) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      image_url: item.image_url,
      video_url: item.video_url,
      content: item.content,
    });
  };

   const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("  Logout failed!");
      console.error(error);
    } else {
      alert("👋 Logged out successfully!");
      navigate("/login");  
    }
  };
 
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("news")
      .update(formData)
      .eq("id", editingNews.id);

    if (error) alert("❌ Failed to update news");
    else {
      alert("✅ News updated successfully!");
      setEditingNews(null);
      fetchNews();
    }
  };
 
  const handleAddNews = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("news").insert([formData]);

    if (error) alert("❌ Failed to add news");
    else {
      alert("✅ News added successfully!");
      setShowAddModal(false);
      setFormData({ title: "", slug: "", image_url: "", video_url: "", content: "" });
      fetchNews();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
  
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">🧾 Admin Dashboard</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md"
          >
            ➕ Add News
          </button>
          <button 
          onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md"
          >
               logout
          </button>
        </div>
 
        {loading ? (
          <p className="text-center text-gray-500 py-6">Loading data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white text-sm uppercase">
                <tr>
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Created At</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr
                    key={item.id}
                    className="text-center border-t hover:bg-blue-50 transition"
                  >
                    <td className="p-3 border">{item.id}</td>
                    <td className="p-3 border font-medium text-gray-800">{item.title}</td>
                    <td className="p-3 border text-gray-600">{item.slug}</td>
                    <td className="p-3 border text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 border flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm shadow"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
 
      {showAddModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
    <div className="relative bg-gradient-to-br from-white/90 to-blue-50 border border-blue-100 rounded-2xl shadow-2xl p-8 w-11/12 sm:w-2/3 md:w-1/2 transition-all duration-300">
    
      <button
        onClick={() => setShowAddModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
      >
        ✖
      </button>

       
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
        <span>📰</span> Add New News
      </h2>

      
      <form onSubmit={handleAddNews} className="space-y-5">
 
        <div>
          <label className="block text-sm font-semibold text-black mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter news title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-black"
            required
          />
        </div>
 
        <div>
          <label className="block text-sm font-semibold text-black mb-1">
            Category
          </label>
          <select
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-black"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
 
        <div>
          <label className="block text-sm font-semibold text-black mb-1">
            Image URL
          </label>
          <input
            type="text"
            placeholder="Paste an image link..."
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-black"
          />
        </div>
 
        <div>
          <label className="block text-sm font-semibold text-black mb-1">
            Video (YouTube Embed URL)
          </label>
          <input
            type="text"
            placeholder="Paste YouTube embed URL..."
            value={formData.video_url}
            onChange={(e) =>
              setFormData({ ...formData, video_url: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-black"
          />
        </div>
 
        <div>
          <label className="block text-sm font-semibold text-black mb-1">
            Content
          </label>
          <textarea
            placeholder="Write your news content here..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition h-32 resize-none text-black"
          ></textarea>
        </div>
 
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md transition"
          >
            ➕ Add News
          </button>
        </div>
      </form>
    </div>
  </div>
)}

 
      {editingNews && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-2/3 md:w-1/2 relative">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              ✏️ Edit News
            </h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded p-2 bg-gray-700"
              />
              <select
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full border rounded p-2 bg-gray-700"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full border rounded p-2 bg-gray-700"
              />
              <input
                type="text"
                placeholder="Video URL"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full border rounded p-2 bg-gray-700"
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full border rounded p-2 h-28 resize-none bg-gray-700"
              ></textarea>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingNews(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
