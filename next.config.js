const { default: dynamic } = require('next/dynamic')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
    }
  }
}

module.exports = nextConfig
