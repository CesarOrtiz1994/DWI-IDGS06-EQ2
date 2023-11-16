const bcrypt = require('bcrypt');
function ControllerUsuario(repository){
    return {
        obtenerUsuario: async() => {
            return await repository.getAll();
        },
        obtenerUsuarioPorId: async(id) => {
            return await repository.getById(id);
        },
        validarLoginUsuario: async(username, myPlainPassword) => {
            const user = await repository.getById(username);
            if(!user)
                return false;
            const result = await bcrypt.compare(myPlainPassword, user.password);
            console.log("res" + result)
            return result
        },
    }
}