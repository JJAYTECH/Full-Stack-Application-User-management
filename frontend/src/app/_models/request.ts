<<<<<<< HEAD
// _models/request.ts
import { Employee } from './employee';

export class Request {
    id: number;
    type: string;
    items: any[];
    status: string;
    created: Date;
    updated: Date;
    employeeId: number;
    employee: {
        id: number;
        employeeId: string;
    };

    constructor(init?: Partial<Request>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
=======
import { Employee } from './employee';
import { RequestItem } from './request-item';

export class Request {
    id?: number;
    employeeId?: number;
    status?: 'Pending' | 'Approved' | 'Rejected';
    type?: string;
    created?: Date;
    updated?: Date;
    
    // Navigation properties
    employee?: Employee;
    items?: RequestItem[];
    
    // UI properties
    isDeleting?: boolean;
    updating?: boolean;
} 
>>>>>>> frontend-backend_CANETE
