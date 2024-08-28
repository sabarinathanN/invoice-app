'use client';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';
import { toWords } from 'number-to-words';

// Define the interfaces
interface InvoiceItem {
  description: string;
  rate: number;
  quantity: number;
  discount: number;
  gst: number;
}

interface CompanyDetails {
  logo_url?: string;
  company_name?: string;
  nick_name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pan_number?: string;
  lut_id?: string;
  gst_number?: string;
  invoiceId?: string;
  invoiceDate?: string;
}

interface ClientData {
  clientCompany?: string;
  clientAddress?: string;
  clientCity?: string;
  clientState?: string;
  clientCountry?: string;
  client_gst?: string;
}

interface PreviewCreateModeProps {
  companydata: {
    currency: string;
  };
  clientdata: ClientData;
  invoiceItem: InvoiceItem[];
  completeCompanydeatils: CompanyDetails[];
}

const PreviewCreateMode: React.FC<PreviewCreateModeProps> = ({
  companydata,
  clientdata,
  invoiceItem,
  completeCompanydeatils
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Calculate totals from invoice items
  const calculateTotals = (data: InvoiceItem[]) => {
    let totalAmount = 0;
    let totalDiscountAmount = 0;

    data?.forEach((option) => {
      const amount = option.rate * option.quantity;
      const discountPrice = (amount * option.discount) / 100;
      const totalDisAmt = amount - discountPrice;
      const gstAmount = (totalDisAmt * option.gst) / 100;
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

  // Check if invoiceItem exists and calculate totals
  const totals = invoiceItem && invoiceItem.length > 0
    ? calculateTotals(invoiceItem)
    : {
        totalAmount: 0,
        totalDiscountAmount: 0,
        totalAmountInWords: '',
        totalDiscountAmountInWords: '',
      };

  // Download as PDF
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
    <section className="py-10 my-14">
      <div className='flex justify-center'>
        <button
          onClick={downloadAsPdf}
          className="inline-flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all hover:shadow-lg bg-primary text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40"
        >
          Download
        </button>
      </div>

      <div className="invoice container max-w-[1000px]" ref={invoiceRef}>
        <div className='flex justify-between'>
          <div>
            <Image
              id={'img'}
              alt="Logo"
              width={100}
              height={83}
              src={completeCompanydeatils[0]?.logo_url || ''}
              style={{ width: '200px' }}
            />
          </div>
          <div>
            <h1 className='text-3xl text-slate-900 font-normal'>TAX INVOICE</h1>
          </div>
        </div>

        <div className="flex mb-10">
          <div className="xl:w-1/2">
            <div>
              <ul>
                <li className="text-gray-900">{completeCompanydeatils[0]?.company_name} {completeCompanydeatils[0]?.nick_name}</li>
                <li>{completeCompanydeatils[0]?.address}</li>
                <li>{completeCompanydeatils[0]?.city}</li>
                <li>{completeCompanydeatils[0]?.state}</li>
                <li>{completeCompanydeatils[0]?.country}</li>
              </ul>
            </div>
          </div>
          <div className="xl:w-1/2 max-w-[400px] ml-auto">
            <div className="text-end">
              <ul>
                <li><span className='text-gray-900'>PAN NO:</span> {completeCompanydeatils[0]?.pan_number}</li>
                <li><span className='text-gray-900'>LUT No:</span> {completeCompanydeatils[0]?.lut_id}</li>
                <li><span className='text-gray-900'>GSTIN:</span> {completeCompanydeatils[0]?.gst_number}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex mb-10">
          <div className="xl:w-1/2">
            <div>
              <h3 className='text-gray-900'>Bill To:</h3>
              <ul>
                <li>{clientdata?.clientCompany}</li>
                <li>{clientdata?.clientAddress}</li>
                <li>{clientdata?.clientCity}</li>
                <li>{clientdata?.clientState}</li>
                <li>{clientdata?.clientCountry}</li>
                <li><span className='text-gray-900'>GSTIN:</span> {clientdata?.client_gst}</li>
              </ul>
            </div>
          </div>
          <div className="xl:w-1/2 max-w-[400px] ml-auto">
            <div className="text-end">
              <ul>
                <li><span className='text-gray-900'>Invoice ID:</span> {completeCompanydeatils[0]?.invoiceId}</li>
                <li><span className='text-gray-900'>Invoice Date:</span> {completeCompanydeatils[0]?.invoiceDate}</li>
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
                <th scope="col" className="px-6 py-3">Dis</th>
                <th scope="col" className="px-6 py-3">Gst</th>
                <th scope="col" className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {invoiceItem.map((option, index) => {
                const amount = option.rate * option.quantity;
                const discountPrice = (amount * option.discount) / 100;
                const totalDisAmt = amount - discountPrice;
                const gstAmount = (totalDisAmt * option.gst) / 100;
                const totalAmt = gstAmount + totalDisAmt;

                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{option.description}</td>
                    <td className="px-6 py-4">{option.rate} {companydata.currency}</td>
                    <td className="px-6 py-4">{option.quantity}</td>
                    <td className="px-6 py-4">{`${option.discount}%`}</td>
                    <td className="px-6 py-4">{`${option.gst}%`}</td>
                    <td className="px-6 py-4 text-right">{totalAmt.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="ml-auto max-w-[500px]">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" aria-hidden="true">
              <thead>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Total</td>
                  <td className="px-6 py-4 text-right">{totals.totalAmount.toFixed(2)}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Total Discount</td>
                  <td className="px-6 py-4 text-right">{totals.totalDiscountAmount.toFixed(2)}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default PreviewCreateMode;
