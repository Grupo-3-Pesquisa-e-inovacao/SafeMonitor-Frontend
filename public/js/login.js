

let listaUsuarios = 
[{usuario: 'alexandre',
senha: 29932},
{usuario: 'felipe',
senha: 83392}, 
{usuario: 'vinicius',
senha: 99283}]

function validarLogin() {
    let usuario = document.getElementById('email').value
    let senha = document.getElementById('pass').value

    for(let i = 0; i < listaUsuarios.length; i++) {
        if(listaUsuarios[i].usuario == usuario && listaUsuarios[i].senha == senha) {
            alert("login bem sussedido")
            return
        } else {
            alert("Login ou senha incorretos.") 
        }
    }
}

function acessarLogin() {
    window.location.replace("./login.html");
  }

  function acessarCadastro() {
    window.location.replace("./cadastro.html");
  }