import { DataService } from './../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tracker, Break } from '../../models/Tracker';

@Component({
  selector: 'time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {

  @Output('change') change = new EventEmitter()

  constructor(private service:DataService) { }

  ngOnInit() {
  }

  isTracking: boolean = false
  isPaused: boolean = false
  intervalRef: any
  displayTime: string = '00:00:00'
  tracker: Tracker = new Tracker()
  pauseObj: Break
 
  startTracking(){
    this.tracker.startAt = new Date()
    this.isTracking = true
    this.updateUI()
  }

  stopTracking(description){
    this.tracker.endAt = new Date()
    this.isTracking = false
    clearInterval(this.intervalRef)
    this.tracker.calculateDuration()
    this.tracker.description = description.value

    this.change.emit(this.tracker)
    
    this.service.postData(JSON.stringify(this.tracker))
        .subscribe(res => {
          console.log(res)
          this.tracker = new Tracker()
          this.displayTime = '00:00:00'
          description.value = ''
        }, err => {
          console.log(err)
        })

  }

  restartTracking(){
    this.displayTime = '00:00:00'
    clearInterval(this.intervalRef)    
    this.startTracking()
  }

  pauseTracking(){
    this.isTracking = false
    this.isPaused = true
    this.pauseObj = new Break()
    this.pauseObj.startAt = new Date()
    clearInterval(this.intervalRef) 
  }

  resumeTracking(){
    this.isTracking = true
    this.isPaused = false
    this.pauseObj.resumedAt = new Date()
    this.pauseObj.calculateBreakDuration()
    this.tracker.breaks.push(this.pauseObj)
    this.updateUI()
  }

  updateUI(){
    this.intervalRef = setInterval(() => {
      let currentTime = new Date(Math.abs(new Date().getTime() - this.tracker.startAt.getTime() - this.tracker.calculateTotalBreaksDuration()))
      let hours = (currentTime.getHours() < 10) ? '0' + (currentTime.getHours() - 1) : (currentTime.getHours() - 1)
      let minutes = (currentTime.getMinutes() < 10) ? '0' + currentTime.getMinutes() : currentTime.getMinutes()
      let seconds = (currentTime.getSeconds() < 10) ? '0' + currentTime.getSeconds() : currentTime.getSeconds()
      this.displayTime = hours + ':' + minutes + ':' + seconds
    }, 1000)
  }
}
