import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SliderComponent } from './pages/slider/slider.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { BaseService } from '../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { FeedBackComponent } from './components/feed-back/feed-back.component';
import { CabsComponent } from './pages/cabs/cabs.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { PackageDetailsComponent } from './pages/package-details/package-details.component';
import { SocialComponent } from './pages/social/social.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    GalleryComponent,
    HotelsComponent,
    ContactUsComponent,
    WhyChooseUsComponent,
    FeedBackComponent,
    CabsComponent,
    PackagesComponent,
    PackageDetailsComponent,
    SocialComponent,
  ],
  providers: [BaseService],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
})
export class UserModule {}
