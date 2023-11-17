
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
                sessionStorage.ID_EMPRESA = json.fk_empresa;.

                if(resposta.length > 0){
                    setTimeout(function () {
                        window.location = "../pages/dashboard/dashboard_geral.html";
                    }, 1000); // apenas para exibir o loading
    
                }
            
               
                console.log("deu certo")

               
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function acessarLogin() {
    window.location.replace("./login.html");
  }

  function acessarCadastro() {
    window.location.replace("./cadastro.html");
  }