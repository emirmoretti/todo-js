import { Todo } from "./todo.class";

export class TodoList {
  constructor() {
    this.todos = [];
    this.cargarLocalStorage();
  }
  nuevoTodo(Todo) {
    this.todos.push(Todo);
    this.guardarLocalStorage();
  }
  eliminarTodo(idTodo) {
    this.todos = this.todos.filter((todo) => todo.id != idTodo);
    this.guardarLocalStorage();
  }
  marcarCompletado(idTodo) {
    for (const todoUnit of this.todos) {
      if (todoUnit.id == idTodo) {
        todoUnit.completado = !todoUnit.completado;
        break;
      }
    }
    this.guardarLocalStorage();
  }
  eliminarCompletados() {
    this.todos = this.todos.filter((todo) => !todo.completado);
    this.guardarLocalStorage();
  }
  guardarLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }
  cargarLocalStorage() {
    this.todos = localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []; 
    this.todos = this.todos.map(todo => Todo.fromJson(todo))
  }
}
