import { createProxyMiddleware } from 'http-proxy-middleware';

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/Utilisateur/Authent',
    createProxyMiddleware({
      target: 'http://192.168.10.5',
      changeOrigin: true,
    })
  );
};
