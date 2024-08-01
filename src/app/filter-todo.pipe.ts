import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "./todo/todo.service";

@Pipe({
  name: 'filterTodo',
  standalone: true
})
export class FilterTodoPipe implements PipeTransform {

  transform(todos: Todo[] | null, showCompleted: boolean): Todo[] {
    if (!todos) {
      return [];
    }
    return todos.filter(todo => todo.completed === showCompleted);
  }

}
