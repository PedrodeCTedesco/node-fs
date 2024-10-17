// main.js
const { multipleWaysOfWrite } = require('./helpers/helpers');

const args = process.argv;
console.log("Argumentos do contexto de execução do Node:", args); 

const newFile = "Arquivo escrito";
const content = "Uma manhã andei pelo bosque e ouvi uma melodia. Ela era linda, e me lembrei de você.";
// passando o path do diretório atual
multipleWaysOfWrite(newFile, content);