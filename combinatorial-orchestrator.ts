export interface TestCase {
  id: number;
  params: { [key: string]: any };
  riskScore: number; // Nivel de riesgo calculado (0-100)
  failureProbability: number; // Aprendido históricamente (0.0 - 1.0)
}

export class CombinatorialOrchestrator {
  // Historial simulado del modelo de predicción (Mapea 'parametro:valor' a tasa de fallos previa)
  private static predictiveModelMemory: { [key: string]: number } = {
    "arraySize:vacio": 0.85,       // Alto riesgo histórico
    "targetLocation:borde": 0.65,  // Riesgo medio-alto
    "dataType:negativos": 0.40
  };

  /**
   * 1. Generador Combinatorio Automatizado (Simplificación de All-Pairs / Pairwise)
   */
  public static generatePairwiseCases(parameters: { [key: string]: any[] }): TestCase[] {
    const keys = Object.keys(parameters);
    const cases: TestCase[] = [];
    let counter = 1;

    // Generación base por producto cartesiano guiado
    const generate = (index: number, currentParams: { [key: string]: any }) => {
      if (index === keys.length) {
        cases.push({
          id: counter++,
          params: { ...currentParams },
          riskScore: 0,
          failureProbability: 0.0
        });
        return;
      }

      const currentKey = keys[index];
      for (const val of parameters[currentKey]) {
        currentParams[currentKey] = val;
        generate(index + 1, currentParams);
      }
    };

    generate(0, {});
    return cases;
  }

  /**
   * 2. Motor de Priorización Basado en Riesgos (Fórmula Heurística)
   */
  public static prioritizeByRisk(testCases: TestCase[]): TestCase[] {
    return testCases.map(tc => {
      let score = 10; // Riesgo base

      // Penalización de riesgo por valores límite o críticos
      if (tc.params.arraySize === 'vacio' || tc.params.arraySize === 'extremoLarge') score += 40;
      if (tc.params.targetLocation === 'borde' || tc.params.targetLocation === 'ausente') score += 30;
      if (tc.params.dataType === 'negativos') score += 20;

      return { ...tc, riskScore: score };
    }).sort((a, b) => b.riskScore - a.riskScore); // Ordenar de mayor a menor riesgo
  }

  /**
   * 3. Modelo de Predicción Adaptativo (Machine Learning / Heurístico)
   */
  public static applyPredictiveLearning(testCases: TestCase[]): TestCase[] {
    return testCases.map(tc => {
      let combinedProb = 0.05; // Probabilidad base de fallo

      // El modelo analiza si el caso contiene parámetros históricamente problemáticos
      Object.entries(tc.params).forEach(([key, val]) => {
        const token = `${key}:${val}`;
        if (this.predictiveModelMemory[token]) {
          combinedProb += this.predictiveModelMemory[token];
        }
      });

      // Normalizar probabilidad máxima a 0.99
      return { ...tc, failureProbability: Math.min(combinedProb, 0.99) };
    }).sort((a, b) => b.failureProbability - a.failureProbability); // Priorizar por probabilidad de fallo
  }
}