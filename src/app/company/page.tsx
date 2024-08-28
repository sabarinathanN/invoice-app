"use client"
import { Navbar } from '@/components';
import ViewCompany from '@/components/Organism/ViewCompany';
import React from 'react';

const Company = (()=>{
    return (
        <>
        <Navbar/>
        <div className="container w-10/12 mt-20">
        
        <h1 className="text-center text-2xl">Company Listing</h1>
            <ViewCompany/>
        </div>
        </>
    )
});

export default Company;