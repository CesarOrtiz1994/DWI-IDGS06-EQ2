<template>
  <div class="header-container">
    <h2>Administrar Categorías</h2>

    <form class="category-form">
      <div class="form-group">
        <label for="nombreCategoria">Nombre de Categoría</label>
        <input
          type="text"
          class="form-control"
          id="nombreCategoria"
          v-model="nombreCategoria"
          name="nombreCategoria"
          required
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="submit" class="btn btn-secundary">Editar</button>
        <button type="submit" class="btn btn-danger">Eliminar</button>
    </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      nombreCategoria: null,
      errors: {},
    };
  },
  methods: {
    agregarCategoria() {
      // Lógica para agregar la categoría
      console.log('Agregar categoría', this.id, this.nombreCategoria);
    },
    editarCategoria() {
      // Lógica para editar la categoría
      console.log('Editar categoría', this.id, this.nombreCategoria);
    },
    eliminarCategoria() {
      // Lógica para eliminar la categoría
      console.log('Eliminar categoría', this.id);
    },
  },
};
</script>

<style scoped>
.header-container {
  text-align: center;
  margin-bottom: 20px;
}

.category-form {
  max-width: 400px;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  margin-right: 20px;
}
.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secundary {
  background-color: #00ff8c;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secundary:hover {
  background-color: #0b7545;
}



.btn-danger {
  background-color: #e83e3e;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #861111;
}
</style>
