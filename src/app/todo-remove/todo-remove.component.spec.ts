import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRemoveComponent } from './todo-remove.component';

describe('TodoRemoveComponent', () => {
  let component: TodoRemoveComponent;
  let fixture: ComponentFixture<TodoRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoRemoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
