# test_inicial.py
from busqueda_binaria import buscar_binario

def ejecutar_pruebas_iniciales():
    mi_lista = [10, 20, 30, 40, 50]
    
    # Caso 1: El elemento está exactamente en el medio
    assert buscar_binario(mi_lista, 30) == 2
    
    print("¡Pruebas iniciales ejecutadas con éxito!")

if __name__ == "__main__":
    ejecutar_pruebas_iniciales()