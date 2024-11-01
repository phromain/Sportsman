import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {}

  showAlert(message: string) {
    Swal.fire({
      icon: 'info',
      text: message,
      showConfirmButton: true,
    });
  }
}