import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { Customer } from '../../models/customer';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ActionType } from '../../redux/action-type';

@Component({
    selector: 'app-user-details-order',
    templateUrl: './user-details-order.component.html',
    styleUrls: ['./user-details-order.component.css']
})
export class UserDetailsOrderComponent implements OnInit {

    public newOrder = new Order();
    public currentCustomer: Customer;
    public cartStatus: any;
    public currentCart: Cart;
    public timeForShpping: any;
    public total: number;
    public isInput: boolean = true;
    public empty: string = "";
    public minimumForOrder: number = 75;
    public loader: boolean = false;

    constructor(private redux: NgRedux<Store>, private cartService: CartService, private router: Router, private getStatus: LoginService) { }

    ngOnInit() {
        const curCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
        this.getStatus.getCustomerDetails(curCustomer._id)
            .subscribe((customer) => {
                this.currentCustomer = customer[0];
            });
        this.cartStatus = this.redux.getState().cartStatus;
        this.timeForShpping = new Date();
        this.timeForShpping.setHours(this.timeForShpping.getHours() + 3);
        this.total = JSON.parse(localStorage.getItem("total"));
    }

    public enableBtn($event, btn) {
        if ($event.target.value !== "") {
            btn.disabled = false;
        }
    }

    public order(creditCard, city, street) {

        // validate inputs
        if (!this.validateInputs(creditCard, city, street)) {
            return;
        }

        this.loader = true;

        // build the object and subscribe 
        this.createOrder(city, street, creditCard);
    }


    // Couldn't use ngModel for validation, So i did it here
    public validateInputs(creditCard, city, street) {

        const reg = /^\d+$/;

        if (city === "") {
            this.isInput = false;
            this.empty = "a";
            return false;
        }
        if (street === "") {
            this.isInput = false;
            this.empty = "b";
            return false;
        }
        // preventing points and commas 
        if (!creditCard.match(reg)) {
            this.isInput = false;
            this.empty = "c";
            return false;
        }
        // currently our users can use only visa or mastercard, with 16 digits
        if (!(creditCard.length == 16)) {
            this.isInput = false;
            this.empty = "c";
            return false;
        }
        // check minimum total
        if (this.total < 75) {
            this.isInput = false;
            this.empty = "d";
            return false;
        }

        return true;
    }

    public createOrder(city, street, creditCard) {

        // build the newOrder object
        this.currentCart = this.cartStatus.carts;
        this.newOrder.customer = this.currentCustomer;
        this.newOrder.cart = this.currentCart;
        this.newOrder.totalPrice = this.total;
        this.newOrder.cityForShiping = city;
        this.newOrder.streetForShipping = street;
        this.newOrder.dateForShipping = this.timeForShpping;
        this.newOrder.creditCardNumber = creditCard;

        this.cartService.createOrder(this.newOrder)
            .subscribe((order: any) => {
                if (order !== undefined) {
                    // change the status to order 
                    this.getStatus.loginCartsStatus(this.currentCustomer._id);

                    // active the order guard to prevent a user from returning to this page
                    sessionStorage.setItem("isOrderActive", "true");
                    const action = { type: ActionType.ActiveOrder };
                    this.redux.dispatch(action);

                    //redirect to thank you page
                    this.router.navigate(["/thank-you"])
                }
                else {
                    alert("Error" + order);
                };
            }, reponse => {
                alert(`Order Error: ${reponse.error.message}`)
            })
    }
}
