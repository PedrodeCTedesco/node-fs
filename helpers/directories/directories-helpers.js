const fs = require('fs');
const path = require('path');

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

module.exports = { navigateDirectories }