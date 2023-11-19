var database = require("../database/config")

function cadastrar(nome, modelo, numeroSerie, marca, idEmpresa, idSala) {
    var instrucao = `
    INSERT INTO maquina (nome, modelo, numero_serie, marca, fk_empresa, fk_sala)
	    VALUE("${nome}", "${modelo}", "${numeroSerie}", "${marca}", ${idEmpresa}, ${idSala});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idSala) {
    var instrucao = `CALL procedure_maquina(${idSala});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function capturaUltimoValor(idComponente, idTipoDados, idMaquina){
    var instrucao = `CALL ultimo_valor_captura(${idComponente}, ${idTipoDados}, ${idMaquina});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function deletar(idMaquina) {

    var instrucao = `
       DELETE FROM maquina WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function alterar(nome, modelo, numeroSerie, marca, idMaquina) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
       UPDATE maquina SET nome = '${nome}', modelo = '${modelo}', numero_serie = '${numeroSerie}', 
       marca = '${marca}' WHERE idMaquina = ${idMaquina}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar, 
    alterar, 
    listar, 
    deletar,
    capturaUltimoValor
};