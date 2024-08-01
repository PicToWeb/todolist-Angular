import { Routes } from '@angular/router';
import {TodoListComponent} from "./todo/todo-list/todo-list.component";
import {TodoDetailComponent} from "./todo/todo-detail/todo-detail.component";
import {TodoRemoveComponent} from "./todo/todo-remove/todo-remove.component";
import {SignInComponent} from "./authenticate/signin/signIn.component";
import {LoginComponent} from "./authenticate/login/login.component";


export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'sign-in',component: SignInComponent},
  {path:'list' ,component:TodoListComponent },
  {path:'view/:id',component: TodoDetailComponent},
  {path:'remove/:id',component: TodoRemoveComponent},

];
