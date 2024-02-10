import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PackagesComponent } from './pages/package/packages/packages.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { CabsComponent } from './pages/cabs/cabs.component';
import { SliderComponent } from './pages/slider/slider.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { DetailsComponent } from './pages/package/details/details.component';
import { ItinerariesComponent } from './pages/package/itineraries/itineraries.component';
import { CostingComponent } from './pages/package/costing/costing.component';
import { DestinationsComponent } from './pages/package/destinations/destinations.component';
import { InclusionsComponent } from './pages/package/inclusions/inclusions.component';
import { ExclusionsComponent } from './pages/package/exclusions/exclusions.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { LinktreeComponent } from './pages/linktree/linktree.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AccountComponent } from './pages/account/account.component';
import { EditPackageComponent } from './pages/package/edit-package/edit-package.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'packages', pathMatch: 'full' },
      {
        path: 'packages',
        children: [
          { path: '', component: PackagesComponent },
          { path: 'edit/:id', component: EditPackageComponent },
          { path: 'destination-details/:id', component: DetailsComponent },
          { path: 'itineraries/:id', component: ItinerariesComponent },
          { path: 'costings/:id', component: CostingComponent },
          { path: 'destinations/:id', component: DestinationsComponent },
          { path: 'inclusions/:id', component: InclusionsComponent },
          { path: 'exclusions/:id', component: ExclusionsComponent },
        ],
      },

      //
      { path: 'slider', component: SliderComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'hotels', component: HotelsComponent },
      { path: 'chatbot', component: ChatbotComponent },
      { path: 'cabs', component: CabsComponent },
      { path: 'linktree', component: LinktreeComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'contacts', component: ContactComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
