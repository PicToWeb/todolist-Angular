import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
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
  todos$ = this.todosSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL).pipe(
      map(todos => {
        this.todosSubject.next(todos);
        return todos;
      })
    );
  }

  //CHERCHE LENTEUR
  getCompletedTodos():Observable<Todo[]> {
    return this.todosSubject.asObservable().pipe(
      map(todos=>todos.filter(todo=>todo.completed))
    );
  }
  //
  // getIncompleteTodos(): Observable<Todo[]> {
  //   return this.todosSubject.asObservable().pipe(
  //     map(todos => todos.filter(todo => !todo.completed))
  //   );
  // }

  addTodo(title: string, priority: 'low' | 'middle' | 'high', dueDate: Date): Observable<Todo> {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      dueDate
    };
    return this.http.post<Todo>(this.apiURL, newTodo).pipe(
      map(todo => {
        this.todosSubject.next([...this.todosSubject.value, todo]);
        return todo;
      })
    );
  }

  toggleTodoCompletion(id: string): void {
    const todos = this.todosSubject.value;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      this.http.put<Todo>(`${this.apiURL}/${id}`, updatedTodo).subscribe(() => {
        const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo);
        this.todosSubject.next(updatedTodos);
      });
    }
  }

  // toggleTodoCompletion(id:string){
  //   this.todos = this.todos.map(todo=>todo.id===id?{...todo,completed:!todo.completed}:todo);
  //   this.todosSubject.next(this.todos);
  // }

  removeTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`).pipe(
      map(() => {
        const updatedTodos = this.todosSubject.value.filter(todo => todo.id !== id);
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  // removeTodo(id:string){
  //   this.todos = this.todos.filter(todo=>todo.id!==id);
  //   this.todosSubject.next(this.todos);
  // }

  clearCompletedTodos(): void {
    const completedTodos = this.todosSubject.value.filter(todo => todo.completed);
    completedTodos.forEach(todo => {
      this.http.delete<void>(`${this.apiURL}/${todo.id}`).subscribe(() => {
        const updatedTodos = this.todosSubject.value.filter(t => t.id !== todo.id);
        this.todosSubject.next(updatedTodos);
      });
    });
  }

  resetTodos(): void {
    const allTodos = this.todosSubject.value;
    allTodos.forEach(todo => {
      this.http.delete<void>(`${this.apiURL}/${todo.id}`).subscribe(() => {
        const updatedTodos = this.todosSubject.value.filter(t => t.id !== todo.id);
        this.todosSubject.next(updatedTodos);
      });
    });
  }

}
