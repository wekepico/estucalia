'use client';

import React from 'react';

export default function CompanyInfo() {
  return (
    <section className=" min-h-[300px] flex items-center bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h2 className="text-xl font-medium mb-4">Grupo Estucalia</h2>
        </div>
        <p className="text-3xl font-bold text-gray-800 max-w-2xl mx-auto">
          Más de 25 años fabricando morteros y cementos
        </p>
      </div>
    </section>
  );
}