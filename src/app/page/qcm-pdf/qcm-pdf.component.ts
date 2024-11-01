import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { QcmService } from '../../service/qcm.service';
import { Categories } from '../../const/progress';
import { categoryColors } from '../../const/categoryColor';

@Component({
  selector: 'app-qcm-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qcm-pdf.component.html',
  styleUrl: './qcm-pdf.component.css'
})
export class QcmPdfComponent {
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  personalInfo: any = {};
  combinedResults: any[] = [];
  categoryPoints: any = {};
  Categories = Categories;
  selectedCategory: any;


  constructor(private qcmService: QcmService) {}

  ngOnInit(): void {

    // Récupération des données  
    this.personalInfo = this.qcmService.getPersonalInfo();
  console.log('Informations personnelles:', this.personalInfo);
  
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


  setTimeout(() => this.generatePDF(), 1000); 
  }

  getBackgroundColor(category: string): string {
    return categoryColors[category] || '#ffffff'; 
  }

  generatePDF(): void {
    const content = this.pdfContent.nativeElement;
  
    html2canvas(content, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
  
      let positionY = 0;
  
      // Ajouter l'image jusqu'à ce que la position dépasse la hauteur de la page
      while (positionY < imgHeight) {
        pdf.addImage(imgData, 'PNG', 0, -positionY, imgWidth, imgHeight);
        positionY += pageHeight;
  
        if (positionY < imgHeight) {
          pdf.addPage(); 
        }
      }
  
      // Gestion des sections pour forcer un saut de page après la section "confiance"
      const confianceSection = document.getElementById('category-confiance');
      
      if (confianceSection) {
        const sectionHeight = confianceSection.offsetHeight;
  
        // Vérifier si la section "confiance" doit être sur une nouvelle page
        if (positionY % pageHeight + sectionHeight > pageHeight) {
          pdf.addPage(); 
          positionY = 0; 
        }
  
        positionY += sectionHeight; 
        
        // Forcer un saut de page après la section "confiance"
        pdf.addPage(); 
        positionY = 0; 
      }
  
      pdf.save('resultat-qcm.pdf');
    });
  }
  
  
  
  
  
}