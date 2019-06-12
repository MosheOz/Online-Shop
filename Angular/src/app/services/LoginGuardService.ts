import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(private redux: NgRedux<Store>, private router: Router) { }

    public canActivate(): boolean {

        if (this.redux.getState().isLoggedIn) {
            return true;
        }
        this.router.navigate(["/home"]); 
        return false;
    }
}

