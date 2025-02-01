import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // eslint-disable-next-line unicorn/prefer-module
            '~': path.join(__dirname, './src')
        }
    },
    // 开发环境端口
    server: {
        host: '0.0.0.0',
        port: 3040
    }
})
