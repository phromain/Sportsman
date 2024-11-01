import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmEnergieComponent } from './qcm-energie.component';

describe('QcmEnergieComponent', () => {
  let component: QcmEnergieComponent;
  let fixture: ComponentFixture<QcmEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmEnergieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
