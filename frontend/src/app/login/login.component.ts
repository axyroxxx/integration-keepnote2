import { Component, OnInit } from '@angular/core';
import { Contacts } from '../contacts';
import {AuthenicationService} from '../services/authenication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public contact:Contacts;

  constructor(private authService: AuthenicationService, private router:Router) {
    this.contact = new Contacts();
   }

  ngOnInit() {
  }

  addUser(user){
    this.authService.authentication(user.value).subscribe(
      data =>{
        console.log(data);
        this.authService.storeToken(data['token']);
        this.router.navigate(['/dashboard']);
      },
      err =>{
        this.router.navigate(['/login']);
        console.log(err);
      }
    )
  }

}
