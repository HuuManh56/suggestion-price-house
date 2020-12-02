import { Component, OnInit } from '@angular/core';
import { UserToken } from '../../../core/models/user-token.model';
import { Storage } from '../../../shared/service/storage.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  userInfo: UserToken;
  constructor() {
    this.userInfo = Storage.getUserToken();
   }

  ngOnInit() {
  }

}
