/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://xkkvezpwqxcvblgfudah.supabase.co/**')], 
      },
    // output: "export"
};


export default nextConfig;
