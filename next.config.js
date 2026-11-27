/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined,
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // /categories es la ruta principal; /producto y los nombres antiguos redirigen.
  async redirects() {
    return [
      { source: "/producto/limeMortar", destination: "/categories/mortero-de-cal", statusCode: 301 },
      { source: "/categories/limeMortar", destination: "/categories/mortero-de-cal", statusCode: 301 },
      { source: "/producto/lime-mortar", destination: "/categories/mortero-de-cal", statusCode: 301 },
      { source: "/categories/lime-mortar", destination: "/categories/mortero-de-cal", statusCode: 301 },
      { source: "/producto/tileAdhesive", destination: "/categories/tile-adhesive", statusCode: 301 },
      { source: "/categories/tileAdhesive", destination: "/categories/tile-adhesive", statusCode: 301 },
      { source: "/producto/singleLayerMortar", destination: "/categories/single-layer-mortar", statusCode: 301 },
      { source: "/categories/singleLayerMortar", destination: "/categories/single-layer-mortar", statusCode: 301 },
      { source: "/producto/stampedMortar", destination: "/categories/stamped-mortar", statusCode: 301 },
      { source: "/categories/stampedMortar", destination: "/categories/stamped-mortar", statusCode: 301 },
      { source: "/producto/groutMortar", destination: "/categories/grout-mortar", statusCode: 301 },
      { source: "/categories/groutMortar", destination: "/categories/grout-mortar", statusCode: 301 },
      { source: "/producto/accessoriesAndTools", destination: "/categories/talisman-tools", statusCode: 301 },
      { source: "/categories/accessoriesAndTools", destination: "/categories/talisman-tools", statusCode: 301 },
      { source: "/producto/stoneMortar", destination: "/categories/decorative-stone-mortar", statusCode: 301 },
      { source: "/categories/stoneMortar", destination: "/categories/decorative-stone-mortar", statusCode: 301 },
      { source: "/producto/waterProtector", destination: "/categories/water-protector", statusCode: 301 },
      { source: "/categories/waterProtector", destination: "/categories/water-protector", statusCode: 301 },
      { source: "/producto/bondingBridge", destination: "/categories/bonding-bridge", statusCode: 301 },
      { source: "/categories/bondingBridge", destination: "/categories/bonding-bridge", statusCode: 301 },
      { source: "/producto/:slug", destination: "/categories/:slug", statusCode: 301 },
      { source: "/profesionales", destination: "/profesionales/constructores-arquitectos", permanent: false },
    ];
  },
};

module.exports = nextConfig;
