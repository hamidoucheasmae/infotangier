import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPostPage } from './details-post.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPostPageRoutingModule {}
