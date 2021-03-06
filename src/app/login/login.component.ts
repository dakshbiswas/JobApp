import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TOKEN_NAME } from '../authentication.service';
import { User } from '../Job';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User();
  constructor(private authService: AuthenticationService, private router: Router) { }
  ngOnInit(): void {
  }

  loginUser(){
    console.log("Login user", this.user);
    console.log(localStorage.getItem(TOKEN_NAME));

    this.authService.loginUser(this.user).subscribe(data => {
      console.log("Login successful");
      if(data['token']) {
        this.authService.setToken(data['token']);
        this.authService.setFname(data['Fname']);
        this.authService.setUserId(data['userId']);
        this.authService.setImageUrl(data['imageUrl']);
        this.authService.setLname(data['Lname']);
        console.log(localStorage.getItem(TOKEN_NAME));
       
      //  this.router.navigate(['/players/search']);
      //this.router.navigate(['/protected']);
      window.location.href="/protected";
      }
      
    },
    error => {
      alert("wrong credential");
    }
    );
  }
  goToRegistration(){
    this.router.navigate(['/registration']);
  }
}
