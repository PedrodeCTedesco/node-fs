# FS

O módulo fs do Node implementa wrappers ao redor de comandos comuns do POSIX.

- a: ```readdir()``` --> permite a leitura de um diretório. Na função assíncrona temos a opção de uma função **callback** que contém as informações do diretório e um argumento de erro caso algum erro ocorra durante a execução do processo. O comando POSIX é *readdir*. 

- b ```realpath()``` --> essa função retorna o nome absoluto do *path*.

- c ```stat()``` --> utilizada para obtermos mais informações sobre os arquivos presentes no diretório.