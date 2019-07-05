import { Point } from './point.interface';

export interface BloodTestCenter {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: Point;
}
