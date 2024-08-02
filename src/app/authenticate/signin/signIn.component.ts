import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SignInService} from "../sign-in.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'digi-signin',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './signIn.component.html',
  styleUrl: './signIn.component.css'
})
export class SignInComponent {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private signInService: SignInService,private router: Router) {  }

  onSubmit() :void{
    const user = {
      id: crypto.randomUUID(),
      username: this.username,
      email: this.email,
      password: this.password
    }
    this.signInService.addUser(user).subscribe(response => {
      console.log('User signed in : ',response);
      this.username = '';
      this.email = '';
      this.password = '';
      this.router.navigate(['/login']).then();
    });
  }


}
