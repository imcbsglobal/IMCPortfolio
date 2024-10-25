import React, { useEffect, useState } from "react";
import { db, storage } from "./Firebase";
import { ref, onValue, remove, push, set } from "firebase/database";
// import { ref as storageRef, deleteObject } from "firebase/storage";
import UploadFile from "./UploadFile";
import UploadApp from "./UploadApp";
import ImageView from "./ImageView";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import Loader from "./Loader";
import AppImageView from "./AppImageView";
import DescriptionView from "./DescriptionView";
import scanner from "../assets/scanner.png";
import computer from "../assets/computer.png";
import cctv from "../assets/cctv.png";
import printer from "../assets/printer.png";
import pos from "../assets/pos.png";
import {
  ref as storageRef,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import biometric from "../assets/biometric.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HardwareImageView from "./HardwareImageView";
import { BiRupee } from "react-icons/bi";
import { FaCircleInfo } from "react-icons/fa6";
import Navbar from "./Navbar";
import HardwareDescriptions from "./HardwareDescriptions";
import HardwareEdit from "./HardwareEdit";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Hardware = () => {
  const [images, setImages] = useState([]);
  const [showImageView, setShowImageView] = useState(false);
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [categoryImages, setCategoryImages] = useState({});
  const [selectedImageData, setSelectedImageData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [modelName, setModelName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [displayCategory, setDisplayCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState("Printers");
  const [openDescription, setOpenDescription] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const hardwareCategories = [
    { name: "Barcode Printers", img: printer },
    { name: "Computers", img: scanner },
    { name: "Monitor", img: computer },
    { name: "Biometric", img: biometric },
    { name: "POS", img: pos },
    { name: "Thermal Printer", img: cctv },
    { name: "CCTV", img: cctv },
    { name: "Barcode Scanners", img: cctv },
    { name: "Printing Solutions", img: cctv },
    { name: "All In One Printer", img: cctv },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadCategoryImages = async () => {
      const categoryData = {};

      for (const category of hardwareCategories) {
        const categoryRef = ref(db, `hardware/${category.name.toLowerCase()}`);
        onValue(categoryRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            categoryData[category.name] = Object.entries(data).map(
              ([key, value]) => ({
                key,
                ...value,
                category: category.name.toLowerCase(),
                storagePath: `hardware/${category.name.toLowerCase()}/${
                  value.timestamp
                }_${value.filename}`,
              })
            );
          } else {
            categoryData[category.name] = [];
          }
          setCategoryImages((prev) => ({ ...prev, ...categoryData }));
        });
      }
      setLoading(false);
    };

    loadCategoryImages();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (
      !selectedFile ||
      !selectedCategory ||
      !itemName ||
      !brandName ||
      !modelName ||
      !itemPrice ||
      !description
    ) {
      alert("Please fill in all fields (file, category, name, and brand)");
      return;
    }

    try {
      setUploadProgress(0);
      const category = selectedCategory.toLowerCase();
      const timestamp = Date.now();
      const filename = selectedFile.name;
      const storagePath = `hardware/${category}/${timestamp}_${filename}`;
      const storageReference = storageRef(storage, storagePath);

      await uploadBytes(storageReference, selectedFile);
      const downloadURL = await getDownloadURL(storageReference);

      const dbRef = ref(db, `hardware/${category}`);
      const newItemRef = push(dbRef);
      await set(newItemRef, {
        imageUrl: downloadURL,
        category: category,
        timestamp: timestamp,
        filename: filename,
        storagePath: storagePath,
        itemName: itemName,
        brandName: brandName,
        modelName: modelName,
        itemPrice: itemPrice,
        description: description,
      });

      setSelectedFile(null);
      setItemName("");
      setBrandName("");
      setModelName("");
      setItemPrice("");
      setDescription("");
      setUploadProgress(100);

      // Set the active category to the one we just uploaded to
      setActiveCategory(selectedCategory);

      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handleDelete = async (itemData) => {
    if (!user || user.email !== "info@imcbsglobal.com") {
      return;
    }

    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const imageRef = storageRef(storage, itemData.storagePath);
        await deleteObject(imageRef);

        const dbRef = ref(db, `hardware/${itemData.category}/${itemData.key}`);
        await remove(dbRef);

        setCategoryImages((prev) => ({
          ...prev,
          [itemData.category]: (prev[itemData.category] || []).filter(
            (item) => item.key !== itemData.key
          ), // Ensure it's an array
        }));

        alert("Item deleted successfully");
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  const handleViewImages = (category) => {
    const categoryImageList = categoryImages[category] || [];
    if (categoryImageList.length > 0) {
      setSelectedImageUrls(categoryImageList.map((img) => img.imageUrl));
      setSelectedImageData(categoryImageList);
      setCurrentImageIndex(0);
      setShowImageView(true);
    }
  };

  const handleImageIndexChange = (newIndex) => {
    setCurrentImageIndex(newIndex);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleImageClick = (items, clickedIndex) => {
    // Get all image URLs from the current category
    const imageUrls = items.map((item) => item.imageUrl);
    setSelectedImageUrls(imageUrls);
    setSelectedImageData(items);
    setCurrentImageIndex(clickedIndex);
    setShowImageView(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  return (
    <div className="w-full">
      <div className="md:flex justify-center w-full md:h-screen">
        <div className=" grid place-items-center md:flex w-full">
          <div className="md:w-[35%] w-full xlg:w-[400px]">
            <div className="md:h-screen fixed w-full top-0 left-0 bottom-0 md:w-[35%] xlg:w-[400px]">
              <Navbar />
            </div>
          </div>
          <div className="md:w-[65%] w-full mt-5 p-5 overflow-hidden">
            <section className="Mlg:max-w-[1200px] Mlg:mx-auto mt-16 md:mt-0 w-full">
              <div>
                <div className="FontStyle-Top text-3xl md:text-[52px] text-[#363636] mb-5 leading-normal text-center">
                  Hardwares
                </div>
              </div>

              {/* Categories Display */}
              <div className="flex justify-center items-center gap-5 mb-5 overflow-x-scroll md:overflow-x-auto pl-[750px] relative z-[999] md:z-50 PaddingSize paddingLength md:pl-[740px] xlg:pl-[600px]">
                {hardwareCategories.map((category) => (
                  <div
                    key={category.name}
                    className={`p-4 border rounded-lg text-center cursor-pointer hover:shadow-lg transition-shadow flex-shrink-0 w-auto ${
                      activeCategory === category.name
                        ? "border-[#ff7f2a] shadow-lg"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-16 h-16 mx-auto mb-2"
                    />
                    <h3 className="font-medium">{category.name}</h3>
                    <span className="text-sm text-gray-500">
                      {categoryImages[category.name]?.length || 0} items
                    </span>
                  </div>
                ))}
              </div>

              {/* Upload Section */}
              {user && user.email === "info@imcbsglobal.com" && (
                <div className="mb-8 p-4 rounded-lg">
                  <div className="flex justify-center items-center gap-5 mb-5 flex-wrap md:grid md:grid-cols-2 md:place-items-center">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full p-2 border rounded-md border-none outline-none bg-[#ff7f2a]"
                    />
                    <input
                      type="text"
                      placeholder="Enter Brand"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full p-2 border rounded-md border-none outline-none bg-[#ff7f2a]"
                    />
                    <input
                      type="text"
                      placeholder="Enter Model"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      className="w-full p-2 border rounded-md border-none outline-none bg-[#ff7f2a]"
                    />
                    <input
                      type="number"
                      placeholder="Enter Price"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      className="w-full p-2 border rounded-md border-none outline-none bg-[#ff7f2a]"
                    />
                    <select
                      className="w-full p-2 border rounded-md outline-none border-none bg-[#ff7f2a]"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {hardwareCategories.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded-md bg-[#ff7f2a]"
                    />
                  </div>
                  <textarea
                    placeholder="Enter Description"
                    className="outline-none border-none w-full py-3 px-2 rounded-xl bg-[#ff7f2a] text-[#fff] border-[#fff] border"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className="w-full flex justify-center items-center">
                    <button
                      onClick={handleUpload}
                      disabled={
                        !selectedFile ||
                        !selectedCategory ||
                        !itemName ||
                        !brandName ||
                        !modelName ||
                        !itemPrice ||
                        !description
                      }
                      className="bg-[#ff7f2a] text-white px-6 py-2 rounded-md disabled:bg-gray-300 hover:bg-[#ff6600] transition-colors"
                    >
                      Upload
                    </button>
                  </div>
                  {uploadProgress > 0 && (
                    <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#ff7f2a] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Items Display */}
              {activeCategory && (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 Mlg:grid-cols-3 place-items-center gap-8 mt-8">
                  {categoryImages[activeCategory]?.map((item, index) => (
                    <div
                      key={item.key}
                      className="boxShadow1 w-full h-[300px] lg:w-[300px] rounded-3xl shadow-lg p-6 transition-transform hover:scale-105 relative HardwareBox"
                    >
                      <div className="absolute z-30 right-3 top-2">
                      <FaCircleInfo
                        className="cursor-pointer"
                        onClick={() => {
                          setDescription(item.description);
                          setOpenDescription(true);
                        }}
                      />
                      </div>
                      <div
                        className="relative h-[120px] bg-[#ffffff] mb-4 mt-1 rounded-lg overflow-hidden"
                        onClick={() =>
                          handleImageClick(
                            categoryImages[activeCategory],
                            index
                          )
                        }
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.itemName}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-col justify-between items-center gap-1">
                          <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-base font-bold">
                            {item.itemName}
                          </span>
                          <span className="text-[#424141] font-semibold">
                            Brand : {item.brandName}
                          </span>
                          <span className="text-gray-600 font-medium">
                            Modal : {item.modelName}
                          </span>
                          <span className="text-[#ff7f2a] font-medium flex justify-center items-center">
                            <BiRupee />
                            {item.itemPrice}
                          </span>
                        </div>
                        {user && user.email === "info@imcbsglobal.com" && (
                          <div className="flex gap-5 w-full justify-center items-center">
                            <div className=" flex mt-[-50px] justify-between gap-10">
                              <button
                                onClick={() => handleDelete(item)}
                                className=" bg-[#f00] borde rounded-lg text-[#000] font-semibold hover:bg-gray-400 transition-colors HoverDeleting  bottom-2 p-2"
                              >
                                <MdDelete/>
                              </button>
                              <button 
                                onClick={() => handleEdit(item)}
                                className=" bg-[#00ddff] borde rounded-lg text-[#000] font-semibold hover:bg-gray-400 transition-colors HoverDeleting  bottom-14 text-center p-2"
                              >
                              <MdEdit/>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Image Viewer Modal */}
              {showImageView && (
                <HardwareImageView
                  urls={selectedImageUrls}
                  currentIndex={currentImageIndex}
                  onClose={() => {
                    setShowImageView(false);
                    setSelectedImageUrls([]);
                    setSelectedImageData([]);
                    setCurrentImageIndex(0);
                  }}
                  onDelete={(index) => {
                    if (selectedImageData[index]) {
                      handleDelete(selectedImageData[index]);
                    }
                  }}
                  canDelete={user && user.email === "info@imcbsglobal.com"}
                />
              )}
            </section>
          </div>
        </div>
      </div>
      {openDescription && (  // Change this condition to only check openDescription
        <HardwareDescriptions
          openDescription={openDescription}
          setOpenDescription={setOpenDescription}
          description={description}
        />
      )}
      {editingItem && (
        <HardwareEdit
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={() => {
            // Refresh the data by re-fetching or updating state
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

export default Hardware;
