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
/** The service that manages the todos */
export class TodoService {
  /** The URL of the API */
  private apiURL = 'http://localhost:3000/todos';
  /** The subject that emits the todos */
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  /**
   * Constructor
   * @param http The HTTP client to make requests
   * @description This constructor will inject the HTTP client to make requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Get all todos
   * @returns An observable that emits the todos
   * @description This method will make a GET request to the server to get all todos
   */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL).pipe(
      map(todos => {
        this.todosSubject.next(todos);
        return todos;
      })
    );
  }

  /**
   * Get a todo by id
   * @param id The id of the todo to get
   * @returns An observable that emits the todo
   * @description This method will make a GET request to the server to get the todo with the specified id
   */
  getTodoById(id:string):Observable<Todo>{
    return this.http.get<Todo>(`${this.apiURL}/${id}`);
  }

  /**
   * Add a new todo
   * @param todo The todo to add
   * @returns An observable that completes when the todo is added
   * @description This method will make a POST request to the server to add the todo
   */
  addTodo(todo: Todo): Observable<void> {
    return this.http.post<void>(this.apiURL, todo).pipe(
      map(() => {
        const updatedTodos = [...this.todosSubject.value, todo];
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  /**
   * Toggle the completion status of a todo
   * @param id The id of the todo to toggle
   * @returns An observable that completes when the todo is toggled
   * @description This method will make a PUT request to the server to toggle the completion status of the todo
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
   * @description This method will make a DELETE request to the server to remove the todo with the specified id
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
   * @description This method will check if there are any todos in the list of todos that are completed
   */
  hasCompletedTodos(): boolean {
    const todos = this.todosSubject.value;
    return todos.some(todo => todo.completed);
  }

  hasToDo(): boolean {
    const todos = this.todosSubject.value;
    return todos.some(todo => !todo.completed);
  }

  /**
   * Clear all completed todos from the list of todos
   * @returns An observable that completes when the completed todos are removed
   * @description This method will remove all completed todos from the list of todos and the server as well by sending a DELETE request for each completed todo
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
