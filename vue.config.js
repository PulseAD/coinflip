module.exports = {
  pwa: {
    manifestPath: 'manifest.json',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'service-worker.js',
      // ...other Workbox options...
      exclude: [/_redirects/],
    },
  },
};
