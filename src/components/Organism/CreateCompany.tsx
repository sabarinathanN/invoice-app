 'use client';
import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../Atom/Input";
import Select from "../Atom/Select";
import codes from 'country-calling-code';
import { COMMON_REX  } from '../../constants/regex';
import Button from "../Atom/Button";
import { createClient } from "@supabase/supabase-js";
import SingleImageUpload from "../Atom/MultipleImageUploader";
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/navigation";
const supabase = createClient("https://nsfdzdisybjejoynbyrr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZmR6ZGlzeWJqZWpveW5ieXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNTgyNTcsImV4cCI6MjAzMDYzNDI1N30.NcuIJ_zlHWcEEcqmMDs0tc-Lz-VqhtuTXGuBLQ_clOA");


type ValidationFunction = (val: string) => void;

// Define an interface for validation functions object
interface ValidationFunctions {
  [key: string]: ValidationFunction;
}

const CreateCompany = (()=>{
 
  const router = useRouter(); 

const [inputData, setInputData] = useState({
  companyname:"",
  nickname:"",
  contactnumber:"",
  email:"",
  website:"",
  country:"",
  address:"",
  companyLogo: null as File | null, 
    lutId:"",
     panNumber :"",
     state :"",
     gst:"",
      city:"",
});
const [error,setError] = useState({
  companyname:"",
  nickname:"",
  contactnumber:"",
  email:"",
  website:"",
  country:"",
  address:"",
  companyLogo:"",
   lutId:"",
    panNumber :"",
    state :"",
    gst:"",
     city:"",
});
const [headerData,setHeaderData] = useState <any>({
  companyname:"",
  nickname:"",
  contactnumber:"",
  email:"",
  website:"",
  country:"",
  address:"",
  companyLogo:"",
   lutId:"",
    panNumber :"",
    state :"",
    gst:"",
     city:"",

})
const [btnDisable, setBtnDisable] = useState<boolean>(true);

const makeButtonEnable = () => {
  const isError: boolean =
    !!error.companyname ||
    !!error.nickname ||
    !!error.contactnumber ||
    !!error.email ||
    !!error.website ||
    !!error.country ||
    !!error.address 
    !!error.companyLogo ||
    !!error.lutId ||
    !!error.panNumber  ||
    !!error.state  ||
    !!error.gst ||
    !!error.city 

  const isInputEmpty: boolean =
    !inputData.companyname ||
    !inputData.nickname ||
    !inputData.contactnumber ||
    !inputData.email ||
    !inputData.website ||
    !inputData.country ||
    !inputData.address ||
    ! inputData.companyLogo ||
    ! inputData.lutId ||
    ! inputData.panNumber  ||
    ! inputData.state  ||
    ! inputData.gst ||
    ! inputData.city 

  const result: boolean = isError || isInputEmpty;
  setBtnDisable(result);
  setHeaderData({
    companyname: inputData.companyname,
    nickname : inputData.nickname,
    contactnumber: inputData.contactnumber,
    email: inputData.email,
    country : inputData.country,
    address : inputData.address,
  companyLogo :inputData.companyLogo,
  lutId :inputData.lutId,
  panNumber  :inputData.panNumber,
  state  :inputData.state,
  gst :inputData.gst,
  city :inputData.city
  });
};

const validatecompanyname = ((val: string)=>{
  if(val.trim() === ""){
   setError({
     ...error,
     companyname:"Enter Your Company Name"
   })
  }
  else if(!COMMON_REX.ONLYSTRING.test(val.trim())){
   setError({
     ...error,
     companyname:"Enter Valid Company Name"
   })
  }
  else{
   setError({
     ...error,
     companyname:""
    })
  }
});

const validatenickname = ((val: string)=>{
  if(val.trim() === ""){
   setError({
     ...error,
     nickname:"Enter Your Company Name"
   })
  }
  else if(!COMMON_REX.ONLYSTRING.test(val.trim())){
   setError({
     ...error,
     nickname:"Enter Valid Company Name"
   })
  }
  else{
   setError({
     ...error,
     nickname:""
    })
  }
});


const validateEmail = ((val:string) =>{
  if(val.trim() === ""){
    setError({
      ...error,
      email:"Enter Your mail Address"
    })
  }
  else if(!COMMON_REX.GMAIL.test(val.trim())){
    setError({
      ...error,
      email:"Enter Valid mail Address"
    })
  }
  else{
    setError({
      ...error,
    email:""
    })
  }
});

const validateContactnumber = ((val:string)=>{
  if(val.trim() === ""){
    setError({
      ...error,
      contactnumber:"Enter Your Contact Number"
    })
  }
  else if(!COMMON_REX.PHONENUMBER.test(val.trim())){
    setError({
      ...error,
      contactnumber:"Enter Valid Contact Number"
    })
  }
  else{
    setError({
      ...error,
    contactnumber:""
    })
  }
});

const validateCountry = ((val:string) =>{
  if(val.trim() === ""){
    setError({
      ...error,
      country:"Enter YourCountry"
    })
  }
  else{
    setError({
      ...error,
    country:""
    })
  }
})

const validateAddress = ((val:string) =>{
  if(val.trim() === ""){
    setError({
      ...error,
     address:"Enter Address"
    })
  }
  else{
    setError({
      ...error,
   address:""
    })
  }
});

const validateWebsite = ((val:string) =>{
  if(val.trim() === ""){
    setError({
      ...error,
      website:"Enter Your Website URL"
    })
  }
  else if(!COMMON_REX.WEBSITE.test(val.trim())){
    setError({
      ...error,
      website:"Enter Valid Website URL"
    })
  }
  else{
    setError({
      ...error,
    website:""
    })
  }
});


const validateCompanyLogo = (val:string) => {
  if (val.trim() === "") {
    setError({
      ...error,
      companyLogo: "Enter Your Company Logo",
    });
  } else {
    setError({
      ...error,
      companyLogo: "",
    });
  }
};


const validateLutId = (val:string) => {
  if (val.trim() === "") {
    setError({
      ...error,
      lutId: "Enter Your LUT ID",
    });
  } else {
    setError({
      ...error,
      lutId: "",
    });
  }
};

const validatePanNumber = (val:string) => {
  if (val.trim() === "") {
    setError({
      ...error,
      panNumber: "Enter Your PAN Number",
    });
  } else {
    setError({
      ...error,
      panNumber: "",
    });
  }
};

const validateState = (val:string) => {
  if (val.trim() === "") {
    setError({
      ...error,
      state: "Enter Your State",
    });
  } else {
    setError({
      ...error,
      state: "",
    });
  }
};

const validateGst = (val:string) => {
  if (val.trim() === "") {
    setError({
      ...error,
      gst: "Enter Your GST Number",
    });
  } else {
    setError({
      ...error,
      gst: "",
    });
  }
};

const validateCity = (val:string) => {
  if (val.trim() === "") {
    setError({
      ...error,
      city: "Enter Your City",
    });
  } else {
    setError({
      ...error,
      city: "",
    });
  }
};


const inputChangeHandler = (val: string, name: string) => {
  const validationFunctions: ValidationFunctions = {
    companyname: validatecompanyname,
    nickname: validatenickname,
    email: validateEmail,
    contactnumber: validateContactnumber,
    country: validateCountry,
    address: validateAddress,
    website: validateWebsite,
    companyLogo: validateCompanyLogo,
    lutId: validateLutId,
    panNumber: validatePanNumber,
    state: validateState,
    gst: validateGst,
    city: validateCity,
  };
  const validateFunction = validationFunctions[name];
  
  if (validateFunction) {
    validateFunction(val);
  }
  setInputData({
    ...inputData,
    [name]: val,
  });
};

useEffect(()=>{
  makeButtonEnable();
 },[inputData]) 


 const submitForm = async (e: React.FormEvent) => {
  e.preventDefault();
  // Initialize useRouter

  try {
    // Step 1: Upload image to Supabase Storage
    let companyImageUrl = "";
    if (inputData.companyLogo) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from('company-logos')
        .upload(`public/${inputData.companyLogo.name}`, inputData.companyLogo);

      if (storageError) {
        throw storageError;
      }

      companyImageUrl = supabase.storage
        .from('company-logos')
        .getPublicUrl(`public/${inputData.companyLogo.name}`).data.publicUrl;
    }

    // Step 2: Add company details to the database
    const { data: companyData, error: companyError } = await supabase
      .from('companylist')
      .insert({
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        company_name: inputData.companyname,
        nick_name: inputData.nickname,
        country: inputData.country,
        address: inputData.address,
        email: inputData.email,
        website: inputData.website,
        contact_number: inputData.contactnumber,
        gst_number: inputData.gst,
        city: inputData.city,
        state: inputData.state,
        pan_number: inputData.panNumber,
        lut_id: inputData.lutId,
        logo_url: companyImageUrl,
      });

    if (companyError) {
      throw companyError;
    }

    // Success notification
    notification.success({
      message: 'Success',
      description: 'Company details submitted successfully!',
    });

    // Redirect to the company page
    router.push('/company');
  } catch (error: any) {
    // Error notification
    notification.error({
      message: 'Error',
      description: error.message || 'An error occurred while submitting the form.',
    });

    console.error('Error inserting data:', error.message);
  }
};

 



const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const newImage = e.target.files[0];
    setInputData(
      {
         ...inputData,
       companyLogo : newImage
      });
    // onChange(newImage);
  }
};



console.log(inputData)

     return(
        <>
         <h4 className="text-base text-gray-800">
                            Add Company
                          </h4>
                          <hr className="my-6" />
                          
                          <form onSubmit={submitForm}>
                            <div className="grid grid-cols-2  justify-top gap-3">

                                <Input
                                   id = ""
                                   name = "companyname"
                                   label = "Company Name"
                                   onChange = {inputChangeHandler}
                                   className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                   placeholder = "Enter Company Name"
                                   required = {true}
                                   type = "text"
                                   value = {inputData['companyname']}
                                   error={error.companyname ? true : false}
                                   helperText={error.companyname}
                                />
                                <Input
                                   id = ""
                                   name = "nickname"
                                   label = "Nick Name"
                                   onChange = {inputChangeHandler}
                                   className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                   placeholder = "Enter Nick Name"
                                   required = {true}
                                   type = "text"
                                   value = {inputData['nickname'] }
                                   error={error.nickname ? true : false}
                                   helperText={error.nickname}
                                />
                              
                                <Input
                                   id = ""
                                   name = "contactnumber"
                                   label = "Contact Number"
                                   onChange = {inputChangeHandler}
                                   className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                   placeholder = "Enter Contact Number"
                                   required = {true}
                                   type = "text"
                                   value = {inputData['contactnumber'] }
                                   error={error.contactnumber ? true : false}
                                   helperText={error.contactnumber}
                                />
                                <Input
                                   id = ""
                                   name = "email"
                                   label = "Email"
                                   onChange = {inputChangeHandler}
                                   className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                   placeholder = "Enter Email"
                                   required = {true}
                                   type = "text"
                                   value = {inputData['email'] }
                                   error={error.email ? true : false}
                                   helperText={error.email}
                                />
                              
                                <Input
                                  id = ""
                                  name = "website"
                                  label = "Website"
                                  onChange = {inputChangeHandler}
                                  className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                  placeholder = "Enter Website"
                                  required = {true}
                                  type = "text"
                                  value = {inputData['website'] }
                                  error={error.website ? true : false}
                                  helperText={error.website}
                                />

                                <Input
                                   id = ""
                                   name = "address"
                                   label = "Address"
                                   onChange = {inputChangeHandler}
                                   className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                   placeholder = "Enter Address"
                                   required = {true}
                                   type = "text"
                                   value = {inputData['address'] }
                                   error={error.address ? true : false}
                                   helperText={error.address}
                                />
                                
                                

                                 <Input
                                  id = ""
                                  name = "gst"
                                  label = "Gst"
                                  onChange = {inputChangeHandler}
                                  className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                  placeholder = "Enter GST Number"
                                  required = {true}
                                  type = "text"
                                  value = {inputData['gst'] }
                                  error={error.gst ? true : false}
                                  helperText={error.gst}
                                />  
                                  <Input
                                  id = ""
                                  name = "city"
                                  label = "City"
                                  onChange = {inputChangeHandler}
                                  className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                  placeholder = "Enter City"
                                  required = {true}
                                  type = "text"
                                  value = {inputData['city'] }
                                  error={error.city ? true : false}
                                  helperText={error.city}
                                />  


                                  <Input
                                  id = ""
                                  name = "state"
                                  label = "State"
                                  onChange = {inputChangeHandler}
                                  className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                  placeholder = "Enter State"
                                  required = {true}
                                  type = "text"
                                  value = {inputData['state'] }
                                  error={error.state ? true : false}
                                  helperText={error.state}
                                />  


                                  {/* <Select
                                  id=""
                                  name="country"
                                  className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                  option= {codes}
                                  onChange={inputChangeHandler}
                                  value ={inputData['country'] }
                                  label ="Select Country"
                                  error={error.country ? true : false}
                                  helperText={error.country}
                                />  */}



                                  <Input
                                  id = ""
                                  name = "panNumber"
                                  label = "Pan Number"
                                  onChange = {inputChangeHandler}
                                  className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                  placeholder = "Enter Pan Number"
                                  required = {true}
                                  type = "text"
                                  value = {inputData['panNumber'] }
                                  error={error.panNumber ? true : false}
                                  helperText={error.panNumber}
                                />  



                                  <Input
                                  id = ""
                                  name = "lutId"
                                  label = "LUT Id"
                                  onChange = {inputChangeHandler}
                                  className = "py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0"
                                  placeholder = "Enter LUT Id"
                                  required = {true}
                                  type = "text"
                                  value = {inputData['lutId'] }
                                  error={error.lutId ? true : false}
                                  helperText={error.lutId}
                                />  

<label>Company Logo</label>
<input
        type="file"
        id="businessImage"
        name="companyLogo"
        onChange={handleFileChange}
        className="border-gray-300 w-full rounded border px-3 py-2 focus:border-primary focus:outline-none"
      />
                              
                            </div>
                            
                            
                            
                            <div className="flex mt-3">
                              <div className="w-full">
                              <Button disabled={btnDisable} text={"Create"} type={"submit"}></Button>
                              </div>
                            </div>
                            
                          </form>
        </>
     );
});

export default CreateCompany;


