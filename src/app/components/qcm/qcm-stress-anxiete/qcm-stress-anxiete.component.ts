import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertService } from '../../../service/alert.service';
import { QcmService } from '../../../service/qcm.service';
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-qcm-stress-anxiete',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTooltipModule,  NgFor,],
  templateUrl: './qcm-stress-anxiete.component.html',
  styleUrl: './qcm-stress-anxiete.component.css'
})
export class QcmStressAnxieteComponent {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  formStressAnxiete: FormGroup

  eval1 = [
    { value: 1, label: 'Pas du tout' },
    { value: 2, label: 'Un peu' },
    { value: 3, label: 'Moyennement' },
    { value: 4, label: 'Beaucoup' },
    { value: 5, label: 'Tout à fait' },
  ];

  constructor(private fb: FormBuilder, private qcmService : QcmService, private alertService: AlertService) {    

    this.formStressAnxiete= this.fb.group({
      qcm1: [''],
      qcm2: [''],
      qcm3: [''],
      qcm4: [''],
      qcm5: [''],
      qcm6: [''],
      qcm7: [''],
      qcm8: [''],
      qcm9: [''],
      qcm10: ['']
    });
  }

  validateForm(): boolean {
    const values = [
      this.formStressAnxiete.value.qcm1,
      this.formStressAnxiete.value.qcm2,
      this.formStressAnxiete.value.qcm3,
      this.formStressAnxiete.value.qcm4,
      this.formStressAnxiete.value.qcm5,
      this.formStressAnxiete.value.qcm6,
      this.formStressAnxiete.value.qcm7,
      this.formStressAnxiete.value.qcm8,
      this.formStressAnxiete.value.qcm9,
      this.formStressAnxiete.value.qcm10

    ];
    return values.every(value => value !== '');
  }

  onNext() {
    if (this.validateForm()) {
      const responses = [
        this.formStressAnxiete.value.qcm1,
        this.formStressAnxiete.value.qcm2,
        this.formStressAnxiete.value.qcm3,
        this.formStressAnxiete.value.qcm4,
        this.formStressAnxiete.value.qcm5,
        this.formStressAnxiete.value.qcm6,
        this.formStressAnxiete.value.qcm7,
        this.formStressAnxiete.value.qcm8,
        this.formStressAnxiete.value.qcm9,
        this.formStressAnxiete.value.qcm10
      ];

      const stressResponses = responses.slice(0, 5);
      const anxieteResponses = responses.slice(5, 10); 
      
      this.qcmService.setResponses('stress', stressResponses); 
      this.qcmService.setResponses('anxiete', anxieteResponses);
      this.next.emit();
    } else {
      this.alertService.showAlert('Veuillez remplir toutes les questions avant de continuer.');
    }
  }



  onPrevious() {
    this.previous.emit();
  }
}
