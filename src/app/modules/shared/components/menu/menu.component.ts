import { Logout } from './../../../../state/user/user.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetUserById } from 'src/app/state/user/user.action';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // @Select(UserState.getUserLogged)
  userLogged$: Observable<string>
  email: null
  constructor(
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {
    this.getUserLogged()
  }

  getUserLogged(): void {
    this.userLogged$ = this.store.select(state => state.users.userLogged)

    this.userLogged$.subscribe((user: any) =>  {
      if (!user) {
        this.getUserById()
        return
      }
      this.email = user.email
    })
  }

  getUserById(): void {
    const userId = localStorage.getItem('@userId')
    if (userId) {
      this.store.dispatch( new GetUserById(userId)).subscribe(response => {
        if (response.userLogged) {
          this.email = response.userLogged.email
        }
      })
    }
  }

  logout(): void {
    this.store.dispatch( new Logout()).subscribe(el => {
      this.router.navigate(['login'])
    })
  }

}
