import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from '../shared/components/login/login.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { PackageDetailsComponent } from './pages/package-details/package-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'gallery', component: GalleryComponent },
      {
        path: 'packages',
        children: [
          { path: '', component: PackagesComponent },
          { path: ':id', component: PackageDetailsComponent },
        ],
      },
      { path: 'hotels', component: HotelsComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class UserRoutingModule {}
