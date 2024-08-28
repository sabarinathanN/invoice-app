"use client"
import { Navbar } from '@/components';
import ViewClient from '@/components/Organism/ViewClient';
import React from 'react';

const Client = (()=>{
    return (
        <>
        <Navbar/>
        <div className="container w-10/12 mt-20">
        <h1 className="text-center text-2xl">Client Listing</h1>
            <ViewClient/>
        </div>
        </>
    )
});

export default Client;