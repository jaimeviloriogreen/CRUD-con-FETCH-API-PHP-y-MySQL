'use strict'
import * as funciones from '/js/funciones.js';

let formulario = document.querySelector('#formularioMostrar');
let respuesta = document.getElementById('respuesta');
let formularioEntrada = document.querySelector('#formularioEntrada');
let alerta = document.querySelector('.alerta');

// Mostrar
    formulario.addEventListener('submit', funciones.mostrar);

// Entradas
   formularioEntrada.addEventListener('submit', funciones.entrar);

// Actualizar
   respuesta.addEventListener('click', funciones.actualizar);

//    Alertas
   alerta.addEventListener('click', funciones.alertar);

// Eliminar registro en Base de Datos
respuesta.addEventListener('click', funciones.eliminar);



