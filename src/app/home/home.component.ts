import { AuthService } from './../services/auth.service';
import { Tracker } from './../models/Tracker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService) { }
  trackerList : Tracker[] = []
  ngOnInit() {

  }

  onNewTracker(tracker){
    if(tracker instanceof(Tracker)){
      this.trackerList.push(tracker)
    }
  }
}
