var express = require("express");
var router = express.Router();

var salaController = require("../controllers/salaController");

//Recebendo os dados do html e direcionando para a função cadastrar de salaController.js
router.post("/cadastrar", function (req, res) {
    salaController.cadastrar(req, res);
})

router.get("/listar/:idEmpresa", function(req, res){
    salaController.listar(req, res);
})

router.put("/alterar/:idSala", function(req, res){
    salaController.alterar(req, res);
})

router.delete("/deletar/:idSala", function(req, res){
    salaController.deletar(req, res);
})

module.exports = router;