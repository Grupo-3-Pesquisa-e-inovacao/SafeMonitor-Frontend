function abrirModalEditarMaquina(id, nome, modelo, marca, numero_serie) {

    document.getElementById("nome").value = nome;
    document.getElementById("modelo").value = modelo;
    document.getElementById("numeroSerie").value = numero_serie;
    document.getElementById("marca").value = marca;

    

    var tituloModal = document.getElementById("tituloModal");
    var buttonsModal = document.getElementById("buttonsModal");

    document.getElementById("containerSalas").style.display = "none";
    document.getElementById("modal").style.display = "flex"

    tituloModal.innerHTML = `Edite as informações da Máquina`;
    buttonsModal.innerHTML = `
        <button class="buttonAddSala" id="buttonAdd" onclick="editarMaquina(${id})">
            Atualizar
        </button>

        <button class="buttonCancelarAddSala" onclick="fecharModal()">
            Cancelar
        </button>
    `;
}




function computadoresSalas(idSala) {
    sessionStorage.ID_SALA = idSala;
    window.location = "./computadores_sala.html";
}



async function listarMaquinaPorSala(idSala) {

    try {
        const rotaAPI = `maquina/listar/${idSala}`;
        const resposta = await fetch(rotaAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (resposta.ok) {
            const dados = await resposta.json();
            console.log(dados)

            for (var i = 0; i < dados.length; i++) {

                try {
                    var respostaQtdMaquina = await fetch(`sala/buscarInfoMaquina/${idSala}`)
                    var dataQtdMaquina = await respostaQtdMaquina.json();


                } catch (erro) {
                    console.error('Erro na requisição:', erro);
                }


                document.getElementById("nomeSala").innerHTML = `${dataQtdMaquina.nomeSala} - ${dataQtdMaquina.totalMaquina} máquinas`

                var idMaquina = dados[i].idMaquina
                var nome = dados[i].nome
                var modelo = dados[i].modelo
                var marca = dados[i].marca
                var numSerie = dados[i].numero_serie
                var so = dados[i].sistema_operacional


                capturaComponente(idMaquina, 1, 1, "cpu")
                capturaComponente(idMaquina, 2, 1, "ram")
                capturaComponente(idMaquina, 3, 1, "disco")

            
                var sala = `
                <div class="salas">
                    <div class="icons-acoes">
                        <button onclick="abrirModalEditarMaquina(${idMaquina}, '${nome}', '${modelo}', '${marca}', '${numSerie}')"><i class="bi bi-pencil-square"></i><button>
                        <button onclick="deletarMaquina(${idMaquina})"><i class="bi bi-trash3-fill"></i><button>
                    </div>
                    <div class="nomeSala">${nome}</div>
                    <div class="infopc-infostatus">
                        <div class="infopc">
                            <div class="iconePC">
                                <img src="../../assets/assets-dashboard/computer.svg" alt="">
                            </div>
                            <div class="expecificacoes">
                                <div class="tituloDados"><span style="font-weight: bold;">Marca:</span> ${marca}</div>
                                <div class="tituloDados"><span style="font-weight: bold;">Modelo:</span> ${modelo}</div>
                                <div class="tituloDados"><span style="font-weight: bold;">SO:</span> ${so}</div>
                            </div>
                        </div>
                        <div class="infostatus">
                            <div class="blocoStatusPc">
                                <div class="tituloStatus">STATUS</div>
                                <div class="registros">
                                    <div class="valores">
                                        <div class="tituloDados"><span style="font-weight: bold;">CPU: </span>
                                        <span id="cpu"></span>%</div>
                                        <div class="tituloDados"><span style="font-weight: bold;">Disco: </span>
                                        <span id="disco"></span>%</div>
                                        <div class="tituloDados"><span style="font-weight: bold;">Ram: </span>
                                        <span id="ram"></span>%</div>
                                    </div>
                                    <div class="icone">
                                        <img src="../../assets/assets-dashboard/alert-verde.svg" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    </div>

                    <button class="button" onclick="computadoresEspecificos(${idMaquina})" >Visualizar</button>
    
            </div>
        </div>`

                miniContainerSalas.innerHTML += sala;

            }

        } else if (resposta.status === 404) {
            window.alert("Deu 404!");
        } else {
            throw `Houve um erro ao tentar realizar a postagem! Código da resposta: ${resposta.status}`;
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }
}


async function capturaComponente(maquina, componente, limite, div){


    var ultimaCaptura = '';
    try {
        // Requisição para a CPU
        var resposta = await fetch(`maquina/graficos/${componente}/${maquina}/${limite}`);
        var uso = await resposta.json();
        
        valor = Number(uso[0].valor_monitorado);
        

        if (componente != 1){
            var respostaTotal = await fetch(`maquina/componentes/${componente}/${maquina}`)
            var total = await respostaTotal.json();
            valor = (Number(uso[0].valor_monitorado) * 100) / Number(total[0].total)
        }

        document.getElementById(`${div}`).innerHTML = valor.toFixed(2)

        var ultimaCaptura = {
            idCaptura: uso[0].idCaptura,
            valor: valor,
            dtHora: uso[0].dt_hora,
            idMaquina: uso[0].fk_maquina,
            idTipoDados: uso[0].fk_tipoDados,
            idComponente: uso[0].fk_componente,
            idTipoComponente: uso[0].fk_tipoComponente
        }
    
    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }

    return ultimaCaptura;

}




function editarMaquina(id) {

    console.log("entrando no editar");

    const rotaAPI = `/pages/dashboard/maquina/alterar/${id}`;
    const dados = {
        nomeServer: document.getElementById("nome").value,
        modeloServer: document.getElementById("modelo").value,
        numeroSerieServer: document.getElementById("numeroSerie").value,
        marcaServer: document.getElementById("marca").value,
    };

    const resposta = fetch(rotaAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })

    resposta.then(resposta => {

        if (resposta.ok) {
            fecharModal();


        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }

    }).catch(erro => {
        console.error('Erro na requisição:', erro);
    });

}


async function deletarMaquina(idMaquina) {

    const rotaAPI = `/maquina/deletar/${idMaquina}`;

    const resposta = await fetch(rotaAPI, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    console.log(resposta)

    resposta.then(resposta => {


        if (resposta.ok) {
            window.alert("Sala deletada")

            fecharModal();


        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }

    }).catch(erro => {
        console.error('Erro na requisição:', erro);
    });

}

function computadoresEspecificos(idMaquina) {
    sessionStorage.ID_MAQUINA = idMaquina;
    window.location = "./maquina.html";
}
