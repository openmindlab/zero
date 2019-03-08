const Path = require('path');
const FS = require('fs');

const ComponentsDir = './src/components';

const Components = [];

FS.readdirSync(ComponentsDir).forEach((file) => {
  const foldername = Path.join(ComponentsDir, file);
  const stats = FS.statSync(foldername);
  if (stats.isDirectory()) {
    Components.push(file);
  }
});

module.exports = {
  src: 'src/',
  public: 'build/',
  js: 'src/javascripts/',
  data: 'src/data/',
  ComponentsDir,
  Components,
};
