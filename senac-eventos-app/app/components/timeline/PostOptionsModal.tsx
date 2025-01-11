/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import useAlert from "@/app/hooks/useAlert";
import { deletePost } from "@/app/services/postService";

interface PostOptionsModalProps {
  postId: number;
  onEdit: () => void;
  onClose: () => void;
  onDeleted: () => void; 
}

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({
  postId,
  onEdit,
  onClose,
  onDeleted,
}) => {
  const { showConfirmation, showSuccess, showError } = useAlert();

  const handleDeleteConfirmation = async () => {
    const result = await showConfirmation(
      "Essa ação não pode ser desfeita!",
      "Sim, excluir",
      "Cancelar"
    );

    if (result.isConfirmed) {
      try {
        await deletePost(postId); 
        showSuccess("Post excluído com sucesso.");
        onDeleted(); 
        onClose();
      } catch (error) {
        showError("Ocorreu um erro ao tentar excluir o post.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-80 shadow-md">
        <button
          onClick={onEdit}
          className="w-full flex items-center justify-start text-gray-800 font-medium p-4 border-b border-gray-300 hover:bg-gray-100 transition"
        >
          <FaEdit className="mr-3 text-lg" />
          Editar Post
        </button>
        <button
          onClick={handleDeleteConfirmation}
          className="w-full flex items-center justify-start text-gray-800 font-medium p-4 border-b border-gray-300 hover:bg-gray-100 transition"
        >
          <FaTrash className="mr-3 text-lg" />
          Deletar Post
        </button>
        <button
          onClick={onClose}
          className="w-full flex items-center justify-start text-gray-800 font-medium p-4 hover:bg-gray-100 transition"
        >
          <FaTimes className="mr-3 text-lg" />
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PostOptionsModal;