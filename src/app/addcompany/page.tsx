"use client"
import { Navbar } from "@/components";
import CreateCompany from "@/components/Organism/CreateCompany";
import React from "react";

const CreateCompanyPage = (()=>{
    return(
        <>
        <Navbar/>
        <div className="container w-10/12 mt-20">
        <h1 className="text-center text-2xl">Add Company</h1>
        <CreateCompany></CreateCompany>
        </div>
        </>
    )
});

export default CreateCompanyPage;