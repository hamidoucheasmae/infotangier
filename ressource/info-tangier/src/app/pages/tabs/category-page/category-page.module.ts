import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPagePageRoutingModule } from './category-page-routing.module';

import { CategoryPagePage } from './category-page.page';
import { PostCardComponent } from 'src/app/post-card/post-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // CategoryPagePageRoutingModule
  ],
  declarations: [CategoryPagePage,PostCardComponent]
})
export class CategoryPagePageModule {}
