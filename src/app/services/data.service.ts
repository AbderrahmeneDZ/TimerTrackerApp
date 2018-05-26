import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Tracker } from '../models/Tracker';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  url = 'https://afternoon-taiga-53082.herokuapp.com/api/data'
  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'bearer '+localStorage.getItem('TimerAppToken')
  })
  constructor(private http:HttpClient) { }

  postData(data){
    return this.http.post(this.url+'/new',data, {headers: this.headers})
        .map(res => res['id'])
  }

  getData(index, startAt, endAt){
    return this.http.get(this.url+`/filter/between/${index}/${startAt}/${endAt}`,{headers: this.headers})
          .map((res : any[]) => {
            
            res.forEach(element => {
              element.startAt = new Date(element.startAt)
              element.endAt = new Date(element.endAt)
            });

            return res
          })
  }

}
