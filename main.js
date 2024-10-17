// main.js
const { multiplePaths } = require('./helpers/helpers');

const args = process.argv;
console.log("Argumentos do contexto de execução do Node:", args); 

const dir = "C:\\Users\\lojaa\\OneDrive\\Área de Trabalho\\Senhas-20241007T203437Z-001\\Senhas"

// passando o path do diretório atual
multiplePaths([__dirname, dir]);