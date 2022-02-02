import { Todo } from "../class";
import { todoList } from "../index";

//referencias en el html
const $divTodoList = document.querySelector(".todo-list");
const $input = document.querySelector(".new-todo");
const $borrarCompletados = document.querySelector(".clear-completed");
const $filter = document.querySelector(".filters");
const $anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ({ tarea, completado, id }) => {
  const htmlTodo = `
    <li class="${completado && "completed"}" data-id="${id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${completado && "checked"}>
							<label>${tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li> 
    `;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  $divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

//Eventos
$input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && event.target.value.length > 0) {
    console.log(event.target.value);
    const nuevoTodo = new Todo(event.target.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    $input.value = "";
  }
});

$divTodoList.addEventListener("click", (event) => {
  //console.log(event.target.localName);
  const nombreElemento = event.target.localName; // input, label, button
  const todoElemento = event.target.parentElement.parentElement; //obtengo el tag li
  const todoId = todoElemento.getAttribute("data-id"); //id del todo
  if (nombreElemento.includes("input")) {
    //hizo click en el check
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
  } else if (nombreElemento.includes("button")) {
    todoList.eliminarTodo(todoId);
    $divTodoList.removeChild(todoElemento); //remover el html
  }
});

$borrarCompletados.addEventListener("click", () => {
  todoList.eliminarCompletados();
  for (let index = $divTodoList.children.length - 1; index >= 0; index--) {
    const elemento = $divTodoList.children[index];
    if (elemento.classList.contains("completed")) {
      $divTodoList.removeChild(elemento);
    }
  }
});

$filter.addEventListener("click", (event) => {
  const filtro = event.target.text;
  if (!filtro) {
    return;
  }

  $anchorFiltros.forEach(element => element.classList.remove('selected'));
  event.target.classList.add('selected');

  for (const elemento of $divTodoList.children) {
    elemento.classList.remove("hidden");
    const completado = elemento.classList.contains("completed");
    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
        break;
    }
  }
});
