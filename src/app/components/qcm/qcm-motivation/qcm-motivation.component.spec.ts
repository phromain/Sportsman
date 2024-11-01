import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmMotivationComponent } from './qcm-motivation.component';

describe('QcmMotivationComponent', () => {
  let component: QcmMotivationComponent;
  let fixture: ComponentFixture<QcmMotivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmMotivationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmMotivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
