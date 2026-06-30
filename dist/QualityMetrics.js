"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityEngine = void 0;
class QualityEngine {
    // 3.1. Cálculo analítico de la Complejidad Ciclomática (Métrica de McCabe: M = E - V + 2P)
    // Evaluado estáticamente sobre estructuras de control simplificadas de la prueba
    static calculateComplexity(testFn) {
        const fnString = testFn.toString();
        const branches = (fnString.match(/if|while|for|catch|&&|\|\|/g) || []).length;
        return branches + 1;
    }
    // 3.2. Detección de Pruebas Inestables (Flaky Tests) mediante re-ejecución adaptativa
    static async detectFlakyTest(testFn, iterations = 5) {
        let passes = 0;
        let failures = 0;
        for (let i = 0; i < iterations; i++) {
            try {
                await testFn();
                passes++;
            }
            catch {
                failures++;
            }
        }
        return passes > 0 && failures > 0; // Es flaky si a veces pasa y a veces falla bajo el mismo entorno
    }
}
exports.QualityEngine = QualityEngine;
