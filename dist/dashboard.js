"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const predictive_model_js_1 = require("./predictive-model.js");
const app = (0, express_1.default)();
const PORT = 3000;
// Muestra de telemetría consolidada de las Partes 1 y 2
const telemetryData = [
    { name: "Algoritmo Búsqueda Binaria", cyclomaticComplexity: 3, usagePatternScore: 9, flakyTestsCount: 0 },
    { name: "Módulo de Autenticación de Usuarios", cyclomaticComplexity: 8, usagePatternScore: 10, flakyTestsCount: 2 },
    { name: "Generador de Reportes PDF (Legacy)", cyclomaticComplexity: 14, usagePatternScore: 2, flakyTestsCount: 5 }
];
// Endpoint API para que el dashboard consuma los datos procesados por el modelo predictivo
app.get('/api/metrics', (req, res) => {
    const processed = telemetryData.map(mod => {
        const fallas = predictive_model_js_1.ReliabilityPredictor.predictExpectedFailures(mod, 48);
        const salud = Math.max(0, 100 - (fallas * 7));
        return {
            ...mod,
            predictedFailures: fallas,
            healthScore: salud
        };
    });
    res.json(processed);
});
// Interfaz gráfica interactiva del Dashboard
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Dashboard Avanzado de Calidad y Confiabilidad</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f6f9; color: #333; }
            .header { background: #1e293b; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 20px; }
            .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            h2 { color: #0f172a; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
            th { background-color: #f8fafc; color: #64748b; }
            .badge { padding: 5px 10px; border-radius: 12px; font-size: 12px; font-weight: bold; }
            .badge-success { background: #dcfce7; color: #166534; }
            .badge-warning { background: #fef9c3; color: #854d0e; }
            .badge-danger { background: #fee2e2; color: #991b1b; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🔬 Trabajo Final: Expansión y Síntesis de Testing Avanzado</h1>
            <p>Monitoreo Predictivo en Tiempo Real | Modelo Logarítmico-Estocástico Integrado</p>
        </div>

        <div class="grid">
            <div class="card">
                <h2>🛡️ Índice de Confiabilidad por Módulo (%)</h2>
                <canvas id="healthChart"></canvas>
            </div>

            <div class="card">
                <h2>📊 Complejidad Ciclomática vs Fallas Predichas</h2>
                <canvas id="complexityChart"></canvas>
            </div>

            <div class="card" style="grid-column: span 2;">
                <h2>📋 Matriz Consolidada de Métricas de Software</h2>
                <table id="metricsTable">
                    <thead>
                        <tr>
                            <th>Módulo del Sistema</th>
                            <th>Complejidad Ciclomática</th>
                            <th>Criticidad de Uso</th>
                            <th>Flaky Tests</th>
                            <th>Fallas Estimadas [μ(t)]</th>
                            <th>Estado de Salud</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

        <script>
            // Consumir la API local para renderizar el Dashboard interactivo
            fetch('/api/metrics')
                .then(res => res.json())
                .then(data => {
                    const labels = data.map(m => m.name);
                    const healthScores = data.map(m => m.healthScore);
                    const complexities = data.map(m => m.cyclomaticComplexity);
                    const failures = data.map(m => m.predictedFailures);

                    // Render Tabla
                    const tbody = document.querySelector('#metricsTable tbody');
                    data.forEach(m => {
                        let badgeClass = m.healthScore > 80 ? 'badge-success' : (m.healthScore > 50 ? 'badge-warning' : 'badge-danger');
                        tbody.innerHTML += \`
                            <tr>
                                <td><strong>\${m.name}</strong></td>
                                <td>\${m.cyclomaticComplexity}</td>
                                <td>\${m.usagePatternScore}/10</td>
                                <td>\${m.flakyTestsCount}</td>
                                <td>\${m.predictedFailures}</td>
                                <td><span class="badge \${badgeClass}">\${m.healthScore.toFixed(1)}%</span></td>
                            </tr>
                        \`;
                    });

                    // Chart 1: Salud del Software
                    new Chart(document.getElementById('healthChart'), {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Salud Estimada (%)',
                                data: healthScores,
                                backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
                                borderRadius: 5
                            }]
                        },
                        options: { scales: { y: { min: 0, max: 100 } } }
                    });

                    // Chart 2: Complejidad vs Defectos
                    new Chart(document.getElementById('complexityChart'), {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [
                                { label: 'Complejidad Ciclomática', data: complexities, borderColor: '#3b82f6', tension: 0.1 },
                                { label: 'Fallas Predichas', data: failures, borderColor: '#ec4899', tension: 0.1 }
                            ]
                        }
                    });
                });
        </script>
    </body>
    </html>
  `);
});
app.listen(PORT, () => {
    console.log(`\n🌐 ¡Dashboard interactivo listo! Abre en tu navegador: http://localhost:${PORT}`);
});
