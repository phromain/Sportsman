import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { QcmService } from '../../../service/qcm.service';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'app-qcm-info',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './qcm-info.component.html',
  styleUrl: './qcm-info.component.css'
})
export class QcmInfoComponent {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  formInfo: FormGroup;

  constructor(private fb: FormBuilder, private qcmService: QcmService, private alertService: AlertService) {
    this.formInfo = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      subject: [''],
      objective: [''],
      event: ['']
    });
  }

  validateForm(): boolean {
    const values = [
      this.formInfo.value.firstName,
      this.formInfo.value.lastName,
      this.formInfo.value.age,
      this.formInfo.value.subject,
      this.formInfo.value.objective,
      this.formInfo.value.event
    ];
    return values.every(value => value !== '');
  }

  onNext() {
    if (this.validateForm()) {
      const personalInfo = {
        firstName: this.formInfo.value.firstName,
        lastName: this.formInfo.value.lastName,
        age: this.formInfo.value.age,
        subject: this.formInfo.value.subject,
        objective: this.formInfo.value.objective,
        event: this.formInfo.value.event
      };
      this.qcmService.setPersonalInfo(personalInfo);
      this.next.emit();
    } else {
      this.alertService.showAlert('Veuillez remplir toutes les questions avant de continuer.');
    }
  }

  onPrevious() {
    this.previous.emit();
  }
}
