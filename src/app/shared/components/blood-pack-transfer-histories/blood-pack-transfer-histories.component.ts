import { Component, Input, OnInit } from '@angular/core';
import { TransferHistory } from 'src/app/core/models/transfer-history.interface';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';

@Component({
  selector: 'app-blood-pack-transfer-histories',
  templateUrl: './blood-pack-transfer-histories.component.html',
  styleUrls: ['./blood-pack-transfer-histories.component.scss']
})
export class BloodPackTransferHistoriesComponent implements OnInit {

  @Input() bloodPackId: string;
  @Input() showMessages = false;
  @Input() auditable = false;

  expandEnabled = true;
  transferHistories: TransferHistory[] = [];

  constructor(private bloodPackService: BloodPackService) { }

  ngOnInit() {
    this.bloodPackService.getBloodPackTransferHistories(this.bloodPackId)
      .subscribe(transferHistories => this.transferHistories = transferHistories);
  }

  onHeaderClick(event: any) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event: any) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onExpandEntry(expanded: boolean, index: number) {
  }

}
