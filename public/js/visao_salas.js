function abrirModal() {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("containerSalas").style.display = "none";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("containerSalas").style.display = "flex";
}

function adicionarSala() {
    const nomeSala = document.getElementById("inputNomeSala").value;
    const localizacao = document.getElementById("localizacao").value;

    if (nomeSala && localizacao) {
        const novaSala = criarNovaSala(nomeSala, localizacao);

        // Adicione a nova sala ao miniContainerSalas
        const miniContainerSalas = document.getElementById("miniContainerSalas");
        miniContainerSalas.appendChild(novaSala, localizacao);

        // Feche o modal
        fecharModal();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function criarNovaSala(nomeSala, localizacao) {
    // Crie um novo elemento de sala
    const novaSalaDiv = document.createElement("div");
    novaSalaDiv.className = "salas";

    const salaID = Math.floor(Math.random() * 1000);
    const totalDispositivos = Math.floor(Math.random() * 61);
    const ligados = Math.floor(Math.random() * (totalDispositivos + 1));
    const desligados = totalDispositivos - ligados;

    // Defina o conteúdo da sala
    novaSalaDiv.innerHTML = `
    <a href="./dashboard_computadores_sala.html">
        <div class="nomeSala">${nomeSala}</div>
        <div class="infoSala">
            <div class="tituloDados"><span style="font-weight: bold;">ID da sala:</span>
                <span id="idSala">0${salaID}</span>
            </div>
            <div class="tituloDados"><span style="font-weight: bold;">Localização:</span> ${localizacao}</div>
            <div class="tituloDados"><span style="font-weight: bold;">Total de dispositivos: </span>
                <span class="totalDispositivos">${totalDispositivos}</span>
            </div>
            <div class="tituloDados"><span style="font-weight: bold; color: green">Ligados: </span>
                <span class="ligados">${ligados}</span>
            </div>
            <div class="tituloDados"><span style="font-weight: bold; color: red">Desligados: </span>
                <span class="desligados">${desligados}</span>
            </div>
        </div>
    </a>
    `;

    return novaSalaDiv;
}