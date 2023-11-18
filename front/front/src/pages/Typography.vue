<template>
  <div>
    <button @click="agregarCategoria" class="botonAgregar">
      Agregar categoria</button>
    <table>
      <thead>
        <tr>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(libro, index) in listaDeLibros" :key="index">
          <td>{{ libro.categoria }}</td>
            <!-- Agregar botón de editar con el método correspondiente -->
            <td class="botonEditarEliminar">
              <button @click="editarCategoria(index)" class="btnEditar">Editar</button>
              <button @click="eliminarCategoria(index)" class="btnEliminar">Eliminar</button>
        </td>
      </tr>
    </tbody>
    </table>


    <!-- Ventana modal -->
       <!-- Ventana modal -->
       <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <div class="modal-header">
          <h2>{{ libroEditado ? 'Editar categoria' : 'Agregar nueva categoria' }}</h2>
          <span @click="cerrarModal" class="cerrar-modal">&times;</span>
        </div>
            <div class="modal-body">
              <!-- Agrega los campos necesarios para agregar un nuevo libro -->
              <input v-model="nuevaCategoria.categoria" placeholder="Categoria" />
            </div>
            <div class="modal-footer">
              <button @click="agregarCategoriaModal" class="btn-agregar">{{ libroEditado ? 'Editar' : 'Agregar' }}</button>
              <button @click="cerrarModal" class="btn-cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
</template>


<script>
export default {
  data() {
    return {
      listaDeLibros: [],
      mostrarModal: false,
      nuevaCategoria: {
        categoria: "",
      },
      libroEditado: null,
    };
  },
  methods: {
    agregarCategoria() {
      this.mostrarModal = true;
      // Resetea el objeto nuevaCategoria al agregar un nuevo libro
      this.nuevaCategoria = {
        titulo: "",
      };
    },
    agregarCategoriaModal() {
      if (this.libroEditado !== null) {
        // Edita el libro existente
        const index = this.listaDeLibros.indexOf(this.libroEditado);
        this.listaDeLibros.splice(index, 1, { ...this.nuevaCategoria });
        this.libroEditado = null; // Reinicia libroEditado
      } else {
        // Agrega un nuevo libro
        this.listaDeLibros.push({ ...this.nuevaCategoria });
      }

      this.mostrarModal = false;
      // Limpia los campos después de agregar/editar el libro
      this.nuevaCategoria = {
        titulo: "",
        ano: "",
        autor: "",
        editorial: "",
        categoria: "",
      };
    },
    editarCategoria(index) {
      this.libroEditado = { ...this.listaDeLibros[index] };
      this.mostrarModal = true;
      // Inicializa nuevaCategoria con los valores del libro a editar
      this.nuevaCategoria = { ...this.libroEditado };
    },
    eliminarCategoria(index) {
      this.listaDeLibros.splice(index, 1);
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.libroEditado = null;
    },
  },
};
</script>

<style scoped>
/* Estilos CSS aquí */
.botonEditarEliminar {
    display: flex;
    gap: 10px;
    justify-content: flex-end; /* Alinea los elementos al final del contenedor */
    text-align: right;
}

.botonEditarEliminar button {
    padding: 8px 15px;
    cursor: pointer;
    background-color: #4c96af;
    border: none;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;
    margin-right: -162px;
}

.botonEditarEliminar button.btnEliminar {
    background-color: #f44336;
}

.botonEditarEliminar button:hover {
    background-color: #b9c8ba;
}

/* Estilos para la ventana modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-contenido {
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-header h2 {
  margin: 0;
}

.cerrar-modal {
  cursor: pointer;
  font-size: 20px;
  color: #555;
}

.modal-body input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-agregar,
.btn-cancelar {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
}

.btn-agregar {
  background-color: #4caf50;
  color: white;
}

.btn-cancelar {
  background-color: #ccc;
  color: #333;
}


.botonAgregar {
  position: absolute;
  top: 70px;
  right: 52px;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.botonAgregar:hover {
  background-color: #45a049;
}

.acciones {
  position: absolute;
  top: 130px;
  right: 2px;
  margin: 10px;
}

.acciones button {
  background-color: rgb(233, 18, 46);
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
  margin-top: -15px;
}

.acciones button:hover {
  background-color: rgb(134, 11, 11);
}

.acciones2 {
  position: absolute;
  top: 130px;
  right: 65px;
  margin: 10px;
}

.acciones2 button {
  background-color: #1a71c8;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
  margin-top: -15px;
}

.acciones2 button:hover {
  background-color: #1766b6
}

table {
  width: 80%;
  margin-left: 50px auto;
  border-collapse: collapse;
}

th,
td {
  border: -1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
