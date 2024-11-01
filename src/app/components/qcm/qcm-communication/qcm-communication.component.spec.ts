import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmCommunicationComponent } from './qcm-communication.component';

describe('QcmCommunicationComponent', () => {
  let component: QcmCommunicationComponent;
  let fixture: ComponentFixture<QcmCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmCommunicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
