'use strict'

let formulario = document.querySelector('#formularioMostrar');
let formularioEntrada = document.querySelector('#formularioEntrada');
let alerta = document.querySelector('.alerta');
let estado = '';
let respuesta = document.getElementById('respuesta');
let inputNombre = document.querySelector('.nombre');
let inputApellido = document.querySelector('.apellido');
let inputProfesion = document.querySelector('.profesion');
let botonEntrarActualizar = document.querySelector('.entrarActualizar');

// Mostrar en el Dom
let mostrar = (e)=>{
    e.preventDefault();
        
        let datos = new FormData(formulario); 

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
                    `   <tr class="text-center" data-id="${elemento.id}">
                            <th scope="row">${indice} </th>
                            <td>${elemento.nombre}</td>
                            <td>${elemento.apellido}</td>
                            <td>${elemento.profesion}</td>
                            <td class="d-flex justify-content-center">
                                <i class="btn btn-dark mx-1 far fa-trash-alt"></i>
                                <i class="btn btn-danger mx-1 fas fa-marker"></i>
                            </td>
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
    console.log('Entrando'); 
    
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
                            <td class="d-flex justify-content-center">
                            <i class="btn btn-dark mx-1 far fa-trash-alt"></i>
                            <i class="btn btn-danger mx-1 fas fa-marker"></i>
                            </td>
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

// Actualizar

let actualizar = (e)=>{
    if(e.target.classList.contains('fa-marker')){
        e.preventDefault();
        // console.log('actualizando');
        botonEntrarActualizar.value = 'Actualizar';
        
        let id = e.target.parentElement.parentElement.dataset.id;
        let nombre = e.target.parentElement.parentElement.cells[1].innerText;
        let apellido = e.target.parentElement.parentElement.cells[2].innerText;
        let profesion = e.target.parentElement.parentElement.cells[3].innerText;
        
        inputNombre.value = nombre;
        inputApellido.value = apellido;
        inputProfesion.value = profesion;
        
            let datos = new FormData(formularioEntrada);
            let nombreForm = datos.get('nombre');
            let apellidoForm = datos.get('apellido');
            let profesionForm = datos.get('profesion');

            // console.log(nombreForm, apellidoForm, profesionForm);
            // console.log('actualizando');
            //console.log(botonEntrarActualizar.value);
        }
        //formularioEntrada.reset();    
}







export{mostrar, entrar, alertar, eliminar, actualizar}