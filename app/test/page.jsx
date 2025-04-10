"use client";

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { supabase } from "../supabase";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload image to Supabase
  const uploadImageToSupabase = async (file) => {
    if (!file) {
      setErrorMessage("No file selected");
      return null;
    }

    const fileName = `${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file, { contentType: file.type });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      setErrorMessage(error.message);
      return null;
    }
  };

  

  const uploadImage = async () => {
    if (!file) return alert("Select a file first");

    setUploading(true);
    setErrorMessage("");

    const publicUrl = await uploadImageToSupabase(file);
    if (!publicUrl) {
      setUploading(false);
      return;
    }

    try {
      await addDoc(collection(db, "uploadedImages"), {
        imageUrl: publicUrl,
        timestamp: serverTimestamp(),
      });

      setImageUrl(publicUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      setErrorMessage("Failed to store URL in Firebase.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={uploadImage}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="mt-2 w-48" />
          <p className="text-sm text-gray-600">{imageUrl}</p>
        </div>
      )}

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}
