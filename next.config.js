require('dotenv').config()
/** @type {import('next').NextConfig} */
const nextConfig = {
    // ⇩の1行を追加
    output: 'standalone',
    env: {
        // Reference a variable that was defined in the .env file and make it available at Build Time
        API_ENDPOINT: process.env.API_ENDPOINT,
      },
}

module.exports = nextConfig
