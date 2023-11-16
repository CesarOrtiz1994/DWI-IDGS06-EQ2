const Alumno = require('./models/Alumno');

function Repository() {
    return {
        create : async (student) => {
             await Alumno.create(student);
        },
        getAll : async () => {
            return await Alumno.findAll();
        },
        getById : async (id) => {
            return Alumno.findAll({
                attributes: ['alumno_id', id]
            });
        },
    }
}

module.exports = Repository;