import { BloodCamp } from './blood-camp.interface';
import { BloodSeparationCenter } from './blood-separation-center.interface';
import { BloodTestCenter } from './blood-test-center.interface';
import { BloodTestResult } from './blood-test-result.interface';
import { User } from './user.interface';

export interface BloodPack {
  _id: string;
  createdAt: Date;
  donor: User;
  volume: number;
  bloodType?: string;
  bloodCamp: BloodCamp;
  bloodTestCenter?: BloodTestCenter;
  tested: boolean;
  testPassed?: boolean;
  testResults?: BloodTestResult[];
  testDescription?: string;
  bloodSeparationCenter?: BloodSeparationCenter;
  separated: boolean;
  currentLocation: string;
}
