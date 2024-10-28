import React, { useState } from "react";
import { storage, db } from "./Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, update, get } from "firebase/database";

const AddImages = ({ setAddImagesPopUp, itemKey, storagePath, dbPath }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setUploading(true);
    try {
      // Get existing photos for this item
      const itemRef = dbRef(db, `${dbPath}/${itemKey}`);
      const snapshot = await get(itemRef);
      const existingPhotos = snapshot.val()?.photos || [];

      // Upload each new image
      const uploadPromises = selectedFiles.map(async (file, index) => {
        const storageReference = ref(
          storage,
          `${storagePath}/${itemKey}/additional_${Date.now()}_${index}_${
            file.name
          }`
        );

        const uploadTask = uploadBytesResumable(storageReference, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      const newPhotoUrls = await Promise.all(uploadPromises);

      // Update the database with combined existing and new photos
      const updatedPhotos = [...existingPhotos, ...newPhotoUrls];
      await update(itemRef, {
        photos: updatedPhotos,
      });

      alert("Images uploaded successfully!");
      setAddImagesPopUp(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed w-full h-screen bottom-0 top-0 right-0 left-0 backdrop-blur-2xl bg-[#f7f2ecd3] z-[999] flex justify-center items-center px-2">
      <div className="EditGlassBg w-full xlg:w-[650px] py-3 px-2">
        <div className="mb-5 text-center font-bold text-xl">Add Images</div>
        <div className="flex flex-col justify-center items-center">
          <input
            type="file"
            className="mb-5"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />
          {selectedFiles.length > 0 && (
            <div className="mb-3 text-sm text-gray-600">
              Selected {selectedFiles.length} files
            </div>
          )}
          {uploading && (
            <div className="mb-3 text-sm text-blue-600">
              Uploading... {uploadProgress}%
            </div>
          )}
          <div className="flex justify-center gap-5">
            <button
              className="px-8 py-2 rounded-lg bg-[#878383] border-[1px] border-[#ff8912] text-[#fff] font-semibold"
              onClick={() => setAddImagesPopUp(false)}
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              className="px-8 py-2 rounded-lg bg-[#ff8912] text-[#fff] font-semibold"
              onClick={uploadImages}
              disabled={uploading || selectedFiles.length === 0}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImages;
