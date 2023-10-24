
    // GRAFICO WIFI
    var graficoWifi = document.getElementById('meuGraficoWifi').getContext('2d');

    var gradient = graficoWifi.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(169, 223, 216, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.4)'); 
    
    var wifiData = {
        labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        fontSize: '10px',
        datasets: [
            {
                label: "Consumo de Rede",
                data: [100, 60, 0, 0, 0,0, 0, 0, 0, 0,0, 0, 0, 0],
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                backgroundColor: gradient,
                pointRadius: 0,
            }
        ]
    };
    
    var lineChart = new Chart(graficoWifi, {
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
    
    var doughnutData = {
        datasets: [
            {
                data: [20, 80],
                backgroundColor: ['#109A68', '#FF0000'],
                borderRadius: 5,
            }
        ]
    };
    
    
    var doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: doughnutData,
    });
    
    
    // GRÁFICO RAM
    
    var graficoRam = document.getElementById('meuGraficoRam').getContext('2d');
    
    
    var lineData = {
        labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        fontSize: '10px',
        datasets: [
            {
                label: "Consumo de RAM",
                data: [0,20,30,50,70,50,64,59,49,58,63,70, 100, 100],
    
                fill: true,
                borderColor: 'rgb(220, 200, 230)',
                tension: 0.1,
                backgroundColor: "#FFDCFB",
                pointRadius: 5,
            }
        ]
    };
    
    var lineChart = new Chart(graficoRam, {
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
    
    var lineData = {
        labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        fontSize: '10px',
        datasets: [
            {
                label: "Consumo de CPU",
                data: [0, 20, 17, 19, 25, 25, 30, 39, 30, 37, 43, 50, 50, 50],
                fill: true,
                borderColor: 'rgb(147,112,219, 1)',
                tension: 0.1,
                backgroundColor: gradient,
                pointRadius: 0,
            }
        ]
    };
    
    var lineChart = new Chart(meuGraficoCPU, {
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
    });