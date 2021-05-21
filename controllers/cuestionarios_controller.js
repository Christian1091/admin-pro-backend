const { response } = require('express');

const Cuestionario = require('../models/cuestionario_model');

const getCuestionarios = async ( req, res = response ) => {
    
    //const cuestionarios = await Cuestionario.find().populate('usuario', 'nombre')                                              

    res.json({
        ok: true,
        cuestionarios
    })
}

const crearCuestionarios = async ( req, res = response ) => {

    /**Extraemos el id del usuario de quien esta grabando
     * uid => id del usuario
     */
    const uid = req.uid;

    /**
       el req.body contiene todo lo que tenemos en el model cuestionario, es decir
       el nombre, la descripcion, la fecha, si esta activo, etc.
      
       Ahora mandamos el uid antes de guardar, es decir antes del save, para ello desestructuramos
       new Cuestionario y vamos a mandar todo lo que esta en el body con el ...req.body y con el 
       uid del usuario
     */
    
    const cuestionario = new Cuestionario({
        usuario: uid,
        ...req.body
    });

    //console.log(uid)

    try {

        const cuestionarioDB = await cuestionario.save();

        res.json({
            ok:true,
            cuestionario: cuestionarioDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const actualizarCuestionarios = ( req, res = response ) => {
    res.json({
        ok:true,
        msg:'actualizarCuestionarios'
    })
}

const borrarCuestionarios = ( req, res = response ) => {
    res.json({
        ok:true,
        msg:'borrarCuestionarios'
    })
}

module.exports = {
    getCuestionarios,
    crearCuestionarios,
    actualizarCuestionarios,
    borrarCuestionarios
}