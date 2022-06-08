import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postArray!: any[]

  constructor(private postService : PostService) { }

  ngOnInit(): void {

    this.postService.loadData().subscribe(val => {
      console.log(val);
      this.postArray = val;
      
    })
  }

  deletePost(postImgPath: any, id: any){

    if ((confirm('Are you sure you want to delete this post ?'))) {
      this.postService.deleteImage(postImgPath, id);
    }    
  }

  featured(id: any, value: any){

    const featuredData = {
      isFeatured: value
    }

    this.postService.markFeatured(id, featuredData);
  }

}