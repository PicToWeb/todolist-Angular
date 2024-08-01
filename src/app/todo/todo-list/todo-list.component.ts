import {Component, OnInit} from '@angular/core';
import {Todo, TodoService} from "../todo.service";
import {defaultIfEmpty, Observable} from "rxjs";
import {TodoAddComponent} from "../todo-add/todo-add.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {FilterTodoPipe} from "../../filter-todo.pipe";

@Component({
  selector: 'digi-todo-list',
  standalone: true,
  imports: [
    TodoAddComponent,
    AsyncPipe,
    TodoItemComponent,
    NgForOf,
    FilterTodoPipe
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
/** TodoList component */
export class TodoListComponent implements OnInit {
  /** List of todos */
  todos$: Observable<Todo[]> ;
  /** Show completed todos */
  showCompletedTodos:boolean = false;

  /** Constructor */
  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos().pipe(defaultIfEmpty([]));
  }

  /** OnInit */
  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos().pipe(defaultIfEmpty([]));
  }

  /**
   * Add task to todo list
   * @param todo - todo to add
   * @description Add task to todo list
   */
  addTask(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(() => {
      this.todos$ = this.todoService.getTodos().pipe(defaultIfEmpty([]));
        });
  }

  /**
   * Toggle todo completion
   * @param id - todo id
   * @description Toggle todo completion
   */
  onToggleTodoCompletion(id: string): void {
    this.todoService.toggleTodoCompletion(id).subscribe(() => {
      this.todos$ = this.todoService.getTodos().pipe(defaultIfEmpty([]));
    });
  }

  /**
   * Toggle show completed todos
   * @description Toggle show completed todos
   */
  toggleShowCompletedTodos(){
    this.showCompletedTodos = !this.showCompletedTodos;
  }

  /**
   * Remove todo from list
   * @param id - todo id
   * @description Remove todo from list
   */
  onRemoveTodo(id: string): void {
    this.todoService.removeTodo(id).subscribe(() => {
      this.todos$ = this.todoService.getTodos().pipe(defaultIfEmpty([]));
    });
  }

  /**
   * Clear completed todos
   * @description Clear completed todos
   */
  onClearCompletedTodos(): void {
    this.todoService.clearCompletedTodos().subscribe(() => {
      this.todos$ = this.todoService.getTodos().pipe(defaultIfEmpty([]));
    });
  }

  /**
   * Reset todos
   * @description Reset todos
   */
  onResetTodos(): void {
    this.todoService.resetTodos().subscribe(() => {
      this.todos$ = this.todoService.getTodos().pipe(defaultIfEmpty([]));
    });
  }

  /**
   * Track by id
   * @param _ - index
   * @param todo - todo
   * @description Track by id
   * @returns id of todo
   */
  trackById(_: number, todo: Todo): string {
    return todo.id;
  }

  /**
   * Has todos completed
   * @description Check if there are any completed todos
   * @returns true if there are completed todos, false otherwise
   */
  hasTodosCompleted(): boolean {
    return this.todoService.hasCompletedTodos();
  }

  /**
   * Has todos
   * @description Check if there are any todos
   * @returns true if there are todos, false otherwise
   */
  hasTodos(): boolean {
    return this.todoService.hasToDo();
  }

}
