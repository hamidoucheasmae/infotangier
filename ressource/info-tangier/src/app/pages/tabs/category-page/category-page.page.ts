import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.page.html',
  styleUrls: ['./category-page.page.scss'],
})
export class CategoryPagePage implements OnInit {

  postArray !: any[];
  categoryObj !: any;

  constructor(private route: ActivatedRoute, private postService : PostService) { }

  ngOnInit(): void {

    this.route.params.subscribe(val =>{

      this.categoryObj = val
      
      this.postService.loadCategoryPost(val['id']).subscribe(post =>{ this.postArray = post;
      })
    })
  }

}
