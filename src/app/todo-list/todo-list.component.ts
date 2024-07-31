import {Component, OnInit} from '@angular/core';
import {Todo, TodoService} from "../todo.service";
import {first, map, Observable} from "rxjs";
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
  //  completedTodos$: Observable<Todo[]> ;
  // incompleteTodos$: Observable<Todo[]>;
  showCompletedTodos:boolean = false;

  constructor(private todoService: TodoService)  {
    this.todos$ = this.todoService.getTodos();
    // this.completedTodos$ = this.todoService.getCompletedTodos();
    // this.incompleteTodos$ = this.todoService.getIncompleteTodos();
  }

  //new
  ngOnInit(): void {
    // this.todoService.getTodos().subscribe();
    this.todos$ = this.todoService.getTodos();
  }

  addTask({id,title,completed,priority,date}: { id: string; title: string;completed:boolean; priority: 'low' | 'middle' | 'high'; date: string; }) {
    this.todoService.addTodo(
      id,
      title,
      completed,
      priority,
      new Date(date)
    ).subscribe(() => {
      this.todos$ = this.todoService.getTodos();
    });
  }

  onToggleTodoCompletion(id:string){
    this.todoService.toggleTodoCompletion(id);
    this.todos$ = this.todoService.getTodos();
  }

  onRemoveTodo(id: string): void {
    this.todoService.removeTodo(id).subscribe(() => {
      this.todos$ = this.todoService.getTodos();
    });
  }

  trackByTodoId(index: number, todo: Todo): string {
    return todo.id;
  }

  // onClearCompletedTodos(){
  //   this.todoService.clearCompletedTodos();
  // }
  //
  // onResetTodos() {
  //   this.todoService.resetTodos();
  // }

  // onToggleShowCompletedTodos(){
  //   this.showCompletedTodos = !this.showCompletedTodos;
  // }

  hasTodosCompleted(): boolean {
    let hasCompletedTodos = false;
    this.todos$.subscribe(todos => {
      hasCompletedTodos = todos.some(todo => todo.completed);
    });
    return hasCompletedTodos;
  }

  // hasTodos(): boolean {
  //   let hasTodos = false;
  //   this.todos$.pipe(
  //     map(todos => todos.length > 0),
  //     first()
  //   ).subscribe(result => {
  //     hasTodos = result;
  //   });
  //   return hasTodos;
  // }

}
