
const { writeFile, writeFileStreamMode, appendFiles } = require('./files/files-helpers');

// múltiplos paths
function multipleWaysOfWrite(newFile, content) {    
    writeFile(newFile, content)
    writeFileStreamMode(newFile, content)
    appendFiles(newFile, content);
}

module.exports = { multipleWaysOfWrite };
