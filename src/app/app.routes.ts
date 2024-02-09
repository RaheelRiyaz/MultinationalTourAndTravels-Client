import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => UserModule },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: [AdminAuthGuard],
  },
];
