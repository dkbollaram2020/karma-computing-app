import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(
        'https://karmatest.subscriby.shop/auth/jwt-login',
        {
          username: username,
          password: password,
        },
        httpOptions
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.user.next(response);
          localStorage.setItem('currentUser', JSON.stringify(response));
        })
      );
  }

  loginOnRefresh() {
    let userData: any = localStorage.getItem('currentUser');
    userData = userData !== null ? JSON.parse(userData) : {};
    if (!userData || Object.keys(userData).length === 0) {
      return;
    }
    if (userData) {
      this.user.next(userData);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('currentUser');
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
