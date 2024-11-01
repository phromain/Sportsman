import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmActivationComponent } from './qcm-activation.component';

describe('QcmActivationComponent', () => {
  let component: QcmActivationComponent;
  let fixture: ComponentFixture<QcmActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmActivationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
