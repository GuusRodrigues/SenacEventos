"use client";

import React, { useState, useEffect } from "react";
import { fetchPosts } from "../services/postService";
import { Post } from "../interfaces/post"; // Importando o tipo Post
import PostList from "../components/timeline/PostList"; // Importando o componente PostList
import CreatePostModal from "../components/timeline/CreatePostModal"; // Importando o componente CreatePostModal
import PostSkeleton from "../components/timeline/PostSkeleton"; // Importando o componente PostSkeleton
import { HeaderTimeline } from "../components/timeline/HeaderTimeline";
import TabNavigator from "../components/tabNavgator";

const TimeLineScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Especificando o tipo de posts
  const [loading, setLoading] = useState(true);
  const [canPost, setCanPost] = useState<boolean | null>(null);
  const [idParticipant, setIdParticipant] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts); // Agora o tipo é corretamente Post[]
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipantId = async () => {
    try {
      const storedParticipant = localStorage.getItem("participant");
      if (storedParticipant) {
        const participant = JSON.parse(storedParticipant);
        setIdParticipant(participant.idParticipant);
        setCanPost(participant.postPermission === 1);
      } else {
        setCanPost(false);
      }
    } catch (error) {
      console.error("Erro ao buscar participante:", error);
      setCanPost(false);
    }
  };

  useEffect(() => {
    loadPosts();
    fetchParticipantId();
  }, []);

  if (canPost === null || loading) {
    return <PostSkeleton />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 min-h-screen p-4 ">
      <HeaderTimeline />

      {canPost && (
        <button
          onClick={() => setModalVisible(true)}
          className="self-center bg-black text-white rounded-lg py-2 px-4 mb-4"
        >
          +Adicionar Postagem
        </button>
      )}

      <PostList
        posts={posts}
        setPosts={setPosts} 
        onRefresh={loadPosts}
        idParticipant={idParticipant}
        loading={loading}
      />

      <CreatePostModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPosts={setPosts} 
        onPostCreated={loadPosts}
      />
      <TabNavigator />
    </div>
  );
};

export default TimeLineScreen;