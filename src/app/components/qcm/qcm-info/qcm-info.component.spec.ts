import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmInfoComponent } from './qcm-info.component';

describe('QcmInfoComponent', () => {
  let component: QcmInfoComponent;
  let fixture: ComponentFixture<QcmInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
