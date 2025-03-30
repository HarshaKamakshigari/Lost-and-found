// "use client";

// import { useState, useEffect } from "react";
// import { db } from "../firebase"; // Ensure correct path to your firebase config
// import { collection, query, where, onSnapshot } from "firebase/firestore";

// export default function LostItems() {
//   const [lostItems, setLostItems] = useState([]);

//   useEffect(() => {
    
//     const q = query(collection(db, "reportedItems"), where("type", "==", "lost"));

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
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10 mb-10">
//       <h1 className="text-2xl font-semibold text-center mb-6 text-black">Lost Items</h1>

//       {lostItems.length === 0 ? (
//         <p className="text-center text-gray-500">No Lost items reported yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {lostItems.map((item) => (
//             <div key={item.id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
//               {item.imageUrl && (
//                 <img
//                   src={item.imageUrl}
//                   alt={item.name}
//                   className="w-full h-40 object-cover rounded-md mb-3"
//                 />
//               )}
//               <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//               <p className="text-gray-600 text-sm">{item.description}</p>
//               <p className="text-gray-500 text-sm mt-2">
//                 <strong>Location:</strong> {item.location}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure correct path to your firebase config
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function LostItems() {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "reportedItems"), where("type", "==", "lost"));

    const unsubscribe = onSnapshot(
      q,
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

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10 mb-10">
      <h1 className="text-2xl font-semibold text-center mb-6 text-black">Lost Items</h1>

      {lostItems.length === 0 ? (
        <p className="text-center text-gray-500">No Lost items reported yet.</p>
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
              {item.reporterEmail && (
                <a
                  href={`mailto:${item.reporterEmail}`}
                  className="mt-3 block w-full text-center bg-orange-400 text-white py-2 rounded-md hover:bg-black text-white transition"
                >
                  Contact
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
