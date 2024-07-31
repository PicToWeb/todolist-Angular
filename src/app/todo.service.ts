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

  addTodo(id:string,title:string,completed:boolean,priority:'low'|'middle'|'high',dueDate:Date):Observable<void>{
    return this.http.post<void>(this.apiURL,{id,title,completed,priority,dueDate});
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

  removeTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  // getCompletedTodos():Observable<Todo[]> {
  //   return this.todosSubject.asObservable().pipe(
  //     map(todos=>todos.filter(todo=>todo.completed))
  //   );
  // }
  //
  // getIncompleteTodos(): Observable<Todo[]> {
  //   return this.todosSubject.asObservable().pipe(
  //     map(todos => todos.filter(todo => !todo.completed))
  //   );
  // }






  // clearCompletedTodos(): void {
  //   const completedTodos = this.todosSubject.value.filter(todo => todo.completed);
  //   completedTodos.forEach(todo => {
  //     this.http.delete<void>(`${this.apiURL}/${todo.id}`).subscribe(() => {
  //       const updatedTodos = this.todosSubject.value.filter(t => t.id !== todo.id);
  //       this.todosSubject.next(updatedTodos);
  //     });
  //   });
  // }

  // resetTodos(): void {
  //   const allTodos = this.todosSubject.value;
  //   allTodos.forEach(todo => {
  //     this.http.delete<void>(`${this.apiURL}/${todo.id}`).subscribe(() => {
  //       const updatedTodos = this.todosSubject.value.filter(t => t.id !== todo.id);
  //       this.todosSubject.next(updatedTodos);
  //     });
  //   });
  // }

}
