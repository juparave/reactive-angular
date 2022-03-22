import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  user$: Observable<User>;

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  


}
