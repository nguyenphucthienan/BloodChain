import { BloodCamp } from './blood-camp.interface';
import { User } from './user.interface';

export interface BloodPack {
  _id: string;
  donor: User;
  volume: number;
  bloodCamp: BloodCamp;
}
