import React from 'react';
import Image from 'next/image';
import landingBannerImage from '../images/invoic-landing-banner.jpg';
import Link from 'next/link';

const Home = () => {
  return (
    <div className=' m-auto mt-20' style={{ height: '90vh', position: 'relative' }}>
      <div className='banner-wrapper' style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
        <Image 
          src={landingBannerImage} 
          alt='Landing banner' 
          layout='fill' 
          objectFit='cover' 
          style={{ filter: 'brightness(0.5)' }}
        />
        <div className='banner-content' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>Welcome To Invoice Application</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            Simplify your invoicing process with our easy-to-use application. Create, manage, and track invoices effortlessly.
          </p>
          <p style={{ fontSize: '1rem', fontWeight: 'lighter' }}>
            Developed by IThots
          </p>
          <div className='mt-5'>
          <Link className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}
           href={"/createinvoice"}>Create Invoice</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
