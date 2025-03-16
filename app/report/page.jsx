// "use client";

// import { useState } from "react";

// export default function ReportItem() {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     location: "",
//     type: "lost",
//     image: null,
//   });

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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     alert("Form submitted! (No backend connected yet)");
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-[#F5F5F5]  rounded-lg mt-10 ">
//       <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800 pb-10">Report an Item</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Item Name */}
//         <div>
//           <label className="block font-medium text-black pb-5 pt-5">Item Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter item name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white "
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block font-medium text-black pb-5 pt-5">Description</label>
//           <textarea
//             name="description"
//             placeholder="Describe the item"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
//             required
//           />
//         </div>

//         {/* Location */}
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

//         {/* Lost or Found Selection */}
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

//         {/* Image Upload */}
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

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-orange-500 transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { db, storage } from "../firebase"; // Import Firestore & Storage
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ReportItem() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    type: "lost",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.location) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (formData.image) {
        const imageRef = ref(storage, `images/${Date.now()}_${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "reportedItems"), {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      alert("Item reported successfully!");
      setFormData({
        name: "",
        description: "",
        location: "",
        type: "lost",
        image: null,
      });
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
        <div>
          <label className="block font-medium text-black pb-5 pt-5">Item Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-black pb-5 pt-5">Description</label>
          <textarea
            name="description"
            placeholder="Describe the item"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-black pb-5 pt-5">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Where was it lost or found?"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white mb-5"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleTypeChange("lost")}
            className={`w-full p-2 rounded-md font-medium ${
              formData.type === "lost"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Lost Item
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("found")}
            className={`w-full p-2 rounded-md font-medium ${
              formData.type === "found"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Found Item
          </button>
        </div>

        <div>
          <label className="block font-medium text-black pb-5 pt-5">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white mb-5"
          />
          {formData.image && (
            <p className="mt-2 text-sm text-gray-600 mb-5">{formData.image.name}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-orange-500 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
