<<<<<<< HEAD
// _models/account.ts

import { Role } from './role';

export class Account {
    id: string;
    title: string | null;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    status: string;
    jwtToken?: string;
    isVerified?: boolean;
    refreshTokens?: string[];
    dateCreated?: Date;
    dateUpdated?: Date;

    constructor(init?: Partial<Account>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
=======
import { Role } from './role';

export interface Account {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  jwtToken?: string;
  refreshToken?: string;
  isVerified: boolean;
  acceptTerms: boolean;
  lastActive?: Date;
  isOnline?: boolean;
  status?: string;
}
>>>>>>> frontend-backend_CANETE
