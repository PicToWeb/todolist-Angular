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
  completedTodos$: Observable<Todo[]> ;
  showCompletedTodos:boolean = false;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos();
    this.completedTodos$ = this.todoService.getCompletedTodos();
  }


  ngOnInit(): void {
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

  onToggleTodoCompletion(id: string): void {
    this.todoService.toggleTodoCompletion(id).subscribe(() => {
      this.todos$ = this.todoService.getTodos(); // Refresh the todos$ observable
    });
  }

  onRemoveTodo(id: string): void {
    this.todoService.removeTodo(id).subscribe(() => {
      this.todos$ = this.todoService.getTodos(); // Refresh the todos$ observable
    });
  }

  onClearCompletedTodos(): void {
    this.todoService.clearCompletedTodos().subscribe(() => {
      this.todos$ = this.todoService.getTodos(); // Refresh the todos$ observable
    });
  }

  onResetTodos(): void {
    this.todoService.resetTodos().subscribe(() => {
      this.todos$ = this.todoService.getTodos(); // Refresh the todos$ observable
    });
  }

  onToggleShowCompletedTodos(){
    this.showCompletedTodos = !this.showCompletedTodos;
  }

  hasTodosCompleted(): boolean {
    return this.todoService.hasCompletedTodos();
  }

  hasTodos(): Observable<boolean> {
    return this.todos$.pipe(
      map(todos => todos.length > 0),
      first()
    );
  }

}
