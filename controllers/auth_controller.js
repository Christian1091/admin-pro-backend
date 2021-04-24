const { response } = require('express');
const Usuario = require('../models/usuario_model');
const bcryptjs =  require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req, res =  response ) => {

    const { email, password } = req.body;

    try{

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password );
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no encontrada'
            });
        }

        // Generar el token - JWT
       const token = await generarJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    try{
        
        const { name, email, picture } = await googleVerify( googleToken );
        let usuario;

        // Verificar si el usuario existe
        const usuarioDB = await Usuario.findOne({ email });
    
        // Si no existe el usuario
        if( !usuarioDB ) {
            usuario =  new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
       }

       // Guardar en la BD
       await usuario.save();

       // Generar el token - JWT
       const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });
        
    }catch(error){
        //console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no es valido'
        });
    }
}

// Revalidar el token
const renewToken = async( req, res = response ) => {

    const uid = req.uid; 
    
    // Generar el token - JWT
     const token = await generarJWT( uid );

     // Obtener el usaurio por id
     const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}