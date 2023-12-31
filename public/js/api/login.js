
function validarLogin() {
    let emailVar = document.getElementById('email').value
    let senhaVar = document.getElementById('pass').value

    fetch("/pages/dashboard/usuarios/autenticar", {
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
    let capturarVar = 0;
    let cadastrarVar = 0;
    let leituraVar = 0;
    let alterarVar = 0;
    let deletarVar = 0;

    if(cargoVar == "admnistrador") {
        cadastrarVar = 1
        leituraVar = 1
        alterarVar = 1
        deletarVar = 1
        capturarVar = 1;
    } else if(cargoVar == "professor") {
        cadastrarVar = 0
        leituraVar = 1
        alterarVar = 1
        deletarVar = 0
        capturarVar = 0;
    } else if(cargoVar == "comum") {
        cadastrarVar = 0
        leituraVar = 1
        alterarVar = 0
        deletarVar = 0
        capturarVar = 0;
    } else {
        alert("tipo de usuario invalido...")
        return
    }

     fetch("/pages/dashboard/usuarios/cadastrar", {
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
            capturarServer: capturarVar,
            empresaServer: sessionStorage.ID_EMPRESA
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO alterarUsuario()!")
        console.log("Resposta", resposta.status)

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

function alterarUsuario(idUsuario, email, senha, nome){

    let idUsuarioVar = idUsuario 
    let emailVar = email;
    let senhaVar = senha;
    let nomeVar = nome;
    
    fetch(`/usuarios/alterar/${idUsuario}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
            nomeServer: nomeVar,
            idUsuarioServer: idUsuarioVar
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

async function listarUsuarios(){
    await fetch(`usuarios/listar/${sessionStorage.getItem("ID_EMPRESA")}`).then(
        
        async function (resposta) {
        if (resposta.ok) {
            
            const dados = await resposta.json()
            
            let lista = document.getElementById("user-list")
        
            
            lista.innerHTML = `<li class="list-header">
                                <p class="email">Email</p>
                                <p class="data">Data</p>
                                <p class="tipo">Tipo</p>
                                <div class="edit" style="border: none;"></div>
                                <div class="rmv" style="border: none;"></div>    
                            </li>`
            let currentDate = new Date()

            for (let i = 0; i < dados.length; i++) {
                lista.innerHTML += `
                <li class="list-user">
                    <p class="email">${dados[i].email}</p>
                    <p class="data">${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}</p>
                    <p class="tipo">${dados[i].cargo}</p>
                    <div class="edit" onclick="editarUsuario(${dados[i].idUsuario})">E</div>
                    <div class="rmv" onclick="deletarUsuario(${dados[i].idUsuario})">R</div>     
                </li>  
                `
            }


        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

}

function deletarUsuario(idUsuario){
    let idUsuarioVar = idUsuario
    
    fetch(`usuarios/deletar/${idUsuario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioVar
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Post deletado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
            listarUsuarios();
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