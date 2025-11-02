import React from "react"; 

const NewsCard = ({ title, category, image, description, author, date, video_url, slug }) => {
 
  const renderVideo = (video_url) => {
    if (!video_url) return null;
 
    if (video_url.includes("<iframe")) {
      return (
        <div
          className="mt-4 aspect-video"
          dangerouslySetInnerHTML={{ __html: video_url }}
        />
      );
    }
 
    if (video_url.includes("youtube.com/watch")) {
      const videoId = video_url.split("v=")[1]?.split("&")[0];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <div className="mt-4 aspect-video">
          <iframe
            className="rounded-lg"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
 
    return (
      <div className="mt-4 aspect-video">
        <iframe
          className="rounded-lg"
          src={video_url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
   
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}

    
      <div className="p-4">
        <span className="text-sm text-blue-600 font-semibold uppercase">
          {category}
        </span>

     
    
          <h3 className="text-lg font-bold mt-2 text-gray-900 hover:text-blue-700 transition-colors">
            {title}
          </h3>
        

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{description}</p>

    
        {renderVideo(video_url)}

        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <span>{author || "Admin"}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
