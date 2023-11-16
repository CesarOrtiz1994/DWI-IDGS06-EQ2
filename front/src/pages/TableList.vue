<template>
  <form class="custom-form">
    <div class="form-group">
      <label for="titulo">Título</label>
      <input type="text" class="form-control" id="titulo" v-model="titulo" />
    </div>
    <div class="form-group">
      <label for="año">Año</label>
      <input type="number" class="form-control" id="año" v-model="año" />
    </div>
    <div class="form-group">
      <label for="autor">Autor</label>
      <input type="text" class="form-control" id="autor" v-model="autor" />
    </div>
    <div class="form-group">
      <label for="editorial">Editorial</label>
      <input type="text" class="form-control" id="editorial" v-model="editorial" />
    </div>
    <div class="form-group">
      <label for="categoría">Categoría</label>
      <input type="text" class="form-control" id="categoría" v-model="categoría" />
    </div>
    
    <div class="form-group">
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="submit" class="btn btn-secundary">Editar</button>
        <button type="submit" class="btn btn-danger">Eliminar</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      titulo: null,
      año: null,
      autor: null,
      editorial: null,
      categoría: null,
    };
  },
};
</script>

<style scoped>

.custom-form {
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
