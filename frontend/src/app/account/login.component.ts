import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

<<<<<<< HEAD
import { AccountService, AlertService } from '@app/_services';

@Component({
  templateUrl: 'login.component.html'
})
=======
import { AccountService, AlertService } from '../../app/_services';

@Component({ templateUrl: 'login.component.html' })
>>>>>>> frontend-backend_CANETE
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
<<<<<<< HEAD
  ) {}
=======
  ) { }
>>>>>>> frontend-backend_CANETE

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
<<<<<<< HEAD
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
  
    // reset alerts on submit
    this.alertService.clear();
  
=======
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

>>>>>>> frontend-backend_CANETE
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
<<<<<<< HEAD
  
    this.loading = true;
    this.accountService.login(this.f.email.value, this.f.password.value)
=======

    this.loading = true;
    this.accountService
      .login(this.f.email.value, this.f.password.value)
>>>>>>> frontend-backend_CANETE
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.alertService.error(error);
<<<<<<< HEAD
          console.log('login failed', error);
=======
>>>>>>> frontend-backend_CANETE
          this.loading = false;
        }
      });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> frontend-backend_CANETE
