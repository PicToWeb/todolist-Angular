import {Component, OnInit} from '@angular/core';
import {SignInService, User} from "../sign-in.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'digi-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userSubscription: Subscription | undefined;
  users:User[] = [];

  constructor(private signInService: SignInService,private router: Router) {  }

  ngOnInit() {
    this.userSubscription = this.signInService.getUser().subscribe(users =>{
      this.users = users ? [users] : [];
    });
  }

  onLogin(): void {
    this.signInService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('User logged in:', response);
        this.router.navigate(['/list']).then();
        this.email = '';
        this.password = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
