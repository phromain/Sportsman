import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmConcentrationComponent } from './qcm-concentration.component';

describe('QcmConcentrationComponent', () => {
  let component: QcmConcentrationComponent;
  let fixture: ComponentFixture<QcmConcentrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmConcentrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmConcentrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
