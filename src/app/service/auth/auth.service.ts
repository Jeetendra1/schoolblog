import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/model/User.model';

export interface AuthResponseData {
  authtoken: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpiration: any;

  url = 'http://localhost:9000';
  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    const userData: {
      token: string;
      expiresIn: number;
    } = JSON.parse(localStorage.getItem('userData'));
    console.log('autologin');
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.token, new Date(userData.expiresIn));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDate =
        new Date(userData.expiresIn).getTime() - new Date().getTime();
      this.autoLogout(expirationDate);
    }
  }

  signUp(studentPayload) {
    return this.http
      .post<AuthResponseData>(`${this.url}/students`, studentPayload)
      .pipe(
        catchError(this.handelError),
        tap((resData) => {
          this.handleAuthentication(resData.authtoken, resData.expiresIn);
        })
      );
  }

  private handleAuthentication(token: string, expiresIn: number) {
    const expirationdate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(token, expirationdate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.url}/login`, { email, password })
      .pipe(
        catchError(this.handelError),
        tap((resData) => {
          console.log('sas', resData);
          this.handleAuthentication(resData.authtoken, resData.expiresIn);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpiration) {
      clearTimeout(this.tokenExpiration);
    }
    this.tokenExpiration = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpiration = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handelError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    return throwError(errorMessage);
  }
}
