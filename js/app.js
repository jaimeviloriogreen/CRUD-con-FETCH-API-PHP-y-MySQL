'use strict'
import * as funciones from '/js/funciones.js';

// Mostrar
    funciones.formulario.addEventListener('submit', funciones.mostrar);

// Actualizar Inputs
   funciones.respuesta.addEventListener('click', funciones.actualizar);

// Entradas y actualizaciones a MySQL
   funciones.formularioEntrada.addEventListener('submit', funciones.entrarActualizar);

// Alertas
   funciones.alerta.addEventListener('click', funciones.alertar);

// Eliminar registro en Base de Datos
   funciones.respuesta.addEventListener('click', funciones.eliminar);



