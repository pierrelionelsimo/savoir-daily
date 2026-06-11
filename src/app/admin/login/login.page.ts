import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  error = '';
  loading = false;
  showEmailForm = false;

  constructor(private auth: AuthService) {}

  async loginGoogle() {
    this.loading = true;
    this.error = '';
    try {
      await this.auth.loginWithGoogle();
    } catch (e: any) {
      this.error = e.message || 'Erreur de connexion Google';
    } finally {
      this.loading = false;
    }
  }

  async loginEmail() {
    this.loading = true;
    this.error = '';
    try {
      await this.auth.loginWithEmail(this.email, this.password);
    } catch (e: any) {
      this.error = 'Email ou mot de passe incorrect';
    } finally {
      this.loading = false;
    }
  }
}