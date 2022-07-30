const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FichaSchema = new Schema({
  nombre: String,
  carnet: String,
  direccion: String,
  genero: String,
  telefono: String,
  fechaNacimiento: Date,
  fechaNacimientoTxt: String,
  carrera: String,
  generoDePoesia: String,
  fechaDeInscripcion: Date,
  fechaDeInscripcionTxt: String,
  fechaDeDeclamacion: Date,
  fechaDeDeclamacionTxt: String,
});

module.exports = mongoose.model("Ficha", FichaSchema);