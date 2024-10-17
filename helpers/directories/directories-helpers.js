const { constants } = require('buffer');
const fs = require('fs').promises;
const path = require('path');


async function navigateDirectories(dirPath) {
    // array para armazenar os diretórios já navegados
    let parsedDirectories = [];

    try {
        // lê os diretórios
        const dirList = await fs.readdir(dirPath);

        // normaliza o caminho no Windows
        dirPath = await fs.realpath(dirPath);

        // verifica se o diretório está vazio
        if (!dirList.length) return parsedDirectories;

        // percorre cada diretório ou arquivo
        for (const file of dirList) {
            const filePath = path.join(dirPath, file);
            
            // informações sobre o arquivo ou diretório
            const stats = await fs.stat(filePath);
            parsedDirectories.push(filePath);

            if (stats.isDirectory()) {
                // recursão para navegar em subdiretórios
                const subDirectories = await navigateDirectories(filePath);
                parsedDirectories = parsedDirectories.concat(subDirectories);
            }

            // monitora o diretório
            fs.watch(filePath, (eventType, filename) => {
                if (filename) {
                    console.log(`Arquivo/diretório alterado: ${filename}, tipo de evento: ${eventType}`);
                }
            });
        }
    } catch (error) {
        console.log("Erro:", error.message);
    }

    return parsedDirectories;
}

module.exports = { navigateDirectories }