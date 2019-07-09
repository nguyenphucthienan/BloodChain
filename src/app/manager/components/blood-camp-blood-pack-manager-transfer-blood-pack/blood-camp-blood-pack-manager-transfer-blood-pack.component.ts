import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';

@Component({
  selector: 'app-blood-camp-blood-pack-manager-transfer-blood-pack',
  templateUrl: './blood-camp-blood-pack-manager-transfer-blood-pack.component.html',
  styleUrls: ['./blood-camp-blood-pack-manager-transfer-blood-pack.component.scss']
})
export class BloodCampBloodPackManagerTransferBloodPackComponent implements OnInit {

  bloodPacks: BloodPack[] = [];

  constructor(
    private router: Router,
    private bloodPackService: BloodPackService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const { bloodPacks } = navigation.extras.state;
      if (bloodPacks) {
        this.bloodPacks = bloodPacks;
      }
    }
  }

  ngOnInit() {
  }

}
