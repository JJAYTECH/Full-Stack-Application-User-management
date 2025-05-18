<<<<<<< HEAD
// auth.guard.ts

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';
=======
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../../app/_services';
>>>>>>> frontend-backend_CANETE

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        if (account) {
            // check if route is restricted by role
<<<<<<< HEAD
            if (route.data['roles'] && !route.data['roles'].includes(account.role)) {
=======
            if (route.data.roles && !route.data.roles.includes(account.role)) {
>>>>>>> frontend-backend_CANETE
                // role not authorized so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
<<<<<<< HEAD
=======

>>>>>>> frontend-backend_CANETE
            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> frontend-backend_CANETE
