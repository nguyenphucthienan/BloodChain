import { Point } from './point.interface';

export interface BloodCamp {
  _id: string;
  name: string;
  address: string;
  location: Point;
}
