export interface TransferHistory {
  transferType: number;
  id: string;
  fromType: string;
  fromId: string;
  fromName: string;
  toType: string;
  toId: string;
  toName: string;
  description: string;
  transferedAt: Date;
}
