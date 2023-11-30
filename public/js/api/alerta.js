function mostrarInput(display) {
    document.getElementById(display).style.display = "flex"
}

function fecharInput(display) {
    document.getElementById(display).style.display = "none"
}

async function alterarLimite(limite, idNot, idTipoComp) {

    console.log(limite)
    const rotaAPI = `/pages/dashboard/maquina/alterar-limite/${idNot}/${idTipoComp}`;

    const dados = {
        limiteVar: limite
    };

    const resposta = await fetch(rotaAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })

    resposta.then(resposta => {

        if (resposta.ok) {
            fecharInput();


        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }

    }).catch(erro => {
        console.error('Erro na requisição:', erro);
    });

}

async function buscarLimite(notificacao, tipoComponente, div) {
    const rotaAPI = `/pages/dashboard/maquina/limite/${notificacao}/${tipoComponente}`

    try {
        const resposta = await fetch(rotaAPI, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const uso = await resposta.json();

        if (uso[0].limite === null) {
            document.getElementById(`${div}`).innerHTML = 0;
        }

        document.getElementById(`${div}`).innerHTML = uso[0].limite;
        valor = uso[0].limite;

    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }

}

async function graficoNoticacoes() {

    const rotaAPI = `/pages/dashboard/maquina/garfico-noticacoes/`

    try {
        const resposta = await fetch(rotaAPI, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        if(resposta.status == 204){
            console.log("Nada foi encontrado!")
        }else{
            const not = await resposta.json();
            console.log("Graficoo", not.length)
    
            for (let i = 0; i < not.length; i++) {
                labelNoti.splice(i, labelNoti.length, `${not[i].hora}:00hs`)
                dataAviso.splice(i, dataAviso.length, not[i].totalAviso)
                dataUrgente.splice(i, dataUrgente, not[i].totalUrgente)
    
    
                barChart.update()
            }
        }
       

    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }


}

async function graficoStt() {

    const rotaAPI = `/pages/dashboard/maquina/garfico-stt/`

    try {
        const resposta = await fetch(rotaAPI, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const not = await resposta.json();

        console.log(not)
        for (let i = 0; i < not.length; i++) {


            if (not[i].stt == "OK") {
                var ok = not[i].total

            } else if (not[i].stt == "Aviso") {
                var aviso = not[i].total

            } else if (not[i].stt == "Urgente") {
                var urgnt = not[i].total

            }

            console.log("OK", ok)
            console.log("Aviso", aviso)
            console.log("Urgente", urgnt)

            statusData.splice(0, 3, ok, aviso, urgnt)
            doughnutChart.update()
        }

    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }


}
async function graficoLigadas() {

    const rotaAPI = `/pages/dashboard/maquina/garfico-ligadas/`

    try {
        const resposta = await fetch(rotaAPI, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const not = await resposta.json();
        console.log(not)
        for (let i = 0; i < not.length; i++) {

            labelNoti.push(`${not[i].hora}:00hs`)

            if (not[i].ligada == "S") {
                maquinasLigadaData.push(not[i].total)

            } else {
                maquinasDesligadaData.push(not[i].total)
            }

            horizontalBarChart.update()
        }

    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }
}

async function listarNotificacoes() {

    const rotaAPI = `/pages/dashboard/maquina/listar-notificacoes/${sessionStorage.ID_EMPRESA}`

    try {
        const resposta = await fetch(rotaAPI, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const not = await resposta.json();
        const listaAlertas = []


        var alertas = document.getElementById('alertas')
        var imgUrgente = `../../assets/assets-dashboard/dangerous.svg`
        var imgAviso = `../../assets/assets-dashboard/alert-amarelo.svg`

       
        for (let i = 0; i < not.length; i++) {
            const alerta = not[i];
            
            if(alerta.verificado == null){
                listaAlertas.splice(i, listaAlertas.length, alerta)
            }
            
        }

        

        var rows = document.getElementById('tabelaBody') 
        rows.innerHTML = ``;
        listaAlertas.forEach(function(item) {
          
            rows.innerHTML = `

                <tr>
                <th><img src="${item.stt == "Urgente" ? imgUrgente : imgAviso}" alt=""></th>
                <th>${item.maquina}</th>
                <th>${item.sala}</th>
                </tr>
            `

    
          });
       
            
    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }
}






function notificar(maquina, idTipoAlerta) {

    const rotaAPI = '/pages/dashboard/maquina/notificar/';

    const dados = {
        tipoAlerta: idTipoAlerta,
        idMaquina: maquina
    };

    const resposta = fetch(rotaAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })

    resposta.then(async resposta => {

        if (resposta.ok) {

            try {
                var respostaMaquina = await fetch(`maquina/informacoes/${maquina}`)
            } catch (erro) {
                console.error('Erro na requisição:', erro);
            }

            if (respostaMaquina.ok) {
                let dados = await respostaMaquina.json();
                let tipoNot = '';
                let icon = '';

                if (idTipoAlerta == 1) {
                    tipoNot = 'Aviso'
                    icon = "warning"

                } else if (idTipoAlerta == 2) {
                    tipoNot = 'Urgente'
                    icon = 'error'
                }

                mensagem(icon, dados.nome + " - " + tipoNot)
                console.log(icon, dados.nome + " - " + tipoNot)
            }


        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }

    }).catch(erro => {
        console.error('Erro na requisição:', erro);
    });

}

async function retornaLimite(notificacao, tipoComponente) {

    let valor = 0.

    const rotaAPI = `/pages/dashboard/maquina/limite/${notificacao}/${tipoComponente}`;

    try {
        const resposta = await fetch(rotaAPI, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const uso = await resposta.json()

        valor = uso[0].limite;

    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }

    return valor;
}

async function ultimoValorComponente(maquina, componente, limite) {


    var ultimaCaptura = '';
    try {
        // Requisição para a CPU
        var resposta = await fetch(`maquina/graficos/${componente}/${maquina}/${limite}`);
        var uso = await resposta.json();

        valor = Number(uso[0].valor_monitorado);


        if (componente != 1) {
            var respostaTotal = await fetch(`maquina/componentes/${componente}/${maquina}`)
            var total = await respostaTotal.json();
            valor = (Number(uso[0].valor_monitorado) * 100) / Number(total[0].total)
        }

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




async function verificarDados() {

    const rotaAPI = `/pages/dashboard/maquina/maquina-empresa/${sessionStorage.ID_EMPRESA}`;

    try {
        const resposta = await fetch(rotaAPI, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const maquinas = await resposta.json();
        let qtdMaquina = 0
        for (let i = 0; i < maquinas.length; i++) {
            const maquina = maquinas[i];
            console.log(maquina.idMaquina)

            //VERIFICANDO O VALOR DOS COMPONENTES DE TODAS AS MAQUINAS
            var valorCpu = await ultimoValorComponente(maquina.idMaquina, 1, 1)
            var valorRam = await ultimoValorComponente(maquina.idMaquina, 2, 1)
            var valorDisco = await ultimoValorComponente(maquina.idMaquina, 3, 1)

            //VERIFICANDO O STATUS DOS COMPONENTES DE TODAS AS MAQUINAS
            var sttCpu = await retornaStatusComponente(Number(valorCpu.valor), 1)
            var sttRam = await retornaStatusComponente(Number(valorRam.valor), 2)
            var sttDisco = await retornaStatusComponente(Number(valorDisco.valor), 3)


            let statusMaquina = await verificarStatusMaquina(sttCpu, sttRam, sttDisco, maquina.idMaquina)
            verificarEstadoMaquina(maquina.idMaquina)


            qtdMaquina++;

            console.log("Status maquina", statusMaquina)

            let existeAlerta = await verificarAlertas(maquina.idMaquina)

            console.log(existeAlerta)

            if (!existeAlerta) {
                if (statusMaquina = 'Urgente') {
                    notificar(maquina.idMaquina, 2)

                } else if (statusMaquina = 'Aviso') {
                    notificar(maquina.idMaquina, 1)
                }

            }

        }

        document.getElementById('qtdMaq').innerHTML = `Total de máquinas: ${qtdMaquina}`

    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }


    async function verificarEstadoMaquina(id) {

        try {
            // Requisição para a CPU
            var resposta = await fetch(`maquina/graficos/1/${id}/1`);
            var uso = await resposta.json();


            const limiteTempoDesligada = 60 * 1000; // 10 segundos em milissegundos

            const ultimoTimestamp = uso[0].dt_hora;
            const tempoAtual = new Date().getTime();

            const diferencaTempo = tempoAtual - ultimoTimestamp;

            if (diferencaTempo <= limiteTempoDesligada) {
                console.log('A máquina está ligada.');
                alterarEstadoBanco(id, "S")
                return true;
            } else {
                console.log('A máquina está desligada.');
                alterarEstadoBanco(id, "N")
                return false;
            }

        } catch (erro) {
            console.error('Erro na requisição do uso:', erro);
        }


    }
}


async function verificarAlertas(id) {

    var existeAlerta = true

    try {
        // Requisição para a CPU
        for (let i = 1; i <= 2; i++) {
            var resposta = await fetch(`maquina/verificar-alertas/${id}/${i}`);


            if (resposta.ok) {

                if(resposta.status == 204){
                    existeAlerta = false;
                }else{

                    var uso = await resposta.json();
                    console.log("alertas", uso)

                    for (let j = 0; j < uso.length; j++) {
                    
                        if (uso.length > 0 && uso[j].verificado == null) {
                            console.log(uso[j])
                            existeAlerta = true
    
                        }else{
                            existeAlerta = false
                        }
                    }
    
        
                }
            
            }


        }

    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }

    return existeAlerta


}


async function retornaStatusComponente(valor, componente) {

    var status = '';
    var aviso = await retornaLimite(1, componente);
    var urgt = await retornaLimite(2, componente);

    if (valor >= aviso && valor < urgt) {
        var status = 'Aviso';

    } else if (valor > urgt) {
        var status = 'Urgente';

    } else {
        var status = 'OK';
    }

    return status;
}


function verificarStatusMaquina(cpu, ram, disco, id) {

    var statusMaquina = ''
    const listaComponentes = []

    listaComponentes.push(cpu, ram, disco)

    console.log(listaComponentes)



    for (let i = 0; i < listaComponentes.length; i++) {

        if (listaComponentes[i] === 'Urgente') {
            alteraStatusBanco(id, 'Urgente')
            statusMaquina = 'Urgente'

        } else if (listaComponentes[i] == 'Aviso') {
            alteraStatusBanco(id, 'Aviso')
            statusMaquina = 'Aviso'


        } else if (cpu == 'OK' && ram == 'OK' && disco == 'OK') {
            alteraStatusBanco(id, 'OK')
            statusMaquina = 'OK'
        }

    }

    return statusMaquina;

}


function alteraStatusBanco(id, stt) {

    const rotaAPI = `/pages/dashboard/maquina/alterar-status/${id}`;
    const dados = {
        status: stt
    }

    const resposta = fetch(rotaAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })

    resposta.then(resposta => {

        if (resposta.ok) {


        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }

    }).catch(erro => {
        console.error('Erro na requisição:', erro);
    });

}



function alterarEstadoBanco(id, estado) {

    const rotaAPI = `/pages/dashboard/maquina/alterar-estado/${id}`;
    const dados = {
        ligada: estado
    }

    const resposta = fetch(rotaAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })

    resposta.then(resposta => {

        if (resposta.ok) {



        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }

    }).catch(erro => {
        console.error('Erro na requisição:', erro);
    });

}


function atualizarGraficos() {
    graficoNoticacoes()
    graficoStt()
    graficoLigadas()
    verificarDados()
    listarNotificacoes()

    setTimeout(() => {  
        atualizarGraficos()

    }, 3000);
}


function atualizarLimites() {
    buscarLimite(1, 1, 'cpu_amarelo');
    buscarLimite(1, 2, 'ram_amarelo');
    buscarLimite(1, 3, 'disco_amarelo');

    buscarLimite(2, 1, 'cpu_vermelho');
    buscarLimite(2, 2, 'ram_vermelho');
    buscarLimite(2, 3, 'disco_vermelho');


    setTimeout(() => {
        atualizarLimites()

    }, 10000);
}



