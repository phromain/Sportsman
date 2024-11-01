import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmStressAnxieteComponent } from './qcm-stress-anxiete.component';

describe('QcmStressAnxieteComponent', () => {
  let component: QcmStressAnxieteComponent;
  let fixture: ComponentFixture<QcmStressAnxieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmStressAnxieteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmStressAnxieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
