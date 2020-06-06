import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  AddDataForm: FormGroup;
  submitted = false;
  showList = false;
  DeleteBtn = false;

  fieldArray: Array<any> = [];
  Showitem: any = {};

  constructor(private fb: FormBuilder, private el: ElementRef) {
    this.AddDataForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('TodoList')) != null){
      this.showList = true;
      this.fieldArray = JSON.parse(localStorage.getItem('TodoList'));
    }
    if (this.fieldArray.length >= 2) {
      this.DeleteBtn = true;
    }
  }
  // Add lists
  addFieldValue() {
    this.submitted = true;
    for (const key of Object.keys(this.AddDataForm.controls)) {
      if (this.AddDataForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }
    if (this.AddDataForm.invalid) {
      return;
    }
    this.fieldArray.push(this.AddDataForm.value);
    localStorage.setItem('TodoList', JSON.stringify(this.fieldArray)); 
    
    if (this.fieldArray.length > 0) {
      this.showList = true;
    }
    if (this.fieldArray.length >= 2) {
      this.DeleteBtn = true;
    }
    this.submitted = false;
    this.AddDataForm.reset();
  }

  //  Remove from lists
  deleteFieldValue(index) {
    if(this.fieldArray.length >= 2){
      this.fieldArray.splice(index, 1);
      localStorage.setItem('TodoList', JSON.stringify(this.fieldArray)); 
    }
    if(this.fieldArray.length <= 1){
      this.DeleteBtn = false;
    }
    
  }
  // Show Details
  ShowDetails(val: any) {
    this.Showitem = this.fieldArray[val];
  }
}
