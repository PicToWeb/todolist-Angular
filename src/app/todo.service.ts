import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, from, map, mergeMap, Observable, toArray} from "rxjs";
import {HttpClient} from "@angular/common/http";

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
  private apiURL = 'http://localhost:3000/todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * Get all todos
   * @returns An observable that emits the todos
   */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL).pipe(
      map(todos => {
        this.todosSubject.next(todos);
        return todos;
      })
    );
  }

  getTodoById(id:string):Observable<Todo>{
    return this.http.get<Todo>(`${this.apiURL}/${id}`);
  }

  /**
   * Add a new todo
   * @param id The id of the todo
   * @param title The title of the todo
   * @param completed The completion status of the todo
   * @param priority The priority of the todo
   * @param dueDate The due date of the todo
   * @returns An observable that completes when the todo is added
   */
  addTodo(id:string,title:string,completed:boolean,priority:'low'|'middle'|'high',dueDate:Date):Observable<void>{
    return this.http.post<void>(this.apiURL,{id,title,completed,priority,dueDate});
  }

  /**
   * Toggle the completion status of a todo
   * @param id The id of the todo to toggle
   * @returns An observable that completes when the todo is toggled
   */
  toggleTodoCompletion(id: string): Observable<void> {
    const todos = this.todosSubject.value;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      return this.http.put<void>(`${this.apiURL}/${id}`, updatedTodo).pipe(
        map(() => {
          const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo);
          this.todosSubject.next(updatedTodos);
        })
      );
    }
    return new Observable<void>(observer => observer.complete());
  }

  /**
   * Remove a todo
   * @param id The id of the todo to remove
   * @returns An observable that completes when the todo is removed from the list of todos
   */
  removeTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`).pipe(
      map(() => {
        const updatedTodos = this.todosSubject.value.filter(todo => todo.id !== id);
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  /**
   * Check if there are any completed todos
   * @returns A boolean indicating if there are any completed todos
   */
  hasCompletedTodos(): boolean {
    const todos = this.todosSubject.value;
    return todos.some(todo => todo.completed);
  }

  /**
   * Get all completed todos
   * @returns An observable that emits the completed todos
   */
  getCompletedTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable().pipe(
      map(todos => todos.filter(todo => todo.completed))
    );
  }

  /**
   * Clear all completed todos from the list of todos
   * @returns An observable that completes when the completed todos are removed
   */
  clearCompletedTodos(): Observable<void> {
    const completedTodos = this.todosSubject.value.filter(todo => todo.completed);
    const deleteRequests = completedTodos.map(todo => this.http.delete<void>(`${this.apiURL}/${todo.id}`));

    return forkJoin(deleteRequests).pipe(
      map(() => {
        const updatedTodos = this.todosSubject.value.filter(todo => !todo.completed);
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  /**
   * Reset the list of todos
   * @returns An observable that completes when the list of todos is reset
   * @description This method will remove all todos from the list of todos and the server as well by sending a DELETE request for each todo in the list of todos
   */
  resetTodos(): Observable<void> {
    const allTodos = this.todosSubject.value;
    return from(allTodos).pipe(
      mergeMap(todo => this.http.delete<void>(`${this.apiURL}/${todo.id}`)),
      toArray(),
      map(() => {
        this.todosSubject.next([]);
      })
    );
  }

}
