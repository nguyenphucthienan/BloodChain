import { BloodCamp } from './blood-camp.interface';
import { User } from './user.interface';

export interface BloodPack {
  _id: string;
  createdAt: Date;
  donor: User;
  volume: number;
  bloodCamp: BloodCamp;
}
