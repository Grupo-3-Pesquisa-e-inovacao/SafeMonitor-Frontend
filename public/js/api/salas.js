
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("containerSalas").style.display = "none";
}

function abrirModalEditar(id, nome, localizacao) {
    console.log("entrei na função");

    document.getElementById("inputNomeSala").value = nome;
    document.getElementById("localizacao").value = localizacao;

    var tituloModal = document.getElementById("tituloModal");
    var buttonsModal = document.getElementById("buttonsModal");

    document.getElementById("containerSalas").style.display = "none";
    document.getElementById("modal").style.display = "flex"

    tituloModal.innerHTML = `Edite as informações da sala`;
    buttonsModal.innerHTML = `
        <button class="buttonAddSala" id="buttonAdd" onclick="editarSala(${id})">
            Adicionar Sala
        </button>

        <button class="buttonCancelarAddSala" onclick="fecharModal()">
            Cancelar
        </button>
    `;
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("containerSalas").style.display = "flex";
}


function adicionarSala() {

    const rotaAPI = '/pages/dashboard/sala/cadastrar';
    const dados = {
        nomeServer: document.getElementById("inputNomeSala").value,
        localizacaoServer: document.getElementById("localizacao").value,
        usuarioServer: sessionStorage.ID_USUARIO,
        empresaServer: sessionStorage.ID_EMPRESA
    };

    const resposta = fetch(rotaAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })

    resposta.then(resposta => {

        if (resposta.ok) {
            mensagem("success", "Sala cadastrada com sucesso!")


        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }

    }).catch(erro => {
        console.error('Erro na requisição:', erro);
    });

}


async function listarSala() {
    try {
        const rotaAPI = `sala/listar/${sessionStorage.ID_EMPRESA}`;
        const resposta = await fetch(rotaAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (resposta.ok) {
            const dados = await resposta.json();


            for (var i = 0; i < dados.length; i++) {

                try {
                    var respostaQtdMaquina = await fetch(`sala/buscarInfoMaquina/${dados[i].idSala}`)
                    var dataQtdMaquina = await respostaQtdMaquina.json();
                   
                } catch (erro) {
                    console.error('Erro na requisição:', erro);
                }

                var id = dados[i].idSala
                var nome = dados[i].nome
                var localizacao = dados[i].localizacao

                const infoSala = [id, nome, localizacao]



                var sala = `
                <div class="salas">
                    <a href="javascript:void(0);" onclick="computadoresSalas(${id})" >
                        <div class="icons-acoes">
                            <button class="button" onclick="abrirModalEditar(${id}, '${nome}', '${localizacao}')"><i class="bi bi-pencil-square"></i><button>
                            <button class="button" onclick="deletar(${id})"><i class="bi bi-trash3-fill"></i><button>
                        </div>

                        <div class="nomeSala">${nome}</div>
                            <div class="infoSala">
                                <div class="tituloDados"><span style="font-weight: bold;">ID da sala:</span> 
                                    ${id}
                                </div>
                                <div class="tituloDados"><span style="font-weight: bold;">Localização:</span> 
                                    ${localizacao}
                                </div>
                                <div class="tituloDados"><span style="font-weight: bold;">Total de dispositivos: 
                                    ${dataQtdMaquina[0].totalMaquina}</span>
                                </div>
                                
                                <div class="tituloDados"><span style="font-weight: bold; color: green">Ligados: </span>
                                    ${dataQtdMaquina[0].maquinasLigadas}
                                </div>
                                
                                <div class="tituloDados"><span style="font-weight: bold; color: red">Desligados: </span>
                                    ${dataQtdMaquina[0].maquinasDesligadas}
                                </div>
                            </div>  
                        </div>  
                    </a>
                </div>

                `

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


function editarSala(id) {

    const rotaAPI = `/pages/dashboard/sala/alterar/${id}`;
    const dados = {
        nomeServer: document.getElementById("inputNomeSala").value,
        localizacaoServer: document.getElementById("localizacao").value
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


function deletar(idSala) {

    const rotaAPI = `/sala/deletar/${idSala}`;

    const resposta = fetch(rotaAPI, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

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