"use client";

import React from "react";
import { FaFrown } from "react-icons/fa";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";
import { Post } from "@/app/interfaces/post";

interface PostListProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  onRefresh: () => void;
  idParticipant: number | null;
  loading: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, onRefresh, idParticipant, loading }) => {
  if (loading) {
    return <PostSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex-1 items-center justify-center p-4">
        <FaFrown size={48} color="#64748b" />
        <p className="text-lg font-semibold text-gray-600">Ainda não há posts</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {posts.map((item) => (
        <PostCard
          key={item.idPost}
          post={item}
          likedByUser={
            !!idParticipant &&
            Array.isArray(item.likes) &&
            item.likes.some((like) => like.participant?.idParticipant === idParticipant)
          }
        />
      ))}
      <div className="mb-4">
        <button onClick={onRefresh} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Atualizar
        </button>
      </div>
    </div>
    
  );
};

export default PostList;