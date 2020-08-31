'use strict'
import * as funciones from '/js/funciones.js';

let formulario = document.querySelector('#formularioMostrar');
let respuesta = document.getElementById('respuesta');
let formularioEntrada = document.querySelector('#formularioEntrada');
let alerta = document.querySelector('.alerta');

// Mostrar
    formulario.addEventListener('submit', funciones.mostrar);

// Actualizar Inputs
   respuesta.addEventListener('click', funciones.actualizar);

// Entradas y actualizaciones a MySQL
   formularioEntrada.addEventListener('submit', funciones.entrarActualizar);

// Alertas
   alerta.addEventListener('click', funciones.alertar);

// Eliminar registro en Base de Datos
respuesta.addEventListener('click', funciones.eliminar);



