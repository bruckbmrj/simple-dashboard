import { LoginResponse } from './../domain/dtos/login-response.dto';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/state/user/dtos/login.dto';
import { environment } from 'src/environments/environment';
import { BaseResourceService } from '../../shared/services/base.service';
import { UserEntity } from '../domain/entities/user.entity';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseResourceService<UserEntity> {

  constructor (protected injector: Injector) {
    super(`${environment.url}api/users`, injector, UserEntity.fromJson)
  }

   login({ email, password }: LoginRequest): Observable<LoginResponse> {
     const url = `${environment.url}sessions`
     return this.httpClient.post<LoginResponse>(url,{email, password})
   }
}
