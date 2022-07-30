const Ficha = require('../models/fichaSolicitud.model');

function agregarFicha(req, res) {
    const parametros = req.body;
    const modeloFicha = new Ficha();

    if (parametros.nombre && parametros.carnet
        && parametros.direccion && parametros.genero
        && parametros.telefono && parametros.fechaNacimiento
        && parametros.carrera && parametros.generoDePoesia) {

        const diaPedido = new Date(Date.now());

        modeloFicha.nombre = parametros.nombre;
        modeloFicha.carnet = parametros.carnet;
        modeloFicha.direccion = parametros.direccion;
        modeloFicha.genero = parametros.genero;
        modeloFicha.telefono = parametros.telefono;
        modeloFicha.fechaNacimiento = parametros.fechaNacimiento;
        modeloFicha.carrera = parametros.carrera;
        modeloFicha.generoDePoesia = parametros.generoDePoesia;
        modeloFicha.fechaDeInscripción = diaPedido;



        Ficha.find({ nombre: parametros.nombre }, (err, nombreEncontrado) => {
            if (nombreEncontrado.length > 0) {
                return res.status(500).send({ mensaje: "Ya Existe este estudiante" });
            } else {
                Ficha.find({ carnet: parametros.carnet }, (err, carnetEncontrado) => {
                    if (carnetEncontrado.length > 0) {
                        return res.status(500).send({ mensaje: "Carnet ya utilizado" });
                    } else {

                        const nacimiento = new Date(parametros.fechaNacimiento);
                        const años = diaPedido.getFullYear() - nacimiento.getFullYear();
                        if (años < 17) {
                            return res.status(400).send({ mensaje: "Debe de tener mas de 17 años" });
                        } else {

                            const tercer5 = parametros.carnet.slice(2, 3);

                            if (tercer5 !== "5") {
                                return res.status(400).send({ mensaje: "El tercer digito del carnet debe ser 5" });
                              }else{

                            const letraA = parametros.carnet.slice(0, 1);

                            if (letraA != "A" && letraA != "a") {
                                return res.status(500).send({ mensaje: "El carnet debe tener una A o a, al principio" });
                            } else {

                                if (parametros.carnet.length != 6) {
                                    return res.status(500).send({ mensaje: "El carnet debe de tener 6 digitos" });
                                } else {
                                    if (parametros.carnet.split("")[parametros.carnet.length - 1] != 1 &&
                                        parametros.carnet.split("")[parametros.carnet.length - 1] != 3 &&
                                        parametros.carnet.split("")[parametros.carnet.length - 1] != 9) {
                                        return res.status(500).send({ mensaje: "el ultimo digito del carnet debe de ser 1, 3 o 9" });
                                    } else {



                                        function calculaEntregaFines(diaPedido, diasPactados,) {

                                            let diaPropuesto = new Date(diaPedido.getFullYear(), diaPedido.getMonth(), diaPedido.getDate());

                                            let i = 1;

                                            while (diasPactados > 0) {

                                                diaPropuesto = new Date(diaPedido.getFullYear(), diaPedido.getMonth(), diaPedido.getDate() + i);

                                                if (diaPropuesto.getDay() > 0 && diaPropuesto.getDay() < 6) {
                                                    diasPactados--;
                                                }
                                                i++;
                                            }

                                            return diaPropuesto;

                                        }

                                        function calculaEntregaFinMes(diaPedido, diasPactados,) {

                                            let diaPropuesto = new Date(diaPedido.getFullYear(), diaPedido.getMonth() + 1, 0);

                                            let i = 1;

                                            while (diasPactados == 0) {

                                                diaPropuesto = new Date(diaPedido.getFullYear(), diaPedido.getMonth() + 1, 0 - i);

                                                if (diaPropuesto.getDay() > 0 && diaPropuesto.getDay() < 6) {
                                                    diasPactados--;
                                                }
                                                i++;
                                            }

                                            return diaPropuesto;

                                        }

                                        if (parametros.carnet.split("")[parametros.carnet.length - 1] == 1 && parametros.generoDePoesia == "Dramático") {

                                            const diaEntrega = calculaEntregaFines(diaPedido, 5,);

                                            modeloFicha.fechaDeDeclamacion = diaEntrega;



                                            modeloFicha.save((err, fichaGuardada) => {
                                                if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                                                if (!fichaGuardada) return res.status(500).send({ mensaje: "Error al registrar Ficha" });

                                                return res.status(200).send({ ficha: fichaGuardada });
                                            })

                                        }

                                        if (parametros.carnet.split("")[parametros.carnet.length - 1] == 3 && parametros.generoDePoesia == "Épico") {

                                            const diaEntrega = calculaEntregaFinMes(diaPedido, 0,);

                                            modeloFicha.fechaDeDeclamacion = diaEntrega;


                                            modeloFicha.save((err, fichaGuardada) => {
                                                if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                                                if (!fichaGuardada) return res.status(500).send({ mensaje: "Error al registrar Ficha" });

                                                return res.status(200).send({ ficha: fichaGuardada });
                                            })

                                        } else {


                                            var viernes = new Date(diaPedido.getFullYear(), diaPedido.getMonth(), diaPedido.getDate());
                                            var Nday = (viernes.getDay() == 0) ? 7 : viernes.getDay();
                                            var SumDay = 7 - Nday;
                                            viernes.setDate(viernes.getDate() + SumDay + 5);

                                            modeloFicha.fechaDeDeclamacion = viernes;


                                            modeloFicha.save((err, fichaGuardada) => {
                                                if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                                                if (!fichaGuardada) return res.status(500).send({ mensaje: "Error al registrar Ficha" });

                                                return res.status(200).send({ ficha: fichaGuardada });
                                            })


                                        }


                                        /* sdasda */
                                    }
                                }
                            }
                        }
                    }
                    }
                })

            }
        }
        )
    } else {
        return res.status(500).send({ mensaje: "Debe enviar los parametros obligatorios" })
    }

}

function verFichas(req, res) {
    Ficha.find({}, (err, fichas) => {
        return res.status(200).send({ fichas: fichas })
    })
}



module.exports = {
    agregarFicha,
    verFichas
};
