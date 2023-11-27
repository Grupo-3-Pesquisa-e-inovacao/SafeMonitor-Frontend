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

        const not = await resposta.json();
        console.log(not)
        for (let i = 0; i < not.length; i++) {
            ~
            labelNoti.push(`${not[i].hora}:00hs`)

            if (not[i].tipoNot == 1) {
                dataAviso.push(not[i].total)

            } else {
                dataUrgente.push(not[i].total)
            }

            barChart.update()
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
            ~
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



function notificar(idCaptura, idTipoDados, idComponente, IdMaquina, idTipoComponente, idTipoNot) {

    const rotaAPI = '/pages/dashboard/maquina/notificar/';

    const dados = {
        captura: idCaptura,
        tipoDados: idTipoDados,
        componente: idComponente,
        maquina: IdMaquina,
        tipoComponente: idTipoComponente,
        tipoNot: idTipoNot
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
            alert("Notificacão")


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

async function ultimoValorComponente(maquina, componente, limite){


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
            var valorCpu =  await ultimoValorComponente(maquina.idMaquina, 1, 1)
            var valorRam =  await ultimoValorComponente(maquina.idMaquina, 2, 1)
            var valorDisco = await ultimoValorComponente(maquina.idMaquina, 3, 1)

            //VERIFICANDO O STATUS DOS COMPONENTES DE TODAS AS MAQUINAS
            var sttCpu = await retornaStatusComponente(Number(valorCpu.valor), 1)
            var sttRam = await retornaStatusComponente(Number(valorRam.valor), 2)
            var sttDisco =  await retornaStatusComponente(Number(valorDisco.valor), 3)
            

            verificarStatusMaquina(sttCpu, sttRam, sttDisco, maquina.idMaquina)
            verificarEstadoMaquina(maquina.idMaquina)


            qtdMaquina++;

            try {
                var respostaCPU = await fetch(`maquina/graficos/1/${maquina.idMaquina}/1`);
                var usoCPU = await respostaCPU.json();
                console.log(usoCPU)
                var avisoCpu = await retornaLimite(1, 1);
                var urgtCpu = await retornaLimite(2, 1);

                if (usoCPU[0].valor_monitorado >= avisoCpu && usoCPU[0].valor_monitorado < urgtCpu) {
                    notificar(usoCPU[0].idCaptura, usoCPU[0].fk_tipoDados, usoCPU[0].fk_componente, usoCPU[0].fk_maquina, usoCPU[0].fk_tipoComponente, 1)

                } else if (usoCPU[0].valor_monitorado > urgtCpu) {
                    notificar(usoCPU[0].idCaptura, usoCPU[0].fk_tipoDados, usoCPU[0].fk_componente, usoCPU[0].fk_maquina, usoCPU[0].fk_tipoComponente, 2)
                }

            } catch (erro) {
                console.error('Erro na requisição:', erro);
            }


            try {
                var respostaRAM = await fetch(`maquina/graficos/2/${maquina.idMaquina}/1`);
                var usoRAM = await respostaRAM.json();
                console.log(usoRAM)

                var avisoRam = await retornaLimite(1, 2);
                var urgtRam = await retornaLimite(2, 2);

                if (usoRAM[0].valor_monitorado >= avisoRam && usoRAM[0].valor_monitorado < urgtRam) {
                    notificar(usoRAM[0].idCaptura, usoRAM[0].fk_tipoDados, usoRAM[0].fk_componente, usoRAM[0].fk_maquina, usoRAM[0].fk_tipoComponente, 1)

                } else if (usoRAM[0].valor_monitorado > urgtRam) {
                    notificar(usoRAM[0].idCaptura, usoRAM[0].fk_tipoDados, usoRAM[0].fk_componente, usoRAM[0].fk_maquina, usoRAM[0].fk_tipoComponente, 2)
                }

            } catch (erro) {
                console.error('Erro na requisição:', erro);
            }

            try {
                var respostaDisco = await fetch(`maquina/graficos/2/${maquina.idMaquina}/1`);
                var usoDisco = await respostaDisco.json();
                console.log(usoDisco)

                var avisoDisco = await retornaLimite(1, 3);
                var urgtDisco = await retornaLimite(2, 3);

                if (usoDisco[0].valor_monitorado >= avisoDisco && usoDisco[0].valor_monitorado < urgtDisco) {
                    notificar(usoDisco[0].idCaptura, usoDisco[0].fk_tipoDados, usoDisco[0].fk_componente, usoDisco[0].fk_maquina, usoDisco[0].fk_tipoComponente, 1)

                } else if (usoDisco[0].valor_monitorado > urgtDisco) {
                    notificar(usoDisco[0].idCaptura, usoDisco[0].fk_tipoDados, usoDisco[0].fk_componente, usoDisco[0].fk_maquina, usoDisco[0].fk_tipoComponente, 2)
                }

            } catch (erro) {
                console.error('Erro na requisição:', erro);
            }



        }

        document.getElementById('qtdMaq').innerHTML = `Total de máquinas: ${qtdMaquina}`

    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }


    async function verificarEstadoMaquina(id){

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

async function retornaStatusComponente(valor, componente){
    
    var status = '';
    var aviso = await retornaLimite(1, componente);
    var urgt = await retornaLimite(2, componente);
 
    if(valor >= aviso && valor < urgt ){
        var status = 'Aviso';

    }else if(valor > urgt){
        var status = 'Urgente';

    }else{
        var status = 'OK';
    }

    return status;
}

function verificarStatusMaquina(cpu, ram, disco, id){

    const listaComponentes = []

    listaComponentes.push(cpu, ram, disco)

    console.log(listaComponentes)


    for (let i = 0; i < listaComponentes.length; i++) {
        
        if(listaComponentes[i] === 'Aviso'){
            alteraStatusBanco(id, 'Aviso')

        }else if(listaComponentes[i] == 'Urgente'){
            alteraStatusBanco(id, 'Urgente')

        }else if(cpu == 'OK' && ram == 'OK' && disco == 'OK'){
            alteraStatusBanco(id, 'OK')        

        }
        
    }

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
}


// buscarLimite(1, 1, 'cpu_amarelo');
// buscarLimite(1, 2, 'ram_amarelo');
// buscarLimite(1, 3, 'disco_amarelo');

// buscarLimite(2, 1, 'cpu_vermelho');
// buscarLimite(2, 2, 'ram_vermelho');
// buscarLimite(2, 3, 'disco_vermelho');



