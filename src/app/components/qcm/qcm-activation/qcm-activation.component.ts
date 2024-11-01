import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertService } from '../../../service/alert.service';
import { QcmService } from '../../../service/qcm.service';
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-qcm-activation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTooltipModule,  NgFor,],
  templateUrl: './qcm-activation.component.html',
  styleUrl: './qcm-activation.component.css'
})
export class QcmActivationComponent {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  formActivation: FormGroup

  eval1 = [
    { value: 1, label: 'Pas du tout' },
    { value: 2, label: 'Un peu' },
    { value: 3, label: 'Moyennement' },
    { value: 4, label: 'Beaucoup' },
    { value: 5, label: 'Tout à fait' },
  ];

  eval2 = [
    { value: 5, label: 'Jamais' },
    { value: 4, label: 'Rarement' },
    { value: 3, label: 'Parfois' },
    { value: 2, label: 'Souvent' },
    { value: 1, label: 'Toujours' },
  ];


  constructor(private fb: FormBuilder, private qcmService : QcmService, private alertService: AlertService) {    

    this.formActivation= this.fb.group({
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
      this.formActivation.value.qcm1,
      this.formActivation.value.qcm2,
      this.formActivation.value.qcm3,
      this.formActivation.value.qcm4,
      this.formActivation.value.qcm5,
      this.formActivation.value.qcm6,
      this.formActivation.value.qcm7,
      this.formActivation.value.qcm8,
      this.formActivation.value.qcm9,
      this.formActivation.value.qcm10

    ];
    return values.every(value => value !== '');
  }

  onNext() {
    if (this.validateForm()) {
      const responses = [
        this.formActivation.value.qcm1,
        this.formActivation.value.qcm2,
        this.formActivation.value.qcm3,
        this.formActivation.value.qcm4,
        this.formActivation.value.qcm5,
        this.formActivation.value.qcm6,
        this.formActivation.value.qcm7,
        this.formActivation.value.qcm8,
        this.formActivation.value.qcm9,
        this.formActivation.value.qcm10
      ];

      this.qcmService.setResponses('activation', responses);
      this.next.emit();
    } else {
      this.alertService.showAlert('Veuillez remplir toutes les questions avant de continuer.');
    }
  }



  onPrevious() {
    this.previous.emit();
  }
}
