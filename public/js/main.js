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


function mensagem(icone, mensagem){
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: icone,
    title: mensagem
  });
}


function generatePageButtons(itemsPerPage, data, buttons) {
  var totalPages = Math.ceil(data.length / itemsPerPage);
  var pageButtons = document.getElementById(`${buttons}`);
  pageButtons.innerHTML = '';

  for (var i = 1; i <= totalPages; i++) {
    var button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', function() {
      var page = parseInt(this.textContent);
      displayData(page);
    });
    pageButtons.appendChild(button);
  }
}


function displayData(page, itemsPerPage, data, lista) {
  var start = (page - 1) * itemsPerPage;
  var end = start + itemsPerPage;
  var displayedData = data.slice(start, end);

  var dataList = document.getElementById(`${lista}`);
  dataList.innerHTML = '';

  displayedData.forEach(function(item) {
    var li = document.createElement('li');
    li.textContent = item.name;
    dataList.appendChild(li);
  });
}