
function validarLogin() {
    let emailVar = document.getElementById('email').value
    let senhaVar = document.getElementById('pass').value

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.ID_EMPRESA = json.fk_empresa;

                    setTimeout(function () {
                        window.location = "../pages/dashboard/dashboard_geral.html";
                    }, 1000); // apenas para exibir o loading
  
                console.log("deu certo")
               
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function cadastrarUsuario(email, senha, nome, cargo) {
    let emailVar = email;
    let senhaVar = senha;
    let nomeVar = nome;
    let cargoVar = cargo;
    let cadastrarVar = 0;
    let leituraVar = 0;
    let alterarVar = 0;
    let deletarVar = 0;

    if(cargoVar == "admnistrador") {
        cadastrarVar = 1
        leituraVar = 1
        alterarVar = 1
        deletarVar = 1
    } else if(cargoVar == "professor") {
        cadastrarVar = 0
        leituraVar = 1
        alterarVar = 1
        deletarVar = 0
    } else if(cargoVar == "comum") {
        cadastrarVar = 0
        leituraVar = 1
        alterarVar = 0
        deletarVar = 0
    } else {
        alert("tipo de usuario invalido...")
        return
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
            nomeServer: nomeVar,
            cargoServer: cargoVar,
            cadastrarServer: cadastrarVar,
            leituraServer: leituraVar,
            alterarServer: alterarVar,
            deletarServer: deletarVar,
            EmpresaServer: sessionStorage.ID_EMPRESA
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO cadastrarUsuario()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                console.log("Cadastrou usuário!")      
            });

        } else {
            console.log("Houve um erro ao tentar realizar o cadastro!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function alterarUsuarios(idUsuario){

    let emailVar = "teste@gmail.com";
    let senhaVar = "12345";
    let nomeVar = "testeSite";
    let cargoVar = "Estagiário";
    let cadastrarVar = 0;
    let leituraVar = 1;
    let alterarVar = 1;
    let deletarVar = 0;
    
    fetch(`/usuarios/alterar/${idUsuario}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
            nomeServer: nomeVar,
            cargoServer: cargoVar,
            cadastrarServer: cadastrarVar,
            leituraServer: leituraVar,
            alterarServer: alterarVar,
            deletarServer: deletarVar,
        })
    }).then(
        
        function (resposta) {
        if (resposta.ok) {
            window.alert("Usuário alterado!")
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

}

function listarUsuarios(){
    fetch(`usuarios/listar/${sessionStorage.getItem("ID_EMPRESA")}`).then(
        
        function (resposta) {
        if (resposta.ok) {
            console.log(resposta)
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

}

function deletarUsuarios(idUsuario){
    
    fetch(`usuarios/deletar/${idUsuario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Post deletado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function acessarLogin() {
    window.location.replace("./login.html");
  }

  function acessarCadastro() {
    window.location.replace("./cadastro.html");
  }