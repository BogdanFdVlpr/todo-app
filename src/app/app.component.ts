import {ChangeDetectionStrategy, Component} from '@angular/core';
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
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    console.log('calculatob')
    return this.todoForm.get('title') as FormControl;
  }

  todos = todos;

  get activeTodos() {
    return this.todos.filter(todo => !todo.completed)
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  handleFormSubmit() {
    if (this.todoForm.invalid) {
      return
    }

    this.addTodo(this.title.value)
    this.todoForm.reset();
  }

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      title: newTitle,
      completed: false,
      id: Date.now()
    }

    this.todos = [...todos, newTodo]
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
