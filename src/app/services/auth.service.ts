import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  url = 'https://afternoon-taiga-53082.herokuapp.com/api/auth'
  headers = new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(private http:HttpClient) {}

  login(credentials){
    return this.http.post(this.url+'/login', credentials, { headers: this.headers })
      .map(res => {
        if(res['token']) {
          let token = res['token']
          localStorage.setItem('TimerAppToken',token)
          return true
        }else 
          return res['message']
      })
  }

  register(credentials){
    return this.http.post(this.url+'/register',credentials, {headers: this.headers})
      .map(res => {
          return (res['status'] === 201)
      })
  }

  get isLogin():boolean{
    return (localStorage.getItem('TimerAppToken') !== null)
  }

  logout(){
    localStorage.removeItem('TimerAppToken')
  }

}
