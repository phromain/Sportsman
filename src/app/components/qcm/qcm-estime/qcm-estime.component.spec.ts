import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmEstimeComponent } from './qcm-estime.component';

describe('QcmEstimeComponent', () => {
  let component: QcmEstimeComponent;
  let fixture: ComponentFixture<QcmEstimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmEstimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmEstimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
