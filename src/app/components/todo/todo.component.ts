import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../types/todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Output() delete = new EventEmitter();
  @Input()  todo!: Todo;

  editing = false;

}
