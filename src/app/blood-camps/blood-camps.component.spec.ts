import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCampsComponent } from './blood-camps.component';

describe('BloodCampsComponent', () => {
  let component: BloodCampsComponent;
  let fixture: ComponentFixture<BloodCampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCampsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
