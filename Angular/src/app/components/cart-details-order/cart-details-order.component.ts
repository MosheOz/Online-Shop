import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { Unsubscribe } from 'redux';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'app-cart-details-order',
    templateUrl: './cart-details-order.component.html',
    styleUrls: ['./cart-details-order.component.css']
})
export class CartDetailsOrderComponent implements OnInit, OnDestroy {

    public currentCart: Cart;
    public cartItems: CartItem[];
    public unsubscribe: Unsubscribe;
    public sumTotal = this.getSumCart();

    constructor(private redux: NgRedux<Store>, private cartService: CartService, private router: Router) { }

    public ngOnInit(): void {
        // get cart status, if user checke
        // this.cartService.cartStatus();

        const cartID = JSON.parse(localStorage.getItem("cartStatus"));
        //Whether the user is in the middle of purchase or has already completed it.
        //If completed, redirect user to the order details
        // this made to prevent a user from returning to this page right after the check out. 
        if (cartID.carts !== undefined) {
            this.cartService.currentCart(cartID.carts._id);
            this.unsubscribe = this.redux.subscribe(() => {
                this.currentCart = this.redux.getState().currentCart;
                this.cartItems = this.redux.getState().itemsCarts;
            });
        }
        else {
            this.router.navigate(["/last-order-message"])
        }
    }

    public getSumCart() {
        let sum = 0;
        if (this.cartItems !== undefined) {
            for (let i = 0; i < this.cartItems.length; i++) {
                sum += this.cartItems[i].totalPrice;
            }
            this.setTotalInStore(sum);
        }
        return sum;
    }

    public setTotalInStore(total) {
        localStorage.setItem("total", JSON.stringify(total));
    }

    ngOnDestroy(): void {
        this.unsubscribe;
    }
}
