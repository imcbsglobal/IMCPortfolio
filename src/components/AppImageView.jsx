import React, { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { storage, db } from './Firebase';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { ref as dbRef, get, update } from 'firebase/database';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

const AppImageView = ({ photos = [], onClose, softwareKey, dbPath }) => {
  const [user, setUser] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [startX, setStartX] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isVideo = (url) => {
    return (
      typeof url === "string" && (url.endsWith(".mp4") || url.endsWith(".mov"))
    );
  };

  const handlePrev = () => {
    setShowContent(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      setShowContent(true);
      setZoom(1);
    }, 300);
  };

  const handleNext = () => {
    setShowContent(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      setShowContent(true);
      setZoom(1);
    }, 300);
  };

  const handleTouchStart = (e) => setStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const threshold = 50;
    if (startX - endX > threshold) handleNext();
    else if (endX - startX > threshold) handlePrev();
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1));

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      setIsDeleting(true);

      // Get current image URL
      const imageUrl = photos[currentIdx];

      // Get all photos for this item using the dynamic dbPath
      const itemRef = dbRef(db, `${dbPath}/${softwareKey}`);
      const snapshot = await get(itemRef);
      const currentData = snapshot.val();

      if (!currentData) {
        throw new Error('Item data not found');
      }

      // Remove image from storage
      try {
        const imageRef = storageRef(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting from storage:', error);
      }

      // Update photos array in database
      const updatedPhotos = currentData.photos.filter(photo => photo !== imageUrl);
      await update(itemRef, {
        photos: updatedPhotos
      });

      // Update local state
      if (updatedPhotos.length === 0) {
        // If no more photos, close the viewer
        onClose();
      } else {
        // Move to next photo or previous if at the end
        setCurrentIdx(prev => 
          prev === photos.length - 1 
            ? prev - 1 
            : prev
        );
      }

      alert('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!photos.length) return null;

  return (
    <div className="inset-0 bg-black GlassBg1 bg-opacity-80 z-50 fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center h-[100vh]">
      <div
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={zoomIn}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl cursor-pointer z-10"
        >
          <FaTimes />
        </button>

        <div className="h-full flex justify-center items-center">
          <div
            className={`transition-opacity duration-300 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `scale(${zoom})` }}
          >
            {photos[currentIdx] && (
              <img
                src={photos[currentIdx]}
                alt={`Photo ${currentIdx + 1}`}
                className="max-h-[90vh] w-auto object-contain"
              />
            )}
          </div>
        </div>

        <div className="absolute bottom-0 border-t flex gap-5 justify-center items-center w-full backdrop-blur-2xl p-2">
          <button
            onClick={zoomIn}
            className="text-white text-2xl cursor-pointer z-10"
            disabled={isDeleting}
          >
            <FaSearchPlus />
          </button>
          <button
            onClick={zoomOut}
            className="text-white text-2xl cursor-pointer z-10"
            disabled={isDeleting}
          >
            <FaSearchMinus />
          </button>

          {/* Delete Button (Only Visible to "info@imcbsglobal.com") */}
          {user && user.email === "info@imcbsglobal.com" && (
            <button
              onClick={handleDelete}
              className="text-white text-2xl cursor-pointer z-10"
              disabled={isDeleting}
            >
              <MdDelete />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppImageView;