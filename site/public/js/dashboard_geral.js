var barData = {
    labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    datasets: [
        {
            label: "Alerta",
            data: [40, 20, 150, 100, 40, 260, 356, 200, 170, 160, 190, 340, 40, 20],
            backgroundColor: '#DAC617',
        },
        {
            label: "Crítico",
            data: [40, 20, 150, 100, 40, 260, 356, 200, 170, 160, 190, 340, 40, 20],
            backgroundColor: '#FF0000',
        }
    ]
};

var barCtx = document.getElementById('myBarChart').getContext('2d');
var barChart = new Chart(barCtx, {
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


// Gráfico de Rosca
var doughnutData = {
    // labels: ["Operação Normal", "Operação em Alerta", "Operação em Risco"],
    datasets: [
        {
            data: [18, 4, 8],
            backgroundColor: ['#109A68', '#DAC617', '#FF0000'],
            borderRadius: 5,
        }
    ]
};

var doughnutCtx = document.getElementById('myDoughnutChart').getContext('2d');
var doughnutChart = new Chart(doughnutCtx, {
    type: 'doughnut',
    data: doughnutData,
});


var horizontalBarCtx = document.getElementById('myHorizontalBarChart').getContext('2d');

var horizontalBarData = {
    labels: [""],
    datasets: [
        {
            label: "Em uso",
            data: [30],
            backgroundColor: '#108456',
            barThickness: 20,
            borderRadius: 10,
            barPercentage: 1,
        },
        {
            label: "Desligados",
            data: [13],
            backgroundColor: '#7ACBAD',
            barThickness: 20,
            borderRadius: 10,
            barPercentage: 1,
        }
    ]
};

var horizontalBarChart = new Chart(horizontalBarCtx, {
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
