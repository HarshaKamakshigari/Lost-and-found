
// "use client";

// import { useState } from "react";
// import { db, storage } from "../firebase"; // Import Firestore & Storage
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export default function ReportItem() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     location: "",
//     type: "lost",
//     image: null,
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, image: file });
//   };

//   const handleTypeChange = (type) => {
//     setFormData({ ...formData, type });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.description || !formData.location) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       let imageUrl = "";

//       if (formData.image) {
//         const imageRef = ref(storage, `images/${Date.now()}_${formData.image.name}`);
//         await uploadBytes(imageRef, formData.image);
//         imageUrl = await getDownloadURL(imageRef);
//       }

//       await addDoc(collection(db, "reportedItems"), {
//         name: formData.name,
//         description: formData.description,
//         location: formData.location,
//         type: formData.type,
//         imageUrl,
//         timestamp: serverTimestamp(),
//       });

//       alert("Item reported successfully!");
//       setFormData({
//         name: "",
//         description: "",
//         location: "",
//         type: "lost",
//         image: null,
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-[#F5F5F5] rounded-lg mt-10 mb-10">
//       <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800 pb-10">
//         Report an Item
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium text-black pb-5 pt-5">Item Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter item name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-black pb-5 pt-5">Description of the item</label>
//           <textarea
//             name="description"
//             placeholder="Describe the item"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-black pb-5 pt-5">Location</label>
//           <input
//             type="text"
//             name="location"
//             placeholder="Where was it lost or found?"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white mb-5"
//             required
//           />
//         </div>

//         <div className="flex gap-4">
//           <button
//             type="button"
//             onClick={() => handleTypeChange("lost")}
//             className={`w-full p-2 rounded-md font-medium ${
//               formData.type === "lost"
//                 ? "bg-red-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Lost Item
//           </button>
//           <button
//             type="button"
//             onClick={() => handleTypeChange("found")}
//             className={`w-full p-2 rounded-md font-medium ${
//               formData.type === "found"
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Found Item
//           </button>
//         </div>

//         <div>
//           <label className="block font-medium text-black pb-5 pt-5">Upload Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white mb-5"
//           />
//           {formData.image && (
//             <p className="mt-2 text-sm text-gray-600 mb-5">{formData.image.name}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-orange-500 transition"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import { db, storage } from "../firebase";
// import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export default function ReportItem() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     location: "",
//     type: "",
//     image: null,
//     reporterName: "",
//     reporterEmail: "",
//     reporterPhone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadedUrl, setUploadedUrl] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//     }
//   };

//   const uploadImage = async (file, docId) => {
//     if (!file) return null;

//     const storageRef = ref(storage, `images/${docId}_${file.name}`);

//     try {
//       await uploadBytes(storageRef, file);
//       const url = await getDownloadURL(storageRef);
//       setUploadedUrl(url);
//       return url;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.description || !formData.location || !formData.reporterName || !formData.reporterEmail) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);
//     setUploadProgress(0);

//     try {
//       const docRef = await addDoc(collection(db, "reportedItems"), {
//         name: formData.name,
//         description: formData.description,
//         location: formData.location,
//         type: formData.type,
//         reporterName: formData.reporterName,
//         reporterEmail: formData.reporterEmail,
//         reporterPhone: formData.reporterPhone || "", // Optional field
//         imageUrl: "", // Placeholder
//         timestamp: serverTimestamp(),
//       });

//       let imageUrl = "";

//       if (formData.image) {
//         imageUrl = await uploadImage(formData.image, docRef.id);
//         if (imageUrl) {
//           await updateDoc(doc(db, "reportedItems", docRef.id), { imageUrl });
//         }
//       }

//       alert("Item reported successfully!");
//       setFormData({
//         name: "",
//         description: "",
//         location: "",
//         type: "lost",
//         image: null,
//         reporterName: "",
//         reporterEmail: "",
//         reporterPhone: "",
//       });
//       setUploadProgress(0);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-[#F5F5F5] rounded-lg mt-10 mb-10">
//       <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800 pb-10">
//         Report an Item
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md" required />
//         <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded-md" required />

//         {/* Contact Information */}
//         <input type="text" name="reporterName" placeholder="Your Name" value={formData.reporterName} onChange={handleChange} className="w-full p-2 border rounded-md" required />
//         <input type="email" name="reporterEmail" placeholder="Your Email" value={formData.reporterEmail} onChange={handleChange} className="w-full p-2 border rounded-md" required />
//         <input type="tel" name="reporterPhone" placeholder="Your Phone Number (Optional)" value={formData.reporterPhone} onChange={handleChange} className="w-full p-2 border rounded-md" />

//         <div className="flex gap-4">
//           <button type="button" onClick={() => setFormData({ ...formData, type: "lost" })} className={`w-full p-2 rounded-md ${formData.type === "lost" ? "bg-red-500 text-white" : "bg-gray-200"}`}>
//             Lost Item
//           </button>
//           <button type="button" onClick={() => setFormData({ ...formData, type: "found" })} className={`w-full p-2 rounded-md ${formData.type === "found" ? "bg-green-500 text-white" : "bg-gray-200"}`}>
//             Found Item
//           </button>
//         </div>

//         <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
//         {formData.image && <p className="text-sm text-gray-600">{formData.image.name}</p>}

//         {uploadProgress > 0 && <p className="text-blue-600">Uploading... {uploadProgress.toFixed(0)}%</p>}

//         <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-orange-500 transition" disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>

//         {uploadedUrl && (
//           <div className="mt-4">
//             <p className="text-sm text-gray-600">Uploaded Image:</p>
//             <img src={uploadedUrl} alt="Uploaded preview" className="w-full h-auto mt-2 rounded-md" />
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import { db } from "../firebase"; // Firebase Firestore
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { supabase } from "../supabase"; // Supabase client import

// export default function ReportItem() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     location: "",
//     type: "lost",
//     image: null,
//     reporterName: "",
//     reporterEmail: "",
//     reporterPhone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState(""); // Store the uploaded image URL
//   const [errorMessage, setErrorMessage] = useState(""); // For error handling

//   // Handle form field changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle image file change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//     }
//   };

//   // Upload image to Supabase and return the public URL
//   const uploadImageToSupabase = async (file) => {
//     if (!file) return null;

//     const fileName = `${Date.now()}_${file.name}`; // FIXED TEMPLATE LITERAL
//     try {
//       // Upload image to Supabase Storage
//       const { error } = await supabase.storage.from("images").upload(fileName, file);

//       if (error) {
//         console.error("Error uploading to Supabase:", error);
//         return null;
//       }

//       // Get the public URL of the uploaded image
//       const { data } = supabase.storage.from("images").getPublicUrl(fileName);

//       return data.publicUrl; // FIXED: Correctly return the URL
//     } catch (error) {
//       console.error("Unexpected error during image upload:", error);
//       return null;
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (!formData.name || !formData.description || !formData.location || !formData.reporterName || !formData.reporterEmail) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);
//     let uploadedImageUrl = "";

//     try {
//       // If there's an image, upload it to Supabase and get the URL
//       if (formData.image) {
//         uploadedImageUrl = await uploadImageToSupabase(formData.image);
//         if (!uploadedImageUrl) {
//           setErrorMessage("Failed to upload image");
//           setLoading(false);
//           return;
//         }
//         setImageUrl(uploadedImageUrl); // Set the image URL after successful upload
//       }

//       // Create a new document in Firestore with the uploaded image URL
//       await addDoc(collection(db, "reportedItems"), {
//         name: formData.name,
//         description: formData.description,
//         location: formData.location,
//         type: formData.type,
//         reporterName: formData.reporterName,
//         reporterEmail: formData.reporterEmail,
//         reporterPhone: formData.reporterPhone || "", // Optional field
//         imageUrl: uploadedImageUrl, // Store image URL if uploaded
//         timestamp: serverTimestamp(),
//       });

//       alert("Item reported successfully!");
//       // Reset form data after successful submission
//       setFormData({
//         name: "",
//         description: "",
//         location: "",
//         type: "lost",
//         image: null,
//         reporterName: "",
//         reporterEmail: "",
//         reporterPhone: "",
//       });
//       setImageUrl(""); // Reset uploaded image
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-[#F5F5F5] rounded-lg mt-10 mb-10">
//       <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800 pb-10">
//         Report an Item
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Item Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//           required
//         />

//         {/* Contact Information */}
//         <input
//           type="text"
//           name="reporterName"
//           placeholder="Your Name"
//           value={formData.reporterName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="email"
//           name="reporterEmail"
//           placeholder="Your Email"
//           value={formData.reporterEmail}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="tel"
//           name="reporterPhone"
//           placeholder="Your Phone Number (Optional)"
//           value={formData.reporterPhone}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//         />

//         {/* Fixed ClassNames for Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="button"
//             onClick={() => setFormData({ ...formData, type: "lost" })}
//             className={`w-full p-2 rounded-md ${formData.type === "lost" ? "bg-red-500 text-white" : "bg-gray-200"}`}
//           >
//             Lost Item
//           </button>
//           <button
//             type="button"
//             onClick={() => setFormData({ ...formData, type: "found" })}
//             className={`w-full p-2 rounded-md ${formData.type === "found" ? "bg-green-500 text-white" : "bg-gray-200"}`}
//           >
//             Found Item
//           </button>
//         </div>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full p-2 border rounded-md"
//         />
//         {formData.image && <p className="text-sm text-gray-600">{formData.image.name}</p>}

//         <button
//           type="submit"
//           className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-orange-500 transition"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>

//         {imageUrl && (
//           <div className="mt-4">
//             <p>Uploaded Image:</p>
//             <img src={imageUrl} alt="Uploaded preview" className="w-full h-auto mt-2 rounded-md" />
//           </div>
//         )}

//         {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//       </form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { db } from "../firebase"; // Firebase Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { supabase } from "../supabase"; // Supabase client import

export default function ReportItem() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    type: "lost",
    image: null,
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // Store the uploaded image URL
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // Upload image to Supabase and return the public URL
  const uploadImageToSupabase = async (file) => {
    if (!file) return null;

    const fileName = `${Date.now()}_${file.name}`;

    try {
      const { data, error } = await supabase.storage.from("images").upload(fileName, file);

      if (error) {
        console.error("Error uploading to Supabase:", error.message);
        return null;
      }

      // Correctly retrieve the public URL
      const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);
      return urlData.publicUrl;
    } catch (error) {
      console.error("Unexpected error during image upload:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.location || !formData.reporterName || !formData.reporterEmail) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMessage(""); // Clear previous errors
    let uploadedImageUrl = "";

    try {
      if (formData.image) {
        uploadedImageUrl = await uploadImageToSupabase(formData.image);
        if (!uploadedImageUrl) {
          setErrorMessage("Failed to upload image.");
          setLoading(false);
          return;
        }
        setImageUrl(uploadedImageUrl); // Set image URL if successful
      }

      await addDoc(collection(db, "reportedItems"), {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        reporterName: formData.reporterName,
        reporterEmail: formData.reporterEmail,
        reporterPhone: formData.reporterPhone || "",
        imageUrl: uploadedImageUrl,
        timestamp: serverTimestamp(),
        status: "pending", // Added default status field
      });

      alert("Item reported successfully!");

      setFormData({
        name: "",
        description: "",
        location: "",
        type: "lost",
        image: null,
        reporterName: "",
        reporterEmail: "",
        reporterPhone: "",
      });
      setImageUrl("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#F5F5F5] rounded-lg mt-10 mb-10">
      <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800 pb-10">
        Report an Item
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {/* Contact Information */}
        <input
          type="text"
          name="reporterName"
          placeholder="Your Name"
          value={formData.reporterName}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="email"
          name="reporterEmail"
          placeholder="Your Email"
          value={formData.reporterEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="tel"
          name="reporterPhone"
          placeholder="Your Phone Number (Optional)"
          value={formData.reporterPhone}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        {/* Fixed ClassNames for Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "lost" })}
            className={`w-full p-2 rounded-md ${formData.type === "lost" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          >
            Lost Item
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "found" })}
            className={`w-full p-2 rounded-md ${formData.type === "found" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          >
            Found Item
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md"
        />
        {formData.image && <p className="text-sm text-gray-600">{formData.image.name}</p>}

        <button
          type="submit"
          className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-orange-500 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {imageUrl && (
          <div className="mt-4">
            <p>Uploaded Image:</p>
            <img src={imageUrl} alt="Uploaded preview" className="w-full h-auto mt-2 rounded-md" />
          </div>
        )}

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}
