const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const { connection } = require("../config.db");

const getProfesor = (request, response) => {
    connection.query("SELECT * FROM profesor",
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        });
};

//ruta
app.route("/profesor")
    .get(getProfesor);

module.exports = app;

//POST
const postProfesor = (request, response) => {
    const { nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email } = request.body;
    connection.query(
        "INSERT INTO profesor(nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email) VALUES (?,?,?,?,?,?,?)",
        [nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).json({ "profesor añadido correctamente": results.affectedRows });
        }
    );
};

app.route("/profesor")
    .post(postProfesor);

//DELETE

const delProfesor = (request, response) => {
    const id = request.params.id;
    connection.query(
        "DELETE FROM profesor WHERE profesor_id = ?",
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).json({ "profesor eliminado correctamente": results.affectedRows });
        }
    );
};

app.route("/profesor/:id")
    .delete(delProfesor);

module.exports = app;

