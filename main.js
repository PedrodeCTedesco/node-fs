// main.js
const { multipleWaysOfRead } = require('./helpers/helpers');

const args = process.argv;
console.log("Argumentos do contexto de execução do Node:", args); 

const file = "c:/Users/lojaa/Downloads/exemplo.txt";

// passando o path do diretório atual
multipleWaysOfRead([file]);