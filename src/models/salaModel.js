var database = require("../database/config")

function cadastrar(nome, localizacao, idUsuario, idEmpresa) {
    var instrucao = `
    INSERT INTO sala_de_aula (nome, localizacao, fk_usuario, fk_empresa)
	    VALUES('${nome}', '${localizacao}', ${idUsuario}, ${idEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idEmpresa) {
    var instrucao = `SELECT nome, idSala, localizacao FROM sala_de_aula WHERE fk_empresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfoMaquinas(idSala) {
    var instrucao = `
    SELECT sala_de_aula.nome as nomeSala, 
    (select count(*) from maquina where fk_sala = ${idSala}) AS totalMaquina, 
    (select count(*) from maquina where fk_sala = ${idSala} AND ligada = 'S') AS maquinasLigadas,
    (select count(*) from maquina where fk_sala = ${idSala} AND ligada = 'N') AS maquinasDesligadas
    FROM sala_de_aula WHERE idSala = ${idSala};`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function deletar(idSala) {
    var instrucao = `
       DELETE FROM sala_de_aula WHERE idSala = ${idSala};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function alterar(nome, localizacao, idSala) {
   
    var instrucao = `
       UPDATE sala_de_aula SET nome = '${nome}', localizacao = '${localizacao}' WHERE idSala = ${idSala}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar, 
    alterar, 
    listar, 
    deletar,
    buscarInfoMaquinas
};