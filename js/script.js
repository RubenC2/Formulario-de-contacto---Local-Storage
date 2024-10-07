// Borrar uno en concreto, depende del diseño. posibles ideas
// -boton borrar en cada tarjeta, -input de email + boton para confirm usuario a borrar, -listado con checklist + botón confirmar borrar,

// Editar¿diseño?posibles ideas
// -En cada tarjeta icono de lápiz y al click el form se llena con los datos de la tarj para editarlo. Cambiar el texto de botón guardar por "modificar" y cambiar estilo del form para editar.
//click abre popup para form extra para editarlo,
//- poner select por mail sobre el formulario, con la opc selecionada se rellenará el formulario.
// Pasos para editar en js: 
// -descargar array de local storage
//-buscar usuario y obtener los datos
//-editar el objeto
//- guardar objeto en el array
//-subir array a LocalStorage

window.addEventListener('load', function() {
    
    let user = leer_localStorage("user");

    if(user == null){
        localStorage.removeItem("user");
        // inicializamos el localStorage 'user' a vacio
        localStorage.setItem(
            "user",
            JSON.stringify([])
        );
    }
    
    // definimos el boton 'btn_borrarTodos'
    const btn_borrarTodos = document.getElementById('btn_borrarTodos');

    // mostramos el boton 'btn_borrarTodos'
    btn_borrarTodos.setAttribute('style', 'display: none');

    // Evento para eliminar todas las capas
    btn_borrarTodos.addEventListener('click', (event) => {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        localStorage.removeItem("user");
        event.target.setAttribute('style', 'display: none');
    });
});

// función que obtiene los valores del localStorage 
// del identificador pasado por parametro
function leer_localStorage(identificador){
    let datos = localStorage.getItem(identificador);
    return JSON.parse(datos);
}

document.querySelector("#form_main").addEventListener("submit", function (event) {
    event.preventDefault(); // paraliza envío formulario

    const nombre = event.target.nombre.value;
    const email = event.target.email.value;
    const comentario = event.target.comentario.value;
    const imagen = event.target.imagen.value;

    const emailPattern = /^[a-zA-Z0-9]{2,}@[a-zA-Z]{3,}\.(?:[a-zA-Z]{2,4})$/;

    // Si el correo electrónico cumple con el patrón
    if (emailPattern.test(email)) {
        console.log("Correo electrónico válido.");

        /* let esDuplicado = leer_localStorage("user");
        if(esDuplicado != null){
            console.log("esDuplicado=", esDuplicado);
            //checkEmailDuplicado(esDuplicado)
        } */

        guardarDatos(event.target.elements);
        this.reset();

        let container = document.querySelector(".container");
        container.innerHTML = "";

        let user = leer_localStorage("user");

        container.innerHTML += pintarHTML_ficha(user);
        btn_borrarTodos.setAttribute('style', 'display: block');

    // Si No lo cumple
    } else {
        console.log("Correo electrónico no válido.");
        return false;
    }
});

function guardarDatos(datos) {

    // declaramos e inicializamos el array arr_valores
    let arr_valores = [];
    let user = leer_localStorage("user");

    // Si existe el id 'user' del localStorage
    if(localStorage.getItem("user") != null){}
    
    // obtengo los datos del formulario 
    // y los inserto en el array
    // y lo guardo en localStorage
    let nuevoUser = {
        id: "_id_" + Date.now(), // creamos un identificador unico
        nombre: datos.nombre.value,
        email: datos.email.value,
        comentario: datos.comentario.value,
        imagen: datos.imagen.value
    }

    // inserto el objeto 'nuevoUser' dentro del array 'user'
    user.push(nuevoUser);

    // guardamos los valores del array 'user' en el localStorage 'user'
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );
}

// creamos el HTML de las fichas
function pintarHTML_ficha(arr){

    let cadena = "";

    for (let i = 0; i < arr.length; i++) {

        let fichaID = arr[i].id;

        cadena += `
        <div class="box box1" id="${fichaID}">
            <div><strong>Usuario:</strong> <label>${arr[i].nombre}</label></div>
            <div><strong>Email:</strong> <label>${arr[i].email}</label></div>
            <div><strong>Comentario:</strong> <label>${arr[i].comentario}</label></div>
            <div><strong>Imagen:</strong> <label>${arr[i].imagen}</label></div>

            <div class="icon-container">
                <i onclick="editarFicha('${fichaID}')" class="fas fa-edit edit-icon" title="Editar ficha de ${arr[i].nombre}"></i>
                <i onclick="eliminarFicha('${fichaID}')"class="fas fa-trash delete-icon" title="Eliminar ficha de ${arr[i].nombre}"></i>
            </div>
        </div>
        `;
    }
    return cadena;
}

function editarFicha(ficha_id){
    let fichaID = document.querySelector("#" + ficha_id);
    //fichaID.setAttribute('style', 'border: 1px solid orange; background-color: #FBE7B7');

    // Llamamos a la funcion situada en modal.js
    abrirModoEdicion(ficha_id);
}

function eliminarFicha(ficha_id) {

    // eliminamos la ficha del HTML
    let fichaID = document.querySelector("#" + ficha_id);
    fichaID.remove();

    // obtenemos el valor actual del localStorage 'user'
    let user = leer_localStorage("user");
    
    // eliminamos del array 'user' el indice que corresponda con 'ficha_id'
    let arrayActualizado = eliminarPorId(user, ficha_id);

    // actualizamos el localStorage 'user'
    localStorage.setItem(
        "user",
        JSON.stringify(arrayActualizado)
    );

    // Si arrayActualizado.length es igual a 0
    // significa que el localStorage 'user' está vacio
    // por lo que ocultamos el botón 'btn_borrarTodos'
    if(arrayActualizado.length == 0){
        const btn_borrarTodos = document.getElementById('btn_borrarTodos');
        btn_borrarTodos.setAttribute('style', 'display: none');
    }
}

function modificarPorId(arr, f_id) {
    // Recorremos todos los elementos del array y 
    // devolvemos el índice del primer elemento que cumpla con la condición especificada
    // de hecho, solo puede encontrar un identificador unico en todo el array
    const indice = arr.findIndex(f => f.id === f_id);
    
    // Si el objeto existe, modicarlo
    if (indice !== -1) {
        // índice_inicio, número_elementos_a_eliminar
        //arr.splice(indice, 1); // Elimina el objeto en la posición encontrada
        arr[indice].nombre = mMdl.inputs["nombre"].value;
        arr[indice].email = mMdl.inputs["email"].value;
        arr[indice].comentario = mMdl.inputs["comentario"].value;
        arr[indice].imagen = mMdl.inputs["imagen"].value;
    }
    return arr; // devolvemos el array
}

function eliminarPorId(arr, f_id) {
    // Recorremos todos los elementos del array y 
    // devolvemos el índice del primer elemento que cumpla con la condición especificada
    // de hecho, solo puede encontrar un identificador unico en todo el array
    const indice = arr.findIndex(f => f.id === f_id);
    
    // Si el objeto existe, eliminarlo
    if (indice !== -1) {
        // índice_inicio, número_elementos_a_eliminar
        arr.splice(indice, 1); // Elimina el objeto en la posición encontrada
    }
    return arr; // devolvemos el array
}

function checkEmailDuplicado(usersArray) {
    const emails = [];
    
    for (let user of usersArray) {
        if (emails.includes(user.email)) {
            console.log(`El email ${user.email} ya existe.`);
            return true; // Retorna true si encuentra un email duplicado
        }
        emails.push(user.email);
    }
    
    console.log("No hay emails duplicados.");
    return false; // Retorna false si no hay duplicados
}