'use strict'

let formulario = document.querySelector('#formularioMostrar');
let formularioEntrada = document.querySelector('#formularioEntrada');
let alerta = document.querySelector('.alerta');
let respuesta = document.getElementById('respuesta');
let inputNombre = document.querySelector('.nombre');
let inputApellido = document.querySelector('.apellido');
let inputProfesion = document.querySelector('.profesion');
let botonEntrarActualizar = document.querySelector('.entrarActualizar');
let submitMostrar = document.getElementById('submitMostrar');
let id;

// Para mostrar datos solamente

let recargar = ()=>{
    fetch('/mostrar.php')
    .then((res)=>res.json())
    .then((data)=>{
        respuesta.innerHTML = '';
        data.forEach((elemento, indice)=>{
            respuesta.innerHTML += 
            `<tr class="text-center" data-id="${elemento.id}">
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
}

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
                if(submitMostrar.value == 'Ocultar'){
                    submitMostrar.value = 'Mostrar';
                }else{
                    alerta.innerHTML = 
                    `
                    <div class="alert alert-warning" role="alert">
                        ${data}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span class="eliminar" aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    
                    `;
                }
            }else{
                respuesta.innerHTML = '';
                if(submitMostrar.value == 'Mostrar'){
                    submitMostrar.value = 'Ocultar';
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
                }else{
                    submitMostrar.value = 'Mostrar';
                }
            };
        });
}

// Actualizar Inputs
let actualizar = (e)=>{
    if(e.target.classList.contains('fa-marker')){
        botonEntrarActualizar.value = 'Actualizar';
        id = e.target.parentElement.parentElement.dataset.id;
        let nombre = e.target.parentElement.parentElement.cells[1].innerText;
        let apellido = e.target.parentElement.parentElement.cells[2].innerText;
        let profesion = e.target.parentElement.parentElement.cells[3].innerText;
        
        inputNombre.value = nombre;
        inputApellido.value = apellido;
        inputProfesion.value = profesion;
        }        
}

// Entrar en la base de datos
let entrarActualizar = (e)=>{
    e.preventDefault();

    // Valido si es para entrar datos en MySQL
if(botonEntrarActualizar.value == 'Entrar'){
    let datos = new FormData(formularioEntrada);
    fetch('/entrar.php', {
        method:'POST', 
        body:datos
    })
    .then((respuesta)=>respuesta.json())
    .then((datos)=>{
        if(datos === 'exito'){
            if(submitMostrar.value == 'Ocultar'){
                    recargar();
            }
            alerta.innerHTML = 
            `
            <div class="alert alert-success" role="alert">
            Registro Exitoso!
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
    }else{
        // Actualizando registros en MySQL
            e.preventDefault();
            let datos = new FormData(formularioEntrada);
                datos.append('id', id);
            fetch('/actualizar.php', {
                method:'POST', 
                body:datos
            })
            .then((respuesta)=>respuesta.json())
            .then((datos)=>{
                if(datos == 'actualizado'){
                    if(submitMostrar.value == 'Ocultar'){
                            recargar();
                    }
                alerta.innerHTML = 
                    `
                    <div class="alert alert-success" role="alert">
                    Registro Actualizado!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span class="eliminar" aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    
                    `;

                }
            })
            .catch(()=>console.error('Hay un error al actualizar!'));
            botonEntrarActualizar.value = 'Entrar';
            formularioEntrada.reset(); 
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
};

// Alertas
let alertar = (e)=>{
    if(e.target.className == 'eliminar'){
        e.target.parentElement.parentElement.remove();
    };
};


export{mostrar, entrarActualizar, alertar, eliminar, actualizar, formulario, respuesta, formularioEntrada, alerta}