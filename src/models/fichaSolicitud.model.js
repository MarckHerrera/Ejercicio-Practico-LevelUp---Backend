const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FichaSchema = new Schema({
  nombre: String,
  carnet: String,
  direccion: String,
  genero: String,
  telefono: String,
  fechaNacimiento: Date,
  carrera: String,
  generoDePoesia: String,
  fechaDeInscripción: Date,
  fechaDeDeclamacion: Date,
});

module.exports = mongoose.model("Ficha", FichaSchema);