# busqueda_binaria.py

def buscar_binario(lista, objetivo):
    izquierda = 0
    derecha = len(lista) - 1
    
    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2
        
        if lista[medio] == objetivo:
            return medio  # Elemento encontrado (Decisión 1 - Rama True)
        elif lista[medio] < objetivo:
            izquierda = medio + 1  # Buscar en la mitad derecha (Decisión 2 - Rama True)
        else:
            derecha = medio - 1  # Buscar en la mitad izquierda (Decisión 2 - Rama False)
            
    return -1  # Elemento no encontrado (Bucle termina - Rama False)