import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subsribers',
  templateUrl: './subsribers.component.html',
  styleUrls: ['./subsribers.component.css']
})
export class SubsribersComponent implements OnInit {

  subscribersArray !: any[];

  constructor(private subService : SubscribersService) { }

  ngOnInit(): void {
    this.subService.loadData().subscribe(val =>{
      this.subscribersArray = val;
    })
  }

  deleteSubscriber(id: any) {

    if ((confirm('Are you sure you want to delete this subscriber'))) {
      this.subService.deleteData(id)
    }
  }

}
