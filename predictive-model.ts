export interface ModuleData {
  name: string;
  cyclomaticComplexity: number;
  usagePatternScore: number; // 1 (bajo) a 10 (crítico/frecuente)
  flakyTestsCount: number;
}

export class ReliabilityPredictor {
  // Parámetros históricos calibrados del sistema (Beta 0 y Beta 1)
  private static BETA_0 = 5.4;
  private static BETA_1 = 0.12;

  /**
   * Ejecuta el modelo logarítmico-estocástico integrado
   * @param module Datos de telemetría del módulo
   * @param executionTime Horas o ciclos de ejecución en el pipeline (t)
   */
  public static predictExpectedFailures(module: ModuleData, executionTime: number): number {
    // 1. Componente Logarítmico Base (Musa-Okumoto)
    const logarithmicBase = this.BETA_0 * Math.log(1 + this.BETA_1 * executionTime);

    // 2. Componente Estocástico de Penalización (Complejidad, Uso y Flakiness)
    const kappa = module.flakyTestsCount > 0 ? 1.0 + (module.flakyTestsCount * 0.15) : 1.0;
    const exponent = -module.cyclomaticComplexity / (kappa * module.usagePatternScore);
    const stochasticModifier = Math.exp(exponent);

    // 3. Predicción Integrada Final
    const rawPrediction = logarithmicBase * (1 - stochasticModifier);
    
    // Retornar número de fallas estimadas esperado (mínimo 0)
    return Math.max(0, parseFloat(rawPrediction.toFixed(2)));
  }
}

// =====================================================================
//  SCRIPT DE EJECUCIÓN Y PRUEBA DEL MODELO PREDICTIVO
// =====================================================================

const modulosSistema: ModuleData[] = [
  { name: "Algoritmo Búsqueda Binaria", cyclomaticComplexity: 3, usagePatternScore: 9, flakyTestsCount: 0 },
  { name: "Módulo de Autenticación de Usuarios", cyclomaticComplexity: 8, usagePatternScore: 10, flakyTestsCount: 2 },
  { name: "Generador de Reportes PDF (Legacy)", cyclomaticComplexity: 14, usagePatternScore: 2, flakyTestsCount: 5 }
];

console.log("=====================================================================");
console.log("     PROYECTO FINAL: SIMULACIÓN DE MODELOS PREDICTIVOS DE CALIDAD     ");
console.log("=====================================================================\n");

console.log("Predicción de fallas esperadas tras 48 horas de ejecución continua en CI/CD:");

modulosSistema.forEach(modulo => {
  const fallasEstimadas = ReliabilityPredictor.predictExpectedFailures(modulo, 48);
  const confiabilidadPorcentaje = Math.max(0, 100 - (fallasEstimadas * 7)); // Simulación de porcentaje de salud
  
  console.log(`\n📦 Módulo: ${modulo.name}`);
  console.log(`   📊 Complejidad Ciclomática: ${modulo.cyclomaticComplexity}`);
  console.log(`   🤖 Fallas acumuladas predichas [μ(t)]: ${fallasEstimadas} errores.`);
  console.log(`   🛡️ Índice de Confiabilidad Estimado: ${confiabilidadPorcentaje.toFixed(1)}%`);
});
