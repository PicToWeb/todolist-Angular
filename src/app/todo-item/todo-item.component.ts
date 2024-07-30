import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../todo.service";
import {DatePipe, NgClass} from "@angular/common";
import {PriorityPipe} from "../priority.pipe";

@Component({
  selector: 'digi-todo-item',
  standalone: true,
  imports: [
    NgClass,
    PriorityPipe,
    DatePipe
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

  @Input() todo!: Todo;
  @Output() toggleCompletion = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();


  onToggleCompletion(){
    this.toggleCompletion.emit(this.todo.id);
  }

  onRemove(){
    this.remove.emit(this.todo.id);
  }

}
