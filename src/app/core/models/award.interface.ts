import { Photo } from './photo.interface';

export interface Award {
  _id: string;
  createdAt: Date;
  name: string;
  point: number;
  description: string;
  codes?: string[];
  photos: Photo[];
}
