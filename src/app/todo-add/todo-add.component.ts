import {Component, EventEmitter, Output} from '@angular/core';
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
  newTodoId:string= crypto.randomUUID();
  newTodoTitle: string = '';
  newTodoCompleted:boolean=false;
  newToDoPriority: 'low' | 'middle' | 'high' = 'low';
  newTodoDueDate: string = '';

  @Output() addTodo : EventEmitter<{id:string,title:string,completed:boolean,priority:'low'|'middle'|'high',date:string}> = new EventEmitter<{id:string,title:string,completed:boolean,priority:'low'|'middle'|'high',date:string}>();
  // constructor(private todoService: TodoService) {
  //   // this.todos$ = this.todoService.getTodos();
  // }

    onAddTodo() {
    if (this.newTodoTitle.trim() && this.newToDoPriority.trim()) {
      this.addTodo.emit({
        id: this.newTodoId,
        title: this.newTodoTitle,
        completed:this.newTodoCompleted,
        priority: this.newToDoPriority,
        date: this.newTodoDueDate
      });
      this.newTodoTitle = '';
      this.newToDoPriority = 'low';
      this.newTodoDueDate = '';

    }
  }
  // onAddTodo() {
  //   if (this.newTodoTitle.trim()) {
  //     this.todoService.addTodo(
  //       this.newTodoTitle,
  //       this.newToDoPriority,
  //       new Date(this.newTodoDueDate)
  //     ).subscribe(() => {
  //       this.newTodoTitle = '';
  //       this.newToDoPriority = 'low';
  //       this.newTodoDueDate = '';
  //       // this.todos$ = this.todoService.getTodos();
  //     });
  //   }
  // }



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
