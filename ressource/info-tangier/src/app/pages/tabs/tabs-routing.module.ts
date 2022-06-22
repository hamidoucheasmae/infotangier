import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPagePage } from './category-page/category-page.page';
import { DetailsPostPage } from './details-post/details-post.page';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // {
      //   path: 'details/:id',
      //   loadChildren: () => import('./details-post/details-post.module').then( m => m.DetailsPostPageModule)
      // },
      {
        path: 'details/:id',
        component: DetailsPostPage,
      },
      {
        path: 'category/:id',
        component: CategoryPagePage,
      },
      
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'wishlist',
        loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'trip/:id',
    loadChildren: () => import('./trip/trip.module').then( m => m.TripPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
