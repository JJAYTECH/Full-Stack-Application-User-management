<<<<<<< HEAD
// admin/employees/transfer.component.ts
=======
>>>>>>> frontend-backend_CANETE
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

<<<<<<< HEAD
import { DepartmentService, EmployeeService, AlertService, WorkflowService } from '@app/_services';
import { Department } from '@app/_models';

@Component({ templateUrl: 'transfer.component.html' })
export class TransferComponent implements OnInit {
    form: FormGroup;
    id: number;
    loading = false;
    submitted = false;
    departments: Department[];
    employee: any;
    oldDepartmentId: number;
=======
import { EmployeeService, DepartmentService, AlertService, WorkflowService } from '@app/_services';
import { Department } from '@app/_models/department';
import { Employee } from '@app/_models/employee';

@Component({ templateUrl: 'transfer.component.html' })
export class TransferComponent implements OnInit {
    form!: FormGroup;
    id!: number;
    employee?: Employee;
    departments: Department[] = [];
    loading = false;
    submitting = false;
    submitted = false;
    oldDepartmentId?: number;
>>>>>>> frontend-backend_CANETE

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
<<<<<<< HEAD
        private departmentService: DepartmentService,
        private employeeService: EmployeeService,
        private alertService: AlertService,
        private workflowService: WorkflowService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            departmentId: ['', Validators.required]
        });

        // Load departments for dropdown
        this.departmentService.getAll()
            .pipe(first())
            .subscribe(departments => this.departments = departments);

        // Load employee details
=======
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private workflowService: WorkflowService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        
        // Load departments for dropdown
        this.departmentService.getAll()
            .pipe(first())
            .subscribe(departments => {
                this.departments = departments;
            });
        
        this.form = this.formBuilder.group({
            departmentId: ['', Validators.required]
        });
        
        this.loading = true;
>>>>>>> frontend-backend_CANETE
        this.employeeService.getById(this.id)
            .pipe(first())
            .subscribe(employee => {
                this.employee = employee;
<<<<<<< HEAD
                this.oldDepartmentId = employee.department?.id;
                this.form.patchValue({ departmentId: this.oldDepartmentId });
            });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const newDepartmentId = this.form.value.departmentId;
        
        this.employeeService.transfer(this.id, newDepartmentId)
            .pipe(first())
            .subscribe({
                next: () => {
                    // Create workflow record after successful transfer
                    this.createTransferWorkflow(newDepartmentId);
                    
                    this.alertService.success('Transfer successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private createTransferWorkflow(newDepartmentId: number) {
        const oldDeptName = this.departments.find(d => d.id === this.oldDepartmentId)?.name || 'Unknown';
        const newDeptName = this.departments.find(d => d.id === newDepartmentId)?.name || 'Unknown';
        
        const workflowParams = {
            type: 'Transfer',
            status: 'completed',
            details: {
                message: `Employee transfer completed`,
                employeeId: this.id,
                fromDepartment: {
                    id: this.oldDepartmentId,
                    name: oldDeptName
                },
                toDepartment: {
                    id: newDepartmentId,
                    name: newDeptName
                },
                timestamp: new Date().toISOString()
            },
            employeeId: this.id
        };

        console.log('Creating workflow with params:', workflowParams);

        this.workflowService.create(workflowParams)
            .pipe(first())
            .subscribe({
                next: () => console.log('Workflow record created for transfer'),
                error: error => console.error('Error creating workflow record', error)
            });
    }
}
=======
                this.oldDepartmentId = employee.departmentId;
                this.form.patchValue({ departmentId: '' }); // Clear department selection by default
                this.loading = false;
            });
    }
    
    get f() { return this.form.controls; }
    
    onSubmit() {
        this.submitted = true;
        
        // reset alerts on submit
        this.alertService.clear();
        
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        
        // If department hasn't changed, no need to transfer
        if (this.oldDepartmentId === this.form.value.departmentId) {
            this.alertService.info('Employee is already in this department.');
            return;
        }
        
        this.submitting = true;
        
        // Instead of calling transfer API, create a transfer workflow request
        this.createTransferRequest();
    }
    
    private createTransferRequest() {
        // Find department names for readability
        const oldDepartment = this.departments.find(d => d.id === this.oldDepartmentId);
        const newDepartment = this.departments.find(d => d.id === parseInt(this.form.value.departmentId, 10));
        
        if (!newDepartment) {
            this.alertService.error('Selected department not found');
            this.submitting = false;
            return;
        }
        
        const oldDeptName = oldDepartment?.name || 'None';
        const newDeptName = newDepartment.name;
        
        // Create a transfer workflow with Pending status
        const workflow = {
            employeeId: this.id,
            type: 'Transfer',
            status: 'Pending',
            details: {
                oldDepartmentId: this.oldDepartmentId,
                oldDepartmentName: oldDeptName,
                newDepartmentId: parseInt(this.form.value.departmentId, 10),
                newDepartmentName: newDeptName,
                transferRequestedBy: 'Admin',
                requestDate: new Date()
            }
        };
        
        this.workflowService.create(workflow)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Transfer request submitted and pending approval', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/admin/employees/workflows/' + this.id);
                },
                error: error => {
                    this.alertService.error('Failed to create transfer request: ' + error);
                    this.submitting = false;
                }
            });
    }
} 
>>>>>>> frontend-backend_CANETE
