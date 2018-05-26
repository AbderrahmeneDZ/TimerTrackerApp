import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service:AuthService, private router: Router) { }

  isLogin
  ngOnInit() {
     this.isLogin = this.service.isLogin
  }

  onLogoutClicked(){
    this.service.logout()
    this.router.navigateByUrl('\login')
  }

}
