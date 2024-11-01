import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmEmotionsComponent } from './qcm-emotions.component';

describe('QcmEmotionsComponent', () => {
  let component: QcmEmotionsComponent;
  let fixture: ComponentFixture<QcmEmotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmEmotionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmEmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
