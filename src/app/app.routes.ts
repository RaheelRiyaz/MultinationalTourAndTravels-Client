import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';

export const routes: Routes = [{ path: '', loadChildren: () => UserModule }];
