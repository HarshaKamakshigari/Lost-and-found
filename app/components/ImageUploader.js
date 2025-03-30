"use client";

import React, { useState } from "react";
import { storage } from "../firebase"; // Ensure correct path
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    const imageRef = ref(storage, `images/${image.name}`);

    try {
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading image: ", error);
          alert("Upload failed.");
          setLoading(false);
        },
        async () => {
          // Get the download URL properly
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
          setLoading(false);
          alert("Image uploaded successfully!");
        }
      );
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Error uploading image.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-center mb-4">Image Uploader</h1>

      <input type="file" onChange={handleImageChange} className="mb-4 p-2 border w-full rounded-md" />

      {uploadProgress > 0 && (
        <p className="text-center text-blue-600">Uploading... {uploadProgress.toFixed(0)}%</p>
      )}

      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="w-full h-auto mt-2 rounded-md" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
