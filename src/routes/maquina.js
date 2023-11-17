var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

//Recebendo os dados do html e direcionando para a função cadastrar de maquinaController.js
router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})

router.get("/listar/:idEmpresa", function(req, res){
    maquinaController.listar(req, res);
})

router.put("/alterar/:idMaquina", function(req, res){
    maquinaController.alterar(req, res);
})

router.delete("/deletar/:idMaquina", function(req, res){
    maquinaController.deletar(req, res);
})

module.exports = router;