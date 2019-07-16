import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  readonly loveboxPhotoUrl = environment.photoUrl.notFound;

  constructor() { }

  ngOnInit() {
  }

}
