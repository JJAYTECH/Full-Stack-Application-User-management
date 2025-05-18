<<<<<<< HEAD
// admin/add-edit.component

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
=======
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { Role } from '@app/_models';
>>>>>>> frontend-backend_CANETE
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
<<<<<<< HEAD
    form: UntypedFormGroup;
=======
    form: FormGroup;
>>>>>>> frontend-backend_CANETE
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
<<<<<<< HEAD

    constructor(
        private formBuilder: UntypedFormBuilder,
=======
    isAdmin = false;

    constructor(
        private formBuilder: FormBuilder,
>>>>>>> frontend-backend_CANETE
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
<<<<<<< HEAD

=======
        
        // Check if current user is admin
        this.isAdmin = this.accountService.accountValue?.role === Role.Admin;
        
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        // Initialize form
>>>>>>> frontend-backend_CANETE
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
<<<<<<< HEAD
            role: ['', Validators.required],
            status: ['inactive', Validators.required],
            password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
            confirmPassword: ['']
=======
            password: ['', passwordValidators],
            confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
            role: [Role.User, Validators.required],
            status: ['Active', this.isAdmin ? Validators.required : Validators.nullValidator],
            acceptTerms: [true, Validators.requiredTrue]
>>>>>>> frontend-backend_CANETE
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });

<<<<<<< HEAD
        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

=======
        // Load account data in edit mode
        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe({
                    next: account => {
                        this.form.patchValue(account);
                        // If admin is editing their own account, don't allow status change
                        if (this.isAdmin && account.id === this.accountService.accountValue?.id) {
                            this.form.get('status').disable();
                        }
                    },
                    error: error => {
                        this.alertService.error('Error loading account: ' + error);
                        this.router.navigate(['/admin/accounts']);
                    }
                });
        }
    }

    // convenience getter for easy access to form fields
>>>>>>> frontend-backend_CANETE
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
<<<<<<< HEAD
    
        // Clear previous alerts
        this.alertService.clear();
    
        if (this.form.invalid) {
            // Show alert
            this.alertService.error('Please correct the errors in the form.');
    
            // Log field-specific errors
            Object.keys(this.form.controls).forEach(key => {
                const controlErrors = this.form.get(key)?.errors;
                if (controlErrors != null) {
                    console.log('Validation failed for:', key, controlErrors);
                }
            });
    
            return;
        }
    
        this.loading = true;
    
=======

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
>>>>>>> frontend-backend_CANETE
        if (this.isAddMode) {
            this.createAccount();
        } else {
            this.updateAccount();
        }
    }

    private createAccount() {
        this.accountService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
<<<<<<< HEAD
                    this.alertService.success('Account created successfully.', { keepAfterRouteChange: true });
=======
                    this.alertService.success('Account created successfully', { keepAfterRouteChange: true });
>>>>>>> frontend-backend_CANETE
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateAccount() {
<<<<<<< HEAD
        this.accountService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    console.log('Update successful:', response);
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: (error) => {
                    console.error('Update error:', error);
=======
        // Prepare update payload - only admin can update status
        const updatePayload = { ...this.form.value };
        if (!this.isAdmin) {
            delete updatePayload.status;
        }
        
        this.accountService.update(this.id, updatePayload)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
>>>>>>> frontend-backend_CANETE
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> frontend-backend_CANETE
