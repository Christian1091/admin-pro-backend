    const getMenuFrontEnd = ( role = 'USER_ROLE') => {
    
    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/'},
            { titulo: 'Rxjs', url: 'rxjs'},
            { titulo: 'ProgressBar', url: 'progress'},
            { titulo: 'Promesas', url: 'promesas'},
            { titulo: 'Graficas', url: 'grafica1'},
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{ titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Hospitales', url: 'hospitales' },
            { titulo: 'Medicos', url: 'medicos' },
          ]
        },
      ];

      if ( role === 'ADMIN_ROLE' ) {
          /**Como lo que queremos mostrar esta en un arreglo, ponemos el [1]
           * el unshift nos permite anadir a la primera posicion 
           */
          menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })

      }
      return menu;
}

module.exports = {
    getMenuFrontEnd
}