import { Point } from './point.interface';
import { Role } from './role.interface';

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date;
  email: string;
  phone: string;
  address: string;
  location?: Point;
  roles?: Role[];
  rawPassword?: string;
}
