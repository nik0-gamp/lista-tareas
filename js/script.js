
// Arreglo donde se guardan las tareas
let tareas = [];

// Elementos del HTML
const formulario = document.getElementById("formularioTarea");
const nuevaTarea = document.getElementById("nuevaTarea");
const listaTareas = document.getElementById("listaTareas");


// Agregar una nueva tarea
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    let descripcion = nuevaTarea.value.trim();

    if (descripcion !== "") {

        tareas.push({
            descripcion: descripcion,
            completada: false
        });

        nuevaTarea.value = "";

        renderTasks();
    }
});


// Mostrar las tareas
function renderTasks() {

    listaTareas.innerHTML = "";

    // Organizar las tareas pendientes y completadas
    let tareasOrdenadas = tareas.filter(tarea => !tarea.completada)
        .concat(tareas.filter(tarea => tarea.completada));

    tareasOrdenadas.forEach(function(tarea) {

        let elemento = document.createElement("li");
        elemento.classList.add("tarea");

        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        // Crear checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;

        checkbox.addEventListener("change", function() {

            tarea.completada = checkbox.checked;

            renderTasks();
        });

        // Crear descripción
        let texto = document.createElement("span");
        texto.classList.add("descripcion");
        texto.textContent = tarea.descripcion;

        // Crear botón eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.classList.add("eliminar");
        botonEliminar.textContent = "🗑";

        botonEliminar.addEventListener("click", function() {

            tareas = tareas.filter(function(elemento) {
                return elemento !== tarea;
            });

            renderTasks();
        });

        // Agregar elementos a la tarea
        elemento.appendChild(checkbox);
        elemento.appendChild(texto);
        elemento.appendChild(botonEliminar);

        // Agregar tarea a la lista
        listaTareas.appendChild(elemento);
    });
}
