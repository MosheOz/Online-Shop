import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Credentials } from '../../models/credentials';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ActionType } from '../../redux/action-type';

@Component({
    selector: 'app-admin-log-in',
    templateUrl: './admin-log-in.component.html',
    styleUrls: ['./admin-log-in.component.css']
})
export class AdminLogInComponent implements OnInit {

    public credentials = new Credentials();
    public loginFailed: boolean = false;

    constructor(private redux: NgRedux<Store>, private loginService: LoginService, private router: Router) { }

    ngOnInit() {
    }

    public adminLogin() {
        this.loginService.isAdmin(this.credentials.email, this.credentials.password)
            .subscribe((admin) => {
                if (admin !== null) {
                    sessionStorage.setItem("isAdminLoggedIn", "true");
                    // redux update
                    const action = { type: ActionType.AdminLogin };
                    this.redux.dispatch(action);
                    this.router.navigate(["/admin-log-in/admin-manage"]);
                    return;
                }
                else {
                    this.loginFailed = true;
                }
            }, response => {
                alert(response.error.message);
            })

    }
}
