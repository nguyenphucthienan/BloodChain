import { BloodCamp } from './blood-camp.interface';
import { User } from './user.interface';
import { BloodSeparationCenter } from './blood-separation-center.interface';

export interface BloodPack {
  _id: string;
  createdAt: Date;
  donor: User;
  volume: number;
  tested: boolean;
  bloodCamp: BloodCamp;
  separated: boolean;
  bloodSeparationCenter?: BloodSeparationCenter;
  currentLocation: string;
}
