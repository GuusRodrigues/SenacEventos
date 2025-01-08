import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function CardTimeline() {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <main className="max-w-sm rounded-lg shadow-md bg-white overflow-hidden">
      <img
        src="https://media.istockphoto.com/id/499517325/pt/foto/um-homem-falando-em-uma-confer%C3%AAncia-de-neg%C3%B3cios.jpg?s=612x612&w=0&k=20&c=yxUfXB3YGNK9trUiaFJrOJBQxrDzYLfTynw-2OHt-ys="
        alt="Conferência de Negócios"
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <h1 className="text-xl font-bold mb-2 text-gray-700">Título</h1>
        <p className="text-gray-700 mb-4">
          Descrição do conteúdo. Aqui vai uma breve explicação sobre o tópico.
        </p>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleLike}
            className="focus:outline-none transition-transform transform hover:scale-110"
          >
            {liked ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon className="text-gray-400" />
            )}
          </button>
          <span className="text-gray-700 font-medium">Curtir</span>
        </div>
      </div>
    </main>
  );
}
