// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { db } from "@/app/firebase";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     const isAdmin = localStorage.getItem("adminAuth");
//     if (!isAdmin) {
//       router.push("/admin");
//     } else {
//       fetchReports();
//     }
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "reportedItems"));
//       const fetchedReports = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       console.log("Fetched Reports:", fetchedReports); // Debugging
//       setReports(fetchedReports);
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await updateDoc(doc(db, "reportedItems", id), { status });

//       // Update state immediately instead of making another Firestore call
//       setReports((prevReports) =>
//         prevReports.map((report) =>
//           report.id === id ? { ...report, status } : report
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("adminAuth");
//     router.push("/admin");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <button
//         onClick={handleLogout}
//         className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>

//       {reports.length === 0 ? (
//         <p>No reports found</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {reports.map((report) => (
//             <div key={report.id} className="border p-4 shadow-md">
//               <h2 className="text-lg font-semibold">{report.name}</h2>
//               <p>{report.description}</p>
//               <p className="text-sm text-gray-500">Status: {report.status}</p>
//               {report.imageUrl && (
//                 <img
//                   src={report.imageUrl}
//                   alt="Reported Item"
//                   className="mt-2 w-32"
//                 />
//               )}

//               {/* Ensure the status check is case-insensitive */}
//               {report.status?.toLowerCase() === "pending" && (
//                 <div className="mt-2 flex gap-2 border border-gray-300 p-2">
//                   <button
//                     onClick={() => updateStatus(report.id, "approved")}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => updateStatus(report.id, "rejected")}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const router = useRouter();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin");
    } else {
      fetchReports();
    }
  }, []);

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reportedItems"));
      const fetchedReports = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Reports:", fetchedReports); // Debugging
      setReports(fetchedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "reportedItems", id), { status });

      // Update state immediately
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === id ? { ...report, status } : report
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteReport = async (id) => {
    try {
      await deleteDoc(doc(db, "reportedItems", id));

      // Remove from state immediately
      setReports((prevReports) => prevReports.filter((report) => report.id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      {reports.length === 0 ? (
        <p>No reports found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <div key={report.id} className="border p-4 shadow-md">
              <h2 className="text-lg font-semibold">{report.name}</h2>
              <p>{report.description}</p>
              <p className="text-sm text-gray-500">Status: {report.status}</p>
              {report.imageUrl && (
                <img
                  src={report.imageUrl}
                  alt="Reported Item"
                  className="mt-2 w-32"
                />
              )}

              {/* Approve / Reject Buttons */}
              {report.status?.toLowerCase() === "pending" && (
                <div className="mt-2 flex gap-2 border border-gray-300 p-2">
                  <button
                    onClick={() => updateStatus(report.id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(report.id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* Delete Button */}
              <button
                onClick={() => deleteReport(report.id)}
                className="mt-2 bg-black text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
