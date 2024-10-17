const fs = require('fs');
const path = require('path');

// Função para leitura simples de arquivo
async function writeFile(newFile, content) {
    fs.writeFile(newFile, content, (err) => {
        if(err) return console.error("Erro ao escrever o arquivo: ", err);
    });
};

async function writeFileStreamMode(newFile) {
    const writeStream = fs.createWriteStream(newFile);

    writeStream.on('data', (content) => {
        console.log("Escrevendo (stream)...");
        console.log("Escrita: ", content);
    });

    writeStream.on('error', (err) => {
        console.log("Erro durante a escrita do arquivo (stream): ", err);
    })
};

async function appendFiles(newFile, content) {
    fs.appendFile(newFile, content, (err) => {
        if(err) return console.error("Erro em appendFile: ", err);
        console.log("Append!");
    });
};

module.exports = { writeFile, writeFileStreamMode, appendFiles };
