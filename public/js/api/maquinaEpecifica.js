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
        document.getElementById("processador").innerHTML = dados.arquitetura
        document.getElementById("totalRam").innerHTML = dados.arquitetura
        document.getElementById("totalDisco").innerHTML = dados.arquitetura
        document.getElementById("numSerie").innerHTML = dados.numero_serie
        document.getElementById("ipv4").innerHTML = dados.numero_serie
        document.getElementById("nome-sala-computador").innerHTML = dados.nome
        document.getElementById("id-computador").innerHTML = dados.idMaquina


        capturaComponente(idMaquina, 1, 1, "valorCPU")
        capturaComponente(idMaquina, 2, 1, "valorRAM")
        capturaComponente(idMaquina, 3, 1, "valorDISCO")

    }

}


async function redenderizarGraficos(idMaquina){
    try {
        var respostaCPU = await fetch(`maquina/graficos/1/${idMaquina}/12`);

        var usoCPU = await respostaCPU.json();

    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }

    if (respostaCPU.ok) {
      
        for (let i = 0; i < usoCPU.length; i++) {
            const valor = usoCPU[i].valor;

            dadosCPU.push(Number(valor))
            
        }

        cpuChart.update()
    }

    try {
        var respostaRam = await fetch(`maquina/graficos/2/${idMaquina}/10`);
        var usoRam = await respostaRam.json();


    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }

    if (respostaRam.ok) {
      
        for (let i = 0; i < usoRam.length; i++) {
            const valor = usoRam[i].valor;

            dadosRam.push(Number(valor))

            
        }

        graficoRam.update()
    }


    try {
        var respostaDisco = await fetch(`maquina/graficos/3/${idMaquina}/1`);
        var usoDisco = await respostaDisco.json();

        var respostaInfoComponentes = await fetch(`maquina/componentes/3/${idMaquina}`)
        var InfoComponentes = await respostaInfoComponentes.json()
    

    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }

    if (respostaDisco.ok && respostaInfoComponentes.ok) {
        dadosDisco.splice(0, 2, InfoComponentes[0].total - usoDisco[0].valor, usoDisco[0].valor)
        graficoDisco.update()
    }




}


function atualizacaoMaquina(idMaquina){
    buscarInfoMaquina(idMaquina)
    redenderizarGraficos(idMaquina)
}