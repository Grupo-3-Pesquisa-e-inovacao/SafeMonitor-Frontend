var maquinaModel = require("../models/maquinaModel");


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
        maquinaModel.cadastrar(nome, modelo, numeroSerie, marca, idEmpresa, idSala)
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

function listar(req, res) {

    var idSala = req.params.idSala;

    maquinaModel.listar(idSala).then(function (resultado) {

        if (resultado.length > 0) {

            const maquina = resultado[0]
            console.log("ENTRANDO NO CONTROLER");
            console.log("estou", maquina);
            res.json(maquina);

        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimoValor(req, res) {

    var idComponente = req.params.idComponente;
    var idTipoDados = req.params.idTipoDados;
    var idMaquina = req.params.idMaquina;

    maquinaModel.capturaUltimoValor(idComponente, idTipoDados, idMaquina).then(function (resultado) {

        if (resultado.length > 0) {

            const maquina = resultado[0]
            console.log("ENTRANDO NO CONTROLER");
            console.log("estou", maquina);
            res.json(maquina);

        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function alterar(req, res) {
   
    var nome = req.body.nomeServer;
    var modelo = req.body.modeloServer;
    var numeroSerie = req.body.numeroSerieServer;
    var marca = req.body.marcaServer;
    var idMaquina =  req.params.idMaquina;

    maquinaModel.alterar(nome, modelo, numeroSerie, marca, idMaquina)
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

function deletar(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.deletar(idMaquina)
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
    buscarUltimoValor,
    cadastrar,
    listar,
    alterar,
    deletar
}



