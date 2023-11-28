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

function listarMaquinasEmpresa(idEmpresa) {
    var instrucao = `SELECT * FROM maquina WHERE fk_empresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function capturaUltimoValor(idComponente, idTipoDados, idMaquina) {
    var instrucao = `CALL ultimo_valor_captura(${idComponente}, ${idTipoDados}, ${idMaquina});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function graficosComponentes(idComponente, idMaquina, limite) {
    var instrucao = `CALL graficos_especificos(${idComponente}, ${idMaquina}, ${limite});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function infoComponentes(idComponente, idMaquina) {
    var instrucao = `CALL info_componente(${idComponente}, ${idMaquina});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function fecharJanela(pid) {
    var instrucao = `UPDATE janela SET matar = 1 WHERE pid = ${pid}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarJanela(idMaquina) {
    var instrucao = `SELECT * FROM janela WHERE fk_maquina = ${idMaquina} AND stt = 'Aberta';`;
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


function buscarMaquina(idMaquina) {

    var instrucao = `
    SELECT * FROM maquina WHERE idMaquina = ${idMaquina};
 `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function alterar(nome, modelo, numeroSerie, marca, idMaquina) {
    var instrucao = `
       UPDATE maquina SET nome = '${nome}', modelo = '${modelo}', numero_serie = '${numeroSerie}', 
       marca = '${marca}' WHERE idMaquina = ${idMaquina}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarLimite(limite, idNot, idTipoComp) {
    var instrucao = `UPDATE limites SET limite = ${limite} WHERE fk_notificacao = ${idNot} AND fk_tipoComponente = ${idTipoComp};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarLimite(idNot, idTipoComp) {
    var instrucao = `CALL info_limites(${idNot}, ${idTipoComp})`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function notificar(captura, tipoDados, componente, maquina, tipoComponente, tipoNot) {
    var instrucao = `
    INSERT INTO notificacao (data_hora, fk_idCaptura, fk_tipoDados, fk_componente, fk_maquina, fk_tipoComponente, fk_tipoNotificacao) 
    VALUES (now(), ${captura}, ${tipoDados}, ${componente}, ${maquina}, ${tipoComponente}, ${tipoNot});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}


function graficoNotificacoes(){
    var instrucao = `
    SELECT COUNT(*) as total, 
    HOUR(data_hora) as hora, fk_tipoNotificacao as tipoNot
    FROM notificacao 
    GROUP BY hora, tipoNot , data_hora
    ORDER BY data_hora
    LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function graficoSttMaquinas(){
    var instrucao = `
    SELECT count(*) as total, stt_maquina AS stt 
    FROM maquina WHERE fk_empresa = 1 
    GROUP BY stt;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function graficoMaquinasLigadas(){
    var instrucao = `
    SELECT count(*) as total, ligada 
    FROM maquina WHERE fk_empresa = 1 
    GROUP BY ligada;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function alterarStatusMaquina(idMaquina, status){
    var instrucao = `
    UPDATE maquina SET stt_maquina = '${status}' WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarMaquinaLigada(idMaquina, ligada){
    var instrucao = `
    UPDATE maquina SET ligada = '${ligada}' WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrar,
    alterar,
    listar,
    deletar,
    capturaUltimoValor,
    graficosComponentes,
    buscarMaquina,
    infoComponentes,
    listarJanela,
    fecharJanela,
    alterarLimite,
    notificar,
    buscarLimite,
    listarMaquinasEmpresa,
    graficoNotificacoes,
    graficoMaquinasLigadas,
    graficoSttMaquinas,
    alterarStatusMaquina,
    alterarMaquinaLigada
};