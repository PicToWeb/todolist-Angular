import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignInService } from '../authenticate/sign-in.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private signInService: SignInService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.signInService.getUser().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/']).then();
          return false;
        }
      })
    );
  }
}
