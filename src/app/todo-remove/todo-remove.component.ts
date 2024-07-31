import {Component, OnInit} from '@angular/core';
import {TodoService} from "../todo.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'digi-todo-remove',
  standalone: true,
  imports: [],
  templateUrl: './todo-remove.component.html',
  styleUrl: './todo-remove.component.css'
})
/** todo-remove component*/
export class TodoRemoveComponent implements OnInit{

  /** todo-remove ctor */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  /**
   * Remove todo
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.removeTodo(id).subscribe(() => {
        this.router.navigate(['/']).then();
      });
    }
  }

}
