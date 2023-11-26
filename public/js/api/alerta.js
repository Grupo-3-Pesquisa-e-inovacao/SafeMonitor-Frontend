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
    const rotaAPI = `/pages/dashboard/maquina/limite/${notificacao}/${tipoComponente}`;

    var valor = 0.

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

    return valor;
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


async function verificarDados(){

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

        for (let i = 0; i < maquinas.length; i++) {
            const maquina = maquinas[i];

            try {
                var respostaCPU = await fetch(`maquina/graficos/1/${maquina.IdMaquina}/1`);
                var usoCPU = await respostaCPU.json();
                console.log(usoCPU)
                var avisoCpu = await buscarLimite(1, 1, 'cpu_amarelo');
                var urgtCpu = await buscarLimite(1, 1, 'cpu_vermelho');
                
                if(usoCPU[0].valor_monitorado >= avisoCpu && usoCPU[0].valor_monitorado < urgtCpu ){
                    notificar(usoCPU[0].idCaptura, usoCPU[0].fk_tipoDados, usoCPU[0].fk_maquina, usoCPU[0].fk_tipoComponente, 1) 

                }else if(usoCPU[0].valor_monitorado  > urgtCpu){
                    notificar(usoCPU[0].idCaptura, fk_tipoDados, usoCPU[0].fk_maquina, usoCPU[0].fk_tipoComponente, 2) 
                }

            } catch (erro) {
                console.error('Erro na requisição:', erro);
            }


            try {
                var respostaRAM = await fetch(`maquina/graficos/2/${maquina.IdMaquina}/1`);
                var usoRAM = await respostaRAM.json();
                console.log(usoRAM)

                var avisoRam = await buscarLimite(1, 2, 'ram_amarelo');
                var urgtRam = await buscarLimite(1, 2, 'ram_vermelho');
                
                if(usoRAM[0].valor_monitorado >= avisoRam && usoRAM[0].valor_monitorado < urgtRam ){
                    notificar(usoRAM[0].idCaptura, usoRAM[0].fk_tipoDados, usoRAM[0].fk_maquina, usoRAM[0].fk_tipoComponente, 1) 

                }else if(usoRAM[0].valor_monitorado  > urgtRam){
                    notificar(usoRAM[0].idCaptura, fk_tipoDados, usoRAM[0].fk_maquina, usoRAM[0].fk_tipoComponente, 2) 
                }
            
            } catch (erro) {
                console.error('Erro na requisição:', erro);
            }

            try {
                var respostaDisco = await fetch(`maquina/graficos/2/${maquina.IdMaquina}/1`);
                var usoDisco = await respostaDisco.json();
                console.log(usoDisco)

                var avisoDisco = await buscarLimite(1, 2, 'disco_amarelo');
                var urgtDisco = await buscarLimite(1, 2, 'disco_vermelho');
                
                if(usoDisco[0].valor_monitorado >= avisoDisco && usoDisco[0].valor_monitorado < urgtDisco ){
                    notificar(usoDisco[0].idCaptura, usoDisco[0].fk_tipoDados, usoDisco[0].fk_maquina, usoDisco[0].fk_tipoComponente, 1) 

                }else if(usoDisco[0].valor_monitorado  > urgtDisco){
                    notificar(usoDisco[0].idCaptura, fk_tipoDados, usoDisco[0].fk_maquina, usoDisco[0].fk_tipoComponente, 2) 
                }
            
            } catch (erro) {
                console.error('Erro na requisição:', erro);
            }
        

    
        }
        
    } catch (erro) {
        console.error('Erro na requisição do uso:', erro);
    }
}


verificarDados()
buscarLimite(1, 1, 'cpu_amarelo');
buscarLimite(1, 2, 'ram_amarelo');
buscarLimite(1, 3, 'disco_amarelo');

buscarLimite(2, 1, 'cpu_vermelho');
buscarLimite(2, 2, 'ram_vermelho');
buscarLimite(2, 3, 'disco_vermelho');



