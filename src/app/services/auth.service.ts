import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  user$ = user(this.auth);
  private readonly ADMIN_EMAIL = 'pierrelionelsimo@gmail.com';

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);

    if (result.user.email !== this.ADMIN_EMAIL) {
      await signOut(this.auth);
      throw new Error('Accès refusé — compte non autorisé');
    }

    await this.router.navigate(['/admin']);
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    if (result.user.email !== this.ADMIN_EMAIL) {
      await signOut(this.auth);
      throw new Error('Accès refusé');
    }
    await this.router.navigate(['/admin']);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/admin/login']);
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}