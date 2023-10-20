//QUANDO OCORRER O EVENTO DE ROLAGEM, EXECUTAR FUNÇÃO
window.addEventListener("scroll", function () {
    //CAPTURAR A HEADER DO HTML
    var header = document.querySelector("header");
  
    //ADICIONANDO UMA CLASSE A MINHA HEADER 
    //QUANDO O EIXO Y DA MINHA PÁGINA FOR MAIOR QUE 0, EXECUTAR A CLASSE 'rolagem'

    if (window.scrollY > 0) {
      header.classList.add('sticky'); 
    } else{
      header.classList.remove('sticky')
    }
  })
  

  function acessarLogin() {
    window.location.replace("./login.html");
  }

  function acessarContato() {
    window.location.replace("./contato.html");
  }


  function acessarContatoDiretorio() {
    window.location.replace("./pages/contato.html");
  }  
  
  function acessarLoginDiretorio() {
    window.location.replace("./pages/login.html");
  }


// MENU FLUTUANTE
function mostrarMenu() {
  let menuScreen = document.getElementById("menu-screen")
  menuScreen.classList.toggle("active")
}