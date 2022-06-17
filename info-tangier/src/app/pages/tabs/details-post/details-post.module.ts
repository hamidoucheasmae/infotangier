import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPostPageRoutingModule } from './details-post-routing.module';

import { DetailsPostPage } from './details-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // DetailsPostPageRoutingModule
  ],
  declarations: [DetailsPostPage]
})
export class DetailsPostPageModule {}
