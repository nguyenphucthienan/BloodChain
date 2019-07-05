import { Point } from './point.interface';

export interface BloodSeparationCenter {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: Point;
}
