import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { TaskModel } from 'src/app/core/types/task/task.dto';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  form: FormGroup
  @Input() value?: TaskModel
  @Output() submitted = new EventEmitter()
  constructor () {
    const control = {
      name: new UntypedFormControl('', [Validators.required]),
      title: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', [Validators.required]),
      progress: new UntypedFormControl(0, []),
      dueDate: new UntypedFormControl(undefined),
    }
    this.form = new FormGroup(control)
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value = changes['value']
    if(value) {
      this.form.patchValue(value.currentValue)
    }
  }

  isInvalid (controlName: string) {
    return this.form.controls[controlName]?.invalid
  }

  submit () {    
    this.form.updateValueAndValidity()
    if(this.form.valid){
      this.submitted.emit(this.form.value)
    }
  }
}
