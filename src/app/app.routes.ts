import { Routes } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoDetailComponent} from "./todo-detail/todo-detail.component";
import {TodoRemoveComponent} from "./todo-remove/todo-remove.component";

export const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path:'about' ,component:TodoDetailComponent},
  {path:'view/:id',component: TodoDetailComponent},
  {path:'remove/:id',component: TodoRemoveComponent}
];
