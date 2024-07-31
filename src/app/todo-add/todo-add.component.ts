import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Todo} from "../todo.service";

@Component({
  selector: 'digi-todo-add',
  standalone: true,
  imports: [
    FormsModule, DatePipe
  ],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.css'
})
/** @class */
export class TodoAddComponent {

  /** @type {string} */
  newTodoTitle: string = '';
  /** @type {boolean} */
  newTodoCompleted: boolean = false;
  /** @type {'low' | 'middle' | 'high'} */
  newToDoPriority: 'low' | 'middle' | 'high' = 'low';
  /** @type {string} */
  newTodoDueDate: string = '';

  /** @type {EventEmitter<Todo>} */
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  /**
   * @method onAddTodo
   * @return {void}
   * @description   This method is called when the user clicks the "Add" button. It emits a new todo item with the title, completion status, priority, and due date entered by the user. It then resets the input fields to their initial values.
   */
  onAddTodo(): void {
    if (this.newTodoTitle.trim() && this.newToDoPriority.trim()) {
      const uuid = crypto.randomUUID();
      const truncatedUuid = uuid.substring(0, 8);
      const newTodo: Todo = {
        id: truncatedUuid,
        title: this.newTodoTitle,
        completed: this.newTodoCompleted,
        priority: this.newToDoPriority,
        dueDate: new Date(this.newTodoDueDate)
      };
      this.addTodo.emit(newTodo);
      this.newTodoTitle = '';
      this.newToDoPriority = 'low';
      this.newTodoDueDate = '';
    }
  }
}
