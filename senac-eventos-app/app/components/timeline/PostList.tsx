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

const PostList: React.FC<PostListProps> = ({ posts, setPosts, onRefresh, idParticipant, loading }) => {
  const handlePostDeleted = (idPost: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.idPost !== idPost));
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.idPost === updatedPost.idPost ? updatedPost : post))
    );
  };

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
          onPostDeleted={handlePostDeleted}
          onPostUpdated={handlePostUpdated}
          onRefresh={onRefresh} 
        />
      ))}
    </div>
  );
};

export default PostList;