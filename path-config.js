const Path = require('path');
const FS = require('fs');
const ComponentsDir = "./src/components";

const Components = []

FS.readdirSync(ComponentsDir).forEach(file => {
  let foldername = Path.join(ComponentsDir, file);
  let stats = FS.statSync( foldername );
  if ( stats.isDirectory() ) {
    Components.push( file );
  }
});

module.exports = {
  "src": "src/",
  "public": "build/",
  // "sass": "src/components/**/*.scss",
  // "css": "build/stylesheets/",
  "js": "src/javascripts/",
  "data": "src/data/",
  "ComponentsDir": ComponentsDir,
  "Components": Components
}
