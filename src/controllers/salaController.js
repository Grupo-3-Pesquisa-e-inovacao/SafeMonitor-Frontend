const { response } = require("express");
var salaModel = require("../models/salaModel")

function cadastrar(req, res) {
   
    var nome = req.body.nomeServer;
    var localizacao = req.body.localizacaoServer;
    var idUsuario = req.body.usuarioServer;
    var idEmpresa = req.body.empresaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome da sala está undefined!");
    } else if (localizacao == undefined) {
        res.status(400).send("A localização está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O usuário está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("A empresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        salaModel.cadastrar(nome, localizacao, idUsuario, idEmpresa)
        .then(
            function (resultado) {
                console.log("FUNCIONOU")
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        
        );

    }
}

function alterar(req, res) {
   
    var nome = req.body.nomeServer;
    var localizacao = req.body.localizacaoServer;
    var idSala =  req.params.idSala;

    salaModel.alterar(nome, localizacao, idSala)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    )
    .catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );

}



function listar(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var idSala = req.params.idSala;

    salaModel.listar(idEmpresa, idSala).then(function (resultado) {

        if (resultado.length > 0) {

            const sala = resultado[0]
            console.log("ENTRANDO NO CONTROLER");
            console.log("estou", sala);
            res.json(sala);

        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarInfoMaquinas(req, res) {

    var idSala = req.params.idSala;

    salaModel.buscarInfoMaquinas(idSala).then(function (resultado) {

        if (resultado.length > 0) {

            const sala = resultado[0][0]
            console.log("ENTRANDO NO CONTROLER");
            console.log("estou", sala);
            res.json(sala);

        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
    var idSala = req.params.idSala;

    salaModel.deletar(idSala)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    listar,
    buscarInfoMaquinas,
    alterar,
    deletar
}