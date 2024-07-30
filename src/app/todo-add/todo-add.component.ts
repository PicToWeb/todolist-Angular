import { Component } from '@angular/core';
import {TodoService} from "../todo.service";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'digi-todo-add',
  standalone: true,
  imports: [
    FormsModule,DatePipe
  ],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.css'
})
export class TodoAddComponent {

  newTodoTitle: string = '';
  newToDoPriority: 'low' | 'middle' | 'high' = 'low';
  newTodoDueDate: string = '';

  constructor(private todoService: TodoService) {
  }

  onAddTodo(){
    if(this.newTodoTitle.trim()){
      this.todoService.addTodo(
        this.newTodoTitle,
        this.newToDoPriority,
        new Date(this.newTodoDueDate));
      this.newTodoTitle = '';
      this.newToDoPriority = 'low';
      this.newTodoDueDate = '';
    }
  }

}
