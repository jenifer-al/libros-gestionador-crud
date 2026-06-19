// --- VARIABLES DE ESTADO ---
let operacionActual = 0;
let posicionLibro = -1;

// --- ELEMENTOS DEL DOM ---
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const isbn = document.getElementById("isbn");
const botonAzul = document.getElementById("btn-agregar");
const botonAmbar = document.getElementById("btn-modificar");
const botonRojo = document.getElementById("btn-eliminar");
const botonGris = document.getElementById("btn-mostrar");
const inputIsbn = document.getElementById("isbn");
const fieldsetCampos = document.getElementById("campos-libro");
const inputStock = document.getElementById("stock");
const inputPrecio = document.getElementById("precio");
const campoFormulario = document.getElementById("acciones-formulario");
const botonCancelar = document.getElementById("btn-cancelar");
const dialogInformativo = document.getElementById('dialog-informativo');
const dialogBtnAceptar = document.getElementById('info-btn-aceptar');
const dialogBtnCancelar = document.getElementById('dialog-btn-cancelar');
const estadoOperacion = document.getElementById("estado-operacion");
const formLibro = document.getElementById("form-libro");

// --- FUNCIONES ---
dialogBtnAceptar.addEventListener('click', () => dialogInformativo.close());
dialogBtnCancelar.addEventListener('click', () => dialogInformativo.close());

const mostrarAviso = (titulo, mensaje) => {
    document.getElementById('info-titulo').textContent = titulo;
    document.getElementById('info-mensaje').textContent = mensaje;
    dialogInformativo.showModal();
}

const gestionarPermisosCampos = (operacion) => {
    const campos = document.querySelectorAll('#campos-libro input');
    if (operacion >= 3) {
        fieldsetCampos.disabled = true;
    } else {
        fieldsetCampos.disabled = false;
        campos.forEach(input => {
            // Bloquea solo si es modo Modificar (2) y el campo no es modificable
            input.disabled = (operacion === 2 && input.getAttribute('data-info') === 'fijo');
        });
    }
}

const resetearFormulario = () => {
    formLibro.reset();
    fieldsetCampos.disabled = true;
    inputIsbn.disabled = false;
    campoFormulario.classList.add('hidden');
    estadoOperacion.textContent = "Selecciona una operación en el menú superior";
}
botonCancelar.addEventListener('click', resetearFormulario);

const buscarLibroPorIsbn = (isbnValue) => {
    let indice = baseDatosLibros.findIndex(libro => libro.getIsbn() === isbnValue);
    posicionLibro = indice;
    if (posicionLibro >= 0) {
        mostrarAviso('Libro encontrado', 'Presiona OK para continuar');
    } else if (operacionActual > 1) {
        mostrarAviso('Libro no encontrado', 'No se puede realizar la operación');
    }
}

const mostrarLibroEnFormulario = () => {
    const libro = baseDatosLibros[posicionLibro];
    titulo.value = libro.getTitulo();
    autor.value = libro.getAutor();
    inputStock.value = libro.getStock();
    inputPrecio.value = libro.getPrecio();
}

const guardarLibroEnFormulario = () => {
    const nuevoLibro = new Libro(isbn.value, titulo.value, autor.value, inputStock.value, inputPrecio.value);
    baseDatosLibros.push(nuevoLibro);
    mostrarAviso("Éxito", "El libro ha sido registrado.");
}

const modificarLibroEnFormulario = () => {
    baseDatosLibros[posicionLibro].actualizarStockYPrecio(inputStock.value, inputPrecio.value);
    mostrarAviso("Éxito", "Se han actualizado los datos.");
}

const eliminarLibroEnFormulario = () => {
    baseDatosLibros.splice(posicionLibro, 1);
    mostrarAviso("Éxito", "Se ha eliminado el libro.");
}

// Evento Enter en ISBN
inputIsbn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        buscarLibroPorIsbn(inputIsbn.value.trim());
        if (posicionLibro >= 0) {
            mostrarLibroEnFormulario();
            gestionarPermisosCampos(operacionActual);
            campoFormulario.classList.remove('hidden');
        }
    }
});

// Botones del menú
botonAzul.addEventListener('click', () => { 
    operacionActual = 1; 
    resetearFormulario(); 
    fieldsetCampos.disabled = false; // Desbloqueo directo para agregar
    campoFormulario.classList.remove('hidden'); 
    inputIsbn.focus(); 
    estadoOperacion.textContent = "MODO: 1. AGREGAR LIBRO"; 
});

botonAmbar.addEventListener('click', () => { operacionActual = 2; resetearFormulario(); inputIsbn.focus(); estadoOperacion.textContent = "MODO: 2. MODIFICAR"; });
botonRojo.addEventListener('click', () => { operacionActual = 3; resetearFormulario(); inputIsbn.focus(); estadoOperacion.textContent = "MODO: 3. ELIMINAR"; });
botonGris.addEventListener('click', () => { operacionActual = 4; resetearFormulario(); inputIsbn.focus(); estadoOperacion.textContent = "MODO: 4. MOSTRAR"; });

formLibro.addEventListener('submit', (e) => {
    e.preventDefault();
    if (operacionActual === 1) guardarLibroEnFormulario();
    else if (operacionActual === 2) modificarLibroEnFormulario();
    else if (operacionActual === 3) eliminarLibroEnFormulario();
    resetearFormulario();
});