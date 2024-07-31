import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../todo.service";
import {DatePipe, NgClass} from "@angular/common";
import {PriorityPipe} from "../priority.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'digi-todo-item',
  standalone: true,
  imports: [
    NgClass,
    PriorityPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
/** todo-item component*/
export class TodoItemComponent {

  /** todo-item ctor */
  @Input() todo!: Todo;
  /** todo-item ctor */
  @Output() toggleCompletion = new EventEmitter<string>();
  /** todo-item ctor */
  @Output() remove = new EventEmitter<string>();

  /** todo-item ctor */
  onToggleCompletion(){
    this.toggleCompletion.emit(this.todo.id);
  }

  /** todo-item ctor */
  onRemove(){
    this.remove.emit(this.todo.id);
  }

}
