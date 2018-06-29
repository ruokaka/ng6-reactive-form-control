import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectNameNotAllowed = ['Test', 'Test2'];
  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      // the third parameter of the contructor is the asyncValidator
      'projectName': new FormControl('', [Validators.required, CustomValidators.invalidProjectName],
        CustomValidators.asyncInvalidProjectName),
      'projectEmail': new FormControl('', [Validators.required, Validators.email]),
      'projectType': new FormControl('critical')
    });
  }

  forbidProjectName(control: FormControl): { [key: string]: boolean } {
    // the reason to bind this - is because of closure, the this scope has changed
    if (this.projectNameNotAllowed.indexOf(control.value) && control.value) {
      return { 'projectNameNotAllowed': true };
    }
    return null;
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
