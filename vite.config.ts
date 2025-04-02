import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	define: {
		'process.env.VITE_PAYPAL_CLIENT_ID': JSON.stringify(
			process.env.VITE_PAYPAL_CLIENT_ID,
		),
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
});
