module.exports = {
  pwa: {
    serviceWorker: false,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './app/sw.js', /* Empty file. */
    },
  },
};
