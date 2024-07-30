import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority:'low' | 'middle' | 'high';
  dueDate : Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);

  constructor() {
  }

  getTodos() {
    return this.todosSubject.asObservable();
  }

  getCompletedTodos():Observable<Todo[]> {
    return this.todosSubject.asObservable().pipe(
      map(todos=>todos.filter(todo=>todo.completed))
    );
  }

  getIncompleteTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable().pipe(
      map(todos => todos.filter(todo => !todo.completed))
    );
  }

  addTodo(title:string,priority:'low' | 'middle' | 'high',dueDate:Date){
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed:false,
      priority,
      dueDate
    };
    this.todos=[...this.todos,newTodo];
    this.todosSubject.next(this.todos);
  }

  toggleTodoCompletion(id:string){
    this.todos = this.todos.map(todo=>todo.id===id?{...todo,completed:!todo.completed}:todo);
    this.todosSubject.next(this.todos);
  }

  removeTodo(id:string){
    this.todos = this.todos.filter(todo=>todo.id!==id);
    this.todosSubject.next(this.todos);
  }

  clearCompletedTodos() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.todosSubject.next(this.todos);
  }

  resetTodos() {
    this.todos = [];
    this.todosSubject.next(this.todos);
  }

}
