import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from './components/heading/heading.component';
import { LoginComponent } from './components/login/login.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoadMoreBtnComponent } from './components/load-more-btn/load-more-btn.component';
import { PackageComponent } from './components/package/package.component';
import { SkeltonComponent } from './components/skelton/skelton.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const components = [
  HeadingComponent,
  LoginComponent,
  HotelComponent,
  LoadMoreBtnComponent,
  PackageComponent,
  SkeltonComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule,RouterModule,FormsModule],
  exports: [...components,RouterModule],
})
export class SharedModule {}
