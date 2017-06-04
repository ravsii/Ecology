const listFiles = require('recursive-readdir-sync');
const path = require('path');
const routesPath = path.join(__dirname, 'routes');

var mount = function(app) {
  listFiles(routesPath).forEach((file) => {
    const rpath = '/' + path.relative(routesPath, file).replace('\\', '/');
    const temp_route = require(file);
    const mountpoint = (temp_route.URL) ? temp_route.URL : (rpath.substr(0, rpath.lastIndexOf('.')) || rpath);
    console.log(`Mounting ${rpath} on ${mountpoint}`);
    app.use(mountpoint, temp_route);
  });
}

module.exports = mount;