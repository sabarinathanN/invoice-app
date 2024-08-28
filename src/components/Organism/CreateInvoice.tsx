// "use client"
// import React, { useEffect, useState } from "react"
// import Input from "../Atom/Input";
// import Select from "../Atom/Select";
// import { COMMON_REX } from "../../constants/regex";
// import Button from "../Atom/Button";
// import supabase from "../SupaBase";
// import { toWords } from 'number-to-words';
// import Link from "next/link";
// import Overlay from "../Atom/Overlay";
// import PreviewCreateMode from "../Atom/PreviewInvoice";
// import { options } from "@/app/api/auth/[...nextauth]/options";


// interface Company {
//     id: string;
//     company_name: string;
// }
// interface Option {
//     value: string;
//     country: string;
// }
// interface Currency {
//     name:string;
//     symbole:string;
// }

// const CreateInvoice = (()=>{

//     const [inputDataCompany,setInputDataCompany] = useState({
//         client_id:"",
//         companyName:"",
//         invoiceDate:"",
//         invoiceId:"",
//         currency:"",
//         invoiceDueDate:"",
        
//     });
//     const [inputDataProducts,setInputDataProducts] = useState({
//         description:"",
//         rate:0,
//         quantity:0,
//         gst:0,
//         discount:0,
//     });

//     const [clientData,setClientData] = useState();
  

//     const [errorCompany,setErrorCompany] = useState({
//         companyName:"",
//         invoiceDate:"",
//         invoiceId:"",
//         currency:"",
//         invoiceDueDate:"",
//     });

//     const [errorProducts,setErrorProducts] = useState({
//         description:"",
//         rate:"",
//         quantity:"",
//         gst:"",
//         discount:""
//     });

//     const [btnDisable, setBtnDisable] = useState(true);
//     const [invoiceBtnEnable,setInvoiceBtnEnable] = useState(true);

//       const [data, setData] = useState([]);
//       const [loading, setLoading] = useState(true);    

// const filteredCompany = data.filter((company) => company.id === parseInt(inputDataCompany.companyName))


//       let companies = data.map((res) => {
//         console.log("data2",res.id)
//         return { id: res.id, company_name: res.company_name };
//       });


//       const fetchClients = async () => {
//         const { data, error } = await supabase.from('clientlist').select('*');
//         if (error) {
//           throw error;
//         }
//         return data;
//       };
//       const fetchData = async () => {
//         try {
//           const { data, error } = await supabase
//             .from('companylist') 
//             .select('*');
  
//           if (error) throw error;
  
//           setData(data);
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//     useEffect(() => {
//       fetchData();
//     }, []);

//     const fetchClientdata = async () => {
//         try{
//             const {data,error} = await supabase 
//             .from('clientlist')
//             .select('*');

//             if (error) throw error;
//             setClientData(data);
//         }
//         catch(error){
//            setError(error.message);
//         }
//         finally {
//             setLoading(false);
//           }
//     }
//     console.log("clientData",clientData)

//     useEffect(()=>{
//         fetchClientdata();
//     },[])

//     const [existingData, setExistingData] = useState(() => {
//         return JSON.parse(sessionStorage.getItem('invoice-list')) || [];
//     });

//     const updatedData = [...existingData, inputDataProducts];

//     const transformedOptions = companies.reduce((options:Option, { id, company_name }:Company) => {
//         options.push({ value: id, country: company_name });
//         return options;
//     }, []);

//     const currencyData = [
//         {
//             name: "India",
//             symbole: "₹" // Indian Rupee
//         },
//         {
//             name: "USA",
//             symbole: "$" // US Dollar
//         },
//         {
//             name: "Hong Kong",
//             symbole: "HK$" // Hong Kong Dollar
//         },
//         {
//             name: "Malaysia",
//             symbole: "RM" // Malaysian Ringgit
//         },
//         {
//             name: "Singapore",
//             symbole: "S$" // Singapore Dollar
//         },
//         {
//             name: "Australia",
//             symbole: "A$" // Australian Dollar
//         },
//         {
//             name: "UK - Pound",
//             symbole: "£" // British Pound Sterling
//         },
//         {
//             name: "UK - Euro",
//             symbole: "€" // Euro
//         },
//         {
//             name: "UAE",
//             symbole: "د.إ" // United Arab Emirates Dirham
//         },
//         {
//             name: "Sri Lanka",
//             symbole: "Rs" // Sri Lankan Rupee
//         }
//     ];

//     const currencyList = currencyData.reduce((options:Option,{name,symbole}:Currency) => {
//         options.push({ value:symbole, country:  `${name} - ${symbole}` });
//         return options;
//     }, [])

//     const clientDataList = clientData?.reduce((options, { client_id, company_name }) => {
//         options.push({ value: client_id, country: company_name });
//         return options;
//     }, []);
    


//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const [companyData, clientData] = await Promise.all([
//               fetchClients(),
//             ]);

//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//       }, []);

//     //   const clientList = fetchClients();
//       console.log("iiiiiiiiii",clientDataList)
//     const validationFunctions: { [key: string]: (value: string) => void } = {
//         companyName: (value: string) => {
//             setErrorCompany((prevState) => ({
//                 ...prevState,
//                 companyName: value.trim() === "" ? "Select company Name" : ""
//             }));
//         },
//         invoiceDate: (value: string) => {
//             setErrorCompany((prevState) => ({
//                 ...prevState,
//                 invoiceDate: value.trim() === "" ? "Select Invoice Date" : ""
//             }));
//         },
//         invoiceDueDate: (value: string) => {
//             setErrorCompany((prevState) => ({
//                 ...prevState,
//                 invoiceDueDate: value.trim() === "" ? "Select Invoice Date" : ""
//             }));
//         },
//         invoiceId: (value: string) => {
//             setErrorCompany((prevState) => ({
//                 ...prevState,
//                 invoiceId: value.trim() === "" ? "Enter invoice Id" : ""
//             }));
//         },
//         currency: (value: string) => {
//             setErrorCompany((prevState) => ({
//                 ...prevState,
//                 currency: value.trim() === "" ? "Select Currency" : ""
//             }));
//         },
//         description: (value: string) => {
//             setErrorProducts((prevState) => ({
//                 ...prevState,
//                 description: value.trim() === "" ? "Enter Your Description" : ""
//             }));
//         },
//         rate: (value: string) => {
//             setErrorProducts((prevState) => ({
//                 ...prevState,
//                 rate: value.trim() === "" 
//                     ? "Enter Unit Price" 
//                     : !COMMON_REX.ONLYNUMBER.test(value.trim()) 
//                     ? "Enter valid Price" 
//                     : ""
//             }));
//         },
//         quantity: (value: string) => {
//             setErrorProducts((prevState) => ({
//                 ...prevState,
//                 quantity: value.trim() === "" 
//                     ? "Enter a Quantity" 
//                     : !COMMON_REX.ONLYNUMBER.test(value.trim()) 
//                     ? "Enter Valid Quantity" 
//                     : ""
//             }));
//         },
//         gst: (value: string) => {
//             setErrorProducts((prevState) => ({
//                 ...prevState,
//                 gst: value.trim() === "" 
//                     ? "Enter Gst" 
//                     : !COMMON_REX.ONLYNUMBER.test(value.trim()) 
//                     ? "Enter Valid Gst" 
//                     : ""
//             }));
//         },
//         discount: (value: string) => {
//             setErrorProducts((prevState) => ({
//                 ...prevState,
//                 discount: value.trim() === "" 
//                     ? "Enter Discount" 
//                     : !COMMON_REX.ONLYNUMBER.test(value.trim()) 
//                     ? "Enter Valid Discount" 
//                     : ""
//             }));
//         },
        
//     };
    
//     const inputChangeHandler = (value: any, name: string) => {
//         const validate = validationFunctions[name];
//         if (validate) {
//             validate(value);
//         }
    
//         setInputDataCompany(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
    
//         setInputDataProducts(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
    
      
//     };
    


//     let isLength = existingData.length > 0
//     const makeInvoiceBtnEnable = () =>{
//         const isError: boolean =
//         !!errorCompany.companyName ||
//         !!errorCompany.invoiceDate ||
//         !!errorCompany.invoiceId ||
//         !!errorCompany.currency 
        

//         const isInputEmpty: boolean =
//         !inputDataCompany.companyName ||
//         !inputDataCompany.invoiceDate ||
//         !inputDataCompany.invoiceId ||
//         !inputDataCompany.currency ||
//         !isLength
    
//       const result: boolean = isError || isInputEmpty;
// console.log(isError,isInputEmpty);
//       setInvoiceBtnEnable(result);
//     }
//     useEffect(()=>{
//         makeInvoiceBtnEnable();
//        },[inputDataCompany,isLength]);

       
//     const makeButtonEnable = () => {
//         const isError: boolean =
          
//           !!errorProducts.description ||
//           !!errorProducts.rate ||
//           !!errorProducts.quantity ||
//           !!errorProducts.gst ||
//           !!errorProducts.discount 
      
//         const isInputEmpty: boolean =
         
//           !inputDataProducts.description ||
//           !inputDataProducts.rate ||
//           !inputDataProducts.quantity ||
//           !inputDataProducts.gst ||
//           !inputDataProducts.discount 
      
//         const result: boolean = isError || isInputEmpty;
//         setBtnDisable(result);
        
//       };

//       useEffect(()=>{
//         makeButtonEnable();
//        },[inputDataProducts])



// const addProducts = ((e: React.FormEvent)=>{
//     e.preventDefault();
//     sessionStorage.setItem('invoice-list', JSON.stringify(updatedData));
//     setExistingData(updatedData)
//     setInputDataProducts({

//         description:"",
//         rate:0,
//         quantity:0,
//         gst:0,
//         discount:0,
// })
// })

// const createInvoice = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
  
//       // Insert into invoices table
//       const { data: invoiceData, error: invoiceError } = await supabase
//         .from('invoicelist')
//         .insert({
//           invoice_id: Math.floor(1000 + Math.random() * 9000),
//           company_id: inputDataCompany.companyName,
//           client_id: inputDataCompany.client_id,  // Use the client_id here
//           invoice_number: inputDataCompany.invoiceId,
//           invoice_date: inputDataCompany.invoiceDate,
//           invoice_currency: inputDataCompany.currency,
//           total_amount: totals.totalAmount,
//           invoice_end_date:inputDataCompany.invoiceDueDate
//         })
//         .select();
  
//       if (invoiceError) throw invoiceError;
//       console.log(invoiceData);
//       const invoiceId = invoiceData[0].invoice_id;
  
//       // Insert into invoice_items table
//       const invoiceItemsData = existingData.map(item => ({
//         invoice_id: invoiceId,
//         item_id: Math.floor(1000 + Math.random() * 9000 + 1),
//         description: item.description,
//         quantity: item.quantity,
//         per_unit_price: item.rate,
//         gst_percentage: item.gst,
//         discount_percentage: item.discount
//       }));
  
//       const { data: invoiceItemsResult, error: invoiceItemsError } = await supabase
//         .from('invoice_items')
//         .insert(invoiceItemsData);
  
//       if (invoiceItemsError) throw invoiceItemsError;
  
//       console.log('Data inserted successfully:', { invoiceData, invoiceItemsResult, clientData });
  
//     } catch (error) {
//       console.error('Error inserting data:', error.message);
//     }
//   }
  

//   const calculateTotals = (data) => {
//     let totalAmount = 0;
//     let totalDiscountAmount = 0;
  
//     data.forEach(option => {
//       const amount = option.rate * option.quantity;
//       const discountPrice = (amount * option.discount) / 100;
//       const totalDisAmt = amount - discountPrice;
//       const gstAmount = (totalDisAmt * option.gst) / 100;
//       const total = gstAmount + totalDisAmt;
  
//       totalAmount += total;
//       totalDiscountAmount += discountPrice;
//     });
  
//     return {
//       totalAmount,
//       totalDiscountAmount,
//       totalAmountInWords: toWords(totalAmount),
//       totalDiscountAmountInWords: toWords(totalDiscountAmount),
//     };
//   };
  
//   const totals = calculateTotals(existingData);
//   console.log("totalAmount",totals)

// const deleteProducts = (index) => {
//     const latestData = existingData.filter((_, i) => i !== index);
//     sessionStorage.setItem('invoice-list', JSON.stringify(latestData));
//     setExistingData(latestData);
// };



// const [OpenOverlay,setOpenOverlay] = useState(false);
// const openOverlay = (()=>{
//     setOpenOverlay(true)
// })

// const closeOverlay = (()=>{
//     setOpenOverlay(false)
// })


//     return(
//         <>
//         {
//           OpenOverlay &&   <Overlay onClose={closeOverlay}>
//           <PreviewCreateMode invoiceItem={existingData} clientdata = {inputDataClient} companydata = {inputDataCompany} completeCompanydeatils ={filteredCompany}/>
//       </Overlay>
//         }
        
        
//         <div className="invoice">
//                                 <h4 className="text-base text-gray-800">Company Details</h4>                          
//                                 <hr className="my-4" />
//                                 <div className="mb-5">
                            
// <div className="mb-6">
//                                     <form>
//                                         <div className="flex dxl:flex-none dxl:inline-flex dxl:mr-4 items-center">
//                                                 <Select 
//                                                 defaultText="Company-list"
//                                                 label="Select Company"
//                                                 name="companyName"
//                                                 required = {true}
//                                                 option={transformedOptions}
//                                                 error={errorCompany.companyName ? true : false}
//                                                 helperText={errorCompany.companyName}
//                                                 value={inputDataCompany["companyName"]}
//                                                 onChange = {inputChangeHandler}
//                                                 className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                                 />
//                                         </div>

//                                         <div className="flex dxl:flex-none dxl:inline-flex dxl:mr-4 items-center">
//                                             <Input
//                                             label="Select Date"
//                                             type="date"
//                                             id =""
//                                             name = "invoiceDate"
//                                             className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                             onChange = {inputChangeHandler}
//                                             required = {true}
//                                             value={inputDataCompany["invoiceDate"]}  
//                                             error={errorCompany.invoiceDate ? true : false}
//                                             helperText={errorCompany.invoiceDate}
//                                             />
//                                            </div> 

//                                            <div className="flex dxl:flex-none dxl:inline-flex dxl:mr-4 items-center">
//                                             <Input
//                                             label="Select Due Date"
//                                             type="date"
//                                             id =""
//                                             name = "invoiceDueDate"
//                                             className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                             onChange = {inputChangeHandler}
//                                             required = {true}
//                                             value={inputDataCompany["invoiceDueDate"]}  
//                                             error={errorCompany.invoiceDueDate ? true : false}
//                                             helperText={errorCompany.invoiceDueDate}
//                                             />
//                                            </div> 
                                           
//                                            <div className="flex dxl:flex-none dxl:inline-flex dxl:mr-4 items-center ">
//                                             <Input
//                                             label="Invoice Id"
//                                                type="number"
//                                                id =""
//                                                name = "invoiceId"
//                                                className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                                onChange={inputChangeHandler}
//                                                required = {true}
//                                             value={inputDataCompany["invoiceId"]}
//                                                error={errorCompany.invoiceId ? true : false}
//                                                helperText={errorCompany.invoiceId}
//                                             />
//                                             </div>
//                                             <div className="flex dxl:flex-none dxl:inline-flex dxl:mr-4 items-center ">
//                                             <Select
//                                             defaultText="Currency-list"
//                                              label="Select Currency"
//                                               name="currency"
//                                             required = {true}
//                                             value={inputDataCompany["currency"]}
//                                          error={errorCompany.currency ? true : false}
//                                          helperText={errorCompany.currency}
//                                          className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                             option={currencyList}
//                                             onChange = {inputChangeHandler}
//                                             />
//                                              </div>
//                                              <div className="flex dxl:flex-none dxl:inline-flex dxl:mr-4 items-center ">
//                                             <Select
//                                             defaultText="Client-List"
//                                              label="Select Client"
//                                               name="client_id"
//                                             required = {true}
//                                             value={inputDataCompany["client_id"]}
//                                          error={errorCompany.currency ? true : false}
//                                          helperText={errorCompany.currency}
//                                          className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                             option={clientDataList}
//                                             onChange = {inputChangeHandler}
//                                             />
//                                              </div>

//                                              </form>
//                                              </div>

//                                              <form onSubmit={addProducts}>
//                                              <h1 className="pt-6 text-black">Add Items</h1>
//                                              <hr className="my-4"></hr>

//                                              <div className="flex xs:flex-none xs:inline-flex md:flex-none md:inline-flex lg:flex-none lg:inline-flex xs:mr-3 items-center gap-3 w-44">
//                                           <Input
//                                             label="Description"
//                                                type="text"
//                                                name ="description"
//                                                className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                                onChange={inputChangeHandler}
//                                                required ={true}
//                                                placeholder= {"Enter Description"}
//                                                value= {inputDataProducts["description"]} 
//                                             error={errorProducts.description ? true : false}
//                                             helperText={errorProducts.description}
//                                             />  
//                                             </div>                            
//                                      <div className="flex xs:flex-none xs:inline-flex md:flex-none md:inline-flex lg:flex-none lg:inline-flex xs:mr-3 items-center gap-3 w-36">
//                                           <Input
//                                             label="Unit Price"
//                                                type="number"
//                                                name = "rate"
//                                                className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                                onChange={inputChangeHandler}
//                                                required ={true}
//                                                placeholder= {"Rate"}
//                                                value= {inputDataProducts["rate"]} 
//                                             error={errorProducts.rate ? true : false}
//                                             helperText={errorProducts.rate}
//                                             />
//                                             </div>
//                                              <div className="flex xs:flex-none xs:inline-flex md:flex-none md:inline-flex lg:flex-none lg:inline-flex lg:mr-3 items-center gap-3 w-24">
//                                            <Input
//                                             label="Quantity"
//                                                type="number"
//                                                name = "quantity"
//                                                className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                                onChange={inputChangeHandler}
//                                                required = {true}
//                                                placeholder= "Quantity"
//                                                value= {inputDataProducts["quantity"]} 
//                                             error={errorProducts.quantity ? true : false}
//                                             helperText={errorProducts.quantity}
//                                             />
//                                             </div>
                                             
//                                              <div className="flex xs:flex-none xs:inline-flex md:flex-none md:inline-flex lg:flex-none lg:inline-flex lg:mr-3 items-center gap-3 w-24">
//                                              <Input
//                                             label="Discount"
//                                                type="number" 
//                                                name = "discount"
//                                                className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                                onChange={inputChangeHandler}
//                                                required ={true}
//                                                placeholder= "Discount"
//                                                value= {inputDataProducts["discount"]} 
//                                             error={errorProducts.discount ? true : false}
//                                             helperText={errorProducts.discount}
//                                             />
                                            
                                            
//                                             </div>
//                                             <div className="flex xs:flex-none xs:inline-flex md:flex-none md:inline-flex lg:flex-none lg:inline-flex lg:mr-3 items-center gap-3 w-24">
//                                             <Input
//                                             label="Gst"
//                                                type="number"
//                                                name = "gst"
//                                                className="py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
//                                                onChange={inputChangeHandler}
//                                                required ={true}
//                                                placeholder= "%"
//                                                value= {inputDataProducts["gst"]} 
//                                             error={errorProducts.gst ? true : false}
//                                             helperText={errorProducts.gst}
                                            
//                                             />
// </div>
// <div className="flex xs:flex-none xs:inline-flex md:flex-none md:inline-flex lg:flex-none lg:inline-flex lg:mr-3 items-center ">
// <Button disabled={btnDisable} text={"+ Add"} type={"submit"} ></Button>
// </div>
// {/* <Link href={"/preview"}>Preview</Link> */}
// </form>  
//                                 </div>

                        
//                                 <div className="relative overflow-x-auto sm:rounded-lg mt-10">
//                                     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                                         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                                             <tr>
//                                                 <th scope="col" className="px-6 py-3">
//                                                    Products
//                                                 </th>
//                                                 <th scope="col" className="px-6 py-3">
//                                                     <div className="flex items-center">
//                                                         Rate
//                                                     </div>
//                                                 </th>
//                                                 <th scope="col" className="px-6 py-3">
//                                                     <div className="flex items-center">
//                                                         Qty
//                                                     </div>
//                                                 </th>
//                                                 <th scope="col" className="px-6 py-3">
//                                                     <div className="flex items-center">
//                                                         Dis
//                                                     </div>
//                                                 </th>
//                                                 {inputDataProducts.gst > 0 && <th scope="col" className="px-6 py-3">
//                                                      <div className="flex items-center">
//                                                          Gst
//                                                      </div>
//                                                  </th>

//                                                 }
                                               
//                                                 <th scope="col" className="px-6 py-3">
//                                                     <div className="flex items-center">
//                                                         Delete
//                                                     </div>
//                                                 </th>
//                                                 <th scope="col" className="px-6 py-3 text-right">
//                                                     <div className="text-right">
//                                                         Amount
//                                                     </div>
//                                                 </th>                                                                                        
//                                             </tr>
//                                         </thead>
                                        
//                                         <tbody>
//                                             {
// existingData.map((option,index) =>{ 
//  let amount = option.rate * option.quantity;
//     let discountPrice = (amount / 100) * option.discount
//     let totalDisAmt = amount - discountPrice
//        let gstAmount = (totalDisAmt / 100) * option.gst
       
//     return(
//        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
//                                                 <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                                 {option.description}
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                {option.rate +" "+ inputDataCompany.currency}
//                                                 </td>
//                                                 <td className="px-6 py-4">
                                                
//                                                 {option.quantity}
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                 {`${option.discount}%`}
//                                                 </td>
//                                                {inputDataProducts.gst > 0 && <td className="px-6 py-4">
//                                                 {`${option.gst}%`}
//                                                 </td> } 
//                                                 <td className="px-6 py-4">
//                                                 <div className="w-6" onClick={() => deleteProducts(index)}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
//                           <path d="M20,29H12a5,5,0,0,1-5-5V12a1,1,0,0,1,2,0V24a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V12a1,1,0,0,1,2,0V24A5,5,0,0,1,20,29Z"/>
//                           <path d="M26,9H6A1,1,0,0,1,6,7H26a1,1,0,0,1,0,2Z"/>
//                           <path d="M20,9H12a1,1,0,0,1-1-1V6a3,3,0,0,1,3-3h4a3,3,0,0,1,3,3V8A1,1,0,0,1,20,9ZM13,7h6V6a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1Z"/>
//                           <path d="M14,23a1,1,0,0,1-1-1V15a1,1,0,0,1,2,0v7A1,1,0,0,1,14,23Z"/>
//                           <path d="M18,23a1,1,0,0,1-1-1V15a1,1,0,0,1,2,0v7A1,1,0,0,1,18,23Z"/>
//                         </svg></div>
//                                                 </td>
//                                                 <td className="px-6 py-4 text-right">
                                               
//                                                 {  parseFloat(gstAmount + totalDisAmt).toFixed(2) + inputDataCompany.currency}
//                                                 </td>
//                                             </tr> 
//     )
// })
//                                             }

                                            
                                          
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div className="ml-auto max-w-[500px]">                              
//                                     <div className="relative overflow-x-auto">
//                                         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            
//                                             <tbody>
//                                                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                                                     <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                                     Total
//                                                     </td>
//                                                     <td className="px-6 py-4 text-right">
//                                                     {totals.totalAmount.toFixed(2)+" "+inputDataCompany.currency} 
//                                                     </td>                                              
//                                                 </tr>

//                                                 {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                                                     <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                                     Delete
//                                                     </td>
//                                                     <td className="px-6 py-4 text-right">
//                                                     {totals.totalDiscountAmount.toFixed(2)}
//                                                     </td>
//                                                 </tr> */}

//                                                 <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
//                                                     <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                                     Amount Payable
//                                                     </td>
//                                                     <td className="px-6 py-4 text-right">
//                                                     {totals.totalAmount.toFixed(2)+" "+inputDataCompany.currency} 
//                                                     </td>
//                                                 </tr>
//                                                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                                                 <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                                     Amount in Words
//                                                     </td>
                                                   
//                                                     <td className="px-6 py-4 text-right">
//                                                    Rupees {totals.totalAmountInWords} Only
//                                                     </td>
                                                    
//                                                 </tr>
//                                             </tbody>
//                                         </table>
                                        
//                                     </div>

//                                 </div>

//                                 <div className="flex text-right justify-center">
//                                     <div className="flex mt-3 mr-3">
//                                       <div className="w-full">
//                                         <button
//                                           type="button"
//                                           className="inline-flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all hover:shadow-lg bg-primary text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40 "
//                                        onClick={openOverlay}
//                                        >
//                                           Preview
//                                         </button>
//                                       </div>
//                                     </div>

//                                     <div className="flex mt-3">
//                                       <div className="w-full">
//                                         <Button disabled={invoiceBtnEnable} text={"Save"} type={"submit"} onClick ={createInvoice}></Button>
//                                       </div>
//                                     </div>
//                                 </div>

//                           </div>
//         </>
         

//     )
// });

// export default CreateInvoice;
