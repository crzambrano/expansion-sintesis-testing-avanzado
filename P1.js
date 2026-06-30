// busquedaBinaria.test.js
const busquedaBinaria = require('./busquedaBinaria');

describe('Pruebas Unitarias - Algoritmo de Búsqueda Binaria', () => {
    
    test('Debe encontrar un elemento presente en la mitad del arreglo', () => {
        const datos = [2, 4, 6, 8, 10];
        expect(busquedaBinaria(datos, 6)).toBe(2);
    });

    test('Debe encontrar un elemento situado en el límite inferior (inicio del arreglo)', () => {
        const datos = [1, 3, 5, 7, 9, 11];
        expect(busquedaBinaria(datos, 1)).toBe(0);
    });

    test('Debe encontrar un elemento situado en el límite superior (final del arreglo)', () => {
        const datos = [5, 10, 15, 20, 25];
        expect(busquedaBinaria(datos, 25)).toBe(4);
    });

    test('Debe retornar -1 si el elemento es menor que todos los valores del arreglo', () => {
        const datos = [10, 20, 30, 40];
        expect(busquedaBinaria(datos, 5)).toBe(-1);
    });

    test('Debe retornar -1 si el elemento es mayor que todos los valores del arreglo', () => {
        const datos = [10, 20, 30, 40];
        expect(busquedaBinaria(datos, 50)).toBe(-1);
    });

    test('Debe retornar -1 si el arreglo proporcionado está vacío', () => {
        const datos = [];
        expect(busquedaBinaria(datos, 10)).toBe(-1);
    });
});
