'use client';

import React from 'react';

export default function CompanyInfo() {
  return (
    <section className="py-20 min-h-[380px] flex items-center bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-8">Grupo Estucalia</h2>
        </div>
        <p className="text-2xl font-bold text-gray-800 max-w-2xl mx-auto">
          Más de 25 años fabricando morteros y cementos
        </p>
      </div>
    </section>
  );
}