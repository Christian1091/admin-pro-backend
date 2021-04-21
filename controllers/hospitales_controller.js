const { response } = require('express');
const Hospital = require('../models/hospital_model');

const getHospitales = async( req, res = response ) => {

    /**Populate nos permite mostrar los datos del usuario en el json al consultar */
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    res.json({
        ok: true,
        // aqui muestra el listado de todos los hospitales
        hospitales
    })

}

const crearHospitales = async( req, res = response ) => {

    // obtener el id del usuario
    const uid = req.uid;
    const hospital =  new Hospital( {
        usuario: uid,
        ...req.body // campos que viene desde el body
    } );

    try{

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
   

}

const actualizarHospitales = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })

}

const borrarHospitales = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })

}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}