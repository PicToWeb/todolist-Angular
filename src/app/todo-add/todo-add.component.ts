import { Component } from '@angular/core';
import {Todo, TodoService} from "../todo.service";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs";

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

  // todos$: Observable<Todo[]> ;
  newTodoTitle: string = '';
  newToDoPriority: 'low' | 'middle' | 'high' = 'low';
  newTodoDueDate: string = '';

  constructor(private todoService: TodoService) {
    // this.todos$ = this.todoService.getTodos();
  }

  onAddTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(
        this.newTodoTitle,
        this.newToDoPriority,
        new Date(this.newTodoDueDate)
      ).subscribe(() => {
        this.newTodoTitle = '';
        this.newToDoPriority = 'low';
        this.newTodoDueDate = '';
        // this.todos$ = this.todoService.getTodos();
      });
    }
  }

  //
  // onAddTodo(){
  //   if(this.newTodoTitle.trim()){
  //     this.todoService.addTodo(
  //       this.newTodoTitle,
  //       this.newToDoPriority,
  //       new Date(this.newTodoDueDate));
  //     this.newTodoTitle = '';
  //     this.newToDoPriority = 'low';
  //     this.newTodoDueDate = '';
  //   }
  // }



}
