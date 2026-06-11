import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.page').then(m => m.HistoryPage),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then(m => m.AboutPage),
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [authGuard],
  },
];