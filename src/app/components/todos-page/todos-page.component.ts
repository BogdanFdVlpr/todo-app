import {Component, OnInit} from '@angular/core';
import {Todo} from "../../types/todo";
import {TodosService} from "../../services/todos.service";
import {MessageService} from "../../services/message.service";
import {map} from "rxjs";

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
})
export class TodosPageComponent implements OnInit {
  todos$ = this.todosService.todos$
  activeTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => !todo.completed))
  )
  activeCounter$ = this.activeTodos$.pipe(
    map(todos => todos.length)
  )

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.todosService.loadTodos()
      .subscribe({
        error: () => this.messageService.showMessage('Unable to load todos'),
      })
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle)
      .subscribe({
        error: () => this.messageService.showMessage('Unable to add todos'),
      });
  }

  toggleTodo(todo: Todo) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to toggle todos'),
      })
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({ ...todo, title })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to rename todos'),
      });
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo)
      .subscribe({
        error: () => this.messageService.showMessage('Unable to delete todos'),
      });
  }

}
