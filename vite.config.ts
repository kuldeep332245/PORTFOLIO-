import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'flat-path-resolver',
        resolveId(source) {
          if (source === '/src/main.tsx' || source === './src/main.tsx') {
            return path.resolve(__dirname, 'main.tsx');
          }
          if (source.startsWith('./components/')) {
            const file = source.replace('./components/', '');
            return path.resolve(__dirname, file.endsWith('.tsx') ? file : file + '.tsx');
          }
          if (source.includes('portfolioData')) {
            return path.resolve(__dirname, 'portfolioData.ts');
          }
          if (source.includes('generateResumePdf')) {
            return path.resolve(__dirname, 'generateResumePdf.ts');
          }
          if (source.includes('portfolio')) {
            return path.resolve(__dirname, 'portfolio.ts');
          }
          return null;
        }
      }
    ],
  };
});
