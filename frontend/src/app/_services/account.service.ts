<<<<<<< HEAD
// _services/account.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/_models';

const baseUrl = `${environment.apiUrl}/accounts`;

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;
=======
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, switchMap, tap } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account } from '../../app/_models';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account | null>;
  public account: Observable<Account | null>;
  private refreshTokenTimeout: any;
>>>>>>> frontend-backend_CANETE

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
<<<<<<< HEAD
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
      .pipe(map(account => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  logout() {
    this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  refreshToken() {
    return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
      .pipe(map((account) => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  register(account: Account) {
    return this.http.post(`${baseUrl}/register`, account);
  }

  verifyEmail(token: string) {
    return this.http.post(`${baseUrl}/verify-email`, { token });
  }

  forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email });
  }

  validateResetToken(token: string) {
    return this.http.post(`${baseUrl}/validate-reset-token`, { token });
  }

  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
  }

  getAll() {
    return this.http.get<Account[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Account>(`${baseUrl}/${id}`);
  }

  create(params) {
    return this.http.post(baseUrl, params);
  }

  update(id: string, params) {
    return this.http.put(`${baseUrl}/${id}`, params)
      .pipe(map((account: any) => {
        // Update the current account if it was updated
        if (account.id === this.accountValue.id) {
          // Publish updated account to subscribers
          account = { ...this.accountValue, ...account };
          this.accountSubject.next(account);
        }
        return account;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(finalize(() => {
        // Auto logout if the logged-in account was deleted
        if (id === this.accountValue.id) {
          this.logout();
        }
      }));
  }

  // Helper methods
  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // Parse JWT token from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

    // Set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
=======
    const storedAccount = localStorage.getItem('account');
    this.accountSubject = new BehaviorSubject<Account | null>(storedAccount ? JSON.parse(storedAccount) : null);
    this.account = this.accountSubject.asObservable();
    
    // If we have an account, start refresh token timer
    if (this.accountValue?.id) {
      // Start refresh token timer
      this.startRefreshTokenTimer();
      
      // Verify authentication on startup
      this.verifyAuth();
    }
  }

  public get accountValue(): Account | null {
    return this.accountSubject.value;
  }

  private getHttpOptions() {
    const account = this.accountValue;
    if (!account?.jwtToken) {
      this.cleanupAndRedirect();
      return {};
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${account.jwtToken}`
      }),
      withCredentials: true
    };
  }

  login(email: string, password: string) {
    console.log(`Login attempt for ${email} to URL: ${baseUrl}/authenticate`);
    
    // Create consistent headers
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<any>(
      `${baseUrl}/authenticate`, 
      { email, password }, 
      httpOptions
    ).pipe(
      map(account => {
        if (!account || !account.jwtToken) {
          console.error('Invalid login response:', account);
          throw new Error('Invalid login response');
        }
        
        // Store the account info in memory and localStorage
        this.accountSubject.next(account);
        localStorage.setItem('account', JSON.stringify(account));
        
        // Also store refresh token in localStorage as a fallback
        // This will be used if the cookie mechanism fails
        localStorage.setItem('refreshToken', account.refreshToken);
        
        // Log successful authentication
        console.log('Authentication successful for user:', account.email);
        
        // Start the refresh token timer
        this.startRefreshTokenTimer();
        
        return account;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        
        // Handle CORS errors specially
        if (error.message && error.message.includes('Http failure response for')) {
          return throwError(() => new Error('Cannot connect to authentication server. Please try again later.'));
        }
        
        // Transform the error to a more user-friendly message
        let errorMsg = 'Login failed';
        if (error.error && error.error.message) {
          errorMsg = error.error.message;
        } else if (error.message) {
          errorMsg = error.message;
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  logout() {
    const refreshToken = this.accountValue?.refreshToken;
    
    if (refreshToken) {
      // Try to revoke the token
      this.http.post<any>(`${baseUrl}/revoke-token`, { token: refreshToken }, { withCredentials: true })
        .subscribe({
          next: () => {
            this.cleanupAndRedirect();
          },
          error: (error) => {
            console.error('Token revocation failed:', error);
            // Even if revocation fails, we should still clean up and redirect
            this.cleanupAndRedirect();
          }
        });
    } else {
      this.cleanupAndRedirect();
    }
  }

  private cleanupAndRedirect() {
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    localStorage.removeItem('account');
    localStorage.removeItem('refreshToken');
    
    this.router.navigate(['/account/login']);
  }

  private startRefreshTokenTimer() {
    try {
      // Parse the JWT token to get the expiration time
      const jwtToken = this.accountValue?.jwtToken;
      if (!jwtToken) {
        console.error('No JWT token found when starting timer');
        return;
      }

      // Get the token expiry time - 2 minutes to ensure we refresh before it expires
      const tokenParts = jwtToken.split('.');
      if (tokenParts.length !== 3) {
        console.error('Invalid JWT token format');
        return;
      }

      try {
        const tokenPayload = JSON.parse(atob(tokenParts[1]));
        const expires = new Date(tokenPayload.exp * 1000);
        const currentTime = new Date();
        
        // Calculate timeout
        let timeout = expires.getTime() - currentTime.getTime() - (120 * 1000); // Refresh 2 minutes before expiry
        
        // If the timeout is negative or too large, use a sensible default
        if (timeout < 0 || timeout > 14 * 60 * 1000) { // If negative or more than 14 minutes
          console.warn('Token expiry calculation issue, using default 10 minute refresh');
          timeout = 10 * 60 * 1000; // 10 minutes
        }

        // Set timeout to refresh the token
        this.refreshTokenTimeout = setTimeout(() => {
          console.log('Refreshing token automatically');
          this.refreshToken().subscribe({
            error: err => {
              console.error('Auto-refresh failed, will retry soon:', err);
              // If refresh fails, try again in 30 seconds
              setTimeout(() => this.refreshToken().subscribe(), 30000);
            }
          });
        }, Math.max(1000, timeout)); // Ensure minimum timeout of 1 second
        
        console.log(`Token refresh scheduled in ${Math.round(timeout/1000)} seconds (at ${new Date(currentTime.getTime() + timeout).toLocaleTimeString()})`);
      } catch (error) {
        console.error('Error parsing JWT token:', error);
        // Set a default timeout
        this.refreshTokenTimeout = setTimeout(() => {
          console.log('Using fallback refresh timer');
          this.refreshToken().subscribe();
        }, 10 * 60 * 1000); // 10 minutes
      }
    } catch (error) {
      console.error('Error in startRefreshTokenTimer:', error);
    }
>>>>>>> frontend-backend_CANETE
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
<<<<<<< HEAD
}
=======

  refreshToken() {
    console.log('Attempting to refresh token');
    
    // Get the fallback refresh token if it exists
    const fallbackToken = localStorage.getItem('refreshToken');
    
    // Make sure we don't send "null" or "undefined" as strings
    let body = {};
    if (fallbackToken && fallbackToken !== 'null' && fallbackToken !== 'undefined') {
      console.log('Using fallback token from localStorage');
      body = { refreshToken: fallbackToken };
    } else {
      console.log('No fallback token available in localStorage');
    }
    
    return this.http.post<any>(
      `${baseUrl}/refresh-token`, 
      body, 
      { 
        withCredentials: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      map((account) => {
        if (!account || !account.jwtToken) {
          console.error('Invalid refresh token response:', account);
          throw new Error('Invalid refresh token response');
        }
        console.log('Token refreshed successfully');
        
        // Store the new refresh token as fallback
        if (account.refreshToken) {
          localStorage.setItem('refreshToken', account.refreshToken);
        }
        
        // Update stored account with new token but preserve other data
        const updatedAccount = {
          ...this.accountValue, // Keep existing account data
          ...account, // Update with new token and other returned fields
        };
        
        this.accountSubject.next(updatedAccount);
        localStorage.setItem('account', JSON.stringify(updatedAccount));
        
        // Restart the refresh timer
        this.startRefreshTokenTimer();
        
        return updatedAccount;
      }),
      catchError(error => {
        console.error('Token refresh failed:', error);
        
        // Only cleanup and redirect if it's a true authentication error
        if (error.status === 401 || error.status === 403) {
          this.cleanupAndRedirect();
        }
        
        return throwError(() => new Error('Session expired. Please login again.'));
      })
    );
  }

  register(account: Account) {
    return this.http.post(`${baseUrl}/register`, account, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          
          let errorMsg = '';
          
          if (error.error && error.error.message) {
            errorMsg = error.error.message;
            // Check specifically for email already registered errors
            if (errorMsg.toLowerCase().includes('email') && 
                errorMsg.toLowerCase().includes('already registered')) {
              errorMsg = `Email "${account.email}" is already registered`;
            }
          } else if (error.message) {
            errorMsg = error.message;
          } else {
            errorMsg = 'Registration failed';
          }
          
          return throwError(() => errorMsg);
        })
      );
  }

  verifyEmail(token: string) {
    return this.http.post(`${baseUrl}/verify-email`, { token }, { withCredentials: true });
  }

  forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email }, { withCredentials: true });
  }

  validateResetToken(token: string) {
    return this.http.post(`${baseUrl}/validate-reset-token`, { token }, { withCredentials: true });
  }

  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword }, { withCredentials: true });
  }

  getAll() {
    return this.http.get<Account[]>(baseUrl, this.getHttpOptions());
  }

  getById(id: string) {
    return this.http.get<Account>(`${baseUrl}/${id}`, this.getHttpOptions());
  }

  create(params) {
    return this.http.post(baseUrl, params, this.getHttpOptions());
  }

  update(id, params) {
    console.log(`Updating account ID ${id} with params:`, params);
    
    const account = this.accountValue;
    if (!account || !account.jwtToken) {
      console.error('No account or token available for update operation');
      return throwError(() => new Error('Authentication required'));
    }
    
    console.log(`Using token for update: ${account.jwtToken.substring(0, 20)}...`);
    
    return this.http.put(`${baseUrl}/${id}`, params, this.getHttpOptions()).pipe(
      map((updatedAccount: any) => {
        console.log('Update successful, server response:', updatedAccount);
        
        // If updating the current user, update stored user data
        if (updatedAccount.id === this.accountValue?.id) {
          const mergedAccount = { ...this.accountValue, ...updatedAccount };
          console.log('Updating current user data:', mergedAccount);
          
          this.accountSubject.next(mergedAccount);
          localStorage.setItem('account', JSON.stringify(mergedAccount));
        }
        
        return updatedAccount;
      }),
      catchError(error => {
        console.error('Update failed:', error);
        let errorMsg = 'Update failed';
        
        if (error.status === 401) {
          // Handle authentication error - try to refresh token
          console.log('Authentication error during update, attempting refresh');
          return this.refreshToken().pipe(
            switchMap(() => this.update(id, params))
          );
        }
        
        // Transform the error to a more user-friendly message
        if (error.error && error.error.message) {
          errorMsg = error.error.message;
        } else if (error.message) {
          errorMsg = error.message;
        }
        
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`, this.getHttpOptions()).pipe(
      finalize(() => {
        if (id === this.accountValue?.id) {
          this.logout();
        }
      })
    );
  }

  // helper methods
  public testConnection(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/connection-test`, this.getHttpOptions())
      .pipe(
        tap(response => console.log('Connection test response:', response)),
        catchError(error => {
          console.error('Connection test failed:', error);
          return throwError(() => error);
        })
      );
  }

  // Verify authentication status - useful for page refresh
  verifyAuth() {
    // If we have an account stored, try to refresh the token
    if (this.accountValue && this.accountValue.jwtToken) {
      console.log('Verifying authentication status on page load/refresh');
      this.refreshToken().subscribe({
        next: () => {
          console.log('Authentication verified successfully');
          // No need to do anything else here, the token is refreshed
        },
        error: (error) => {
          console.error('Authentication verification failed:', error);
          // Only clean up if truly invalid, not for network errors
          if (error.status === 401 || error.status === 403) {
            this.cleanupAndRedirect();
          }
        }
      });
    }
  }
}
>>>>>>> frontend-backend_CANETE
