export interface TransferHistory {
  historyType: number;
  id: string;
  fromType: string;
  fromId: string;
  fromName: string;
  toType: string;
  toId: string;
  toName: string;
  operatedBy: string;
  transferedAt: Date;
  description: string;
}
