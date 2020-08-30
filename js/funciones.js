'use strict'

let formulario = document.querySelector('#formularioMostrar');
let alerta = document.querySelector('.alerta');
let estado = '';
let respuesta = document.getElementById('respuesta');

// Mostrar en el Dom
let mostrar = (e)=>{
    e.preventDefault();
        
        let datos = new FormData(formulario); // formulario es la variable que capura por id el form
        //let usuario = datos.get('usuario'); //usuario es el name del input
        //let contraseña = datos.get('pass'); //pass es el name del input

        fetch('/mostrar.php', {
            method: 'POST', 
            body: datos
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data === 'No hay registros!'){
                alerta.innerHTML = 
                `
                <div class="alert alert-warning" role="alert">
                    ${data}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span class="eliminar" aria-hidden="true">&times;</span>
                </button>
                </div>
                
                `;
            }else{
                estado = true;
                console.log(estado);
                respuesta.innerHTML = '';
                data.forEach((elemento, indice)=>{
                    respuesta.innerHTML += 
                    `   <tr data-id="${elemento.id}">
                            <th scope="row">${indice} </th>
                            <td>${elemento.nombre}</td>
                            <td>${elemento.apellido}</td>
                            <td>${elemento.profesion}</td>
                            <td><i class="btn btn-dark h6 far fa-trash-alt"></i></td>
                        </tr>
                    `;
                });
            }
        //console.log(data);
        });
}
// Entrar en la base de datos
let entrar = (e)=>{
    e.preventDefault();
        
        let datos = new FormData(formularioEntrada);
        let nombre = datos.get('nombre');
        let apellido = datos.get('apellido');
        let profesion = datos.get('profesion');
        // console.log(nombre, apellido, profesion);

        fetch('/entrar.php', {
            method:'POST', 
            body:datos
        })
        .then((respuesta)=>respuesta.json())
        .then((datos)=>{

        if(datos === 'exito'){
            
            if(estado == true){
                (()=>{
                    fetch('/mostrar.php')
                        .then((res)=>res.json())
                        .then((data)=>{
                                respuesta.innerHTML = '';
                                data.forEach((elemento, indice)=>{
                                    respuesta.innerHTML += 
                                    `   <tr data-id="${elemento.id}">
                                            <th scope="row">${indice} </th>
                                            <td>${elemento.nombre}</td>
                                            <td>${elemento.apellido}</td>
                                            <td>${elemento.profesion}</td>
                                            <td><i class="btn btn-dark h6 far fa-trash-alt"></i></td>
                                        </tr>
                                    `;
                                });
                            
                        //console.log(data);
                        });
                })();
            }
            alerta.innerHTML = 
            `
            <div class="alert alert-success" role="alert">
            Registro exitoso!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span class="eliminar" aria-hidden="true">&times;</span>
            </button>
            </div>
            
            `;
        }else{
            alerta.innerHTML = 
            `
            <div class="alert alert-danger" role="alert">
            No se permite registros vacíos!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span class="eliminar" aria-hidden="true">&times;</span>
            </button>
            </div>
            
            `;
        };

        })
        .catch(()=>console.error('Hubo un error!'));

        formularioEntrada.reset();
}
// Alertas
let alertar = (e)=>{
if(e.target.className == 'eliminar'){
    e.target.parentElement.parentElement.remove();
    };
}
// Eliminar
let eliminar = (e)=>{
    if(e.target.classList.contains('fa-trash-alt')){
        e.target.parentElement.parentElement.remove();
        let id = e.target.parentElement.parentElement.dataset.id;
        let data = new FormData(); 
            data.append('id', id);
        fetch('/eliminar.php', {
            method:'POST', 
            body:data
        })
        .then((respuesta)=>respuesta.json())
        .then((datos)=>{
         if(datos === 'eliminado'){
             alerta.innerHTML = 
             `
             <div class="alert alert-success" role="alert">
             Registro Eliminado!
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span class="eliminar" aria-hidden="true">&times;</span>
             </button>
             </div>
             
             `;
         }
            //console.log(datos);
        })
        .catch((e)=>console.error('Error al eliminar!'));
     };
 
}



export{mostrar, entrar, alertar, eliminar}