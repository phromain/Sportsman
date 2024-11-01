import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertService } from '../../../service/alert.service';
import { QcmService } from '../../../service/qcm.service';
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-qcm-emotions',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTooltipModule,  NgFor,],
  templateUrl: './qcm-emotions.component.html',
  styleUrl: './qcm-emotions.component.css'
})
export class QcmEmotionsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  formEmotion: FormGroup
eval1 = [
    { value: 1, label: 'Pas du tout' },
    { value: 2, label: 'Un peu' },
    { value: 3, label: 'Moyennement' },
    { value: 4, label: 'Beaucoup' },
    { value: 5, label: 'Tout à fait' },
  ];

  eval2 = [
    { value: 1, label: 'Jamais' },
    { value: 2, label: 'Rarement' },
    { value: 3, label: 'Parfois' },
    { value: 4, label: 'Souvent' },
    { value: 5, label: 'Toujours' },
  ];

  eval3 = [
    { value: 1, label: 'Très facilement' },
    { value: 2, label: 'Facilement' },
    { value: 3, label: 'Modérément' },
    { value: 4, label: 'Difficilement' },
    { value: 5, label: 'Très difficilement' },
  ];

  constructor(private fb: FormBuilder, private qcmService : QcmService, private alertService: AlertService) {    

    this.formEmotion= this.fb.group({
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
      this.formEmotion.value.qcm1,
      this.formEmotion.value.qcm2,
      this.formEmotion.value.qcm3,
      this.formEmotion.value.qcm4,
      this.formEmotion.value.qcm5,
      this.formEmotion.value.qcm6,
      this.formEmotion.value.qcm7,
      this.formEmotion.value.qcm8,
      this.formEmotion.value.qcm9,
      this.formEmotion.value.qcm10

    ];
    return values.every(value => value !== '');
  }

  onNext() {
    if (this.validateForm()) {
      const responses = [
        this.formEmotion.value.qcm1,
        this.formEmotion.value.qcm2,
        this.formEmotion.value.qcm3,
        this.formEmotion.value.qcm4,
        this.formEmotion.value.qcm5,
        this.formEmotion.value.qcm6,
        this.formEmotion.value.qcm7,
        this.formEmotion.value.qcm8,
        this.formEmotion.value.qcm9,
        this.formEmotion.value.qcm10
      ];

      this.qcmService.setResponses('emotions', responses);
      this.next.emit();
    } else {
      this.alertService.showAlert('Veuillez remplir toutes les questions avant de continuer.');
    }
  }



  onPrevious() {
    this.previous.emit();
  }
}
