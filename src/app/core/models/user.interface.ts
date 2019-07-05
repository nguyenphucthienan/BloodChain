import { Point } from './point.interface';
import { Role } from './role.interface';

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  location?: Point;
  roles?: Role[];
  rawPassword?: string;
}
