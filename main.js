// main.js
const { multiplePaths } = require('./helpers/helpers');

const args = process.argv;
console.log("Argumentos do contexto de execução do Node:", args); 

const dir = "C:/Users/lojaa/Downloads/agostosetembro HERMANAS/diretorio" // alterar o caminho final de 'diretorio' para qualquer outro nome 

// passando o path do diretório atual
multiplePaths([dir]);