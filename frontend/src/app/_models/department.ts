<<<<<<< HEAD
// _models/department.ts
export class Department {
    id: number;
    name: string;
    description: string;
    created: Date;
    updated: Date;

    constructor(init?: Partial<Department>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
=======
export class Department {
    id?: number;
    name?: string;
    description?: string;
    managerId?: number;
    created?: Date;
    updated?: Date;
    
    // Additional properties 
    employeeCount?: number;
    
    // UI properties
    isDeleting?: boolean;
} 
>>>>>>> frontend-backend_CANETE
