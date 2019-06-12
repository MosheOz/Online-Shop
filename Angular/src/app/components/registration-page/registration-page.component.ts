import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

    public customer = new Customer();
    public isPasswordMatch: boolean = true;
    private isEmailExist: boolean;
    private loader: boolean = false;
    public testSerice: any;

    constructor(private registrationService: RegistrationService, private router: Router) { }

    public ngOnInit(): void {
    }

    public addUser(password: string, passwordConfirm: string) {

        if (this.MatchPassword(password, passwordConfirm)) {

            this.registrationService.isEmailExist(this.customer.email)
                .subscribe((email) => {
                    // this.loader = true
                    if (email !== null) {
                        this.isEmailExist = true;
                        return;
                    }
                    else {
                        this.isEmailExist = false;
                        this.testSerice = this.registrationService.addCustomer(this.customer);
                    }
                })
        }
        else {
            this.isPasswordMatch = false;
            return;
        };
    }

    public MatchPassword(password: string, passordConfirm: string) {
        return password === passordConfirm;
    }

}
