export default {
  server: {
    proxy: {
      '/api/': {
        target: 'https://rucafe-crud.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\//, '')
      }
    }
  }
}
