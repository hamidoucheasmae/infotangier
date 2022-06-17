import { Component, OnInit } from '@angular/core';
import SwiperCore, { EffectFade, SwiperOptions } from 'swiper';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryArray !: any [];
  config: SwiperOptions;
  config1: SwiperOptions;
  constructor(private categoryService : CategoriesService) { }

  ngOnInit(): void {

    this.categoryService.loadData().subscribe (val =>{
      this.categoryArray = val;
    })
  }


  ngAfterContentChecked() {
    this.config = {
      slidesPerView: 2.1
    };
    this.config1 = {
      slidesPerView: 2
    };
  }
}
