def busqueda_binaria(arr, target):
    izquierda = 0
    derecha = len(arr) - 1

    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2  # '//' asegura división entera

        if arr[medio] == target:
            return medio  # Elemento encontrado, retorna el índice

        if arr[medio] < target:
            izquierda = medio + 1
        else:
            derecha = medio - 1

    return -1  # Elemento no encontrado