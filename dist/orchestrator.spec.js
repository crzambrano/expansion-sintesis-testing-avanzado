"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combinatorial_orchestrator_js_1 = require("./combinatorial-orchestrator.js");
// Definición del Espacio de Parámetros para Búsqueda Binaria
const variablesDeEntrada = {
    arraySize: ['vacio', 'pequeño', 'extremoLarge'],
    targetLocation: ['inicio', 'medio', 'borde', 'ausente'],
    dataType: ['positivos', 'negativos']
};
console.log("=====================================================================");
console.log("       EJECUTANDO ORQUESTRADOR DE PRUEBAS COMBINATORIAS AVANZADAS     ");
console.log("=====================================================================\n");
// 1. Generación
const casosCrudos = combinatorial_orchestrator_js_1.CombinatorialOrchestrator.generatePairwiseCases(variablesDeEntrada);
console.log(`[Generador] Casos combinatorios iniciales generados: ${casosCrudos.length}`);
// 2. Priorización por Riesgo
const casosPriorizados = combinatorial_orchestrator_js_1.CombinatorialOrchestrator.prioritizeByRisk(casosCrudos);
// 3. Optimización por Aprendizaje Predictivo
const casosConPrediccion = combinatorial_orchestrator_js_1.CombinatorialOrchestrator.applyPredictiveLearning(casosPriorizados);
// Mostrar el Top 5 de pruebas críticas recomendadas por el modelo para el Dashboard
console.log("\n🎯 TOP 5 CASOS DE PRUEBA CRÍTICOS RECOMENDADOS (Optimización de Pipeline):");
casosConPrediccion.slice(0, 5).forEach(tc => {
    console.log(`\n📋 Test Case ID: #${tc.id}`);
    console.log(`   🛠️ Configuración: ${JSON.stringify(tc.params)}`);
    console.log(`   ⚠️ Puntaje de Riesgo: ${tc.riskScore}/100`);
    console.log(`   🤖 Probabilidad de Fallo Estimada: ${(tc.failureProbability * 100).toFixed(1)}%`);
});
