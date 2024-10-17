
const {  readFile, readFileStreamMode, readFileWithBuffer, readFileStreamModeWithBuffer } = require('./files/files-helpers');

// múltiplos paths
function multipleWaysOfRead(paths) {    
    // Pass the paths array to fs.realpath and fs.stat
    paths.forEach(path => {
        readFile(path);
        readFileWithBuffer(path);
        readFileStreamMode(path);
        readFileStreamModeWithBuffer(path);
    });
}

module.exports = { multipleWaysOfRead };
