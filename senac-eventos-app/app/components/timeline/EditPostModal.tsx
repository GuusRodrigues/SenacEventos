/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { FaImage } from "react-icons/fa";
import { Post } from "@/app/interfaces/post";
import { updatePost } from "@/app/services/postService";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

const MAX_CHARACTERS = 2000;

interface EditPostModalProps {
  post: Post;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onPostUpdated: (updatedPost: Post) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  modalVisible,
  setModalVisible,
  onPostUpdated,
}) => {
  const [description, setDescription] = useState(post.description);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [participant] = useLocalStorage<{ idParticipant: number }>("participant", null);

  const openImagePicker = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (e) => {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (file) setImageFile(file);
    };
  };

  const handleUpdatePost = async () => {
    if (!description) {
      alert("Por favor, preencha todos os campos antes de atualizar.");
      return;
    }
  
    if (!participant) {
      alert("Usuário não encontrado. Por favor, faça login novamente.");
      return;
    }
  
    const formData = new FormData();
    formData.append("description", description);
  
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    try {
      const updatedPost = await updatePost(post.idPost, participant.idParticipant, formData);
      onPostUpdated(updatedPost);
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao atualizar o post:", error);
      alert("Erro ao atualizar o post.");
    }
  };

  return (
    <Modal isOpen={modalVisible} onRequestClose={() => setModalVisible(false)} ariaHideApp={false}>
      <div className="p-4 flex flex-col">
        <div className="mb-4">
          <label className="font-bold text-gray-800 text-lg">Descrição</label>
          <textarea
            placeholder="Atualize a descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-2 p-2 border text-gray-700 rounded bg-gray-100 w-full ${
              description.length > MAX_CHARACTERS ? "border-red-500" : "border-gray-300"
            }`}
          />
          <p
            className={`text-right mt-1 font-medium ${
              description.length > MAX_CHARACTERS ? "text-red-500" : "text-gray-500"
            }`}
          >
            {MAX_CHARACTERS - description.length}/{MAX_CHARACTERS}
          </p>
        </div>

        {imageFile ? (
          <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-52 mb-4 rounded" />
        ) : (
          post.imageUrl && (
            <img src={post.imageUrl} alt="Post Image" className="w-full h-52 mb-4 rounded" />
          )
        )}

        <div className="flex justify-between mb-4">
          <button
            onClick={openImagePicker}
            className="flex flex-col items-center justify-center gap-1 text-blue-500"
          >
            <FaImage size={32} />
            <p className="text-sm font-medium">Galeria</p>
          </button>
        </div>

        <button
          onClick={handleUpdatePost}
          className={`px-4 py-3 rounded-lg items-center ${
            description.length > MAX_CHARACTERS ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={description.length > MAX_CHARACTERS}
        >
          <p className="text-white font-bold">Atualizar</p>
        </button>

        <button onClick={() => setModalVisible(false)} className="mt-4 text-blue-500">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default EditPostModal;