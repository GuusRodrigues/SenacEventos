"use client";

import React, { useState, useEffect } from "react";
import { FaEllipsisH, FaHeart, FaRegHeart } from "react-icons/fa";
import { Post } from "@/app/interfaces/post";
import { createLike, deleteLike } from "@/app/services/likeService";
import PostOptionsModal from "./PostOptionsModal";
import EditPostModal from "./EditPostModal";

interface PostCardProps {
  post: Post;
  likedByUser: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, likedByUser }) => {
  const [likes, setLikes] = useState<number>(Array.isArray(post.likes) ? post.likes.length : 0);
  const [liked, setLiked] = useState<boolean>(!!likedByUser);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchParticipantId = async () => {
      try {
        const storedParticipant = localStorage.getItem("participant");
        if (storedParticipant) {
          const participant = JSON.parse(storedParticipant);
          setIdParticipant(participant.idParticipant);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchParticipantId();
  }, []);

  const handleLike = async () => {
    if (!idParticipant) return;

    try {
      await createLike({ idPost: post.idPost, idParticipant });
      setLikes((prev) => prev + 1);
      setLiked(true);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditModalOpen(true);
    setOptionsOpen(false);
  };

  const handleDelete = () => {
    console.log("Deletar post", post);
    setOptionsOpen(false);
  };

  return (
    <div className="mb-5 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 relative">
      {post.imageUrl && (
        <img src={post.imageUrl} className="w-full h-[300px] object-cover" alt="Post Image" />
      )}
      <div className="p-4 relative">
        {idParticipant === post.participant.idParticipant && (
          <button
            onClick={() => setOptionsOpen(true)}
            className="absolute top-2 right-2 text-gray-600"
          >
            <FaEllipsisH size={20} />
          </button>
        )}
        <div
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            expanded ? "max-h-[1000px]" : "max-h-[80px]"
          }`}
        >
          <p
            className="text-gray-800 text-lg mb-2"
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {post.description}
          </p>
        </div>
        {post.description.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 font-medium mt-2"
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
      {optionsOpen && (
        <PostOptionsModal
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={() => setOptionsOpen(false)}
        />
      )}
      {editModalOpen && (
        <EditPostModal
          post={post}
          modalVisible={editModalOpen}
          setModalVisible={setEditModalOpen}
          onPostUpdated={(updatedPost) => console.log("Post atualizado", updatedPost)}
        />
      )}
    </div>
  );
};

export default PostCard;