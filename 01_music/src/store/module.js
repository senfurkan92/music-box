import camelCase from 'lodash/camelCase';

const requireModule = require.context(
  '.', false, /\.js$/,
);

const modules = {};

requireModule.keys().forEach((filename) => {
  if (filename === './module.js' || filename === './index.js') {
    return;
  }

  const moduleConfig = requireModule(filename);
  const moduleName = camelCase(filename.replace(/(\.\/|\.js)/g, ''));
  modules[moduleName] = moduleConfig.default || module.config;
});

export default modules;
