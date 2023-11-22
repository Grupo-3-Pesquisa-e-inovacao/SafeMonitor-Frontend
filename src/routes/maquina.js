var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

//Recebendo os dados do html e direcionando para a função cadastrar de maquinaController.js
router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})

router.get("/listar/:idSala", function(req, res){
    maquinaController.listar(req, res);
})

router.get("/informacoes/:idMaquina", function(req, res){
    maquinaController.buscarMaquina(req, res);
})

router.get("/graficos/:idComponente/:idMaquina/:limite", function(req, res){
    maquinaController.graficosComponentes(req, res);
})


router.get("/componentes/:idComponente/:idMaquina/", function(req, res){
    maquinaController.infoComponentes(req, res);
})

router.get("/fechar-janela/:idJanela/", function(req, res){
    maquinaController.fecharJanela(req, res);
})

router.get("/listar-janelas/:idMaquina", function(req, res){
    maquinaController.listarJanela(req, res);
})


router.get("/valor/:idMaquina/:idComponente/:idTipoDados", function(req, res){
    maquinaController.buscarUltimoValor(req, res);
})

router.put("/alterar/:idMaquina", function(req, res){
    maquinaController.alterar(req, res);
})

router.delete("/deletar/:idMaquina", function(req, res){
    maquinaController.deletar(req, res);
})

module.exports = router;