import { Role } from './role.interface';

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: Role[];
}
