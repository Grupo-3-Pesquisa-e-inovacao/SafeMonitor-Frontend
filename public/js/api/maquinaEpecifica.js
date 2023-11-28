async function buscarInfoMaquina(idMaquina){
    
    try {
        var resposta = await fetch(`maquina/informacoes/${idMaquina}`)
    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }


    if (resposta.ok) {
        const dados = await resposta.json();

        document.getElementById("marca").innerHTML = dados.marca
        document.getElementById("modelo").innerHTML = dados.modelo
        document.getElementById("so").innerHTML = dados.sistema_operacional
        document.getElementById("arquitetura").innerHTML = dados.arquitetura
        document.getElementById("fabricante").innerHTML = dados.fabricante
        document.getElementById("numSerie").innerHTML = dados.numero_serie
        
        document.getElementById("ipv4").innerHTML = dados.endereco_ipv4
        document.getElementById("mac").innerHTML = dados.endereco_mac
        document.getElementById("nome-sala-computador").innerHTML = dados.nome
        document.getElementById("id-computador").innerHTML = dados.idMaquina


        var valorCpu =  await capturaComponente(idMaquina, 1, 1, "valorCPU")
        var valorRam =  await capturaComponente(idMaquina, 2, 1, "valorRAM")
        var valorDisco = await capturaComponente(idMaquina, 3, 1, "valorDISCO")

        console.log(valorCpu.valor)
        console.log(valorRam.valor)
        console.log(valorDisco.valor)

       
        var sttCpu = await verificarStatusComponente(Number(valorCpu.valor), 1, 'status-cpu')
        var sttRam = await verificarStatusComponente(Number(valorRam.valor), 2, 'status-ram')
        var sttDisco =  await verificarStatusComponente(Number(valorDisco.valor), 3, 'status-disco')

        verificarStatusMaquina(sttCpu, sttRam, sttDisco, idMaquina)
        verificarEstadoMaquina(idMaquina)
    }

}

async function verificarStatusComponente(valor, componente, div){
    
    var status = '';
    var aviso = await retornaLimite(1, componente);
    var urgt = await retornaLimite(2, componente);
 

    var stt = document.getElementById(`${div}`)


    if(valor >= aviso && valor < urgt ){
        stt.style.backgroundColor = "yellow"
        var status = 'Aviso';

    }else if(valor > urgt){
        stt.style.backgroundColor = "red"
        var status = 'Urgente';

    }else{
        stt.style.backgroundColor = "green"
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
            img = `<img src="../../assets/assets-dashboard/alert-amarelo.svg" alt="">
            <span style="color: yellow" >AVISO</span>`

            alteraStatusBanco(id, 'Aviso')

        }else if(listaComponentes[i] == 'Urgente'){
            img = `<img src="../../assets/assets-dashboard/dangerous.svg" alt="">
            <span style="color: red" >URGENTE</span>`
            alteraStatusBanco(id, 'Urgente')

        }else if(cpu == 'OK' && ram == 'OK' && disco == 'OK'){
            img = `<img src="../../assets/assets-dashboard/alert-verde.svg" alt="">
            <span style="color: green" >OK</span>`
            alteraStatusBanco(id, 'OK')        

        }
        
    }

    document.getElementById('stt-maquina').innerHTML = img

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



async function listarJanela(idMaquina){
    
    try {
        var resposta = await fetch(`/pages/dashboard/maquina/listar-janelas/${idMaquina}`)
        
        
    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }

   if(resposta.ok){
        const dados = await resposta.json();
        console.log("Janelas abertas", dados)
        


        var janela = document.getElementById('janelas')

        janela.innerHTML = " "
        for (let i = 0; i < dados.length; i++) {

            janela.innerHTML += `
            <div class="instancias">
                    <div class="iconApp">
                        <button onclick="fecharJanela(${dados[i].pid})">X</button>
                    </div>

                    <div class="instancia">${dados[i].titulos}</div>
                    <div class="dtRegistro">${dados[i].dt_hora}</div>
                </div>`
            
        }
   }



}

async function redenderizarGraficos(idMaquina){
    try {
        var respostaCPU = await fetch(`maquina/graficos/1/${idMaquina}/12`);
        var usoCPU = await respostaCPU.json();
        
        var respostaInfoCPU = await fetch(`maquina/componentes/1/${idMaquina}`)
        var InfoCPU = await respostaInfoCPU.json()

       

    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }

    if (respostaCPU.ok) {

        document.getElementById("nome_cpu").innerHTML = InfoCPU[0].nome
        document.getElementById("nucleos_cpu").innerHTML = InfoCPU[0].total
      
        for (let i = 0; i < usoCPU.length; i++) {
            const valor = usoCPU[i].valor_monitorado;

            dadosCPU.push(Number(valor))
            graficoCPU.update()   
        }

        
    }

    try {
        var respostaRam = await fetch(`maquina/graficos/2/${idMaquina}/10`);
        var usoRam = await respostaRam.json();


        var respostaInfoRAM = await fetch(`maquina/componentes/2/${idMaquina}`)
        var InfoRAM = await respostaInfoRAM.json()

    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }

    if (respostaRam.ok) {

        document.getElementById("total_ram").innerHTML = InfoRAM[0].total
      
        for (let i = 0; i < usoRam.length; i++) {
            const valor = usoRam[i].valor_monitorado;

            dadosRam.push(Number(valor))
            graficoRam.update()
        }

        
    }


    try {
        var respostaDisco = await fetch(`maquina/graficos/3/${idMaquina}/1`);
        var usoDisco = await respostaDisco.json();

        var respostaInfoDisco = await fetch(`maquina/componentes/3/${idMaquina}`)
        var InfoDisco = await respostaInfoDisco.json()
    

    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }

    if (respostaDisco.ok && respostaInfoDisco.ok) {

        document.getElementById("nome_disco").innerHTML = InfoDisco[0].nome
        document.getElementById("total_disco").innerHTML = InfoDisco[0].total

        dadosDisco.splice(0, 2, InfoDisco[0].total - usoDisco[0].valor_monitorado, usoDisco[0].valor_monitorado)
        graficoDisco.update()
    }
}

function fecharJanela(pid) {

    const rotaAPI = `/pages/dashboard/maquina/fechar-janela/${pid}`;


    const resposta = fetch(rotaAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    resposta.then(resposta => {

        if (resposta.ok) {
            
            alert("Deu certo")


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


function atualizacaoMaquina(idMaquina){
    buscarInfoMaquina(idMaquina)
    redenderizarGraficos(idMaquina)
    listarJanela(idMaquina)


    setTimeout(() => {  
        atualizacaoMaquina(idMaquina)
        
    }, 3000);
}