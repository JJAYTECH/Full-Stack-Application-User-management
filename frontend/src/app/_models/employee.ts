<<<<<<< HEAD
// _models/employee.ts
import { Account } from './account';
import { Department } from './department';

export class Employee {
    id: number;
    employeeId: string;
    position: string;
    hireDate: Date;
    status: string;
    created: Date;
    updated: Date;
    account: Account;
    department: Department;

    constructor(init?: Partial<Employee>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
=======
import { Department } from './department';

export class Employee {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    departmentId?: number;
    position?: string;
    hireDate?: Date;
    phone?: string;
    status?: 'Active' | 'Inactive';
    created?: Date;
    updated?: Date;
    
    // Navigation properties
    department?: Department;
    
    // UI properties
    isDeleting?: boolean;
} 
>>>>>>> frontend-backend_CANETE
