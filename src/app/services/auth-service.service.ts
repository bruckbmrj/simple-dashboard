import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  clearToken(): void {
    localStorage.removeItem('@token')
  }

  setToken(token: string): void {
    localStorage.setItem('@token', token)
  }

  getToken(): string {
    return localStorage.getItem('@token')
  }

  refreshToken(): void {

  }
}
