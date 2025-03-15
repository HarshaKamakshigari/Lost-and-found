// "use client";

// import { useState } from "react";

// export default function LostItems() {
//   // Placeholder lost items (replace with dynamic data later)
//   const [lostItems, setLostItems] = useState([
//     {
//       id: 1,
//       name: "Black Wallet",
//       description: "Lost near the cafeteria.",
//       location: "Campus Cafeteria",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "Silver Watch",
//       description: "Dropped somewhere in the library.",
//       location: "Main Library",
//       image: "https://via.placeholder.com/150",
//     },
//   ]);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-[#F5F5F5] shadow-lg rounded-lg mt-10 border border-gray-300">
//       <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Lost Items</h1>

//       {/* Items Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {lostItems.map((item) => (
//           <div key={item.id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-40 object-cover rounded-md mb-3"
//             />
//             <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//             <p className="text-gray-600 text-sm">{item.description}</p>
//             <p className="text-gray-500 text-sm mt-2">
//               <strong>Location:</strong> {item.location}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure correct path to your firebase config
import { collection, onSnapshot } from "firebase/firestore";

export default function LostItems() {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "reportedItems"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLostItems(items);
      },
      (error) => {
        console.error("Error fetching lost items:", error);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F5F5F5] shadow-lg rounded-lg mt-10 border border-gray-300">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Lost Items</h1>

      {lostItems.length === 0 ? (
        <p className="text-center text-gray-500">No lost items reported yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lostItems.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Location:</strong> {item.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
