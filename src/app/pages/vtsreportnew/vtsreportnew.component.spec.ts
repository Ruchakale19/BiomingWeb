import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtsreportnewComponent } from './vtsreportnew.component';

describe('VtsreportnewComponent', () => {
  let component: VtsreportnewComponent;
  let fixture: ComponentFixture<VtsreportnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VtsreportnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsreportnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
