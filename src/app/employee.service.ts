import { Injectable, signal } from '@angular/core';
import { Employee } from './employee';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSignal = signal<Employee[]>([]);  // Angular signal for employee list

  constructor(private dbService: NgxIndexedDBService) { }

  // Get employees signal
  getEmployeesSignal() {
    return this.employeesSignal;
  }

  // Add new employee
  addEmployee(employee: Omit<Employee, 'id'>): void {
    try {
      this.dbService.add('employees', employee).subscribe((id) => {
        this.loadEmployees();  // Reload employees after adding
      });
    } catch (error) {
      console.error('Unexpected error addEmployee:', error);
    }
  }

  // Update employee
  editEmployee(employee: Employee): void {
    try {
      this.dbService.update('employees', employee).subscribe(() => {
        this.loadEmployees();  // Reload employees after editing
      });
    } catch (error) {
      console.error('Unexpected error editEmployee:', error);
    }
  }

  // Delete employee
  deleteEmployee(id: number): void {
    try {
      this.dbService.delete('employees', id).subscribe(() => {
        this.loadEmployees();  // Reload employees after deleting
      });
    } catch (error) {
      console.error('Unexpected error deleteEmployee:', error);
    }
  }

  // Load all employees
  loadEmployees(): void {
    try {
      this.dbService.getAll('employees').subscribe((employees: any) => {
        this.employeesSignal.set(employees);  // Update signal with new data
      });
    } catch (error) {
      console.error('Unexpected error getAll:', error);
    }
  }
}
