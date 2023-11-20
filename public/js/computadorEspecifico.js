
    // GRAFICO WIFI
    var graficoWifi = document.getElementById('meuGraficoWifi').getContext('2d');

    var gradient = graficoWifi.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(169, 223, 216, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.4)'); 
    
    
    
    const labelWifi = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
    const dadosWifi = [100, 60, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0]

    var wifiData = {
        labels: labelWifi,
        fontSize: '10px',
        datasets: [
            {
                label: "Consumo de Rede",
                data: dadosWifi,
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                backgroundColor: gradient,
                pointRadius: 0,
            }
        ]
    };

    
    var wifiChart = new Chart(graficoWifi, {
        type: 'line',
        data: wifiData,
        options: {
            scales: {
                y: {
                    grid: {
                        display: false,
                        
                    }
                },
                x: {
                    grid: {
                        display: false 
                    }
                }
            }
        }
    })
    
    
    // GRÁFICO DISCO
    
    var graficoDisco = document.getElementById('meuGraficoDisco').getContext('2d');
    var doughnutCtx = document.getElementById('meuGraficoDisco').getContext('2d');
    
    var gradient = graficoDisco.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(169, 223, 216, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)'); 

    const dadosDisco = [20, 70]
    
    var doughnutData = {
        datasets: [
            {
                data: dadosDisco,
                backgroundColor: ['#109A68', '#FF0000'],
                borderRadius: 5,
            }
        ]
    };
    
    
    var graficoDisco = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: doughnutData,
    });
    
    
    // GRÁFICO RAM
    
    var divGraficoRam = document.getElementById('meuGraficoRam').getContext('2d');

    const labelRam = ["60s", '', '', '', '', '', '', '', '','']
    const dadosRam = []
    
    var lineData = {
        labels: labelRam,
        fontSize: '10px',
        datasets: [
            {
                label: "Consumo de RAM",
                data: dadosRam,
                fill: true,
                borderColor: 'rgb(220, 200, 230)',
                tension: 0.1,
                backgroundColor: "#FFDCFB",
                pointRadius: 5,
            }
        ]
    };
    
    var graficoRam = new Chart(divGraficoRam, {
        type: 'line',
        data: lineData,
        options: {
            scales: {
                y: {
                    grid: {
                        display: false,
                        
                    }
                },
                x: {
                    grid: {
                        display: false 
                    }
                }
            }
        }
    })
    
    // GRÁFICO CPU
    
    var meuGraficoCPU = document.getElementById('meuGraficoCPU').getContext('2d');
    
    
    var gradient = meuGraficoCPU.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(147,112,219, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 

    const labelCPU = ["60s", '', '', '', '', '', '', '', '','']
    const dadosCPU= [12, 16]
    
    var CPUData = {
        labels: labelCPU,
        fontSize: '10px',
        datasets: [
            {
                label: "Consumo de CPU",
                data: dadosCPU,
                fill: true,
                borderColor: 'rgb(147,112,219, 1)',
                tension: 0.1,
                backgroundColor: gradient,
                pointRadius: 0,
            }
        ]
    };
    
    var cpuChart = new Chart(meuGraficoCPU, {
        type: 'line',
        data: CPUData,
        options: {
            scales: {
                y: {
                    grid: {
                        display: false,
                        
                    }
                },
                x: {
                    grid: {
                        display: false 
                    }
                }
            }
        }
    });

