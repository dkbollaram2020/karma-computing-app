import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // pageTitle = 'Karma Computing';
  // isAuthenticated = false;
  // private userSub: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loginOnRefresh();

    // this.userSub = this.authService.user.subscribe((currentUser) => {
    //   this.isAuthenticated = !!currentUser;
    // });
  }

  // ngOnDestroy() {
  //   this.userSub.unsubscribe();
  // }
}
