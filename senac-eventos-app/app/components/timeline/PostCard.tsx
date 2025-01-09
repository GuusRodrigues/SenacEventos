/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Post } from "@/app/interfaces/post";
import { createLike, deleteLike } from "@/app/services/likeService";

interface PostCardProps {
  post: Post;
  likedByUser: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, likedByUser }) => {
  const [likes, setLikes] = useState<number>(Array.isArray(post.likes) ? post.likes.length : 0);
  const [liked, setLiked] = useState<boolean>(!!likedByUser);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const MAX_DESCRIPTION_LENGTH = 100;

  useEffect(() => {
    const fetchParticipantId = async () => {
      try {
        const storedParticipant = localStorage.getItem("participant");
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          setIdParticipant(participant.idParticipant);
        }
      } catch (error) {
        console.error("Erro ao buscar participante:", error);
      }
    };

    fetchParticipantId();
  }, []);

  const handleLike = async () => {
    if (!idParticipant) {
      console.error("ID do participante não encontrado.");
      return;
    }

    try {
      await createLike({ idPost: post.idPost, idParticipant });
      setLikes((prev) => prev + 1);
      setLiked(true);
    } catch (error) {
      console.error("Não foi possível adicionar o like.");
    }
  };

  const handleUnlike = async () => {
    try {
      const likeToRemove = post.likes?.find(
        (like) => like.participant?.idParticipant === idParticipant
      );

      if (likeToRemove) {
        await deleteLike(likeToRemove.idLike);
        setLikes((prev) => prev - 1);
        setLiked(false);
      }
    } catch (error) {
      console.error("Não foi possível remover o like.");
    }
  };

  return (
    <div className="mb-5 bg-white rounded-lg shadow-md overflow-hidden">
      {post.imageUrl && (
        <img src={post.imageUrl} className="w-full h-[300px]" alt="Post Image" />
      )}
      <div className="p-4 relative">
        <p className="text-gray-800 font-bold text-lg mb-2">
          {expanded || post.description.length <= MAX_DESCRIPTION_LENGTH
            ? post.description
            : `${post.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}
        </p>
        {post.description.length > MAX_DESCRIPTION_LENGTH && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 font-medium"
          >
            {expanded ? "Ver menos" : "Ver mais"}
          </button>
        )}
        <p className="text-gray-500 text-sm mt-2">
          {`Autor: ${post.participant.name} (${post.participant.companyName})`}
        </p>
        <button
          onClick={liked ? handleUnlike : handleLike}
          className="absolute bottom-2 right-2 flex-row items-center"
        >
          {liked ? (
            <FaHeart size={20} color="#FF0000" />
          ) : (
            <FaRegHeart size={20} color="#A3A3A3" />
          )}
          <span className="ml-1 text-sm text-gray-500">{likes}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;