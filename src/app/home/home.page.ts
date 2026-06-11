import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';
import { CitationService, Citation } from '../services/citation.service';
import { NotificationService } from '../services/notification.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonSpinner],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  citations: Citation[] = [];
  selected: Citation | null = null;
  loading = true;
  today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  constructor(
    private citationService: CitationService,
    private notificationService: NotificationService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  async ngOnInit() {
    await this.notificationService.init();
    this.citations = await this.citationService.getToday();
    this.loading = false;
  }

  goToAdmin() {
    this.router.navigate(['/admin/login']);
  }

  openDetail(c: Citation) {
    this.selected = c;
  }

  closeDetail() {
    this.selected = null;
  }

  openSource() {
    if (this.selected?.lien && this.selected.lien !== '#') {
      window.open(this.selected.lien, '_blank');
    }
  }

  async share(c: Citation, event: Event) {
    event.stopPropagation();
    const text = `"${c.connaissance}" — ${c.auteur}`;
    if (navigator.share) {
      await navigator.share({ title: 'Savoir Daily', text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  }

  typeLabel(type: string): string {
    const map: Record<string, string> = {
      arxiv: 'Science',
      sep: 'Philosophie',
      openalex: 'Économie',
      anime: 'Anime',
    };
    return map[type] || type;
  }

  toggleTheme() {
  this.themeService.toggle();
}
}
