import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "./types/todo";

const todosFromServer = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter(todo => !todo.completed)
  }

  constructor() {
  }

  ngOnInit(): void {
    this.todos = todosFromServer;
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      title: newTitle,
      completed: false,
      id: Date.now()
    }

    this.todos = [...todosFromServer, newTodo]
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return  { ...todo, completed: !todo.completed };
    })
  }

  renameTodo(todoId: number, title: string) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return  { ...todo, title };
    })
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter(todo => todo.id !== todoId)
  }
}
