import { BloodProductType } from './blood-product-type.interface';
import { BloodSeparationCenter } from './blood-separation-center.interface';
import { User } from './user.interface';

export interface BloodProduct {
  _id: string;
  createdAt: Date;
  donor: User;
  bloodSeparationCenter: BloodSeparationCenter;
  bloodProductType: BloodProductType;
  volume: number;
  bloodType: string;
  expirationDate: Date;
  description: string;
  currentLocation: string;
}
