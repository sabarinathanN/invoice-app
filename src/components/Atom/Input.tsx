'use client';
import React, { Fragment, ChangeEvent, useState } from "react";

interface InputProps {
    id?:string,
    name?:string,
    label?:string,
    onChange?: (value: string, name: string) => void,
    onBlur?: () => void,
    fullWidth?:boolean,
    className?:string,
    placeholder?:string,
    required?:boolean,
    type?:string,
    value?:any,
    error?:boolean,
    helperText?:string
}

const Input: React.FC<InputProps> = ((
{
  id = "",
  name = "",
  label = "",
  onChange = () => null,
  onBlur = () => null,
  className = "",
  placeholder = "",
  required = false,
  type = "",
  value = null,
  error = false,
  helperText =""
}
)=>{

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value, name);
      };

    return(
      
        <div>
        <label>{label}</label>
       <input 
       id ={id}
       name = {name}
       className={` focus:ring-blue-500 block w-full shadow-sm sm:text-sm w-full p-2 ${error ? "focus:border-red-500 border-2 bg-red-50 border-red-500" : "border-gray-300"} ${className}`}
       onChange={handleChange}
       required ={required}
       placeholder= {placeholder}
       type={type}
       value={value}
       />
        {helperText && <p className={`mt-2 text-sm text-gray-500 ${error ? "text-red-500" : ""}`}>{helperText}</p>}
       </div>
       
    );
});

export default Input;