import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BloodCamp } from 'src/app/core/models/blood-camp.interface';

@Component({
  selector: 'app-blood-camp-detail',
  templateUrl: './blood-camp-detail.component.html',
  styleUrls: ['./blood-camp-detail.component.scss']
})
export class BloodCampDetailComponent implements OnInit, OnDestroy {

  bloodCamp: BloodCamp;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.route.data.subscribe((data: any) => {
      this.bloodCamp = data.bloodCamp;
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
