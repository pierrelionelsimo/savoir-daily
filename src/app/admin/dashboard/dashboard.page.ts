import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar,
  IonTitle, IonButtons, IonSpinner
} from '@ionic/angular/standalone';
import {
  Firestore, collection, getDocs,
  query, orderBy, doc, getDoc
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonSpinner],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  stats = {
    totalUsers: 0,
    totalCitations: 0,
    tokensActifs: 0,
    lastGeneration: '-'
  };
  recentCitations: any[] = [];
  loading = true;
  generating = false;
  generateMessage = '';

  private firestore = inject(Firestore);

  constructor(public authService: AuthService) {}

  async ngOnInit() {
    await this.loadStats();
    this.loading = false;
  }

  async loadStats() {
    const tokensSnap = await getDocs(collection(this.firestore, 'fcm_tokens'));
    this.stats.tokensActifs = tokensSnap.size;
    this.stats.totalUsers = tokensSnap.size;

    const q = query(
      collection(this.firestore, 'citations'),
      orderBy('dateGeneration', 'desc')
    );
    const citationsSnap = await getDocs(q);
    const filtered = citationsSnap.docs.filter(d => d.id !== 'latest');
    this.stats.totalCitations = filtered.length;
    this.recentCitations = filtered.slice(0, 5).map(d => d.data());

    if (this.recentCitations.length > 0) {
      this.stats.lastGeneration = this.recentCitations[0].dateGeneration;
    }
  }

  async refresh() {
    this.loading = true;
    await this.loadStats();
    this.loading = false;
  }

  async generateNow() {
    this.generating = true;
    this.generateMessage = '';

    try {
      // Récupère les configs GitHub depuis Firestore
      const configSnap = await getDoc(doc(this.firestore, 'config', 'github'));
      if (!configSnap.exists()) {
        this.generateMessage = ' Config GitHub introuvable dans Firestore';
        return;
      }

      const { token, repo } = configSnap.data();

      // Déclenche le workflow GitHub Actions via API
      const res = await fetch(
        `https://api.github.com/repos/${repo}/actions/workflows/daily.yml/dispatches`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ref: 'main' }),
        }
      );

      if (res.status === 204) {
        this.generateMessage = ' Génération lancée — attends ~30 secondes puis actualise';
      } else {
        const err = await res.json();
        this.generateMessage = `❌ Erreur GitHub : ${err.message}`;
      }
    } catch (e: any) {
      this.generateMessage = `❌ Erreur : ${e.message}`;
    } finally {
      this.generating = false;
    }
  }
}
