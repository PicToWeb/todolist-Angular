import {Component, OnInit} from '@angular/core';
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
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> ;
  // completedTodos$: Observable<any[]> ;
  // incompleteTodos$: Observable<any[]>;

  // todos$: Observable<Todo[]> ;
   completedTodos$: Observable<Todo[]> ;
  // incompleteTodos$: Observable<Todo[]>;
  showCompletedTodos:boolean = false;

  constructor(private todoService: TodoService)  {
    this.todos$ = this.todoService.todos$;
    this.completedTodos$ = this.todoService.getCompletedTodos();
    // this.incompleteTodos$ = this.todoService.getIncompleteTodos();
  }

  //new
  ngOnInit(): void {
    this.todoService.getTodos().subscribe();
  }

  onToggleTodoCompletion(id:string){
    this.todoService.toggleTodoCompletion(id);
    // this.incompleteTodos$= this.todoService.getIncompleteTodos();
    // this.completedTodos$= this.todoService.getCompletedTodos();
  }
  //
  onRemoveTodo(id: string): void {
    this.todoService.removeTodo(id).subscribe(() => {
      this.todos$ = this.todoService.getTodos();
    });
  }

  trackByTodoId(index: number, todo: Todo): string {
    return todo.id;
  }

  onClearCompletedTodos(){
    this.todoService.clearCompletedTodos();
  }

  onResetTodos() {
    this.todoService.resetTodos();
  }

  onToggleShowCompletedTodos(){
    this.showCompletedTodos = !this.showCompletedTodos;
  }
  //
  hasTodosCompleted(): boolean {
    let hasCompletedTodos = false;
    this.todos$.subscribe(todos => {
      hasCompletedTodos = todos.some(todo => todo.completed);
    });
    return hasCompletedTodos;
  }

  hasTodos(): boolean {
    let hasTodos = false;
    this.todos$.subscribe(todos => {
      hasTodos = todos.length > 0;
    });
    return hasTodos;
  }

}
