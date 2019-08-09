import { Component, Input, OnInit } from '@angular/core';
import { BloodTestCenter } from 'src/app/core/models/blood-test-center.interface';

@Component({
  selector: 'app-blood-test-center-card',
  templateUrl: './blood-test-center-card.component.html',
  styleUrls: ['./blood-test-center-card.component.scss']
})
export class BloodTestCenterCardComponent implements OnInit {

  @Input() bloodTestCenter: BloodTestCenter;

  constructor() { }

  ngOnInit() {
  }

}
