
// variable global para el formulario modo 'edicion'
let mMdl = {
    boxEdicion: document.querySelector("#boxEdicion")
}
mMdl.divs = {
    modal: mMdl.boxEdicion.querySelector('.modal'),
    overlay: boxEdicion.querySelector('.overlay')
}
mMdl.buttons = {
    cancelar: mMdl.boxEdicion.querySelector('.cancelar'),
    modificar: mMdl.boxEdicion.querySelector('.modificar')
}
mMdl.inputs = {
    nombre: mMdl.boxEdicion.querySelector('#nombre'),
    email: mMdl.boxEdicion.querySelector('#email'),
    comentario: mMdl.boxEdicion.querySelector('#comentario'),
    imagen: mMdl.boxEdicion.querySelector('#imagen'),
    idFicha: mMdl.boxEdicion.querySelector('#idFicha')
}

// asociamos el evento onclick al botón 'modificar'
mMdl.boxEdicion.querySelector(".modificar").addEventListener("click", function (){
    modificarEdicion();
});

// asociamos el evento onclick al botón 'cancelar'
mMdl.boxEdicion.querySelector(".cancelar").addEventListener("click", function (){
    cancelarEdicion();
});

function abrirModoEdicion(ficha_id) {
    mMdl.divs["overlay"].style.display = 'block';
    mMdl.divs["modal"].style.display = 'block';

    let fichaID = document.querySelector("#" + ficha_id);
    let labels = fichaID.querySelectorAll("label");

    // Los campos del formulario 'edicion' toman 
    // los valores de la ficha actual
    mMdl.inputs["nombre"].value = labels[0].textContent;
    mMdl.inputs["email"].value = labels[1].textContent;
    mMdl.inputs["comentario"].value = labels[2].textContent;
    mMdl.inputs["imagen"].value = labels[3].textContent;

    mMdl.inputs["idFicha"].value = ficha_id;
}

function modificarEdicion() {

    let user = leer_localStorage("user");
    let arrayActualizado = modificarPorId(user, mMdl.inputs["idFicha"].value);

    // actualizamos el localStorage 'user'
    localStorage.setItem(
        "user",
        JSON.stringify(arrayActualizado)
    );

    // tomamos el valor de identificador situado en el campo oculto 'idFicha'
    let fichaID = document.querySelector("#" + mMdl.inputs["idFicha"].value);
    let labels = fichaID.querySelectorAll("label");

    // Los campos de la ficha actual toman 
    // los valores del formulario 'edicion'
    labels[0].textContent = mMdl.inputs["nombre"].value;
    labels[1].textContent = mMdl.inputs["email"].value;
    labels[2].textContent = mMdl.inputs["comentario"].value;
    labels[3].textContent = mMdl.inputs["imagen"].value;

    // ocultamos las capas del formulario 'edicion'
    mMdl.divs["overlay"].style.display = 'none';
    mMdl.divs["modal"].style.display = 'none';
}

function cancelarEdicion(event) {
    mMdl.divs["overlay"].style.display = 'none';
    mMdl.divs["modal"].style.display = 'none';
}