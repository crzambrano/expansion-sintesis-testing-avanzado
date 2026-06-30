# test_avanzado.py
from busqueda_binaria import buscar_binario

def ejecutar_pruebas_avanzadas():
    mi_lista = [10, 20, 30, 40, 50]
    
    # CP-01: Elemento en el medio (Decisión 1 -> True)
    assert buscar_binario(mi_lista, 30) == 2
    
    # CP-02: Elemento en la mitad derecha (Decisión 1 -> False, Decisión 2 -> True)
    assert buscar_binario(mi_lista, 50) == 4
    
    # CP-03: Elemento en la mitad izquierda (Decisión 1 -> False, Decisión 2 -> False)
    assert buscar_binario(mi_lista, 10) == 0
    
    # CP-04: Elemento inexistente / Menor (Bucle while -> Termina en False, retorna -1)
    assert buscar_binario(mi_lista, 5) == -1
    
    # CP-05: Elemento inexistente / Mayor (Prueba de límites vacíos)
    assert buscar_binario([], 10) == -1

    print("¡Todos los caminos lógicos han sido cubiertos con éxito!")

if __name__ == "__main__":
    ejecutar_pruebas_avanzadas()