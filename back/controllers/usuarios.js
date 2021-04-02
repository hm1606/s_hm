const {
    response,
    request
} = require('express');
const {
    connection
} = require('../mysql/mysql');
const bcrypt = require('bcrypt');


const usuariosGet = (req = request, res = response) => {
    // const {nombre="no name",idKey="no key"} = req.query;
    let consulta = `SELECT*FROM Usuarios`;
    connection(consulta, (err, results) => {
        if (err) {
            return res.status(400).json({
                err,
                message: 'Error en la operación'
            });
        }
        if (!results[0]) {
            return res.status(400).json({
                ok: false,
                message: 'Aún no éxisten registros.'
            });
        }
        res.status(200).json({
            ok: true,
            message: "Consulta éxitosa.",
            data: results
        })
    });

}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.status(400).json({
        ok: true,
        msg: "put API - controlador",
        id: id
    })
}

const usuariosPost = (req, res = response) => {
    let body = req.body;
    let query = `INSERT INTO Company.Usuarios (`;
    let into = ``;
    let values = `) VALUES (`;
    body.status = 0; //Creamos el status del registro
    console.log(body);

    //Construimos la consulta (into) VALUES (values)
    for (x in body) {
        if (x == 'password') {
            body[`${x}`] = bcrypt.hashSync(body[`${x}`], 10)
        }
        into += `${x},`
        values += `'${body[`${x}`]}',`
    }
    into = into.slice(0, -1); //Eliminamos la última "," de la cadena que construimos
    values = values.slice(0, -1); //Eliminamos la última "," de la cadena que construimos
    query += `${into}${values})`;
    console.log(query);

    if (!body.user) {
        return res.status(400).json({
            ok: false,
            message: 'Todos los campos son obligatorios',
        });
    }

    connection(query, (err, results) => {
        if (err) {
            return res.status(400).json({
                err,
                message: 'Error en la operación'
            });
        }
        
        res.status(200).json({
            ok: true,
            message: "Operación éxitosa.",
            data: results
        })
    });
}



const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: "delete API controlador"
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};