import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: [
			'ik.imagekit.io',
			'realty-app-admin.vercel.app',
			'localhost::3000',
			'localhost',
		],
	},
}

export default nextConfig;
