import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreateUser } from 'src/app/state/user/user.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.buildform()
  }


  buildform(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    })
  }
  get f() { return this.registerForm.controls; }

  submit(): void {
    const user = this.registerForm.getRawValue()

    this.store.dispatch( new CreateUser(user)).subscribe(response => {
      console.log('response => ', response)
    }, err => {
      if (err.statusCode === 400) {
        console.log('Informações erradas', err.message)
      }
    })

  }

}
