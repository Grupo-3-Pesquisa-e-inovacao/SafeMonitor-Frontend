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

            const maquina = resultado
            console.log("Listar máquinas");
            console.log(maquina);
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


function listarMaquinasEmpresa(req, res) {

    var idEmpresa = req.params.idEmpresa;

    maquinaModel.listarMaquinasEmpresa(idEmpresa).then(function (resultado) {

        if (resultado.length > 0) {

            const maquina = resultado
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



function buscarMaquina(req, res) {

    var idMaquina = req.params.idMaquina;

    maquinaModel.buscarMaquina(idMaquina).then(function (resultado) {

        if (resultado.length > 0) {
            const maquina = resultado[0]
            console.log(maquina);
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

function fecharJanela(req, res) {

    var idJanela = req.params.idJanela;;

    maquinaModel.fecharJanela(idJanela).then(function (resultado) {

        if (resultado.length > 0) {
            const maquina = resultado
            console.log(maquina);
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

function listarJanela(req, res) {

    var idMaquina = req.params.idMaquina;;

    maquinaModel.listarJanela(idMaquina).then(function (resultado) {

        if (resultado.length > 0) {
            const janela = resultado
            console.log(janela);
            res.json(janela);

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

            const maquina = resultado
            console.log("último valor da captura");
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

function graficosComponentes(req, res) {

    var idComponente = req.params.idComponente;
    var idMaquina = req.params.idMaquina;
    var limite = req.params.limite;

    maquinaModel.graficosComponentes(idComponente, idMaquina, limite).then(function (resultado) {

        if (resultado.length > 0) {

            const maquina = resultado
            console.log("Estado componente");
            console.log(maquina);
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

function infoComponentes(req, res) {

    var idComponente = req.params.idComponente;
    var idMaquina = req.params.idMaquina;


    maquinaModel.infoComponentes(idComponente, idMaquina).then(function (resultado) {

        if (resultado.length > 0) {

            const maquina = resultado
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


function alterarLimite(req, res) {

    var limite = req.body.limiteVar;
    var idNot = req.params.idNot;
    var idTipoComp = req.params.idTipoComp;

    maquinaModel.alterarLimite(limite, idNot, idTipoComp)
    .then(
        function (resultado) {
            console.log(resultado)
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


function notificar(req, res){

    var idMaquina = req.body.idMaquina;
    var tipoAlerta = req.body.tipoAlerta;


    maquinaModel.notificar(tipoAlerta, idMaquina).then(function (resultado) {

        if (resultado.length > 0) {
            const alerta = resultado    
            console.log(alerta);
            res.json(alerta);

        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarAlertas(req, res) {

    var idMaquina = req.params.idMaquina;
    var tipoAlerta = req.params.tipoAlerta;


    maquinaModel.verificarSeExisteAlerta(tipoAlerta, idMaquina).then(function (resultado) {

        if (resultado.length > 0) {

            const maquina = resultado
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



function buscarLimite(req, res) {

    var idNot = req.params.idNot;
    var idTipoComp = req.params.idTipoComp

    maquinaModel.buscarLimite(idNot, idTipoComp).then(function (resultado) {

        if (resultado.length > 0) {

            const maquina = resultado
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

function graficoNotificacoes(req, res) {


    maquinaModel.graficoNotificacoes().then(function (resultado) {

        if (resultado.length > 0) {
            const maquina = resultado
            console.log("Gráfico notificações");
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

function graficoSttMaquinas(req, res) {


    maquinaModel.graficoSttMaquinas().then(function (resultado) {

        if (resultado.length > 0) {
            const maquina = resultado
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

function graficoMaquinasLigadas(req, res) {


    maquinaModel.graficoMaquinasLigadas().then(function (resultado) {

        if (resultado.length > 0) {
            const maquina = resultado
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

function alterarStatusMaquina(req, res) {

    var status = req.body.status;
    var idMaquina = req.params.idMaquina;

    maquinaModel.alterarStatusMaquina(idMaquina, status)
    .then(
        function (resultado) {
            console.log(resultado)
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


function alterarMaquinaLigada(req, res) {

    var ligada = req.body.ligada;
    var idMaquina = req.params.idMaquina;

    maquinaModel.alterarMaquinaLigada(idMaquina, ligada)
    .then(
        function (resultado) {
            console.log(resultado)
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


function buscarNotificacoes(req, res) {

    var idEmpresa = req.params.idEmpresa

    maquinaModel.buscarNotificacoes(idEmpresa).then(function (resultado) {

        if (resultado.length > 0) {
            const maquina = resultado
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



module.exports = {
    buscarUltimoValor,
    cadastrar,
    listar,
    alterar,
    deletar,
    buscarMaquina,
    graficosComponentes,
    infoComponentes,
    listarJanela,
    fecharJanela,
    alterarLimite,
    listarMaquinasEmpresa,
    buscarLimite,
    notificar,
    graficoNotificacoes,
    graficoMaquinasLigadas,
    graficoSttMaquinas,
    alterarStatusMaquina,
    alterarMaquinaLigada,
    buscarNotificacoes,
    verificarAlertas
}



