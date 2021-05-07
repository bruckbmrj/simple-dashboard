import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<any> {

  user$: Observable<any>;
  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user$ = this.store.select(state => state.users.userLogged)
    const token = this.authService.getToken()
    this.user$.subscribe(el =>  {
      if (el) {
        return el
      }

      if (token) {
        return token
      }
      //return this.router.navigate(['login'])
    })

  }
}
