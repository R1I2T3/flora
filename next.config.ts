import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["uploadthing.com", "utfs.io", "subdomain", "files.stripe.com"],
  },
};

export default nextConfig;
