import React from 'react';

export default function MapSection() {
  return (
    <section className="bg-[#F5F5F5]">
      <div className="w-full">
          {/* Map */}
          <div className="h-[500px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.8554454554455!2d-1.0547893!3d38.0547892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63875b8b8b8b8b%3A0x1d1d1d1d1d1d1d1d!2sGrupo%20Estucalia!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="shadow-sm"
            />
        </div>
      </div>
    </section>
  );
}