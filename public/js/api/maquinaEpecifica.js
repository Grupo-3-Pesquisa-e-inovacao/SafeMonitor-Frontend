async function buscarInfoMaquina(idMaquina){
    
    try {
        var resposta = await fetch(`maquina/informacoes/${idMaquina}`)
    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }


    if (resposta.ok) {
        const dados = await resposta.json();
        console.log(dados)

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


        capturaComponente(idMaquina, 1, 1, "valorCPU")
        capturaComponente(idMaquina, 2, 1, "valorRAM")
        capturaComponente(idMaquina, 3, 1, "valorDISCO")

    }

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

        for (let i = 0; i < dados.length; i++) {

            janela.innerHTML = `
            <div class="instancias">
            <div class="iconApp">
                <button  onclick="fecharJanela(${dados[i].idJanela})">X</button>
            </div>

            <div class="instancia">${dados[i].titulo}</div>
            <div class="dtRegistro">${dados[i].caminho}/div>
        </div>

            `
            
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
            const valor = usoCPU[i].valor;

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
            const valor = usoRam[i].valor;

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

        dadosDisco.splice(0, 2, InfoDisco[0].total - usoDisco[0].valor, usoDisco[0].valor)
        graficoDisco.update()
    }




}


function atualizacaoMaquina(idMaquina){
    buscarInfoMaquina(idMaquina)
    redenderizarGraficos(idMaquina)


    // setTimeout(() => {  
    //     atualizacaoMaquina(idMaquina)
        
    // }, 1000);
}