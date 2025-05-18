<<<<<<< HEAD
// _services/request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Request } from '@app/_models';

const baseUrl = `${environment.apiUrl}/requests`;
=======
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Request } from '../_models/request';

const baseUrl = environment.apiUrl.replace('/accounts', '');
>>>>>>> frontend-backend_CANETE

@Injectable({ providedIn: 'root' })
export class RequestService {
    constructor(private http: HttpClient) { }

<<<<<<< HEAD
    getAll(): Observable<Request[]> {
        return this.http.get<Request[]>(baseUrl);
    }

    getById(id: number): Observable<Request> {
        return this.http.get<Request>(`${baseUrl}/${id}`);
    }

    getByEmployee(employeeId: number): Observable<Request[]> {
        return this.http.get<Request[]>(`${baseUrl}/employee/${employeeId}`);
    }

    create(params: any): Observable<Request> {
        return this.http.post<Request>(baseUrl, params);
    }

    update(id: number, params: any): Observable<Request> {
        return this.http.put<Request>(`${baseUrl}/${id}`, params);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
=======
    private getHttpOptions() {
        const accountJson = localStorage.getItem('account');
        if (!accountJson) return {};
        
        try {
            const account = JSON.parse(accountJson);
            return {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${account.jwtToken}`
                })
            };
        } catch (error) {
            console.error('Error parsing account from localStorage', error);
            return {};
        }
    }

    getAll(): Observable<Request[]> {
        return this.http.get<Request[]>(`${baseUrl}/requests`, this.getHttpOptions())
            .pipe(catchError(error => {
                console.error('Error fetching requests:', error);
                return of([]);
            }));
    }

    getById(id: number): Observable<Request> {
        return this.http.get<Request>(`${baseUrl}/requests/${id}`, this.getHttpOptions());
    }

    getByEmployeeId(employeeId: number): Observable<Request[]> {
        return this.http.get<Request[]>(`${baseUrl}/requests/employee/${employeeId}`, this.getHttpOptions())
            .pipe(catchError(error => {
                console.error(`Error fetching requests for employee ${employeeId}:`, error);
                return of([]);
            }));
    }

    create(request: Request): Observable<Request> {
        return this.http.post<Request>(`${baseUrl}/requests`, request, this.getHttpOptions());
    }

    update(id: number, request: Request): Observable<Request> {
        return this.http.put<Request>(`${baseUrl}/requests/${id}`, request, this.getHttpOptions());
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${baseUrl}/requests/${id}`, this.getHttpOptions());
    }

    updateStatus(id: number, status: string): Observable<Request> {
        return this.http.put<Request>(`${baseUrl}/requests/${id}/status`, { status }, this.getHttpOptions());
    }
} 
>>>>>>> frontend-backend_CANETE
