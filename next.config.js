/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
    NEXT_PUBLIC_NODE_URL: process.env.NEXT_PUBLIC_NODE_URL,
    NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY,
      NEXT_PUBLIC_VERIFY_API:process.env.NEXT_PUBLIC_VERIFY_API
  },
};

module.exports = nextConfig;
