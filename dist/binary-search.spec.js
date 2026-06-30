"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarySearch = binarySearch;
const hibrid_testing_framework_1 = require("./hibrid-testing-framework");
// Implementación de Búsqueda Binaria Equilibrada
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target)
            return mid;
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}
// SUITE DE PRUEBAS EXTENDIDA
hibrid_testing_framework_1.jasmineAdvanced.describe("Extensión de Pruebas: Búsqueda Binaria", () => {
    // 1. Property-Based Testing (Simulación manual de invariantes)
    hibrid_testing_framework_1.jasmineAdvanced.it("Property-Based: El resultado debe ser un índice válido o -1 para 100 arreglos aleatorios ordenados", () => {
        for (let i = 0; i < 100; i++) {
            const size = Math.floor(Math.random() * 50) + 1;
            const randomArr = Array.from({ length: size }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
            const target = randomArr[Math.floor(Math.random() * size)];
            const resultIndex = binarySearch(randomArr, target);
            if (resultIndex !== -1) {
                hibrid_testing_framework_1.jasmineAdvanced.expect(randomArr[resultIndex]).toBe(target); // Invariante: El valor en el índice debe ser el objetivo
            }
        }
    });
    // 2. Mutation Testing (Simulación de mutante de operador relacional de frontera de bucle)
    hibrid_testing_framework_1.jasmineAdvanced.it("Mutation Testing: Debería fallar si cambiamos el operador de frontera (Simulación de Mutante left < right)", () => {
        const arrayControl = [1, 3, 5, 7, 9];
        // Si un mutante altera "left <= right" por "left < right", el elemento de frontera (9) fallará.
        const result = binarySearch(arrayControl, 9);
        hibrid_testing_framework_1.jasmineAdvanced.expect(result).toBe(4); // Si da 4, el mutante fue exitosamente MATADO por la prueba.
    });
    // 3. Contract Testing (Prueba de Contrato de Precondición y Postcondición)
    hibrid_testing_framework_1.jasmineAdvanced.it("Contract Testing: El contrato exige que la entrada esté ordenada. Postcondición garantiza consistencia.", () => {
        const inputContrato = [10, 20, 30, 40]; // Precondición: Cumple ordenamiento estricto
        const index = binarySearch(inputContrato, 30);
        // Verificación de Postcondición contractual
        hibrid_testing_framework_1.jasmineAdvanced.expect(index).toBe(2);
    });
    // Pruebas Automatizadas Basadas en Tipos (Sección 1 integrada)
    hibrid_testing_framework_1.jasmineAdvanced.autoGenTypeTests(binarySearch, 'array');
});
// Ejecutar el motor
hibrid_testing_framework_1.jasmineAdvanced.runSuites();
