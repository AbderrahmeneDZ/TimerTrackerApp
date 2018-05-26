import { DataService } from './../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.css']
})
export class StoriesListComponent implements OnInit {

  @Input('trackers') trackerList
  
  constructor(private service: DataService) { }

  ngOnInit() {
    let timeOfToday = new Date(new Date().toLocaleDateString()).getTime()
    let currentTime = new Date().getTime()
    this.service.getData(0,timeOfToday, currentTime)
        .subscribe(res => {
          this.trackerList = res 
        }, err => {
          console.log(err)
        })
  }

}
