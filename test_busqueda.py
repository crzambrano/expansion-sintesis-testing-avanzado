import unittest
from busqueda_binaria import busqueda_binaria

class TestBusquedaBinaria(unittest.TestCase):

    def test_elemento_en_el_medio(self):
        datos = [2, 4, 6, 8, 10]
        self.assertEqual(busqueda_binaria(datos, 6), 2)

    def test_limite_inferior(self):
        datos = [1, 3, 5, 7, 9, 11]
        self.assertEqual(busqueda_binaria(datos, 1), 0)

    def test_limite_superior(self):
        datos = [5, 10, 15, 20, 25]
        self.assertEqual(busqueda_binaria(datos, 25), 4)

    def test_elemento_menor_no_existente(self):
        datos = [10, 20, 30, 40]
        self.assertEqual(busqueda_binaria(datos, 5), -1)

    def test_elemento_mayor_no_existente(self):
        datos = [10, 20, 30, 40]
        self.assertEqual(busqueda_binaria(datos, 50), -1)

    def test_arreglo_vacio(self):
        datos = []
        self.assertEqual(busqueda_binaria(datos, 10), -1)

if __name__ == '__main__':
    unittest.main()