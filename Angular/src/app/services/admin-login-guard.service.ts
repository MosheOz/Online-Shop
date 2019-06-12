import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class AdminLoginGuardService implements CanActivate {

    constructor(private redux: NgRedux<Store>, private router: Router) { }

    public canActivate(): boolean {

        if (this.redux.getState().isAdminLoggedIn) {
            return true;
        }
        this.router.navigate(["/home"]);
        return false;
    }
}


