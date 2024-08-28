"use client";

import React, { useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";

// Define the Company interface
interface Company {
  id: number;
  company_name: string;
  nick_name: string;
  country: string;
}

// Initialize Supabase client
const supabase: SupabaseClient = createClient(
  "https://nsfdzdisybjejoynbyrr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZmR6ZGlzeWJqZWpveW5ieXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNTgyNTcsImV4cCI6MjAzMDYzNDI1N30.NcuIJ_zlHWcEEcqmMDs0tc-Lz-VqhtuTXGuBLQ_clOA"
);

const ViewCompany: React.FC = () => {
  const [companyData, setCompanyData] = useState<Company[]>([]);

  const getCompanyData = async () => {
    try {
      const { data, error } = await supabase.from('companylist').select('*');
      if (error) {
        throw error;
      }
      setCompanyData(data || []);
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const deleteCompany = async (id: number) => {
    try {
      const { error } = await supabase
        .from('companylist')
        .delete()
        .eq('id', id);
      if (error) {
        throw error;
      }
      await getCompanyData(); // Refresh data
    } catch (error) {
      console.error('Error deleting data:', (error as Error).message);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h4 className="text-base text-gray-800">List Of Companies</h4>
        </div>
        <div>
          <Link
            href="/addcompany"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Company
          </Link>
        </div>
      </div>
      <hr className="my-6" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Company Name</th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Nick name
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Country
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center text-center">Edit/Delete</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {companyData.map((company) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={company.id}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {company.company_name}
                </td>
                <td className="px-6 py-4">{company.nick_name}</td>
                <td className="px-6 py-4">{company.country}</td>
                <td className="px-6 py-4 text-start">
                  <Link
                    href={`/editCompany/${company.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>{" "}
                  /
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => deleteCompany(company.id)}
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

export default ViewCompany;
