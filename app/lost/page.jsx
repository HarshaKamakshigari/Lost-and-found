// "use client";

// import { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

// export default function LostItems() {
//   const [lostItems, setLostItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState("newest");

//   useEffect(() => {
//     const q = query(collection(db, "reportedItems"), where("type", "==", "lost"), where("status", "==", "approved"));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const items = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//           timestamp: doc.data().timestamp?.toDate() || new Date(0), // Default to old date if missing
//         }));

//         setLostItems(items);
//         setFilteredItems(items);
//       },
//       (error) => {
//         console.error("Error fetching lost items:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   // Filter and sort items
//   useEffect(() => {
//     let updatedItems = lostItems;

//     // Search filter
//     if (searchQuery) {
//       updatedItems = updatedItems.filter(
//         (item) =>
//           item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Sort by time
//     updatedItems = [...updatedItems].sort((a, b) =>
//       sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
//     );

//     setFilteredItems(updatedItems);
//   }, [searchQuery, sortOrder, lostItems]);

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg mt-10 mb-10">
//       <h1 className="text-3xl font-semibold text-center mb-6 text-black">Lost Items</h1>

//       {/* Search Bar & Sorting */}
//       <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="Search items..."
//           className="w-full md:w-2/3 p-3 bg-gray-300 text-black rounded-lg "
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <select
//           className="w-full md:w-1/3 p-3 bg-gray-100 border-black rounded-lg "
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="newest">Newest First</option>
//           <option value="oldest">Oldest First</option>
//         </select>
//       </div>

//       {/* Display Items */}
//       {filteredItems.length === 0 ? (
//         <p className="text-center text-gray-500">No matching items found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {filteredItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-4 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
//             >
//               {item.imageUrl && (
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-full h-48 object-cover rounded-md mb-3"
//                 />
//               )}
//               <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//               <p className="text-gray-600 text-sm">{item.description}</p>
//               <p className="text-gray-500 text-sm mt-2">
//                 <strong>Location:</strong> {item.location}
//               </p>
//               <p className="text-gray-400 text-xs mt-2">
//                 <strong>Reported on:</strong> {item.timestamp.toLocaleString()}
//               </p>
//               {item.reporterEmail && (
//                 <a
//                   href={`mailto:${item.reporterEmail}`}
//                   className="mt-3 block w-full text-center bg-orange-400 text-white py-2 rounded-md hover:bg-black transition"
//                 >
//                   Contact
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { db } from "../firebase"; // Ensure correct path to your firebase config
// import { collection, query, where, onSnapshot } from "firebase/firestore";

// export default function LostItems() {
//   const [lostItems, setLostItems] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, "reportedItems"), where("type", "==", "found"));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const items = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setLostItems(items);
//       },
//       (error) => {
//         console.error("Error fetching lost items:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg mt-10 mb-10">
//       <h1 className="text-2xl font-semibold text-center mb-6 text-black">Found Items</h1>

//       {lostItems.length === 0 ? (
//         <p className="text-center text-gray-500">No Lost items reported yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {lostItems.map((item) => (
//             <div key={item.id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
//               {item.imageUrl && (
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-full h-50 object-cover rounded-md mb-3"
//                 />
//               )}
//               <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//               <p className="text-gray-600 text-sm">{item.description}</p>
//               <p className="text-gray-500 text-sm mt-2">
//                 <strong>Location:</strong> {item.location}
//               </p>
//               {item.reporterEmail && (
//                 <a
//                   href={`mailto:${item.reporterEmail}`}
//                   className="mt-3 block w-full text-center bg-orange-400 text-white py-2 rounded-md hover:bg-black text-white transition"
//                 >
//                   Contact
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

// export default function LostItems() {
//   const [lostItems, setLostItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState("newest");

//   useEffect(() => {
//     const q = query(collection(db, "reportedItems"), where("type", "==", "found"), where("status", "==", "approved"));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const items = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//           timestamp: doc.data().timestamp?.toDate() || new Date(0), // Default to old date if missing
//         }));

//         setLostItems(items);
//         setFilteredItems(items);
//       },
//       (error) => {
//         console.error("Error fetching lost items:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   // Filter and sort items
//   useEffect(() => {
//     let updatedItems = lostItems;

//     // Search filter
//     if (searchQuery) {
//       updatedItems = updatedItems.filter(
//         (item) =>
//           item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Sort by time
//     updatedItems = [...updatedItems].sort((a, b) =>
//       sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
//     );

//     setFilteredItems(updatedItems);
//   }, [searchQuery, sortOrder, lostItems]);

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg mt-10 mb-10">
//       <h1 className="text-3xl font-semibold text-center mb-6 text-black">Found Items</h1>

//       {/* Search Bar & Sorting */}
//       <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="Search items..."
//           className="w-full md:w-2/3 p-3 bg-gray-300 text-black rounded-lg "
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <select
//           className="w-full md:w-1/3 p-3 bg-gray-100 border-black rounded-lg "
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="newest">Newest First</option>
//           <option value="oldest">Oldest First</option>
//         </select>
//       </div>

//       {/* Display Items */}
//       {filteredItems.length === 0 ? (
//         <p className="text-center text-gray-500">No matching items found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {filteredItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-4 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
//             >
//               {item.imageUrl && (
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-full h-48 object-cover rounded-md mb-3"
//                 />
//               )}
//               <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//               <p className="text-gray-600 text-sm">{item.description}</p>
//               <p className="text-gray-500 text-sm mt-2">
//                 <strong>Location:</strong> {item.location}
//               </p>
//               <p className="text-gray-400 text-xs mt-2">
//                 <strong>Reported on:</strong> {item.timestamp.toLocaleString()}
//               </p>
//               {item.reporterEmail && (
//                 <a
//                   href={`mailto:${item.reporterEmail}`}
//                   className="mt-3 block w-full text-center bg-orange-400 text-white py-2 rounded-md hover:bg-black transition"
//                 >
//                   Contact
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function LostItems() {
  const [lostItems, setLostItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const q = query(
      collection(db, "reportedItems"),
      where("type", "==", "lost"),
      where("status", "==", "approved")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(0),
        }));

        setLostItems(items);
        setFilteredItems(items);
      },
      (error) => {
        console.error("Error fetching lost items:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let updatedItems = lostItems;

    if (searchQuery) {
      updatedItems = updatedItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    updatedItems = [...updatedItems].sort((a, b) =>
      sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
    );

    setFilteredItems(updatedItems);
  }, [searchQuery, sortOrder, lostItems]);

  const handleDownloadReport = (item) => {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = image.width;
      const height = image.height + 200;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0);

      // White background for text
      ctx.fillStyle = "white";
      ctx.fillRect(0, image.height, width, 200);

      // Item details
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "left";

      const padding = 20;
      let y = image.height + 30;

      ctx.fillText(`Item Name: ${item.name}`, padding, y); y += 30;
      ctx.fillText(`Location: ${item.location}`, padding, y); y += 30;
      ctx.fillText(`Description: ${item.description}`, padding, y); y += 30;
      ctx.fillText(`Reported on: ${item.timestamp.toLocaleString()}`, padding, y); y += 30;
      ctx.fillText(`Reporter Email: ${item.reporterEmail || 'N/A'}`, padding, y);

      // Watermark
      ctx.fillStyle = "rgba(255, 69, 0, 0.3)";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("LOST & FOUND REPORT", width / 2, height - 20);

      const link = document.createElement("a");
      link.download = `${item.name.replace(/\s+/g, "_")}_report.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    image.src = item.imageUrl;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg mt-10 mb-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-black">Lost Items</h1>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full md:w-2/3 p-3 bg-gray-300 text-black rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="w-full md:w-1/3 p-3 bg-gray-100 border-black rounded-lg"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">No matching items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Location:</strong> {item.location}
              </p>
              <p className="text-gray-400 text-xs mt-2">
                <strong>Reported on:</strong> {item.timestamp.toLocaleString()}
              </p>
              {item.reporterEmail && (
                <a
                  href={`mailto:${item.reporterEmail}`}
                  className="mt-3 block w-full text-center bg-orange-400 text-white py-2 rounded-md hover:bg-black transition"
                >
                  Contact
                </a>
              )}

              <button
                onClick={() => handleDownloadReport(item)}
                className="mt-2 w-full text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition"
              >
                Download Report
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
