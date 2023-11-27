
const  dataAviso = []
const  dataUrgente = []
const labelNoti = []

var barData = {
    labels: labelNoti,
    datasets: [
        {
            label: "Aviso",
            data: dataAviso,
            backgroundColor: '#DAC617',
        },
        {
            label: "Urgente",
            data: dataUrgente,
            backgroundColor: '#FF0000',
        }
    ]
};

var barCtx = document.getElementById('myBarChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: barData,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Quantidade de alertas ao longo do dia', // Aqui você define o título desejado
                font: {
                    size: 16,
                    color: '#000',
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // Remove a grade de fundo no eixo X
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false // Remove a grade de fundo no eixo Y
                }
            }
        }
    }
});


const statusData = []
// Gráfico de Rosca
var doughnutData = {
    // labels: ["Operação Normal", "Operação em Alerta", "Operação em Risco"],
    datasets: [
        {
            data: statusData,
            backgroundColor: ['#109A68', '#DAC617', '#FF0000'],
            borderRadius: 5,
        }
    ]
};



var doughnutCtx = document.getElementById('myDoughnutChart').getContext('2d');
const doughnutChart = new Chart(doughnutCtx, {
    type: 'doughnut',
    data: doughnutData,
});


const maquinasLigadaData = []
const maquinasDesligadaData = []
var horizontalBarCtx = document.getElementById('myHorizontalBarChart').getContext('2d');

var horizontalBarData = {
    labels: [""],
    datasets: [
        {
            label: "Em uso",
            data: maquinasLigadaData,
            backgroundColor: '#108456',
            barThickness: 20,
            borderRadius: 10,
            barPercentage: 1,
        },
        {
            label: "Desligados",
            data: maquinasDesligadaData,
            backgroundColor: '#7ACBAD',
            barThickness: 20,
            borderRadius: 10,
            barPercentage: 1,
        }
    ]
};

const horizontalBarChart = new Chart(horizontalBarCtx, {
    type: 'bar',
    data: horizontalBarData,
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                grid: {
                    display: false // Remove a grade de fundo no eixo X
                }
            },

            y: {
                beginAtZero: true,
                grid: {
                    display: false // Remove a grade de fundo no eixo Y
                }

            }
        }
    }
});

// CARROSSEL
