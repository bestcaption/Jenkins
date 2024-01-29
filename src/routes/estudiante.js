const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const { connection } = require("../config.db");

const getEstudiante = (request, response) => {
    connection.query("SELECT * FROM estudiante",
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        });
};

//ruta
app.route("/estudiante")
    .get(getEstudiante);

module.exports = app;

//POST
const postEstudiante = (request, response) => {
    const { nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email } = request.body;
    connection.query(
        "INSERT INTO estudiante(nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email) VALUES (?,?,?,?,?,?,?)",
        [nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).json({ "Estudiante añadido correctamente": results.affectedRows });
        }
    );
};

app.route("/estudiante")
    .post(postEstudiante);

//DELETE

const delEstudiante = (request, response) => {
    const id = request.params.id;
    connection.query(
        "DELETE FROM estudiante WHERE estudiante_id = ?",
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).json({ "Estudiante eliminado correctamente": results.affectedRows });
        }
    );
};

app.route("/estudiante/:id")
    .delete(delEstudiante);

module.exports = app;

