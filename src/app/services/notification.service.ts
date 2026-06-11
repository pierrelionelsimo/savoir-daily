import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private firestore = inject(Firestore);

  async init() {
    // Les push notifications réelles nécessitent un appareil Android
    // Sur navigateur on ignore silencieusement
    if (!('Notification' in window)) return;

    try {
      const permission = await Notification.requestPermission();
      console.log('Permission notifications:', permission);
    } catch (e) {
      console.log('Notifications non supportées sur ce navigateur');
    }
  }

  async saveToken(token: string) {
    const id = crypto.randomUUID();
    await setDoc(doc(this.firestore, 'fcm_tokens', id), {
      token,
      createdAt: new Date().toISOString(),
      platform: 'android'
    });
  }
}
