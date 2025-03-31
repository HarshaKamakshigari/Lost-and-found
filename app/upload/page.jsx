// "use client";

// import { useState } from "react";
// import { supabase } from "@/app/supabase";

// const UploadPage = () => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const uploadImage = async () => {
//     if (!file) return alert("Please select a file first.");
    
//     setUploading(true);
//     const fileName = `${Date.now()}-${file.name}`;

//     const { data, error } = await supabase.storage
//       .from("images")
//       .upload(fileName, file);

//     setUploading(false);

//     if (error) {
//       console.error("Upload failed:", error.message);
//       alert("Upload failed: " + error.message);
//       return;
//     }

//     // Get Public URL
//     const { data: publicUrlData } = supabase.storage
//       .from("lost-and-found-images")
//       .getPublicUrl(fileName);

//     setImageUrl(publicUrlData.publicUrl);
//     alert("Image uploaded successfully!");
//   };

//   return (
//     <div className="flex flex-col items-center p-6">
//       <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
//       <input type="file" onChange={handleFileChange} className="mb-4" />
//       <button
//         onClick={uploadImage}
//         disabled={uploading}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {uploading ? "Uploading..." : "Upload"}
//       </button>
//       {imageUrl && (
//         <div className="mt-4">
//           <p>Uploaded Image:</p>
//           <img src={imageUrl} alt="Uploaded" className="mt-2 w-48" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadPage;
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/supabase";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageList, setImageList] = useState([]); // State to hold previously uploaded images

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload image to Supabase
  const uploadImage = async () => {
    if (!file) return alert("Please select a file first.");
    
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    setUploading(false);

    if (error) {
      console.error("Upload failed:", error.message);
      alert("Upload failed: " + error.message);
      return;
    }

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    setImageUrl(publicUrlData.publicUrl);
    alert("Image uploaded successfully!");

    // Fetch and display the list of uploaded images after uploading the new one
    fetchImageList();
  };

  // Fetch the list of uploaded images from Supabase
  const fetchImageList = async () => {
    const { data, error } = await supabase.storage.from("images").list();

    if (error) {
      console.error("Error fetching images:", error.message);
      return;
    }

    const imageUrls = data.map((item) => {
      const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(item.name);
      return { url: publicUrlData.publicUrl, name: item.name };
    });

    setImageList(imageUrls); // Store the fetched images URLs in state
  };

  // Fetch the image list when component mounts
  useEffect(() => {
    fetchImageList();
  }, []);

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
          <p className="text-sm mt-2 break-all">{imageUrl}</p> {/* Show Public URL */}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Previously Uploaded Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {imageList.length > 0 ? (
            imageList.map((image, index) => (
              <div key={index} className="text-center">
                <img src={image.url} alt={`Uploaded ${index}`} className="w-24 h-24 object-cover" />
                <p className="text-sm mt-2 break-all">{image.url}</p> {/* Display Public URL */}
              </div>
            ))
          ) : (
            <p>No images found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
