'use client'
import React,{useRef} from 'react'
import html2canvas from 'html2canvas'
import jsPDF from "jspdf";
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { FormInput, FormInputPassword } from '@/components'
import appLogo from '@/assets/images/logo.png'
import Link from 'next/link';

const AccountSetting = () => {

    const { control } = useForm()

    const invoiceRef = useRef<HTMLDivElement | null>(null);
  
    const downloadAsPdf = () => {
      const input = invoiceRef.current;
      if (input) {
        html2canvas(input).then((canvas) => {
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
                className="inline-flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all hover:shadow-lg bg-primary text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40 "
            >
                Download
            </button>
            </div>

        <div className="invoice container max-w-[1000px]" ref={invoiceRef}>

            <div className="">
                <Image alt="Logo" width={100} height={83} src={appLogo} style={{ height: '', width: '200px' }} />
            </div>                                
                                <div className="flex mb-10">
                                  <div className="xl:w-1/2">
                                      <div className="">
                                          <ul>
                                            <li className="text-gray-900">iThots Technology Solutions Pvt. Ltd </li>
                                            <li>#44, 37th Street, G.K.M Colony, </li>
                                            <li>Chennai - 600082.</li>
                                          </ul>
                                      </div>
                                  </div>
                                  <div className="xl:w-1/2 max-w-[400px] ml-auto">
                                      <div className="text-end">
                                          <div className="">
                                              <ul>
                                                <li>PAN NO : AADCI8476L </li>
                                                <li>LUT No. AD330821001209K </li>
                                                <li>GSTIN 33AADCI8476L1Z3 </li>
                                              </ul>                                              
                                          </div>
                                      </div>                                      
                                  </div>
                                </div>
                                {/* <Link href={"/home/CTA"} >Hiiiiiiiiiiiiiiiiiiiii </Link> */}

                                <div className="flex mb-10">
                                  <div className="xl:w-1/2">
                                      <div className="">
                                          <ul>
                                            <li className="text-gray-900">Buyer:</li>
                                            <li>Pastor. Samuel </li>
                                            <li>Peniel Church</li>
                                            <li>Neelankarai</li>
                                          </ul>
                                      </div>                                      
                                  </div>
                                  <div className="xl:w-1/2 max-w-[400px] ml-auto">
                                      <div className="text-end">
                                          
                                      </div>
                                      
                                  </div>
                                </div>


                                <div className="relative overflow-x-auto mt-10">
                                    <table className="w-full text-sm text-left text-gray-500 ">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Description of Products
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    <div className="flex items-center">
                                                        Qty                                                  
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    <div className="flex items-center">
                                                        Rate
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    <div className="flex items-center">
                                                        GST 18%
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right">
                                                    <div className="text-right">
                                                        Amount INR
                                                    </div>
                                                </th>                                                                                        
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            <tr className="bg-white border">
                                                <td className="px-6 py-4">
                                                1
                                                </td>
                                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                Yamaha SX600 Keyboard
                                                </td>
                                                <td className="px-6 py-4">
                                                1
                                                </td>
                                                <td className="px-6 py-4">
                                                20000.00
                                                </td>
                                                <td className="px-6 py-4">
                                                -
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                20000.00
                                                </td>
                                            </tr>

                                            <tr className="bg-white border">
                                               <td colSpan={5} className="px-6 py-4 text-end text-gray-900">
                                               Total
                                                </td>
                                                <td className="px-6 py-4 text-end text-gray-900">
                                                20000.00
                                                </td>
                                            </tr>   
                                        </tbody>
                                    </table>
                                </div>


                                <div className=" my-14">
                                  <div className="">
                                      <div className="">
                                          <ul>
                                            <li>Amount in words: </li>
                                            <li className="text-gray-900 mt-2">Twenty Thousand Rupees Only.</li>
                                          </ul>
                                      </div>                                      
                                  </div>                                  
                                </div>


                                <div className="flex my-14">
                                    <div className="w-2/3">
                                        <div className="">
                                            <ul>
                                              <li className="text-gray-900">Bank Details </li>                                              
                                            </ul>
                                        </div>                                      
                                    </div>  

                                    <div className="w-1/3 justify-end">
                                        <div className="text-end ">
                                            <Image alt="Logo" width={100} height={83} src={appLogo} style={{ height: '', width: '200px', margin:'auto', }} />
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

                         

    </section>
  )
}

export default AccountSetting
