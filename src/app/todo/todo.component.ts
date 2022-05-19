import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../interfaces/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateId!: any;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.description,
      startDate: this.todoForm.value.startDate,
      endDate: this.todoForm.value.endDate,
      done: false,
    });
    this.todoForm.reset();
  }

  editTask(item: ITask, i: number) {
    this.todoForm.controls['description'].setValue(item.description);
    this.todoForm.controls['startDate'].setValue(item.startDate);
    this.todoForm.controls['endDate'].setValue(item.endDate);
    this.updateId = i;
    this.isEdit = true;
  }

  updateTask() {
    this.tasks[this.updateId].description = this.todoForm.value.description;
    this.tasks[this.updateId].startDate = this.todoForm.value.startDate;
    this.tasks[this.updateId].endDate = this.todoForm.value.endDate;
    this.tasks[this.updateId].done = false;
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEdit = false;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgressTask(i: number) {
    this.inprogress.splice(i, 1);
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
