import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { fetchPosts } from "@/app/services/postService";

import { Post } from "@/app/interfaces/post"; 

export default function CardTimeline() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };
    fetchData();
  }, []);

  const handleLike = (id: number) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <main
          key={post.idPost}
          className="max-w-sm rounded-lg shadow-md bg-white overflow-hidden"
        >
          <img
            src={post.imageUrl}
            alt="Imagem do Post"
            className="w-full h-72 object-cover"
          />

          <div className="p-4">
            <h1 className="font-semibold mb-2 text-gray-700">
              {post.description}
            </h1>
            <p className="text-gray-700 mb-4">Autor: {post.participant.name} ( {post.participant.companyName})</p>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleLike(post.idPost)}
                className="focus:outline-none transition-transform transform hover:scale-110"
              >
                {likedPosts[post.idPost] ? (
                  <FavoriteIcon className="text-red-500" />
                ) : (
                  <FavoriteBorderIcon className="text-gray-400" />
                )}
              </button>
              <span className="text-gray-700 font-medium">Curtir</span>
            </div>
          </div>
        </main>
      ))}
    </div>
  );
}
