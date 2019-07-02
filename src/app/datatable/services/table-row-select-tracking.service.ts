import { Injectable } from '@angular/core';

@Injectable()
export class TableRowSelectTrackingService {

  private selectedIds = new Set<string>();

  getStateId(id: string): boolean {
    return this.selectedIds.has(id);
  }

  setStateId(id: string, checked: boolean) {
    if (checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
  }

  clear() {
    this.selectedIds.clear();
  }

  getInfo() {
    return { selectedIds: this.selectedIds };
  }

}
