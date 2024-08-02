import {Component, OnInit} from '@angular/core';
import {SignInService, User} from "../../authenticate/sign-in.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'digi-my-account',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit{
  userData:User | null = null;

  constructor(private signInService:SignInService, private router: Router) {  }

  ngOnInit() {
    this.signInService.getUser().subscribe(user =>{
      this.userData = user;
    });
  }

  logout(): void {
    this.signInService.logout();
    this.router.navigate(['/']).then();
  }

}
