'use client';
import React, { ChangeEvent, Fragment } from "react";

interface Option {
    value: string | number | readonly string[] | undefined;
    country: string;
}

interface InputProps {
    id?: string;
    name?: string;
    className?: string;
    option?: Option[];
    value?: string;
    label?: string;
    onChange?: (value: string, name: string) => void;
    helperText?:string;
    error?:boolean;
    required:boolean;
    defaultText:string;
}

const Select: React.FC<InputProps> = ({
    id = "",
    name = "",
    className = "",
    option = [],
    onChange = () => null,
    value = "",
    label = "",
    helperText="",
    error = false,
    required = false,
    defaultText = ""
}) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value, name || "");
    };

    return (
            <div>
                <label>{label}</label>
                <select
                    onChange={handleChange}
                    name={name}
                    className={` focus:ring-blue-500 block w-full shadow-sm sm:text-sm w-full p-2 ${error ? "focus:border-red-500 border-2 bg-red-50 border-red-500" : "border-gray-300"} ${className}`}
                    value={value || ""}
                    required={required}
                >
                    <option>{defaultText}-</option>
                    {option.map((opt, index) => (
                        <option key={index} value={opt.value}>
                            {opt.country}
                        </option>
                    ))}
                </select>
                {helperText && <p className={`mt-2 text-sm text-gray-500 ${error ? "text-red-500" : ""}`}>{helperText}</p>}
            </div>
    );
};

// Export the Select component
export default Select;
