import { Photo } from './photo.interface';

export interface Campaign {
  _id: string;
  createdAt: Date;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  photos: Photo[];
}
