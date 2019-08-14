import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePointTypeTableCellComponent } from './update-point-type-table-cell.component';

describe('UpdatePointTypeTableCellComponent', () => {
  let component: UpdatePointTypeTableCellComponent;
  let fixture: ComponentFixture<UpdatePointTypeTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePointTypeTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePointTypeTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
