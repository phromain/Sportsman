import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmPdfComponent } from './qcm-pdf.component';

describe('QcmPdfComponent', () => {
  let component: QcmPdfComponent;
  let fixture: ComponentFixture<QcmPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcmPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QcmPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
