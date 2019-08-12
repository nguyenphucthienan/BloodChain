import { BloodCamp } from './blood-camp.interface';
import { Photo } from './photo.interface';

export interface Campaign {
  _id: string;
  createdAt: Date;
  name: string;
  bloodCamp: BloodCamp;
  startDate: Date;
  endDate: Date;
  description: string;
  photos: Photo[];
}
