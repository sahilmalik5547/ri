import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddEmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  employeeService = inject(EmployeeService);
  employees = this.employeeService.getEmployeesSignal();
  showModal: boolean = false;
  editEmp: Employee | undefined;

  ngOnInit(): void {
    this.employeeService.loadEmployees();
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  onEmployeeAdded(employee?: Employee) {
    if (employee && !employee.id) {
      delete employee.id
      this.addEmployee(employee)
    } else if (employee && employee.id) {
      this.editEmployee(employee)
    }
    this.toggleModal();
  }
  addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee);
  }

  editEmployee(employee: Employee) {
    this.employeeService.editEmployee(employee);
  }

  deleteEmployee(id: number | undefined) {
    if (id) this.employeeService.deleteEmployee(id);
  }
  get currentEmployees(): Employee[] {
    return this.employees().filter(employee => !employee.noDate);
  }

  get previousEmployees(): Employee[] {
    return this.employees().filter(employee => employee.noDate);
  }

  swipedIndex: number | null = null;


  onSwipeRight(index: number) {
    this.swipedIndex = index; 
    setTimeout(() => {
      this.deleteEmployee(this.currentEmployees[index].id);
      this.swipedIndex = null;
    }, 300); 
  }
}
