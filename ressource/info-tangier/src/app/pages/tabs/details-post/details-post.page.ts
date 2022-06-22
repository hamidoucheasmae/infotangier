import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.page.html',
  styleUrls: ['./details-post.page.scss'],
})
export class DetailsPostPage implements OnInit {
  segmentValue = '1';
  currentImage: string;
  postData !: any;
  similarPostArray !: any[];

  constructor( private route: ActivatedRoute, private postService : PostService) { }

  ngOnInit(): void {

    this.route.params.subscribe(val =>{

      this.postService.countViews(val['id']);
      
      this.postService.loadOnePost(val['id']).subscribe(post =>{
        this.postData = post;
        this.loadSimilarPosts(this.postData.category?.categoryId);
      })
    })
   
    this.currentImage = this.postData.images[0];
  }

  loadSimilarPosts(catId : any){
    this.postService.loadSimilarPost(catId).subscribe(val =>{
      this.similarPostArray = val;
    })
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }

  changeImage(image) {
    this.currentImage = image;
  }

}
