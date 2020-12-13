import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  pageTitle: string = 'Please Login...';
  isLoading = false;
  error: any = null;
  isAuthenticated = false;
  private userSub: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((currentUser) => {
      this.isAuthenticated = currentUser
        ? Object.keys(currentUser).length === 0
          ? false
          : true
        : false;

      if (this.isAuthenticated) {
        this.router.navigate(['/protected']);
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;

    this.authService.login(username, password).subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/protected']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
