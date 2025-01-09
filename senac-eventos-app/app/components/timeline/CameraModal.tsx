"use client";

import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { FaCamera, FaTimes } from "react-icons/fa";

const CameraModal: React.FC<{
  isOpen: boolean;
  onRequestClose: () => void;
  onCapture: (file: File) => void;
}> = ({ isOpen, onRequestClose, onCapture }) => {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setVideoStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
          alert("Permission denied to access the camera.");
        });
    } else {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
        setVideoStream(null);
      }
    }
  }, [isOpen]);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
            onCapture(file);
            onRequestClose();
          } else {
            alert("Failed to capture photo.");
          }
        });
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="flex items-center justify-center h-full w-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div className="relative w-full h-full">
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 z-10"
        >
          <FaTimes size={20} />
        </button>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
        />
        <button
          onClick={handleCapture}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 p-4 rounded-full text-white z-10"
        >
          <FaCamera size={32} />
        </button>
      </div>
    </Modal>
  );
};

export default CameraModal;