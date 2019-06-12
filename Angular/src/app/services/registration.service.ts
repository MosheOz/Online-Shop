import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    private customer: Customer;

    constructor(private httpClient: HttpClient,
        private loginService: LoginService,
        private router: Router) { }

    public isEmailExist(email): Observable<Customer> {
        return this.httpClient.get<Customer>("http://localhost:3000/api//customer/" + email);
    }

    public addCustomer(customer: Customer) {
        this.httpClient.post("http://localhost:3000/api/customer-registrsation-form", customer)
            .subscribe((newCustomer) => {
                this.customer = newCustomer;
                this.loginService.login(newCustomer);
                this.loginService.loginCartsStatus(this.customer._id);
                this.router.navigate(["/home"]);
            }, error => {
                console.log(error.error.message);
                return false
            })
    }
}
