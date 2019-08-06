import { Photo } from './photo.interface';
import { Point } from './point.interface';

export interface BloodBank {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: Point;
  photos: Photo[];
}
