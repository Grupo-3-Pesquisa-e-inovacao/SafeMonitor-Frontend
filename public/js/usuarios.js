window.onload = e => {
    listarUsuarios()
}

let helpScreen = document.getElementById("help-screen")
let menuMobile = document.getElementById("menu-mobile")
let janelaAdicionar = document.getElementById("janela-adicionar")
let janelaAlterar = document.getElementById("janela-alterar")

function showAdicionar() {
    janelaAdicionar.classList.toggle("visivel")
}

function showAlterar() {
    janelaAlterar.classList.toggle("visivel")
}

function showHelp() {
    helpScreen.classList.toggle("visible")
}

function showMenu() {
    menuMobile.classList.toggle("visible")
}

function adicionarUsuario() {
    
    let nome = document.getElementById("nome-a").value.toLowerCase()
    let email = document.getElementById("email-a").value.toLowerCase()
    let cargo = document.getElementById("cargo-a").value.toLowerCase()
    let senha = document.getElementById("senha-a").value.toLowerCase()
    let confirm = document.getElementById("confirm-a").value.toLowerCase()

    if(senha != confirm) {
        alert("Senhas incompativeis...")
        return
    }

    cadastrarUsuario(email, senha, nome, cargo)

    showAdicionar()
}

function editarUsuario(idUsuario) {

    let nome = document.getElementById("nome-e").value.toLowerCase()
    let email = document.getElementById("email-e").value.toLowerCase()
    let senha = document.getElementById("senha-e").value.toLowerCase()
    let confirm = document.getElementById("confirm-e").value.toLowerCase()

    alterarUsuario(idUsuario, email, senha, nome)

    showAlterar()
}