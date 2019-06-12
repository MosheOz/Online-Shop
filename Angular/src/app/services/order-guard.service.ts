import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})

export class OrderGuardService implements CanActivate {

    constructor(private redux: NgRedux<Store>, private router: Router) { }

    public canActivate(): boolean {

        if (this.redux.getState().isOrderActive !== true) {
            return true;
        }
        this.router.navigate(["/last-order-message"]);
        return false;
    }
}


