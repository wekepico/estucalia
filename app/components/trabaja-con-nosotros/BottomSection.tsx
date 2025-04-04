'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import React from 'react';

export default function BottomSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[60vh] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
        </div>
      </div>
    </section>
  );
}