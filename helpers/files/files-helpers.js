const fs = require('fs');
const path = require('path');

// Função para leitura simples de arquivo
async function readFile(file) {
    // tenta ler diretamente o arquivo (abordagem recomendada)
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler arquivo: ", err);
            return;
        }
        // Inicia a medição com hrtime
        const start = process.hrtime();
        // recupera informações do arquivo
        fs.stat(file, (err, info) => {
            if(err) return console.error("Erro ao obter informações do arquivo: ", err);
            console.log(`Tamanho do arquivo: ${info.size} bytes`);
        });
        console.log("Dados do arquivo (sem buffer): ", data);
        // Finaliza a medição do tempo
        const end = process.hrtime(start);
        const durationInSeconds = (end[0] + end[1] / 1e9).toFixed(4);  // Converte para segundos
        console.log(`Tempo de execução: ${durationInSeconds} segundos (arquivo sem buffer)`);
    });
}

async function readFileWithBuffer(file) {
    // tenta ler diretamente o arquivo (abordagem recomendada)
    fs.readFile(file, (err, data) => {
        if (err) {
            console.error("Erro ao ler arquivo: ", err);
            return;
        }
        // Inicia a medição com hrtime
        const start = process.hrtime();
        // recupera informações do arquivo
        fs.stat(file, (err, info) => {
            if(err) return console.error("Erro ao obter informações do arquivo: ", err);
            console.log(`Tamanho do arquivo: ${info.size} bytes`);
        });
        console.log("Dados do arquivo (com buffer): ", data);
        // Exibe o tamanho do buffer
        console.log(`Tamanho do buffer (data.length, com buffer): ${data.length} bytes`);
        console.log("Dados do arquivo (com buffer): ", data.toString()); // Converte o buffer em string para exibir o conteúdo
        // Finaliza a medição do tempo
        const end = process.hrtime(start);
        const durationInSeconds = (end[0] + end[1] / 1e9).toFixed(4);  // Converte para segundos
        console.log(`Tempo de execução (com buffer): ${durationInSeconds} segundos`);
    });
}

async function readFileStreamMode(file) {
    const readStream = fs.createReadStream(file, { flag: 'r', encoding: 'utf8' });
    // Inicia a medição com hrtime
    const start = process.hrtime();
    // Tratamento de erro ao abrir o arquivo em stream
    readStream.on('error', (err) => {
        console.error("Erro ao abrir o arquivo em stream: ", err);
    });

    // Leitura dos dados em stream
    readStream.on('data', (data) => {
        // recupera informações do arquivo
        fs.stat(file, (err, info) => {
            if(err) return console.error("Erro ao obter informações do arquivo: ", err);
            console.log(`Tamanho do arquivo: ${info.size} bytes`);
        });
        console.log("Dados da stream: ", data);
        // Finaliza a medição do tempo
        const end = process.hrtime(start);
        const durationInSeconds = (end[0] + end[1] / 1e9).toFixed(4);  // Converte para segundos
        console.log(`Tempo de execução (stream): ${durationInSeconds} segundos`);
    });
}

async function readFileStreamModeWithBuffer(file) {
    const readStream = fs.createReadStream(file, { flag: 'r', encoding: 'utf8' });
    let totalBufferLength = 0; // Para acumular o tamanho do buffer conforme os dados chegam
    // Inicia a medição com hrtime
    const start = process.hrtime();
    // Tratamento de erro ao abrir o arquivo em stream
    readStream.on('error', (err) => {
        console.error("Erro ao abrir o arquivo em stream: ", err);
    });

    // Leitura dos dados em stream
    readStream.on('data', (chunk) => {
        totalBufferLength += chunk.length; // Acumula o tamanho de cada chunk
        console.log(`Dados da stream (chunk): ${chunk.toString()}`); // Exibe os dados lidos

        // Exibe o tamanho do buffer do chunk lido
        console.log(`Tamanho do buffer do chunk: ${chunk.length} bytes`);
    });

    readStream.on('end', () => {
        // recupera informações do arquivo
        fs.stat(file, (err, stats) => {
            if(err) return console.error("Erro ao obter informações do arquivo: ", err);
            console.log(`Tamanho do arquivo (stats.size): ${stats.size} bytes`);
        });

        // Exibe o tamanho total acumulado dos buffers
        console.log(`Tamanho total dos buffers (stream): ${totalBufferLength} bytes`);

        // Finaliza a medição do tempo
        const end = process.hrtime(start);
        const durationInSeconds = (end[0] + end[1] / 1e9).toFixed(4);  // Converte para segundos
        console.log(`Tempo de execução (stream): ${durationInSeconds} segundos`);
    });
}

module.exports = { readFile, readFileWithBuffer, readFileStreamModeWithBuffer, readFileStreamMode };
