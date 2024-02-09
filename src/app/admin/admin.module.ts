import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PackagesComponent } from './pages/package/packages/packages.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { CabsComponent } from './pages/cabs/cabs.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { SliderComponent } from './pages/slider/slider.component';
import { BaseService } from '../services/base.service';
import { DetailsComponent } from './pages/package/details/details.component';
import { ItinerariesComponent } from './pages/package/itineraries/itineraries.component';
import { DestinationsComponent } from './pages/package/destinations/destinations.component';
import { CostingComponent } from './pages/package/costing/costing.component';
import { SharedModule } from '../shared/shared.module';
import { InclusionsComponent } from './pages/package/inclusions/inclusions.component';
import { ExclusionsComponent } from './pages/package/exclusions/exclusions.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { LinktreeComponent } from './pages/linktree/linktree.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AccountComponent } from './pages/account/account.component';
import { InterceptorService } from '../services/interceptor.service';

@NgModule({
  declarations: [
    AdminComponent,
    PackagesComponent,
    HotelsComponent,
    CabsComponent,
    GalleryComponent,
    SliderComponent,
    DetailsComponent,
    ItinerariesComponent,
    DestinationsComponent,
    CostingComponent,
    InclusionsComponent,
    ExclusionsComponent,
    ChatbotComponent,
    LinktreeComponent,
    BookingsComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    BaseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class AdminModule {}
