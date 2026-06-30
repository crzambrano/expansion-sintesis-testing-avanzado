"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jasmineAdvanced = exports.Spy = void 0;
// Mini-Framework Híbrido: Jasmine-Advanced Core
class Spy {
    calls = [];
    originalFn;
    constructor(originalFn) {
        this.originalFn = originalFn;
    }
    exec(...args) {
        this.calls.push(args);
        if (this.originalFn)
            return this.originalFn(...args);
    }
}
exports.Spy = Spy;
exports.jasmineAdvanced = {
    _suites: [],
    _currentSuite: null,
    describe(name, fn) {
        this._currentSuite = { name, tests: [] };
        this._suites.push(this._currentSuite);
        fn();
    },
    it(name, fn) {
        this._currentSuite.tests.push({ name, fn });
    },
    expect(actual) {
        return {
            toBe(expected) {
                if (actual !== expected)
                    throw new Error(`Expected ${actual} to be ${expected}`);
            },
            toContain(expected) {
                if (!actual.includes(expected))
                    throw new Error(`Expected ${actual} to contain ${expected}`);
            }
        };
    },
    createSpy(name, originalFn) {
        const spy = new Spy(originalFn);
        const spyFn = (...args) => spy.exec(...args);
        spyFn.calls = spy.calls;
        return spyFn;
    },
    // Funcionalidad Avanzada: Generación automática de pruebas basada en tipos
    autoGenTypeTests(targetFn, typeTemplate) {
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
                }
                catch (err) {
                    console.error(`  ❌ [FAIL] ${test.name} -> ${err.message}`);
                }
            }
        }
    }
};
