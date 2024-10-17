const { constants } = require('buffer');
const fs = require('fs');
const path = require('path');

let dirExists = false;

async function navigateDirectories(dirPath) {
    try {
        fs.readdir(dirPath, (err, files) => {
            if(err)
                return console.error("Erro ao ler diretório ou arquivo: ", err);

            // itera sobre cada item do diretório
            files.forEach(file => {
                const filePath = path.join(dirPath, file);
                // obtém informações sobre o arquivo ou diretório
                fs.stat(filePath, (err, stats) => {
                    if(err)
                        return console.error("Erro ao obter informações: ", err);

                    if(stats.isDirectory()) {
                        console.log(`Acessando diretório ${filePath}`);
                        navigateDirectories(filePath);
                    }

                    if(stats.isFile()) {
                        console.log(`Informações do arquivo:
                            \nNome: ${filePath}
                            \nTamanho: ${stats.size} bytes
                            \nÚltimo acesso: ${stats.atime}
                            \nÚltima modificação: ${stats.mtime}
                            \nCriado em: ${stats.birthtime}`);
                    }
                });
            });
        });

    } catch(error) {
        console.log(error.message);
    }
}

// manipulação de diretórios

function handleError(err) {
    console.log("Erro ao criar diretório: ", err);

    if (err.code === 'EEXIST') {
        console.log("Diretório já existe");
    } else if (err.code === 'ENOENT') {
        console.log("Caminho inexistente: ", err.path);
    } else {
        console.log("Ocorreu um erro ao criar o diretório.");
    }
}

function handleRmError(err) {
    console.log(err);
    if(err.code === 'ENOENT')
        console.log('O diretório não existe')
    else if(err.code === 'ENOEMPTY')
        console.log('Não é permitido remover um diretório que não está vazio')
    else
        console.log('Um erro aconteceu durante a remoção do diretório');
}

async function createDirectories(dirPath) {
    let existDirectory = false;
    try {

        // confere se o diretório existe
        fs.access(dirPath, constants.F_OK, (err) => {
            if(err) 
                console.error("Erro: ", err);

            console.log(`Diretório já existe: ${dirPath}`);
            dirPath = getUniqueDirName(dirPath);
            existDirectory = true;
        });

        if(!existDirectory) {
            fs.mkdir(dirPath, { recursive: true }, (err) => {
                if (err) handleError(err);
                else console.log(`Diretório criado: ${dirPath}`);
            });
        }
    } catch (err) {
        handleError(err);
    }
}

async function removeDirectories(dirPath) {
    let directoryRemoved = false;
    try {
        fs.rmdir(dirPath, (err) => {
            if(err) handleRmError(err);
        });
    } catch(err) {
        handleRmError(err);
    }
}

module.exports = { navigateDirectories, createDirectories, removeDirectories }