import React, { useState } from 'react';
import { storage, db } from './Firebase';
import { ref, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { IoCloseCircleSharp } from "react-icons/io5";

const HardwareEdit = ({ item, onClose, onUpdate }) => {
  const [editedItem, setEditedItem] = useState({
    itemName: item.itemName,
    brandName: item.brandName,
    modelName: item.modelName,
    itemPrice: item.itemPrice,
    description: item.description
  });
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updateData = {
        ...editedItem
      };

      // If there's a new image, upload it
      if (newImage) {
        const timestamp = Date.now();
        const filename = newImage.name;
        const storagePath = `hardware/${item.category}/${timestamp}_${filename}`;
        const storageReference = storageRef(storage, storagePath);

        await uploadBytes(storageReference, newImage);
        const downloadURL = await getDownloadURL(storageReference);

        updateData.imageUrl = downloadURL;
        updateData.storagePath = storagePath;
      }

      // Update the database
      const dbRef = ref(db, `hardware/${item.category}/${item.key}`);
      await update(dbRef, updateData);

      onUpdate(); // Refresh the parent component
      onClose(); // Close the edit modal
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed w-full h-screen bottom-0 top-0 right-0 left-0 backdrop-blur-sm bg-[#f7f2ecb4] z-[999] flex justify-center items-center px-2'>
      <div className='text-[#000] font-bold text-2xl absolute top-5 right-5'>
        <IoCloseCircleSharp
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className='w-full px-2 Mlg:max-w-[900px] Mlg:w-full EditGlassBg p-5'>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="itemName"
              value={editedItem.itemName}
              onChange={handleInputChange}
              placeholder="Item Name"
              className="w-full p-2 rounded-md border-none outline-none bg-[#ff7f2a]"
            />
            <input
              type="text"
              name="brandName"
              value={editedItem.brandName}
              onChange={handleInputChange}
              placeholder="Brand Name"
              className="w-full p-2 rounded-md border-none outline-none bg-[#ff7f2a]"
            />
            <input
              type="text"
              name="modelName"
              value={editedItem.modelName}
              onChange={handleInputChange}
              placeholder="Model Name"
              className="w-full p-2 rounded-md border-none outline-none bg-[#ff7f2a]"
            />
            <input
              type="number"
              name="itemPrice"
              value={editedItem.itemPrice}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full p-2 rounded-md border-none outline-none bg-[#ff7f2a]"
            />
          </div>
          
          <textarea
            name="description"
            value={editedItem.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 rounded-md border-none outline-none bg-[#ff7f2a] min-h-[100px]"
          />

          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 rounded-md bg-[#ff7f2a]"
            />
            {item.imageUrl && !newImage && (
              <img
                src={item.imageUrl}
                alt="Current"
                className="w-20 h-20 object-contain"
              />
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ff7f2a] text-white px-6 py-2 rounded-md disabled:bg-gray-300 hover:bg-[#ff6600] transition-colors"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HardwareEdit;