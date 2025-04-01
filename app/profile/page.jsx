// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, signOut } from "../firebase";

// export default function Profile() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (!user) {
//         router.push("/login"); // Redirect to login
//       } else {
//         setUser(user);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push("/login");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <p className="text-lg animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white text-white min-h-screen flex flex-col items-center justify-center p-6">
//       {/* Profile Card */}
//       <div className="bg-gray-600 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
//         <img
//           src={user?.photoURL || "/default-avatar.png"} // Default avatar if null
//           alt="Profile Picture"
//           className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
//         />
//         <h2 className="text-2xl font-bold mt-4">{user?.displayName || "User"}</h2>
//         <p className="text-gray-400">{user?.email}</p>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition duration-300"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signOut, db } from "../firebase";
import { collection, query, where, or, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportedItems, setReportedItems] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        fetchUserItems(user.uid, user.email);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchUserItems = (userId, email) => {
    const q = query(
      collection(db, "reportedItems"),
      or(where("userId", "==", userId), where("reporterEmail", "==", email))
    );

    const unsubscribeItems = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReportedItems(items);
      },
      (error) => {
        console.error("Error fetching reported items:", error);
      }
    );

    return () => unsubscribeItems();
  };

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
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      {/* Profile Card */}
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 text-center w-full max-w-md">
        {/* Profile Image */}
        <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden shadow-md border border-gray-300">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <h2 className="text-gray-900 text-2xl font-semibold mt-4">
          {user?.displayName || "User"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Reported Items Section */}
      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Reported Items</h2>

        {reportedItems.length === 0 ? (
          <p className="text-gray-500">You haven't reported any items yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
              >
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
                <p className="text-gray-500 text-sm mt-1">
                  <strong>Type:</strong> {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="mt-3 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-md transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
