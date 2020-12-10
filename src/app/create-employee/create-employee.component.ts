import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from './../employee.service';
// import { Employee } from './../employee';
import { Employee } from './../modelos/employee.modelo';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  forma: FormGroup;
  employee: Employee = new Employee();
  submitted = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.crearformulario();
   }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  crearformulario(){
    this.forma = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      emailId: ['', [Validators.required, Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  // tslint:disable-next-line: typedef
  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
