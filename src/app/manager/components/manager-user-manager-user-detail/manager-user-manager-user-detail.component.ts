import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-manager-user-manager-user-detail',
  templateUrl: './manager-user-manager-user-detail.component.html',
  styleUrls: ['./manager-user-manager-user-detail.component.scss']
})
export class ManagerUserManagerUserDetailComponent implements OnInit, OnDestroy {

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
