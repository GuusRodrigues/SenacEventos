"use client";

import React from "react";

interface TranslatorModalProps {
  visible: boolean;
  onClose: () => void;
}

const TranslatorModal: React.FC<TranslatorModalProps> = ({
  visible,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold mb-4">Tradutor</h2>
        <button
          onClick={() => window.open("https://translate.google.com", "_blank")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Abrir Google Tradutor
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-black py-2 px-4 rounded-lg w-full"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default TranslatorModal;