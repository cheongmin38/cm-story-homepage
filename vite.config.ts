
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // 청크 크기 경고 제한을 1000kb로 상향 (대형 라이브러리 사용 시 권장)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 대형 라이브러리들을 별도의 파일로 분리하여 메인 청크 크기 감소
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'vendor-three';
            }
            if (id.includes('@google/genai')) {
              return 'vendor-genai';
            }
            if (id.includes('react')) {
              return 'vendor-react';
            }
            return 'vendor-others';
          }
        },
      },
    },
  },
});
