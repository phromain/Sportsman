import { Injectable } from '@angular/core';
import { CategoryTexts } from '../const/texts';
import { CategoryTitles } from '../const/titles';

@Injectable({
  providedIn: 'root'
})
export class QcmService {
  private qcmResponses: { [category: string]: any[] } = {};
  private personalInfo: any = {};

  constructor() { }

  setResponses(category: string, responses: any[]): void {
    this.qcmResponses[category] = responses;
  }

  getResponses(category: string): any[] {
    return this.qcmResponses[category] || [];
  }

  getAllResponses(): { [category: string]: any[] } {
    return this.qcmResponses;
  }

  setPersonalInfo(info: any): void {
    this.personalInfo = info;
  }

  getPersonalInfo(): any {
    return this.personalInfo;
  }

  getCategoryPoints(category: string): number {
    const responses = this.getResponses(category);
    return responses.reduce((sum, value) => sum + (value ? parseInt(value) : 0), 0);
  }

  getCategoryDetails(category: string): { points: number; result: { title: string; text: string } } {
    const points = this.getCategoryPoints(category);
    const result = this.getCategoryResult(category);
    return { points, result };
  }

  getCategoryPointsDetailed(category: string): { [key: string]: number } {
    switch (category) {
      case 'typConcentration':
        return this.getTypConcentrationPoints();
      case 'typActivation':
        return this.getTypActivationPoints();
      case 'typConfiance':
        return this.getTypConfiancePoints();
      case 'typMotivation':
        return this.getTypMotivationPoints();
      case 'typEmotions':
        return this.getTypEmotionsPoints();
      default:
        return { total: this.getCategoryPoints(category) };
    }
  }

  getAllCategoryPoints(): { [category: string]: number | { [key: string]: number } } {
    const categories = ['communication', 'concentration', 'typConcentration', 'activation', 'typActivation', 'stress', 'anxiete', 'confiance', 'typConfiance', 'motivation', 'typMotivation', 'emotions', 'typEmotions', 'estime', 'energie'];
    const categoryPoints: { [category: string]: number | { [key: string]: number } } = {};
    categories.forEach(category => {
      categoryPoints[category] = this.getCategoryPointsDetailed(category);
    });
    return categoryPoints;
  }



  private getTypConcentrationPoints(): { [key: string]: number } {
    return {
      past: this.getSubsetPoints('concentration', [0, 1, 2]),
      present: this.getSubsetPoints('concentration', [3, 4, 5]),
      future: this.getSubsetPoints('concentration', [6, 7, 8, 9])
    };
  }

  private getTypActivationPoints(): { [key: string]: number } {
    return {
      overActivation: this.getSubsetPoints('activation', [4, 9]),
      underActivation: this.getSubsetPoints('activation', [0, 1, 5]),
      optimalActivation: this.getSubsetPoints('activation', [2, 6, 7])
    };
  }

  private getTypConfiancePoints(): { [key: string]: number } {
    return {
      past: this.getSubsetPoints('confiance', [0, 1, 2]),
      present: this.getSubsetPoints('confiance', [3, 4, 5]),
      future: this.getSubsetPoints('confiance', [7, 8, 9])
    };
  }

  private getTypMotivationPoints(): { [key: string]: number } {
    return {
      past: this.getSubsetPoints('motivation', [0, 1, 2]),
      present: this.getSubsetPoints('motivation', [3, 4, 5]),
      future: this.getSubsetPoints('motivation', [6, 7, 8, 9])
    };
  }

  private getTypEmotionsPoints(): { [key: string]: number } {
    return {
      stress: this.getSubsetPoints('emotions', [1, 3, 6]),
      frustration: this.getSubsetPoints('emotions', [0, 2, 4, 8]),
      impact: this.getSubsetPoints('emotions', [5, 7, 9])
    };
  }

  getCategoryResult(category: string): { title: string; text: string } {
    switch (category) {
      case 'typConcentration':
        return this.getTypConcentrationResult();
      case 'typActivation':
        return this.getTypActivationResult();
      case 'typConfiance':
        return this.getTypConfianceResult();
      case 'typMotivation':
        return this.getTypMotivationResult();
      case 'typEmotions':
        return this.getTypEmotionsResult();
      default:
        return this.getDefaultCategoryResult(category);
    }
  }

  private getDefaultCategoryResult(category: string): { title: string; text: string } {
    const points = this.getCategoryPoints(category);
    const texts = CategoryTexts[category];
    const titles = CategoryTitles[category];
    if (texts && titles) {
      for (const range in texts) {
        const [min, max] = range.split('-').map(Number);
        if (points >= min && points <= max) {
          return { title: titles[range], text: texts[range] };
        }
      }
    }
    return { title: 'Erreur', text: 'Erreur' };
  }


  private getSubsetPoints(category: string, indices: number[]): number {
    const responses = this.getResponses(category);
    return indices.reduce((sum, index) => sum + (responses[index] ? parseInt(responses[index]) : 0), 0);
  }

  private getTypConcentrationResult(): { title: string; text: string } {
    const pastPoints = this.getSubsetPoints('typConcentration', [0, 1, 2]);
    const presentPoints = this.getSubsetPoints('typConcentration', [3, 4, 5]);
    const futurePoints = this.getSubsetPoints('typConcentration', [6, 7, 8, 9]);
  
    if (pastPoints === presentPoints && pastPoints === futurePoints) {
      return { title: 'Concentration équilibrée', text: 'Concentration équilibrée entre passé, présent et futur.' };
    } else if (pastPoints === presentPoints) {
      return { title: 'Concentration équilibrée', text: 'Concentration équilibrée entre passé et présent.' };
    } else if (pastPoints === futurePoints) {
      return { title: 'Concentration équilibrée', text: 'Concentration équilibrée entre passé et futur.' };
    } else if (presentPoints === futurePoints) {
      return { title: 'Concentration équilibrée', text: 'Concentration équilibrée entre présent et futur.' };
    } else if (pastPoints > presentPoints && pastPoints > futurePoints) {
      return { title: CategoryTitles['typConcentration']['past'], text: CategoryTexts['typConcentration']['past'] };
    } else if (presentPoints > pastPoints && presentPoints > futurePoints) {
      return { title: CategoryTitles['typConcentration']['present'], text: CategoryTexts['typConcentration']['present'] };
    } else if (futurePoints > pastPoints && futurePoints > presentPoints) {
      return { title: CategoryTitles['typConcentration']['future'], text: CategoryTexts['typConcentration']['future'] };
    } else {
      return { title: 'Concentration équilibrée', text: 'Concentration équilibrée entre passé, présent et futur.' };
    }
  }
  

  private getTypActivationResult(): { title: string; text: string } {
    const overActivationPoints = this.getSubsetPoints('typActivation', [5, 10]);
    const underActivationPoints = this.getSubsetPoints('typActivation', [1, 2, 6]);
    const optimalActivationPoints = this.getSubsetPoints('typActivation', [3, 7, 8]);
  
    let result = { title: 'Activation individuelle', text: '' };
  
    if (overActivationPoints >= underActivationPoints && overActivationPoints >= optimalActivationPoints) {
      result.text = "Sur-activation (trop d'anxiété ou de stress).";
    }
    if (underActivationPoints >= overActivationPoints && underActivationPoints >= optimalActivationPoints) {
      result.text = "Sous-activation (pas assez d'énergie, de motivation ou de préparation physique).";
    }
    if (optimalActivationPoints >= overActivationPoints && optimalActivationPoints >= underActivationPoints) {
      result.text = "Activation optimale.";
    }
    return result;
  }
  



  private getTypConfianceResult(): { title: string; text: string } {
    const pastPoints = this.getSubsetPoints('typConfiance', [0, 1, 2]);
    const presentPoints = this.getSubsetPoints('typConfiance', [3, 4, 5]);
    const futurePoints = this.getSubsetPoints('typConfiance', [7, 8, 9]);
  
    if (pastPoints > presentPoints && pastPoints > futurePoints) {
      return { title: CategoryTitles['typConfiance']['past'], text: CategoryTexts['typConfiance']['past'] };
    } else if (presentPoints > pastPoints && presentPoints > futurePoints) {
      return { title: CategoryTitles['typConfiance']['present'], text: CategoryTexts['typConfiance']['present'] };
    } else if (futurePoints > pastPoints && futurePoints > presentPoints) {
      return { title: CategoryTitles['typConfiance']['future'], text: CategoryTexts['typConfiance']['future'] };
    } else {
      return { title: 'Confiance équilibrée', text: 'Confiance équilibrée entre passé, présent et futur.' };
    }
  }
  

  private getTypMotivationResult(): { title: string; text: string } {
    const totalPointsPass = 15;
    const totalPointsPresent = 15;
    const totalPointsFuture = 20;
    const pastPoints = this.getSubsetPoints('motivation', [0, 1, 2]);
    const presentPoints = this.getSubsetPoints('motivation', [3, 4, 5]);
    const futurePoints = this.getSubsetPoints('motivation', [6, 7, 8, 9]);
  
    const pastPercentage = (pastPoints / totalPointsPass) * 100;
    const presentPercentage = (presentPoints / totalPointsPresent) * 100;
    const futurePercentage = (futurePoints / totalPointsFuture) * 100;
  
    if (pastPercentage === presentPercentage && pastPercentage === futurePercentage) {
      return { title: 'Motivation équilibrée', text: 'Motivation équilibrée entre passé, présent et futur.' };
    } else if (pastPercentage >= presentPercentage && pastPercentage >= futurePercentage) {
      return { title: CategoryTitles['typMotivation']['past'], text: CategoryTexts['typMotivation']['past'] };
    } else if (presentPercentage >= pastPercentage && presentPercentage >= futurePercentage) {
      return { title: CategoryTitles['typMotivation']['present'], text: CategoryTexts['typMotivation']['present'] };
    } else if (futurePercentage >= pastPercentage && futurePercentage >= presentPercentage) {
      return { title: CategoryTitles['typMotivation']['future'], text: CategoryTexts['typMotivation']['future'] };
    } else if (pastPercentage === presentPercentage) {
      return { title: 'Motivation équilibrée', text: 'Motivation équilibrée entre passé et présent.' };
    } else if (pastPercentage === futurePercentage) {
      return { title: 'Motivation équilibrée', text: 'Motivation équilibrée entre passé et futur.' };
    } else if (presentPercentage === futurePercentage) {
      return { title: 'Motivation équilibrée', text: 'Motivation équilibrée entre présent et futur.' };
    } else {
      return { title: 'Motivation équilibrée', text: 'Motivation équilibrée entre passé, présent et futur.' };
    }
  }
  
  private getTypEmotionsResult(): { title: string; text: string } {
    const pointsStress = this.getSubsetPoints('emotions', [1, 3, 6]);
    const pointsFrustration = this.getSubsetPoints('emotions', [0, 2, 4, 8]);
    const pointsImpact = this.getSubsetPoints('emotions', [5, 7, 9]);
  
    return {
      title: 'Gestion des émotions',
      text: `
        Gestion du stress et de la pression : ${this.getEmotionsText('stress', pointsStress)}
        Gestion de la frustration et des erreurs : ${this.getEmotionsText('frustration', pointsFrustration)}
        Impact des émotions sur la performance et les relations : ${this.getEmotionsText('impact', pointsImpact)}
      `
    };
  }
  
  
  private getEmotionsText(type: string, points: number): string {
    if (type === 'stress') {
      if (points <= 3) {
        return 'L\'athlète semble capable de bien gérer ses émotions sous stress.';
      } else if (points > 3 && points <= 6) {
        return 'L\'athlète gère généralement bien le stress.';
      } else if (points > 6 && points <= 9) {
        return 'L\'athlète montre des difficultés à gérer le stress, nécessitant un travail supplémentaire.';
      } else {
        return 'L\'athlète a besoin d\'un accompagnement important pour gérer le stress.';
      }
    }
  
    if (type === 'frustration') {
      if (points <= 4) {
        return 'L\'athlète semble capable de bien gérer la frustration.';
      } else if (points > 4 && points <= 8) {
        return 'L\'athlète gère généralement bien la frustration.';
      } else if (points > 8 && points <= 12) {
        return 'L\'athlète montre des difficultés à gérer la frustration, nécessitant un travail supplémentaire.';
      } else {
        return 'L\'athlète a besoin d\'un accompagnement important pour gérer la frustration.';
      }
    }
  
    if (type === 'impact') {
      if (points <= 5) {
        return 'L\'athlète semble capable de bien gérer l\'impact des émotions sur ses relations et performances.';
      } else if (points > 5 && points <= 10) {
        return 'L\'athlète gère généralement bien l\'impact des émotions.';
      } else if (points > 10 && points <= 13) {
        return 'L\'athlète montre des difficultés à gérer l\'impact des émotions, nécessitant un travail supplémentaire.';
      } else {
        return 'L\'athlète a besoin d\'un accompagnement important pour gérer l\'impact des émotions.';
      }
    }
  
    return 'Erreur';
  }
  



}