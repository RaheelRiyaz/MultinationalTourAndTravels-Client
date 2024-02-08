import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

export const routes: Routes = [
  { path: '', loadChildren: () => UserModule },
  { path: 'admin', loadChildren: () => AdminModule },
];
