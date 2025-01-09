/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { FaCamera, FaImage } from "react-icons/fa";
import { createPost } from "@/app/services/postService";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Participant } from "@/app/interfaces/participant";
import { Post } from "@/app/interfaces/post";
import CameraModal from "./CameraModal";

const MAX_CHARACTERS = 1000;

const CreatePostModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  onPostCreated?: () => void;
}> = ({ modalVisible, setModalVisible, setPosts, onPostCreated }) => {
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [participant] = useLocalStorage<Participant | null>("participant", null);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);

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

  const handleCreatePost = async () => {
    if (!description || !imageFile) {
      alert("Please fill in all fields before posting.");
      return;
    }

    if (description.length > MAX_CHARACTERS) {
      alert("Description exceeds the 1000 character limit.");
      return;
    }

    try {
      if (!participant) {
        alert("User not found. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("idParticipant", String(participant.idParticipant));
      formData.append("description", description);

      const createdPost = await createPost(formData);
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
      setModalVisible(false);
      setDescription("");
      setImageFile(undefined);
      if (onPostCreated) await onPostCreated();
    } catch (error) {
      alert("Error creating post.");
    }
  };

  return (
    <>
      <Modal isOpen={modalVisible} onRequestClose={() => setModalVisible(false)} ariaHideApp={false}>
        <div className="p-4 flex flex-col">
          <div className="mb-4">
            <label className="font-bold text-gray-800 text-lg">Descrição</label>
            <textarea
              placeholder="Escreva uma descrição*"
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

          {imageFile && (
            <img src={URL.createObjectURL(imageFile)} alt="Selected" className="w-full h-52 mb-4 rounded" />
          )}

<div className="flex justify-between mb-4">
  <button
    onClick={openImagePicker}
    className="flex flex-col items-center justify-center gap-1 text-blue-500"
  >
    <FaImage size={32} />
    <p className="text-sm font-medium">Galeria</p>
  </button>
  <button
    onClick={() => setCameraModalVisible(true)}
    className="flex flex-col items-center justify-center gap-1 text-blue-500"
  >
    <FaCamera size={32} />
    <p className="text-sm font-medium">Câmera</p>
  </button>
</div>

          <button
            onClick={handleCreatePost}
            className={`px-4 py-3 rounded-lg items-center ${
              description.length > MAX_CHARACTERS ? "bg-gray-400" : "bg-blue-500"
            }`}
            disabled={description.length > MAX_CHARACTERS}
          >
            <p className="text-white font-bold">Publicar</p>
          </button>

          <button onClick={() => setModalVisible(false)} className="mt-4 text-blue-500">
            Cancelar
          </button>
        </div>
      </Modal>

      <CameraModal
        isOpen={cameraModalVisible}
        onRequestClose={() => setCameraModalVisible(false)}
        onCapture={(file) => setImageFile(file)}
      />
    </>
  );
};

export default CreatePostModal;