"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Navbar } from '@/components';
import supabase from '@/components/SupaBase';

// Define the type for invoice items
interface Invoice {
  invoice_id: number;
  invoice_date: string;
  companylist: {
    company_name: string;
  };
  invoice_number: string;
  total_amount: number;
  invoice_currency: string;
}

const Invoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  
  useEffect(() => {
    fetchInvoices();
  }, []);
  
  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from('invoicelist')
      .select(`*,companylist(company_name)`);
  
    if (error) {
      console.error('Error fetching invoices:', error.message);
    } else {
      setInvoices(data || []);
    }
  };
  
  const deleteInvoice = async (id: number) => {
    console.log("delete", id);
    try {
      const { error: invoiceItemsError } = await supabase
        .from('invoice_items')
        .delete()
        .eq('invoice_id', id);
  
      if (invoiceItemsError) {
        throw invoiceItemsError;
      }
  
      const { error: invoiceListError } = await supabase
        .from('invoicelist')
        .delete()
        .eq('invoice_id', id);
  
      if (invoiceListError) {
        throw invoiceListError;
      }
  
      fetchInvoices();
  
      console.log('Invoice and related items deleted successfully.');
    } catch (error) {
      console.error('Error deleting data:', (error as Error).message);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container w-10/12 mt-20">
        <h1 className="text-center text-2xl">Invoice List</h1>
        <div className="invoice">
          <div className="flex justify-between">
            <div>
              <h4 className="text-base text-gray-800">List Of Invoices</h4>
            </div>
            <div>
              <Link href={'/createinvoice'} 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Add Invoice
              </Link>
            </div>
          </div>
          <hr className="my-6" />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">S.No</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Company Name</th>
                  <th scope="col" className="px-6 py-3">Invoice No</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3 text-center">Edit/Delete</th>
                  <th scope="col" className="px-6 py-3 text-center">View/Print</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={invoice.invoice_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{invoice.companylist.company_name}</td>
                    <td className="px-6 py-4">{invoice.invoice_number}</td>
                    <td className="px-6 py-4">{parseFloat(invoice.total_amount.toFixed(2))} {invoice.invoice_currency}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className="w-6 mr-3">
                          <Link href={`/editinvoice/${invoice.invoice_id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-edit" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </Link>
                        </div>
                        <div className="w-6" onClick={() => deleteInvoice(invoice.invoice_id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path d="M20,29H12a5,5,0,0,1-5-5V12a1,1,0,0,1,2,0V24a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V12a1,1,0,0,1,2,0V24A5,5,0,0,1,20,29Z"/>
                            <path d="M26,9H6A1,1,0,0,1,6,7H26a1,1,0,0,1,0,2Z"/>
                            <path d="M20,9H12a1,1,0,0,1-1-1V6a3,3,0,0,1,3-3h4a3,3,0,0,1,3,3V8A1,1,0,0,1,20,9ZM13,7h6V6a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1Z"/>
                            <path d="M14,23a1,1,0,0,1-1-1V15a1,1,0,0,1,2,0v7A1,1,0,0,1,14,23Z"/>
                            <path d="M18,23a1,1,0,0,1-1-1V15a1,1,0,0,1,2,0v7A1,1,0,0,1,18,23Z"/>
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className="w-6 mr-3">
                          <Link href={`/preview/${invoice.invoice_id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <defs>
                                <style>{`.a{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;}`}</style>
                              </defs>
                              <title />
                              <circle className="a" cx="12" cy="12" r="3.5" />
                              <path className="a" d="M23.376,11.672C22.213,10.352,17.562,5.5,12,5.5S1.787,10.352.624,11.672a.5.5,0,0,0,0,.656C1.787,13.648,6.438,18.5,12,18.5s10.213-4.852,11.376-6.172a.5.5,0,0,0,0-.656Z" />
                            </svg>
                          </Link>
                        </div>
                        <div className="w-6">
                          <Link href={`/print-invoice/${invoice.invoice_id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20" width="20">
                              <path d="M3,1V5H0v9h3v5h14v-5h3V5H17V1ZM4,2H16V5H4ZM1,6h2 14 2v7H17V10H3v3H1Zm15,1v1h2V7ZM4,11h12v2 1 4H4v-4-1z m1,1v1h10v-1zm0,2v1h10v-1zm0,2v1h10v-1z" fill="#222222" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
