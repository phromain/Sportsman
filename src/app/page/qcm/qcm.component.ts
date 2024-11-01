import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import { HeaderComponent } from "../../components/template/header/header.component";
import { QcmCommunicationComponent } from "../../components/qcm/qcm-communication/qcm-communication.component";
import { QcmConcentrationComponent } from "../../components/qcm/qcm-concentration/qcm-concentration.component";
import { QcmActivationComponent } from "../../components/qcm/qcm-activation/qcm-activation.component";
import { QcmStressAnxieteComponent } from "../../components/qcm/qcm-stress-anxiete/qcm-stress-anxiete.component";
import { QcmConfianceComponent } from "../../components/qcm/qcm-confiance/qcm-confiance.component";
import { QcmMotivationComponent } from "../../components/qcm/qcm-motivation/qcm-motivation.component";
import { QcmEmotionsComponent } from "../../components/qcm/qcm-emotions/qcm-emotions.component";
import { QcmEstimeComponent } from "../../components/qcm/qcm-estime/qcm-estime.component";
import { QcmEnergieComponent } from "../../components/qcm/qcm-energie/qcm-energie.component";
import { QcmResultatComponent } from "../../components/qcm/qcm-resultat/qcm-resultat.component";
import { FooterComponent } from "../../components/template/footer/footer.component";
import { QcmInfoComponent } from "../../components/qcm/qcm-info/qcm-info.component";

@Component({
  selector: 'app-qcm',
  standalone: true,
  imports: [HeaderComponent, QcmCommunicationComponent, NgIf, QcmConcentrationComponent, QcmActivationComponent, QcmStressAnxieteComponent, QcmConfianceComponent, QcmMotivationComponent, QcmEmotionsComponent, QcmEstimeComponent, QcmEnergieComponent, QcmResultatComponent, FooterComponent, QcmInfoComponent],
  templateUrl: './qcm.component.html',
  styleUrl: './qcm.component.css'
})
export class QcmComponent {
  currentStep = 0;

  onNext() {
    if (this.currentStep < 10) {
      this.currentStep++;
    }
  }

  onPrevious() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  getProgress(): number {
    return ((this.currentStep) / 9) * 100; 
  }
}

