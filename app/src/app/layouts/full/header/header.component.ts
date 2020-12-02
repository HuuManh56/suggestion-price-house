import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { UserToken } from '../../../core/models/user-token.model';
import { Storage } from '../../../shared/service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  userInfo: UserToken;

  constructor(
    public actr: ActivatedRoute,
    private userService: UserService,
    public router: Router,
  ) {
    this.userInfo = Storage.getUserToken();
  }

  public userInformation() {
    this.router.navigate(['/user-info']);
  }

  public changePassword() {
    this.router.navigate(['/user-info/change-password']);
  }

  public logOut() {
    this.router.navigate(['/login']);
    Storage.clear();
  }
}
