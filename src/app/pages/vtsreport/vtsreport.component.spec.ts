import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtsreportComponent } from './vtsreport.component';

describe('VtsreportComponent', () => {
  let component: VtsreportComponent;
  let fixture: ComponentFixture<VtsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VtsreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
