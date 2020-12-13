import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-protected-page',
  templateUrl: './protected-page.component.html',
  styleUrls: ['./protected-page.component.css'],
})
export class ProtectedPageComponent implements OnInit {
  message: any = null;
  private userSub: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((currentUser) => {
      this.message = currentUser
        ? Object.keys(currentUser).length === 0
          ? null
          : currentUser.msg
        : null;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
