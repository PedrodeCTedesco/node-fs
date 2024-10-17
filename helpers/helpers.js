const fs = require('fs');
const { createDirectories, navigateDirectories, removeDirectories } = require('./directories/directories-helpers');

// Função que lista os conteúdos do diretório (assíncrona)
function dirContents(err, contents) {
    if (err) {
        console.error('Erro ao ler o diretório:', err);
        return;
    }

    if (contents.length === 0) {
        console.log("O diretório está vazio ou não foi possível listar os arquivos.");
    } else {
        console.log("Conteúdo do diretório: ");
        contents.forEach(content => {
            console.log(content);
        });
    }
}

// Função para realpath
function getPath(err, path) {
    if (err) {
        console.error('Erro ao obter o caminho real:', err);
        return;
    }
    console.log("Caminho absoluto: " + path);
}

// múltiplos paths
function multiplePaths(paths) {
    console.log("Argumentos no método multiplePaths: ", paths);
    
    // Pass the paths array to fs.realpath and fs.stat
    paths.forEach(path => {
        //createDirectories(path); //--> para criar um diretório
        //removeDirectories(path); // --> para remover um diretório
        navigateDirectories(path);
    });
}

module.exports = { getPath, multiplePaths };
