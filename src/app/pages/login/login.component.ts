import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/state/user/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store) { }

  ngOnInit(): void {
    this.buildform()
  }

  buildform(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submit(): void {
    const userProps = this.loginForm.getRawValue()
    this.store.dispatch(new Login(userProps)).subscribe(response =>  {
      if (response.users) {
        this.router.navigate(['admin'])
      }
    })

  }

}
// https://coderthemes.com/hyper/saas/index.html
