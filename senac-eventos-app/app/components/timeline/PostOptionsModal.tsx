"use client";

import React from "react";

interface PostOptionsModalProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <button
          onClick={onEdit}
          className="w-full text-left text-blue-600 font-bold p-2"
        >
          Editar Post
        </button>
        <button
          onClick={onDelete}
          className="w-full text-left text-red-600 font-bold p-2"
        >
          Deletar Post
        </button>
        <button
          onClick={onClose}
          className="w-full text-left text-gray-500 font-bold p-2"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PostOptionsModal;