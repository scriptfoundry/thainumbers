import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	base: './',
	plugins: [
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: [
				'favicon.ico',
			],
			manifest: {
				name: 'Thai Numbers',
				short_name: 'Numbers',
				description:
					'Learn to understand Thai numbers when spoken',
				theme_color: '#0066cc',
				icons: [
					{
						src: 'icon_192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icon_512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
});
