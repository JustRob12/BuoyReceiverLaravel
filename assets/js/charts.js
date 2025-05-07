async function fetchData() {
    try {
        const response = await fetch('api/get_data.php');
        const result = await response.json();
        if (result.status === 'success') {
            return result.data;
        }
        throw new Error(result.message);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function createChart(canvasId, label, data, yAxisLabel) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => `${d.date} ${d.time}`),
            datasets: [{
                label: label,
                data: data.map(d => d[label.toLowerCase()]),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: yAxisLabel
                    }
                }
            }
        }
    });
}

function createLocationChart(data) {
    const locationCtx = document.getElementById('locationChart').getContext('2d');
    return new Chart(locationCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Buoy Location',
                data: data.map(d => ({
                    x: d.longitude,
                    y: d.latitude
                })),
                backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Longitude'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Latitude'
                    }
                }
            }
        }
    });
}

async function initializeCharts() {
    const data = await fetchData();
    
    createChart('phChart', 'ph', data, 'pH Level');
    createChart('temperatureChart', 'temperature', data, 'Temperature (°C)');
    createChart('tdsChart', 'tds', data, 'TDS (ppm)');
    createLocationChart(data);
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', initializeCharts);

// Refresh data every 5 minutes
setInterval(initializeCharts, 300000); 