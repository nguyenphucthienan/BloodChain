import { Photo } from './photo.interface';

export interface Reward {
  _id: string;
  createdAt: Date;
  name: string;
  point: number;
  description: string;
  codes?: string[];
  quantity?: string[];
  photos?: Photo[];
}
