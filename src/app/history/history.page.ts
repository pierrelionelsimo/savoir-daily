import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonSpinner, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { CitationService, DailyBundle } from '../services/citation.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, IonContent, IonSpinner, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton],
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  bundles: DailyBundle[] = [];
  loading = true;

  constructor(private citationService: CitationService) {}

  async ngOnInit() {
    this.bundles = await this.citationService.getHistory();
    this.loading = false;
  }
}
