
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, signOut, db } from "../firebase";
// import { collection, query, where, or, onSnapshot, deleteDoc, doc } from "firebase/firestore";

// export default function Profile() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [reportedItems, setReportedItems] = useState([]);

//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (!user) {
//         router.push("/login");
//       } else {
//         setUser(user);
//         fetchUserItems(user.uid, user.email);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   const fetchUserItems = (userId, email) => {
//     const q = query(
//       collection(db, "reportedItems"),
//       or(where("userId", "==", userId), where("reporterEmail", "==", email))
//     );

//     const unsubscribeItems = onSnapshot(
//       q,
//       (snapshot) => {
//         const items = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setReportedItems(items);
//       },
//       (error) => {
//         console.error("Error fetching reported items:", error);
//       }
//     );

//     return () => unsubscribeItems();
//   };

//   const handleRemoveItem = async (itemId) => {
//     const confirmDelete = window.confirm("Are you sure you want to remove this item?");
//     if (confirmDelete) {
//       try {
//         await deleteDoc(doc(db, "reportedItems", itemId));
//         setReportedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//       } catch (error) {
//         console.error("Error removing item:", error);
//       }
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push("/login");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
//         <p className="text-lg animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-white p-6">
//       {/* Profile Card */}
//       <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 text-center w-full max-w-md">
//         {/* Profile Image */}
//         <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden shadow-md border border-gray-300">
//           <img
//             src={user?.photoURL || "/default-avatar.png"}
//             alt="Profile Picture"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* User Info */}
//         <h2 className="text-gray-900 text-2xl font-semibold mt-4">
//           {user?.displayName || "User"}
//         </h2>
//         <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="mt-6 w-full bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition duration-300"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Reported Items Section */}
//       <div className="w-full max-w-4xl mt-10">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Reported Items</h2>

//         {reportedItems.length === 0 ? (
//           <p className="text-gray-500">You haven't reported any items yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {reportedItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
//               >
//                 {item.imageUrl && (
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-full h-40 object-cover rounded-md mb-3"
//                   />
//                 )}
//                 <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//                 <p className="text-gray-600 text-sm">{item.description}</p>
//                 <p className="text-gray-500 text-sm mt-2">
//                   <strong>Location:</strong> {item.location}
//                 </p>
//                 <p className="text-gray-500 text-sm mt-1">
//                   <strong>Type:</strong> {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
//                 </p>

//                 {/* Remove Button */}
//                 <button
//                   onClick={() => handleRemoveItem(item.id)}
//                   className="mt-3 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-md transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signOut, db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  limit,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportedItems, setReportedItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const userItemsQuery = query(
      collection(db, "reportedItems"),
      where("reporterEmail", "==", user.email)
    );

    const unsubscribeUserItems = onSnapshot(userItemsQuery, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReportedItems(items);
    });

    const recentItemsQuery = query(
      collection(db, "reportedItems"),
      orderBy("timestamp", "desc"),
      limit(5)
    );

    const unsubscribeRecentItems = onSnapshot(recentItemsQuery, (snapshot) => {
      const items = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.reporterEmail !== user.email);
      setRecentItems(items);
    });

    return () => {
      unsubscribeUserItems();
      unsubscribeRecentItems();
    };
  }, [user]);

  const handleRemoveItem = async (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "reportedItems", itemId));
        setReportedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error("Error removing item:", error);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-6 relative">
      {/* Notification Button */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        title="Show Notifications"
      >
        <BellIcon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute top-16 right-6 bg-white border border-gray-200 shadow-lg rounded-xl w-80 z-50 p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Recent Items</h3>
          {recentItems.length === 0 ? (
            <p className="text-sm text-gray-500">No new items found.</p>
          ) : (
            recentItems.map((item) => (
              <div key={item.id} className="border-b pb-2 last:border-none last:pb-0">
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                <p className="text-xs text-gray-500 truncate">{item.location}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-b from-gray-50 to-white border border-gray-100 shadow-lg rounded-2xl p-8 text-center w-full max-w-md relative"
      >
        <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden shadow-md border-4 border-gradient transform hover:scale-105 transition-transform duration-300">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-gray-900 text-2xl font-extrabold mt-4">
          {user?.displayName || "User"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition duration-300"
        >
          Logout
        </button>
      </motion.div>

      {/* Reported Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-5xl mt-10"
      >
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Your Reported Items</h2>

        {reportedItems.length === 0 ? (
          <p className="text-gray-500 text-center">You haven't reported any items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reportedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 shadow-md rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md mb-3 transform hover:scale-102 transition-transform duration-300"
                  />
                )}
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                <p className="text-gray-500 text-sm mt-2">
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      item.type === "lost"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="mt-3 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-md font-medium transition duration-300"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}
