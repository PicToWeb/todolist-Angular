import {Component} from '@angular/core';
import {Todo, TodoService} from "../todo.service";
import {Observable} from "rxjs";
import {TodoAddComponent} from "../todo-add/todo-add.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {TodoItemComponent} from "../todo-item/todo-item.component";

@Component({
  selector: 'digi-todo-list',
  standalone: true,
  imports: [
    TodoAddComponent,
    AsyncPipe,
    TodoItemComponent,
    NgForOf
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  todos$: Observable<Todo[]> ;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos();
  }

  onToggleTodoCompletion(id:number){
    this.todoService.toggleTodoCompletion(id);
  }

  onRemoveTodo(id:number){
    this.todoService.removeTodo(id);
  }

  onClearCompletedTodos(){
    this.todoService.clearCompletedTodos();
  }

  onResetTodos() {
    this.todoService.resetTodos();
  }

}
