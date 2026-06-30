// busquedaBinaria.js

/**
 * Ejecuta una búsqueda binaria sobre un arreglo ordenado de números.
 * @param {number[]} arr - El arreglo ordenado donde se buscará.
 * @param {number} target - El número que se desea encontrar.
 * @returns {number} El índice del elemento si se encuentra, o -1 si no existe.
 */
function busquedaBinaria(arr, target) {
    let izquierda = 0;
    let derecha = arr.length - 1;

    while (izquierda <= derecha) {
        // Se calcula el punto medio usando Math.floor para evitar decimales
        let medio = Math.floor((izquierda + derecha) / 2);

        if (arr[medio] === target) {
            return medio; // Elemento encontrado, se retorna el índice
        }

        if (arr[medio] < target) {
            izquierda = medio + 1; // Buscar en la mitad derecha
        } else {
            derecha = medio - 1; // Buscar en la mitad izquierda
        }
    }

    return -1; // Elemento no encontrado
}

module.exports = busquedaBinaria;
