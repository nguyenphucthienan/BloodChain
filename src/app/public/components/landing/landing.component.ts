import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/core/services/statistic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  readonly logoPhotoUrl = environment.photoUrl.logo;
  readonly statisticOptions = {
    duration: 3
  };

  statistics: any;

  constructor(private statisticService: StatisticService) { }

  ngOnInit() {
    this.statisticService.getLandingStatistics()
      .subscribe(statistics => this.statistics = statistics);
  }

}
