import { BloodBank } from './blood-bank.interface';
import { BloodCamp } from './blood-camp.interface';
import { BloodSeparationCenter } from './blood-separation-center.interface';
import { BloodTestCenter } from './blood-test-center.interface';
import { Hospital } from './hospital.interface';
import { Photo } from './photo.interface';
import { Point } from './point.interface';
import { Role } from './role.interface';

export interface User {
  _id: string;
  createdAt: Date;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Date;
  email: string;
  phone: string;
  address: string;
  location?: Point;
  photo: Photo;
  roles?: Role[];
  rawPassword?: string;
  bloodCamp?: BloodCamp;
  bloodTestCenter?: BloodTestCenter;
  bloodSeparationCenter?: BloodSeparationCenter;
  bloodBank?: BloodBank;
  hospital?: Hospital;
}
