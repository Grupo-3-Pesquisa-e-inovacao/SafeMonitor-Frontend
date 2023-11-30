var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");


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

router.put("/fechar-janela/:idJanela/", function(req, res){
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

router.put("/alterar-limite/:idNot/:idTipoComp", function(req, res){
    maquinaController.alterarLimite(req, res);
})

router.post("/notificar", function(req, res){
    maquinaController.notificar(req, res);
})

router.get("/limite/:idNot/:idTipoComp", function(req, res){
    maquinaController.buscarLimite(req, res);
})

router.get("/maquina-empresa/:idEmpresa", function(req, res){
    maquinaController.listarMaquinasEmpresa(req, res);
})

router.get("/garfico-noticacoes/", function(req, res){
    maquinaController.graficoNotificacoes(req, res);
})

router.get("/garfico-stt/", function(req, res){
    maquinaController.graficoSttMaquinas(req, res);
})

router.get("/garfico-ligadas/", function(req, res){
    maquinaController.graficoMaquinasLigadas(req, res);
})

router.get("/listar-notificacoes/:idEmpresa", function(req, res){
    maquinaController.buscarNotificacoes(req, res);
})

router.get("/verificar-alertas/:idMaquina/:tipoAlerta", function(req, res){
    maquinaController.verificarAlertas(req, res);
})

router.put("/alterar-status/:idMaquina", function(req, res){
    maquinaController.alterarStatusMaquina(req, res);
})
router.put("/alterar-estado/:idMaquina", function(req, res){
    maquinaController.alterarMaquinaLigada(req, res);
})

module.exports = router;