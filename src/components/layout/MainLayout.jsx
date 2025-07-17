import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import StructuredData from '../StructuredData';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData type="LocalBusiness" />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
