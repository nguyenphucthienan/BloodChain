import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
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

  constructor(
    private statisticService: StatisticService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.statisticService.getLandingStatistics()
      .subscribe(statistics => this.statistics = statistics);
  }

  downloadApp(type: string) {
    if (type === 'android') {
      window.open('https://bloodchain.best/releases/BloodChain.apk', '_blank');
    } else if (type === 'ios') {
      this.alertService.info('landing.message.underDevelopment');
    }
  }

}
