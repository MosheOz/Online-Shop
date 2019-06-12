import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public isLoggedIn: boolean;
    public isAdminLoggedIn: boolean;
    public customerName: object;
    public unsubscribe: Unsubscribe;

    constructor(private redux: NgRedux<Store>, private router: Router, private loginService: LoginService) { }

    public ngOnInit(): void {
        this.redux.subscribe(() => {
            this.isLoggedIn = this.redux.getState().isLoggedIn;
            this.isAdminLoggedIn = this.redux.getState().isAdminLoggedIn;
            this.customerName = this.redux.getState().CurrentCustomer;
        });
    }

    public logout(): void {
        this.loginService.logout();
        this.router.navigate(["/logout"]);
    }

    ngOnDestroy(): void {
        // this.unsubscribe();
    }

}
