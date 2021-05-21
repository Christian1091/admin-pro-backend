/**
 * Cuestionarios
 * /api/cuestionarios
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
 const { crearCuestionarios, actualizarCuestionarios, borrarCuestionarios, getCuestionarios } = require('../controllers/cuestionarios_controller');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 router.get( '/', validarJWT, getCuestionarios );
 
 /**Para implementar un middleware debemos mandar como segundo argumento 
  * y el tercero ya es el controlador, cuando vamos a implementar varios
  * middleware lo hacemos dentro de los corchetes
  */
 router.post( '/',
   //  [ 
   //      validarJWT,
   //      check('nombre', 'El nombre del cuestionario es necesario').not().isEmpty(),
   //      check('descripcion', 'La descripcion del cuestionario es necesario').not().isEmpty(),
   //      // check('fecha', 'La fecha es necesario').not().isEmpty(),
   //      check('activo', 'El estado del cuestionario es necesario').not().isEmpty(),
   //      validarCampos
   //  ], 
    crearCuestionarios
 );
 
 /**'/id' es para mandar el id del ususario que queremos actualizar */
 router.put( '/:id',
    [],
    actualizarCuestionarios 
     
 );
 
 router.delete( '/:id',
    [],
    borrarCuestionarios
 );
 
 
 // Exportamos el router
 module.exports = router;