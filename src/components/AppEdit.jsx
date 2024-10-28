import React, { useState, useEffect } from "react";
import { storage, db } from "./Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ref as dbRef, update, get } from "firebase/database";

const AppEdit = ({ setEditAppPopUp, itemKey, storagePath, dbPath }) => {
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // Fetch current data
  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const itemRef = dbRef(db, `${dbPath}/${itemKey}`);
        const snapshot = await get(itemRef);
        const data = snapshot.val();

        if (data) {
          setDescription(data.description || "");
          setCurrentThumbnail(data.thumbnailUrl || "");
        }
      } catch (error) {
        console.error("Error fetching current data:", error);
      }
    };

    if (itemKey) {
      fetchCurrentData();
    }
  }, [itemKey, dbPath]);

  // Handle thumbnail file selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!thumbnailFile && !description) {
      alert("Please select a new thumbnail or update the description");
      return;
    }

    setUploading(true);
    try {
      let updatedData = {};

      // Upload new thumbnail if selected
      if (thumbnailFile) {
        // Delete old thumbnail if it exists
        if (currentThumbnail) {
          try {
            const oldThumbnailRef = ref(storage, currentThumbnail);
            await deleteObject(oldThumbnailRef);
          } catch (error) {
            console.error("Error deleting old thumbnail:", error);
          }
        }

        // Upload new thumbnail
        const storageReference = ref(
          storage,
          `${storagePath}/${itemKey}/thumbnail_${Date.now()}_${
            thumbnailFile.name
          }`
        );

        const uploadTask = uploadBytesResumable(
          storageReference,
          thumbnailFile
        );

        await new Promise((resolve, reject) => {
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
              updatedData.thumbnailUrl = downloadURL;
              resolve();
            }
          );
        });
      }

      // Update description if changed
      if (description) {
        updatedData.description = description;
      }

      // Update database
      const itemRef = dbRef(db, `${dbPath}/${itemKey}`);
      await update(itemRef, updatedData);

      alert("Item updated successfully!");
      setEditAppPopUp(false);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed w-full h-screen bottom-0 top-0 right-0 left-0 backdrop-blur-2xl bg-[#f7f2ecd3] z-[999] flex justify-center items-center px-2">
      <div className="w-full lg:w-[600px] EditGlassBg p-5">
        <div className="flex flex-col gap-5 justify-center items-center w-full">
          <div className="text-center">
            <label className="text-sm font-semibold text-[#a3a0a0]">
              Update Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-2"
            />
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                />
              </div>
            )}
          </div>

          <textarea
            className="w-full rounded-lg border-none outline-none p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Update description..."
            rows={4}
          />

          {uploading && (
            <div className="text-sm text-blue-600">
              Uploading... {uploadProgress}%
            </div>
          )}

          <div className="flex justify-center items-center gap-5">
            <button
              className="px-8 py-2 rounded-xl bg-[#939392] text-[#fff] font-semibold"
              onClick={() => setEditAppPopUp(false)}
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              className="px-8 py-2 rounded-xl bg-[#ff8912] text-[#fff] font-semibold"
              onClick={handleSubmit}
              disabled={uploading || (!thumbnailFile && !description)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AppEdit