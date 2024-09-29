import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from "moment";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  readonly data: any = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<AddEmployeeComponent>);
  activeButton: string = 'today';
  currentMonth!: string;
  days: moment.Moment[] = [];
  selectedDate = this.data.date ? moment(this.data.date, 'YYYY-MM-DD') : moment();
  displayMonth = moment();  today = moment();

  ngOnInit(): void {
    this.renderCalendar();
  }

  renderCalendar() {
    // Adjust the calendar to use the displayMonth instead of the current moment
    const startOfMonth = this.displayMonth.clone().startOf('month');
    const endOfMonth = this.displayMonth.clone().endOf('month');
    const startOfWeek = startOfMonth.clone().startOf('week');
    const endOfWeek = endOfMonth.clone().endOf('week');

    this.days = [];
    let date = startOfWeek.clone();

    while (date.isBefore(endOfWeek)) {
      this.days.push(date.clone());
      date.add(1, 'day');
    }
  }

  selectDate(day: moment.Moment) {
    this.selectedDate = day;
  }

  isToday(day: moment.Moment): boolean {
    return day.isSame(this.today, 'day');
  }
  isSelected(day: moment.Moment): boolean {
    return day.isSame(this.selectedDate)
  }

  previousMonth() {
    this.displayMonth = this.displayMonth.subtract(1, 'month');
        this.renderCalendar();
  }

  nextMonth() {
    this.displayMonth = this.displayMonth.add(1, 'month');
    this.renderCalendar();
    
  }
  goToToday() {
    this.today = moment();
    this.selectedDate = this.today;
    this.renderCalendar();
  }

  goToNextMonday() {
    const nextMonday = moment().isoWeekday(8); // Next Monday
    this.selectedDate = nextMonday;
    this.renderCalendar();
  }
  goToNextTuesday() {
    const nextTuesday = moment().isoWeekday(9); // Next Monday
    this.selectedDate = nextTuesday;
    this.renderCalendar();
  }

  goAfterOneWeek() {
    const oneWeekLater = moment().add(1, 'week');
    this.selectedDate = oneWeekLater;
    this.renderCalendar();
  }

  // Close the dialog and return the selected date
  save(): void {
    if (this.selectedDate) {
      const formattedDate = this.selectedDate.format('D MMM YYYY');
      this.dialogRef.close(formattedDate);
    }
  }

  // Cancel the dialog without returning a date
  cancel(): void {
    this.dialogRef.close();
  }}
