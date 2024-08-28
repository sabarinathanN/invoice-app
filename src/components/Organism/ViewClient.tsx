// "use client";
// import React, { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import supabase from "../SupaBase";
// import Link from "next/link";

// const ViewClient = () => {
//   const [clientData, setClientData] = useState([]);

//   const getClientData = async () => {
//     try {
//       const { data, error } = await supabase.from('clientlist').select();
//       if (data) {
//         setClientData(data);
//       }
//       if (error) {
//         throw error;
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//     }
//   };

//   useEffect(() => {
//     getClientData();
//   }, []);
//   const deleteClient = async (id) => {
//     try {
//       const { data, error } = await supabase
//         .from('clientlist')
//         .delete()
//         .eq('client_id', id);
//       if (data) {
//         await getClientData(); // Refresh data
//       }
//       if (error) {
//         throw error;
//       }
//     } catch (error) {
//       console.error('Error deleting data:', error.message);
//     }
//   };

//   return (
//     <>
//     <div className="flex justify-between">
//       <div>
//     <h4 className="text-base text-gray-800">List Of Clients</h4>
//     </div>
//     <div>
    
//                 <Link href={'/createclient'} 
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//                   Add Client
//                   </Link>
              
//               </div>
//     </div>
      
//       <hr className="my-6" />
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">Company Name</th>
//               <th scope="col" className="px-6 py-3">Country</th>
//               <th scope="col" className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clientData.map((client) => (
//               <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={client.client_id}>
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   {client.company_name}
//                 </td>
//                 <td className="px-6 py-4">{client.country}</td>
//                 <td className="px-6 py-4">
//                   <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`/editClient/${client.client_id}`}>Edit</a> /
//                   <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deleteClient(client.client_id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ViewClient;

"use client";

import React, { useEffect, useState } from "react";
import supabase from "../SupaBase";
import Link from "next/link";

// Define a TypeScript interface for client data
interface Client {
  client_id: number;
  company_name: string;
  country: string;
}

const ViewClient: React.FC = () => {
  const [clientData, setClientData] = useState<Client[]>([]);

  const getClientData = async () => {
    try {
      const { data, error } = await supabase
        .from('clientlist') // First argument is the table name
        .select('*'); // Select all columns
      if (error) {
        throw error;
      }
      setClientData(data || []);
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
    }
  };

  useEffect(() => {
    getClientData();
  }, []);

  const deleteClient = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from('clientlist') // First argument is the table name
        .delete()
        .eq('client_id', id);
      if (error) {
        throw error;
      }
      if (data) {
        await getClientData(); // Refresh data
      }
    } catch (error) {
      console.error('Error deleting data:', (error as Error).message);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h4 className="text-base text-gray-800">List Of Clients</h4>
        </div>
        <div>
          <Link
            href="/createclient"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Client
          </Link>
        </div>
      </div>
      <hr className="my-6" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Company Name</th>
              <th scope="col" className="px-6 py-3">Country</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clientData.map((client) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={client.client_id}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {client.company_name}
                </td>
                <td className="px-6 py-4">{client.country}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/editClient/${client.client_id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>{" "}
                  /
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => deleteClient(client.client_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewClient;

