var usuarioModel = require("../models/maquinaModel");


function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var modelo = req.body.modeloServer;
    var numeroSerie = req.body.numeroSerieServer;
    var marca = req.body.marcaServer;
    var idEmpresa = req.body.idEmpresaServer;
    var idSala = req.body.idSalaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (numeroSerie == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (numeroSerie == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, modelo, numeroSerie, marca, idEmpresa, idSala)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar,
    listarPorSala,
    alterar,
    deletar
}