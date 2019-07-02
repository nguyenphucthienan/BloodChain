import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTableCellComponent } from './actions-table-cell.component';

describe('ActionsTableCellComponent', () => {
  let component: ActionsTableCellComponent;
  let fixture: ComponentFixture<ActionsTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
