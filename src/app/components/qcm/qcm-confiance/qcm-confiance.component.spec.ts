import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmConfianceComponent } from './qcm-confiance.component';

describe('QcmConfianceComponent', () => {
  let component: QcmConfianceComponent;
  let fixture: ComponentFixture<QcmConfianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmConfianceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmConfianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
