import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "./types/todo";

const todos = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
    todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  todos = todos;

  get activeTodos() {
    return this.todos.filter(todo => !todo.completed)
  }

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.todos[1] = { ...this.todos[1], title: 'qwerty'}
    }, 3000)
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo() {
    if (this.todoForm.invalid) {
      return
    }

    const newTodo: Todo = {
      title: this.title.value,
      completed: false,
      id: Date.now()
    }

    this.todos.push(newTodo);
    this.todoForm.reset();

    console.warn(this.todoForm)
  }


}
