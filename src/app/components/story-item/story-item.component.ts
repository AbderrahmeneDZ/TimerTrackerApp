import { Tracker } from './../../models/Tracker';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.css']
})
export class StoryItemComponent implements OnInit {

  @Input('trackerItem') tracker: Tracker

  startAt= '00:00'
  endAt= '00:00'
  duration= '00:00'

  constructor() { }

  ngOnInit() {
    
    this.startAt =  this.format(this.tracker.startAt.getHours())+':'+this.format(this.tracker.startAt.getMinutes())
    this.endAt =  this.format(this.tracker.endAt.getHours())+':'+this.format(this.tracker.endAt.getMinutes())
    this.duration =  this.format(new Date(this.tracker.duration).getHours() -1)
              +':'+this.format(new Date(this.tracker.duration).getMinutes())
              +':'+this.format(new Date(this.tracker.duration).getSeconds())
  }

  format(t):string{ return (t < 10) ? '0'+t : t}

}
