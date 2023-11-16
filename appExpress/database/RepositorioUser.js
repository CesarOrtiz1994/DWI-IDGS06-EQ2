const User = require('./models/User');

function RepositorioUsusario() {
    return {
        create : async (usuario) => {
            console.log(usuario)
             await User.create(usuario);
        },
        getAll : async () => {
            return await User.findAll();
        },
        getById : async (id) => {
            return Alumno.findAll({
                attributes: ['user_id', id]
            });
        },
    }
}

module.exports = RepositorioUsusario;