const Usuario = require('./models/Usuarios');

function RepositorioUsuarios() {
    return {
        create : async (usuario) => {
            console.log(usuario)
             await Usuario.create(usuario);
        },
        getAll : async () => {
            return await Usuario.findAll();
        },
        getById : async (id) => {
            return Usuario.findAll({
                attributes: ['user_id', id]
            });
        },
        update : async (id, usuario) => {
            return Usuario.update(usuario, {
                where: {
                    user_id: id
                }
            });
        },
        delete : async (id) => {
            return Usuario.destroy({
                where: {
                    user_id: id
                }
            });
        },
        login : async (login) =>{
            return Usuario.findAll({
                where: {
                    email: login.user_id,
                    password: login.password
                }
            });
        }
    }
}

module.exports = RepositorioUsuarios;