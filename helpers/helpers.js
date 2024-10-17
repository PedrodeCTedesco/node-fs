
const { navigateDirectories } = require('./directories/directories-helpers');

// múltiplos paths
function multiplePaths(paths) {
    console.log("Argumentos no método multiplePaths: ", paths);
    
    // Pass the paths array to fs.realpath and fs.stat
    paths.forEach(path => {
        navigateDirectories(path)
            .then((result) => console.log('Diretórios e arquivos navegados:', result))
            .catch((err) => console.error('Erro na navegação:', err));
    });
}

module.exports = { multiplePaths };
