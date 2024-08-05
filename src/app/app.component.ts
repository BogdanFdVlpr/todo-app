import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

const todos = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
  editing = false;


  get activeTodos() {
    return this.todos.filter(todo => !todo.completed)
  }

  addTodo() {
    if (this.todoForm.invalid) {
      return
    }

    const newTodo = {
      title: this.title.value,
      completed: false,
      id: Date.now()
    }

    this.todos.push(newTodo);
    this.todoForm.reset();

    console.warn(this.todoForm)
  }
}
