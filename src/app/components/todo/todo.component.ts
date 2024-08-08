import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Todo} from "../../types/todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnChanges {
  @Output() delete = new EventEmitter();
  @Input()  todo!: Todo;

  @ViewChild('titleField')
  set titleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus()
    }
  };

  editing = false;
  title = '';

  constructor() {
  }

  ngOnChanges({ todo }: SimpleChanges): void {
    console.log(todo.previousValue?.title);

    if (todo.currentValue.title !== todo.previousValue?.title) {
      this.title = todo.currentValue.title;
    }
  }

  edit() {
    this.editing = true;
    this.title = this.todo.title
  }

  save() {
    if (!this.editing) {
      return;
    }
    this.editing = false;
    this.todo.title = this.title
  }




}
