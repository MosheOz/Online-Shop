import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from 'redux';
import { ProductsService } from '../../services/products.service';
import { Credentials } from '../../models/credentials';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionType } from '../../redux/action-type';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    public orders: Order[];
    public products: Product[];
    public unsubscribe: Unsubscribe;
    public credentials = new Credentials();
    public isLoggedIn: boolean;
    public cartStatus: any = [];
    public currentCustomer: object;
    public emailPasswordIncorrect: boolean = true;
    public loader: boolean = false;
    public total: number;

    public constructor(private redux: NgRedux<Store>,
        public productsService: ProductsService,
        private loginService: LoginService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    public ngOnInit(): void {
        this.productsService.getProducts();
        this.unsubscribe = this.redux.subscribe(() => {
            this.products = this.redux.getState().products;
            this.orders = this.redux.getState().orders;
            this.cartStatus = this.redux.getState().cartStatus;
            this.currentCustomer = this.redux.getState().CurrentCustomer;
            this.isLoggedIn = this.redux.getState().isLoggedIn;
        })
        if (localStorage.getItem("total")) {
            this.total = JSON.parse(localStorage.getItem("total"));
        }
    }

    public isCredentialsCorrect() {
        this.loginService.isCustomerNull(this.credentials.email, this.credentials.password)
            .subscribe((customer) => {
                if (customer !== null) {
                    this.loginService.login(customer);
                    this.loginService.loginCartsStatus(customer._id);
                    this.emailPasswordIncorrect = true;
                }
                else {
                    this.emailPasswordIncorrect = false;
                }
            }, response => {
                alert(response.error.message);
            })
    }

    public isOrderForStore() {
        if (sessionStorage.getItem("isOrderActive")) {
            sessionStorage.removeItem("isOrderActive");
        }
        const action = { type: ActionType.VoidOrder };
        this.redux.dispatch(action);
    }

    public totalTo() {
        this.total = JSON.parse(localStorage.getItem("total"));
        return this.total
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}
