'use client';

import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import supabase from '@/components/SupaBase';
import { toWords } from 'number-to-words';
import { Navbar } from '@/components';
import ithotsImage from '../../../assets/images/logo-black.png'

interface InvoiceItem {
  description: string;
  per_unit_price: number;
  quantity: number;
  discount_percentage: number;
  gst_percentage: number;
}

interface Company {
  logo_url: string;
  company_name: string;
  nick_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pan_number: string;
  lut_id: string;
  gst_number: string;
}

interface Client {
  company_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  gst_number: string;
}

interface InvoiceDetails {
  companylist: Company;
  clientlist: Client;
  invoice_items: InvoiceItem[];
  invoice_number: string;
  invoice_date: string;
  invoice_end_date: string;
  invoice_currency: string;
}

const Preview = () => {
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getInvoiceDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('invoicelist')
          .select('*, companylist(*), clientlist(*), invoice_items(*)')
          .eq('invoice_id', id); // Filter based on the id parameter

        if (error) {
          throw error;
        }

        setInvoiceDetails(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getInvoiceDetails();
  }, [id]);

  const calculateTotals = (items: InvoiceItem[]) => {
    let totalAmount = 0;
    let totalDiscountAmount = 0;

    items.forEach(option => {
      const amount = option.per_unit_price * option.quantity;
      const discountPrice = (amount * option.discount_percentage) / 100;
      const totalDisAmt = amount - discountPrice;
      const gstAmount = (totalDisAmt * option.gst_percentage) / 100;
      const total = gstAmount + totalDisAmt;

      totalAmount += total;
      totalDiscountAmount += discountPrice;
    });

    return {
      totalAmount,
      totalDiscountAmount,
      totalAmountInWords: toWords(totalAmount),
      totalDiscountAmountInWords: toWords(totalDiscountAmount),
    };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const invoice = invoiceDetails?.[0];
  const totals = invoice ? calculateTotals(invoice.invoice_items) : {
    totalAmount: 0,
    totalDiscountAmount: 0,
    totalAmountInWords: '',
    totalDiscountAmountInWords: '',
  };

  const downloadAsPdf = () => {
    const input = invoiceRef.current;

    if (input) {
      html2canvas(input, { useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('invoice.pdf');
      });
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-10 my-14">
        <div className='container w-[80%] flex justify-end mb-4'>
          <button
            onClick={downloadAsPdf}
            className="inline-flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all hover:shadow-lg bg-primary text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40"
          >
            Download
          </button>
        </div>
        <div className="invoice container max-w-[1000px]" ref={invoiceRef}>
          {invoice && (
            <div className="border-2 border-gray-600 p-4">
              <div className='flex justify-between'>
                <div className="">
                  <Image id={'img'} alt="Logo" width={100} height={83} src={invoice.companylist.logo_url} style={{ width: '200px' }} />
                </div>
                <div>
                  <h1 className='text-3xl text-slate-900 font-normal'>TAX INVOICE</h1>
                </div>
              </div>
              <div className="flex mb-10">
                <div className="xl:w-1/2">
                  <ul>
                    <li className="text-gray-900">{invoice.companylist.company_name} {invoice.companylist.nick_name}</li>
                    <li>{invoice.companylist.address}</li>
                    <li>{invoice.companylist.city}</li>
                    <li>{invoice.companylist.state}</li>
                    <li>{invoice.companylist.country}</li>
                  </ul>
                </div>
                <div className="xl:w-1/2 max-w-[400px] ml-auto">
                  <div className="text-end">
                    <ul>
                      <li><span className='text-gray-900'>PAN NO :</span> {invoice.companylist.pan_number}</li>
                      <li><span className='text-gray-900'>LUT No :</span> {invoice.companylist.lut_id}</li>
                      <li><span className='text-gray-900'>GSTIN :</span> {invoice.companylist.gst_number}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex mb-10">
                <div className="xl:w-1/2">
                  <h3 className='text-gray-900'>Bill To:</h3>
                  <ul>
                    <li>{invoice.clientlist.company_name}</li>
                    <li>{invoice.clientlist.address}</li>
                    <li>{invoice.clientlist.city}</li>
                    <li>{invoice.clientlist.state}</li>
                    <li>{invoice.clientlist.country}</li>
                    <li><span className='text-gray-900'>GSTIN :</span> {invoice.clientlist.gst_number}</li>
                  </ul>
                </div>
                <div className="xl:w-1/2 max-w-[400px] ml-auto">
                  <div className="text-end">
                    <ul>
                      <li><span className='text-gray-900'>Invoice ID:</span> {invoice.invoice_number}</li>
                      <li><span className='text-gray-900'>Invoice Date :</span> {invoice.invoice_date}</li>
                      <li><span className='text-gray-900'>Invoice Due Date :</span> {invoice.invoice_end_date}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative overflow-x-auto sm:rounded-lg mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Products</th>
                      <th scope="col" className="px-6 py-3">Rate</th>
                      <th scope="col" className="px-6 py-3">Qty</th>
                      <th scope="col" className="px-6 py-3">Discount</th>
                      <th scope="col" className="px-6 py-3">GST (%)</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.invoice_items.map((item, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.description}</th>
                        <td className="px-6 py-4">{item.per_unit_price.toFixed(2)}</td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">{item.discount_percentage.toFixed(2)}</td>
                        <td className="px-6 py-4">{item.gst_percentage.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          {(
                            item.per_unit_price * item.quantity
                            - (item.per_unit_price * item.quantity * item.discount_percentage) / 100
                            + (item.per_unit_price * item.quantity - (item.per_unit_price * item.quantity * item.discount_percentage) / 100) * item.gst_percentage / 100
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-10 flex justify-between">
                <div className="w-1/2">
                  <p><span className='text-gray-900'>Total Amount in Words:</span> {totals.totalAmountInWords}</p>
                </div>
                <div className="w-1/2 text-end">
                  <p><span className='text-gray-900'>Total Amount:</span> {totals.totalAmount.toFixed(2)}</p>
                  <p><span className='text-gray-900'>Total Discount Amount:</span> {totals.totalDiscountAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex mt-10 mb-7">
                                    <div className="w-2/3">
                                        <div className="">
                                            <ul>
                                              <li className="text-gray-900">Bank Details </li>                                              
                                            </ul>
                                        </div>  
                                        <div className="text-start ">
                                        <Image id={'img'} alt="Logo" width={100} height={83} src={ithotsImage} style={{ height: '', width: '200px' }} />
                                        </div>                                     
                                    </div>  

              
                                </div>

                                <div className="flex pb-12">                                  
                                  <div className="w-2/3">
                                      <div className="">
                                          <div className="">
                                              <ul>
                                                <li className="text-gray-900">Ithots Technology Solutions Pvt Ltd</li>
                                                <li>Cheques payable to Ithots Technology Solutions Pvt. Ltd. or Online Transfer </li>
                                                <li>Ithots Technology Solutions Pvt Ltd </li>
                                                <li>Bank Name: ICICI Bank </li>
                                                <li>Branch : kolathur Branch </li>
                                                <li>Account no : 218405000239 </li>
                                                <li>IFSC Code : ICIC0002184</li>
                                              </ul>                                              
                                          </div>
                                      </div>                                      
                                  </div>
                                  <div className="w-1/3">
                                    <div className="text-center mt-10">
                                    Authorized Signature
                                    </div>
                                  </div>
                                </div>  
            </div>
          )}


        </div>
      </section>
    </>
  );
};

export default Preview;
