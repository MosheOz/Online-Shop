import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from 'redux';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-live-details',
    templateUrl: './live-details.component.html',
    styleUrls: ['./live-details.component.css']
})
export class LiveDetailsComponent implements OnInit, OnDestroy {

    public orders: Order[];
    public products: Product[];
    public unsubscribe: Unsubscribe;
    public isLoggedIn: boolean;
    public cartStatus: any = [];
    public currentCustomer: object;
    public emailPasswordIncorrect: boolean = true;
    public loader: boolean = false;
    public total: number;

    constructor(private redux: NgRedux<Store>,
        public productsService: ProductsService) { }

    ngOnInit() {
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

    public totalTo() {
        this.total = JSON.parse(localStorage.getItem("total"));
        return this.total
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

}
