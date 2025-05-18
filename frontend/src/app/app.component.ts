<<<<<<< HEAD
import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
=======
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services';
>>>>>>> frontend-backend_CANETE
import { Account, Role } from './_models';

@Component({
  selector: 'app',
<<<<<<< HEAD
  templateUrl: 'app.component.html'
})
export class AppComponent {
  Role = Role;
  account: Account;
=======
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  Role = Role;
  account: Account | null;
>>>>>>> frontend-backend_CANETE

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
  }

<<<<<<< HEAD
=======
  ngOnInit() {
    // Verify authentication on app startup/refresh
    this.accountService.verifyAuth();
  }

>>>>>>> frontend-backend_CANETE
  logout() {
    this.accountService.logout();
  }
}