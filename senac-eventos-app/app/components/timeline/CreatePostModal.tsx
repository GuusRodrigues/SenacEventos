"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { FaCamera, FaImage } from "react-icons/fa";
import { createPost } from "@/app/services/postService";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Participant } from "@/app/interfaces/participant";
import { Post } from "@/app/interfaces/post";

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

  const openImagePicker = async () => {
    try {
      const result = await navigator.mediaDevices.getUserMedia({ video: true });
      const image = await captureImageFromStream(result);
      setImageFile(image);
    } catch (error) {
      console.error("Error opening camera:", error);
      alert("Permission denied to access the camera.");
    }
  };

  const openCamera = async () => {
    try {
      const result = await navigator.mediaDevices.getUserMedia({ video: true });
      const image = await captureImageFromStream(result);
      setImageFile(image);
    } catch (error) {
      console.error("Error opening camera:", error);
      alert("Permission denied to access the camera.");
    }
  };

  const captureImageFromStream = (stream: MediaStream): Promise<File> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
              resolve(file);
            } else {
              reject("Failed to capture image from stream.");
            }
          });
        } else {
          reject("Failed to get canvas context.");
        }
      };

      video.onerror = () => {
        reject("Failed to load video stream.");
      };
    });
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

      console.log("Dados do post sendo enviados:", {
        idParticipant: participant.idParticipant,
        description,
        imageFile
      });

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
    <Modal isOpen={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <div className="p-4 flex flex-col">
        <button onClick={() => setModalVisible(false)} className="mb-4 text-blue-500">
          Go back
        </button>
        <div className="mb-4">
          <label className="font-bold text-lg">Description</label>
          <textarea
            placeholder="Insert description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-2 p-2 border rounded bg-gray-100 w-full ${
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
          <button onClick={openImagePicker} className="items-center">
            <FaImage size={32} className="text-blue-500" />
            <p>Gallery</p>
          </button>
          <button onClick={openCamera} className="items-center">
            <FaCamera size={32} className="text-blue-500" />
            <p>Camera</p>
          </button>
        </div>

        <button
          onClick={handleCreatePost}
          className={`px-4 py-3 rounded-lg items-center ${
            description.length > MAX_CHARACTERS ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={description.length > MAX_CHARACTERS}
        >
          <p className="text-white font-bold">Post</p>
        </button>
      </div>
    </Modal>
  );
};

export default CreatePostModal;