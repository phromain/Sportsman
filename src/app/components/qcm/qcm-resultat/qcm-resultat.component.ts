import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QcmService } from '../../../service/qcm.service';
import { Categories } from '../../../const/progress';
import { categoryColors } from '../../../const/categoryColor';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-qcm-resultat',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './qcm-resultat.component.html',
  styleUrls: ['./qcm-resultat.component.css']
})
export class QcmResultatComponent implements OnInit {

  combinedResults: any[] = [];
  categoryPoints: any = {};
  selectedCategory: any;
  Categories = Categories; 

  constructor(private qcmService: QcmService, private router: Router) {}

  ngOnInit() {

    // Récupérer les résultats pour chaque catégorie
    const categoryResults = Object.keys(this.Categories).map(key => ({
      key: key,
      title: this.Categories[key].title,
      result: this.qcmService.getCategoryResult(key)
    }));

    // Récupérer les résultats pour les catégories "typ" spécifiques
    const typCategories = [
      { key: 'typConcentration', parentKey: 'concentration' },
      { key: 'typActivation', parentKey: 'activation' },
      { key: 'typConfiance', parentKey: 'confiance' },
      { key: 'typMotivation', parentKey: 'motivation' },
      { key: 'typEmotions', parentKey: 'emotions' }
    ].map(typCategory => ({
      ...typCategory,
      result: this.qcmService.getCategoryResult(typCategory.key)
    })).filter(typCategory => typCategory.result && typCategory.result.text);

    // Combiner les résultats des catégories et des "typ"
    this.combinedResults = categoryResults.map(category => {
      const typCategory = typCategories.find(typCat => typCat.parentKey === category.key);
      return {
        ...category,
        typResult: typCategory ? typCategory.result.text : ''
      };
    });

    // Récupérer les points pour chaque catégorie
    this.categoryPoints = this.qcmService.getAllCategoryPoints();
  }

  showInfo(category: any): void {
    this.selectedCategory = category; 
  }

  getBackgroundColor(category: string): string {
    return categoryColors[category] || '#ffffff'; 
  }

}
