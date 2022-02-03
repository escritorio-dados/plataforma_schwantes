const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,

    alias: {
      ...config.alias,
      '#config': path.resolve(__dirname, 'src/config'),
      '#shared': path.resolve(__dirname, 'src/shared'),
      '#modules': path.resolve(__dirname, 'src/modules'),
      '#static': path.resolve(__dirname, 'src/static'),
    },
  };

  return config;
};
