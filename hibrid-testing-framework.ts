// Mini-Framework Híbrido: Jasmine-Advanced Core
export class Spy {
  public calls: any[] = [];
  public originalFn?: Function;

  constructor(originalFn?: Function) {
    this.originalFn = originalFn;
  }
  
  exec(...args: any[]) {
    this.calls.push(args);
    if (this.originalFn) return this.originalFn(...args);
  }
}

export const jasmineAdvanced = {
  _suites: [] as { name: string, tests: { name: string, fn: Function }[] }[],
  _currentSuite: null as any,

  describe(name: string, fn: Function) {
    this._currentSuite = { name, tests: [] };
    this._suites.push(this._currentSuite);
    fn();
  },

  it(name: string, fn: Function) {
    this._currentSuite.tests.push({ name, fn });
  },

  expect(actual: any) {
    return {
      toBe(expected: any) {
        if (actual !== expected) throw new Error(`Expected ${actual} to be ${expected}`);
      },
      toContain(expected: any) {
        if (!actual.includes(expected)) throw new Error(`Expected ${actual} to contain ${expected}`);
      }
    };
  },

  createSpy(name: string, originalFn?: Function) {
    const spy = new Spy(originalFn);
    const spyFn = (...args: any[]) => spy.exec(...args);
    (spyFn as any).calls = spy.calls;
    return spyFn;
  },

  // Funcionalidad Avanzada: Generación automática de pruebas basada en tipos
  autoGenTypeTests(targetFn: Function, typeTemplate: 'string' | 'number' | 'array') {
    const edgeCases = {
      string: ['', ' ', 'A'.repeat(1000), '¿?*&'],
      number: [0, -1, NaN, Infinity, Number.MAX_SAFE_INTEGER],
      array: [[], [1], new Array(100).fill(0)]
    };

    edgeCases[typeTemplate].forEach((val, index) => {
      this.it(`Auto-Gen Type Test #${index} for ${targetFn.name} with input: ${JSON.stringify(val)}`, () => {
        // Ejecución de Robustez (Prueba de Integración Automática)
        targetFn(val); 
      });
    });
  },

  async runSuites() {
    console.log("🚀 Iniciando Ejecución del Framework Híbrido...");
    for (const suite of this._suites) {
      console.log(`\n📦 Suite: ${suite.name}`);
      for (const test of suite.tests) {
        const start = performance.now();
        try {
          await test.fn();
          const duration = performance.now() - start;
          console.log(`  ✅ [PASS] ${test.name} (${duration.toFixed(2)}ms)`);
        } catch (err: any) {
          console.error(`  ❌ [FAIL] ${test.name} -> ${err.message}`);
        }
      }
    }
  }
};