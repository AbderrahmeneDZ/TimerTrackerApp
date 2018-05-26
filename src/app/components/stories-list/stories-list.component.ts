import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tracker } from './../../models/Tracker';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.css']
})
export class StoriesListComponent implements OnInit {

  @Input('trackers') trackerList: Tracker[]

  constructor(private service: DataService) { }

  errorMessage = null


  ngOnInit() {
    let timeOfToday = new Date(new Date().toLocaleDateString()).getTime()
    let currentTime = new Date().getTime()
    this.service.getData(0, timeOfToday, currentTime)
      .subscribe((res: Tracker[]) => {
        res.forEach(element => {
          this.trackerList.push(element)
        });
      }, err => {
        console.log(err)
      })
  }// 20/12/2017 12:45:22

  onSubmitDate(startDate: HTMLInputElement, endDate: HTMLInputElement) {
    let startAt = this.stringToDate(startDate.value, 'dd/mm/yyyy/hh/nn/ss', '/').getTime()
    let endAt = this.stringToDate(endDate.value, 'dd/mm/yyyy/hh/nn/ss', '/').getTime()

    if (isNaN(startAt) || isNaN(endAt) ){
      // show alert message
      if (endAt)
        endDate.value = ''
      if (startAt)
        startDate.value = ''
      this.errorMessage = 'Please enter valid dates'
      setTimeout(() => {
        this.errorMessage = null
      }, 3000);
    } else {
      this.errorMessage = null
      this.trackerList = []
      this.service.getData(0, startAt, endAt)
      .subscribe((res: Tracker[]) => {
        console.log(res)
        this.trackerList = res
      }, err => {
        console.log(err)
      })
    }
  }

  stringToDate(_date, _format, _delimiter) {
    var formatLowerCase: string = _format.toLowerCase();
    _date = _date.replace(' ', '/')
    _date = _date.replace(':', '/')
    _date = _date.replace(':', '/')
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var hoursIndex = formatItems.indexOf('hh')
    var minutesIndex = formatItems.indexOf('nn')
    var secondsIndex = formatItems.indexOf('ss')
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month,
      dateItems[dayIndex], dateItems[hoursIndex],
      dateItems[minutesIndex], dateItems[secondsIndex]);
    return formatedDate;
  }
}
