import { BloodCamp } from './blood-camp.interface';
import { BloodSeparationCenter } from './blood-separation-center.interface';
import { BloodTestCenter } from './blood-test-center.interface';
import { User } from './user.interface';

export interface BloodPack {
  _id: string;
  createdAt: Date;
  donor: User;
  volume: number;
  bloodCamp: BloodCamp;
  tested: boolean;
  bloodTestCenter?: BloodTestCenter;
  separated: boolean;
  bloodSeparationCenter?: BloodSeparationCenter;
  currentLocation: string;
}
