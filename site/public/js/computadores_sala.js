// Função para abrir o modal
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("containerSalas").style.display = "none";
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("containerSalas").style.display = "flex";
}

// Função para adicionar uma nova sala
function adicionarSala() {
    const nomeSala = document.getElementById("inputNomeSala").value;

    if (nomeSala) {
        const novaSala = criarNovaSala(nomeSala);

        // Adicione a nova sala ao miniContainerSalas
        const miniContainerSalas = document.getElementById("miniContainerSalas");
        miniContainerSalas.appendChild(novaSala);

        // Feche o modal
        fecharModal();

        // Chame a função para atualizar os ícones e valores da nova sala
        atualizarIconesEValores(novaSala);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para criar uma nova sala
function criarNovaSala(nomeSala) {
    // Crie um novo elemento de sala
    const novaSalaDiv = document.createElement("div");
    novaSalaDiv.className = "salas";

    // Defina o conteúdo da sala
    novaSalaDiv.innerHTML = `
    <a href="./dashboard_computador_expecifico.html">
        <div class="nomeSala">${nomeSala}</div>
        <div class="infopc-infostatus">
            <div class="infopc">
                <div class="iconePC">
                    <img src="../../assets/assets-dashboard/computer.svg" alt="">
                </div>
                <div class="expecificacoes">
                    <div class="tituloDados"><span style="font-weight: bold;">Marca:</span> LENOVO</div>
                    <div class="tituloDados"><span style="font-weight: bold;">Modelo:</span> P112F</div>
                    <div class="tituloDados"><span style="font-weight: bold;">SO:</span> Windows</div>
                </div>
            </div>
            <div class="infostatus">
                <div class="blocoStatusPc">
                    <div class="tituloStatus">STATUS</div>
                    <div class="registros">
                        <div class="valores">
                            <div class="tituloDados" id="cpu"><span style="font-weight: bold;">CPU:</span></div>
                            <div class="tituloDados" id="disco"><span style="font-weight: bold;">Disco:</span></div>
                            <div class="tituloDados" id="ram"><span style="font-weight: bold;">Ram:</span></div>
                            <div class="tituloDados" id="rede"><span style="font-weight: bold;">Rede:</span></div>
                        </div>
                        <div class="icone">
                            <img src="../../assets/assets-dashboard/alert-verde.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a>
    `;

    return novaSalaDiv;
}

// Função para atualizar os ícones e valores de alerta para uma sala
function atualizarIconesEValores(sala) {
    const icones = sala.querySelectorAll(".icone img");

    for (let i = 0; i < icones.length; i++) {
        var iconeSorteado = Math.random();
        var novoIcone;

        if (iconeSorteado < 0.33) {
            novoIcone = "../../assets/assets-dashboard/alert-amarelo.svg";
        } else if (iconeSorteado < 0.66) {
            novoIcone = "../../assets/assets-dashboard/dangerous.svg";
        } else {
            novoIcone = "../../assets/assets-dashboard/alert-verde.svg";
        }

        icones[i].src = novoIcone;
    }

    // Gerar valores aleatórios para CPU, Disco, RAM e Rede
    const numeroAleatorioCPU = Math.floor(Math.random() * 100) + 1;
    const numeroAleatorioRAM = Math.floor(Math.random() * 100) + 1;
    const numeroAleatorioRede = Math.floor(Math.random() * 100) + 1;
    const numeroAleatorioDisco = Math.floor(Math.random() * 100) + 1;

    // Atualizar os elementos de texto com os valores aleatórios
    const cpuElement = sala.querySelector("#cpu");
    const discoElement = sala.querySelector("#disco");
    const ramElement = sala.querySelector("#ram");
    const redeElement = sala.querySelector("#rede");

    cpuElement.innerHTML = `<span style="font-weight: bold">CPU:</span> <span style="color: ${definirCor(numeroAleatorioCPU)}">${numeroAleatorioCPU}%</span>`;
    discoElement.innerHTML = `<span style="font-weight: bold">Disco:</span> <span style="color: ${definirCor(numeroAleatorioDisco)}">${numeroAleatorioDisco}%</span>`;
    ramElement.innerHTML = `<span style="font-weight: bold">RAM:</span> <span style="color: ${definirCor(numeroAleatorioRAM)}">${numeroAleatorioRAM}%</span>`;
    redeElement.innerHTML = `<span style="font-weight: bold">Rede:</span> <span style="color: ${definirCor(numeroAleatorioRede)}">${numeroAleatorioRede}%</span>`;
}

// Função para definir a cor com base no valor
function definirCor(valor) {
    if (valor > 70) {
        return "red";
    } else if (valor < 50) {
        return "green";
    } else {
        return "yellow";
    }
}

// Função para atualizar todas as salas existentes
function atualizarTodasAsSalas() {
    const miniContainerSalas = document.getElementById("miniContainerSalas");
    const salas = miniContainerSalas.querySelectorAll(".salas");

    salas.forEach(function (sala) {
        atualizarIconesEValores(sala);
    });
}

// Chame a função para atualizar todas as salas existentes quando a página é carregada
window.addEventListener('load', atualizarTodasAsSalas);

// Intervalo de 5 segundos para atualizar as salas
setInterval(atualizarTodasAsSalas, 5000);
