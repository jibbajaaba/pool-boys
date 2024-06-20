import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'slick-carousel': 'slick-carousel',
        },
    },
    server: {
        host: true,
        strictPort: true,
        watch: {
            usePolling: true,
        },
    },
});
