import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/helpers/auth.guards';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '404', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: 'coming-soon', loadChildren: () => import('./coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },
  { path: 'maintenance', loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  { path: 'not-authorized', loadChildren: () => import('./not-authorized/not-authorized.module').then(m => m.NotAuthorizedModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  { path: 'banking', loadChildren: () => import('./banking/banking.module').then(m => m.BankingModule), canActivate: [AuthGuard] },
  { path: 'deposit', loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositModule), canActivate: [AuthGuard] },
  { path: 'withdraw', loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule), canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  { path: 'package', loadChildren: () => import('./package/package.module').then(m => m.PackageModule), canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule), canActivate: [AuthGuard] },
  { path: 'invest', loadChildren: () => import('./invest/invest.module').then(m => m.InvestModule), canActivate: [AuthGuard] },
  { path: 'withdraw', loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
