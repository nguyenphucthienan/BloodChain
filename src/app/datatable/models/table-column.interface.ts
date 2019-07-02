export interface TableColumn {
  name: string;
  text: string;
  type: string;
  sortable?: boolean;
  center?: boolean;
  nowrap?: boolean;
  minWidth?: string;
}
