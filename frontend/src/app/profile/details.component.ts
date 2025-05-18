<<<<<<< HEAD
import { Component  } from "@angular/core";
import { AccountService } from "@app/_services";

@Component({ templateUrl: 'details.component.html'})
export class DetailsComponent {
    account = this.accountService.accountValue;
    constructor(private accountService: AccountService) { }
}
=======
import { Component } from '@angular/core';

import { AccountService } from '../../app/_services';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
    account: any;

    constructor(private accountService: AccountService) {
        this.account = this.accountService.accountValue;
    }
}
>>>>>>> frontend-backend_CANETE
