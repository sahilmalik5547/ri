import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../employee';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnChanges{
  @Input({ required: false }) employee?: Employee|any;
  @Output() employeeAdded: EventEmitter<Employee> = new EventEmitter();
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.employeeForm = this.fb.group({
      id: [this.employee ? this.employee.id : null],
      name: [this.employee ? this.employee.name : '', Validators.required],
      role: [this.employee ? this.employee.role : '', Validators.required],
      joiningDate: [
        this.employee ? this.employee.joiningDate : '',
        Validators.required,
      ],
      noDate: [this.employee ? this.employee.noDate : ''],
    });

    this.employeeForm.get('noDate')?.valueChanges.subscribe(() => {
      this.validateDateFields();
    });
  }
  ngOnChanges(): void {
    this.employeeForm.patchValue(this.employee);
  }

  validateDateFields(): void {
    const joiningDate = this.employeeForm.get('joiningDate')?.value;
    const noDate = this.employeeForm.get('noDate')?.value;

    if (joiningDate && noDate && new Date(joiningDate) >= new Date(noDate)) {
      this.employeeForm.get('noDate')?.setErrors({ invalid: true });
    } else {
      this.employeeForm.get('noDate')?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      this.employeeAdded.emit(employee);
    } else {
      console.log('Form is invalid');
    }
  }
  cancel(): void {
    this.employeeAdded.emit();
  }

  openCalendar(field: string): void {
    const dialogRef = this.dialog.open(CalendarComponent, {
      width: 'auto',
      data: {
        date:
          field === 'joiningDate'
            ? this.employeeForm.get('joiningDate')?.value
            : this.employeeForm.get('nodate')?.value,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        if (field === 'joiningDate') {
          this.employeeForm.get('joiningDate')?.setValue(result);
        } else if (field === 'noDate') {
          this.employeeForm.get('noDate')?.setValue(result);
        }
      }
    });
  }
}
