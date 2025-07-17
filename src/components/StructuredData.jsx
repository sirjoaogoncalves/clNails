import React from 'react';

const StructuredData = ({ type = 'website', data = {} }) => {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      name: 'CL Designer',
      description: 'Professional nail art and design services specializing in gel manicures, nail art, pedicures, and custom nail designs.',
      url: 'https://cl-designer.vercel.app',
      image: 'https://cl-designer.vercel.app/cl_designer_branco.png',
      ...data
    };
    return baseData;
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData())
      }}
    />
  );
};

export default StructuredData;
