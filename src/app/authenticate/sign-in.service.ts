import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";

export interface User {
  id: string;
  username: string;
  email:string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private usersUrl = 'http://localhost:3000/users';
  private userSubject = new BehaviorSubject<User[]>([]);
  constructor(private http: HttpClient) { }

  addUser(user:User):Observable<User>{
    return this.http.post<User>(this.usersUrl,user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.usersUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            this.userSubject.next(users);
            return users[0];
          } else {
            throw new Error('Invalid email or password');
          }
        }),
        catchError(this.loginError)
      );
  }

  getUser(): Observable<User[]> {
    return this.userSubject.asObservable();
  }

  private loginError(error: HttpErrorResponse){
    return throwError(() => new Error('Invalid email or password'));
  }
}
