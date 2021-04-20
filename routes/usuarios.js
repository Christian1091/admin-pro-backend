/** 
 * 
 * Ruta: /api/usuarios 
 * 
 * */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios_controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsuarios );

/**Para implementar un middleware debemos mandar como segundo argumento 
 * y el tercero ya es el controlador, cuando vamos a implementar varios
 * middleware lo hacemos dentro de los corchetes
 */
router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contrase;a es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], 
    crearUsuarios
);

/**'/id' es para mandar el id del ususario que queremos actualizar */
router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    actualizarUsuario 
);

router.delete( '/:id',
    validarJWT,
    borrarUsuario 
);


// Exportamos el router
module.exports = router;