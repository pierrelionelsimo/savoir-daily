import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, collection, getDocs, orderBy, query } from '@angular/fire/firestore';

export interface Citation {
  domaine: string;
  connaissance: string;
  auteur: string;
  source: string;
  resume: string;
  lien: string;
  annee: number;
  emoji: string;
  type: string;
  dateGeneration: string;
}

export interface DailyBundle {
  date: string;
  citations: Citation[];
  generatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class CitationService {
  private firestore = inject(Firestore);

  async getToday(): Promise<Citation[]> {
    const ref = doc(this.firestore, 'daily', 'latest');
    const snap = await getDoc(ref);
    if (!snap.exists()) return [];
    const bundle = snap.data() as DailyBundle;
    return bundle.citations || [];
  }

  async getHistory(): Promise<DailyBundle[]> {
    const ref = collection(this.firestore, 'daily');
    const q = query(ref, orderBy('date', 'desc'));
    const snap = await getDocs(q);
    return snap.docs
      .filter(d => d.id !== 'latest')
      .map(d => d.data() as DailyBundle)
      .slice(0, 30);
  }
}
