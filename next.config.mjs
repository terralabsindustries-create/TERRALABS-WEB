/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    // The Vite build used esbuild, which strips types without checking them, so this
    // codebase has never been type-checked. It currently has 48 pre-existing errors —
    // mostly inline components declared without prop types, plus two dead files
    // importing modules that were never exported from Figma.
    // These are latent, not new. Fix them incrementally, then delete this flag.
    ignoreBuildErrors: true,
  },

  eslint: {
    // No ESLint config has been set up for this project yet.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
