import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {PriorityPipe} from "../../priority.pipe";
import {Todo, TodoService} from "../todo.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'digi-todo-detail',
  standalone: true,
  imports: [
    DatePipe,
    PriorityPipe,
    NgClass,
    NgIf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
/** todo-detail component*/
export class TodoDetailComponent implements OnInit {

  /** todo-detail ctor */
  todo: Todo | undefined;

  /** todo-detail ctor */
  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  /** todo-detail ctor */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.getTodoById(id).subscribe(todo => {
        this.todo = {...todo, dueDate: new Date(todo.dueDate)};
      });
    }
  }

}
