var database = require("../database/config")

function cadastrar(nome, modelo, numeroSerie, marca, idEmpresa, idSala) {
    var instrucao = `
    INSERT INTO maquina (nome, modelo, numero_serie, marca, fk_empresa, fk_sala)
	    VALUE('${nome}', '${modelo}', '${numeroSerie}', '${marca}', ${idEmpresa}, ${idSala});
    `;
    console.log('Executando a instrução SQL: \n' + instrucao);
    return database.executar(instrucao);
}

function listar(idSala) {
    var instrucao = ` SELECT * FROM maquina WHERE fk_sala = ${idSala};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinasEmpresa(idEmpresa) {
    var instrucao = `SELECT * FROM maquina WHERE fk_empresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function capturaUltimoValor(idComponente, idTipoDados, idMaquina) {
    var instrucao = `
    SELECT c.nome as componente, td.nome as dadoCapturado, dt_hora, valor_monitorado as valor   
	FROM captura_dados  AS cd JOIN tipo_componente AS c ON c.idTipoComponente = cd.fk_componente
	JOIN  tipo_dados AS td ON td.idTipoDados = cd.fk_tipoDados
	WHERE fk_tipoComponente = ${idComponente} AND fk_maquina = ${idTipoDados} AND fk_tipoDados = ${idMaquina} ORDER BY dt_hora DESC 
	LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function graficosComponentes(idComponente, idMaquina, limite) {
    var instrucao = `SELECT * FROM captura_dados 
    WHERE fk_maquina = ${idMaquina} AND fk_tipoComponente = ${idComponente} 
    ORDER BY dt_hora DESC 
    OFFSET 0 ROWS
    FETCH NEXT ${limite} ROWS ONLY;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function infoComponentes(idComponente, idMaquina) {
    var instrucao = `select * from componente WHERE fk_maquina = ${idMaquina} AND fk_tipoComponente = ${idComponente};`;
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
    var instrucao = `UPDATE limites SET limite = ${limite} WHERE fk_alerta = ${idNot} AND fk_tipoComponente = ${idTipoComp};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarLimite(idNot, idTipoComp) {
    var instrucao = `SELECT limite FROM limites WHERE fk_alerta = ${idNot} AND fk_tipoComponente = ${idTipoComp};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function notificar(tipoAlerta, idMaquina) {
    var instrucao = `
     INSERT INTO alerta (data_hora, fk_tipoAlerta, fk_maquina) VALUES (GETDATE(), ${tipoAlerta}, ${idMaquina});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}


function verificarSeExisteAlerta(tipoAlerta, idMaquina) {
    var instrucao = `
    SELECT * FROM alerta WHERE fk_maquina = ${idMaquina} AND fk_tipoAlerta = ${tipoAlerta};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}


function graficoNotificacoes(){
    var instrucao = `
    SELECT
    DATEPART(HOUR, data_hora) AS hora,
    (SELECT COUNT(*) FROM alerta WHERE fk_tipoAlerta = 1 AND DATEPART(HOUR, data_hora) = DATEPART(HOUR, a.data_hora)) AS totalAviso,
    (SELECT COUNT(*) FROM alerta WHERE fk_tipoAlerta = 2 AND DATEPART(HOUR, data_hora) = DATEPART(HOUR, a.data_hora)) AS totalUrgente
FROM alerta a
GROUP BY DATEPART(HOUR, data_hora)
ORDER BY DATEPART(HOUR, data_hora)
OFFSET 0 ROWS
FETCH NEXT 10 ROWS ONLY;

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function graficoSttMaquinas(){
    var instrucao = `
    SELECT COUNT(*) AS total, stt_maquina AS stt 
FROM maquina 
WHERE fk_empresa = 1 
GROUP BY stt_maquina;
    
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

function buscarNotificacoes(idEmpresa) {
    var instrucao = `SELECT m.stt_maquina as stt, m.nome as maquina, s.nome as sala, a.verificar as verificado FROM 
    alerta AS a JOIN maquina AS m ON m.idMaquina = a.fk_maquina
    JOIN sala_de_aula AS s ON m.fk_sala = s.idSala WHERE m.fk_empresa = 1;`;
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
    alterarMaquinaLigada,
    buscarNotificacoes,
    verificarSeExisteAlerta
};