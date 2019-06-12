import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { Unsubscribe } from 'redux';


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

    public currentCart: Cart;
    public cartItems: CartItem[];
    public cartEmpty: boolean = false;
    public unsubscribe: Unsubscribe

    constructor(private redux: NgRedux<Store>, private cartService: CartService) { }

    public ngOnInit(): void {
        // get cart id
        const cartID = JSON.parse(localStorage.getItem("cartStatus"));

        // Check whether there is a cart or not.
        // If not, wait a second to get the cart id from a localStorage(after created a new cart on the products page)
        // This happens after an order
        if (cartID.carts !== undefined) {
            this.cartService.currentCart(cartID.carts._id);
            this.unsubscribe = this.redux.subscribe(() => {
                this.currentCart = this.redux.getState().currentCart;
                this.cartItems = this.redux.getState().itemsCarts;
            });
        }
        else {
            setTimeout(() => {
                const cartID = JSON.parse(localStorage.getItem("cartStatus"));
                this.cartService.currentCart(cartID.carts._id);
                this.unsubscribe = this.redux.subscribe(() => {
                    this.currentCart = this.redux.getState().currentCart;
                    this.cartItems = this.redux.getState().itemsCarts;
                });
            }, 1000)
        }

    }

    // function for delete only one item from cart by user selection
    public deleteOneItemFromCart(_id) {
        this.cartService.deleteItemFromCart(_id)
            .subscribe((unitsDeleted: object) => {
                this.ngOnInit();
            }, response => {
                console.log("Error:" + response.error.message);
            })
    }

    // function for delete all items from cart
    public deleteAllItemsFromCart() {
        // make sure there are items in cart and user confirmation
        if (this.cartItems.length == 0) {
            return;
        }
        if (!confirm("Are you sure ?")) {
            return;
        }
        this.cartService.deleteAllFromCart(this.currentCart._id)
            .subscribe((unitsDeleted) => {
                this.ngOnInit();
            }, response => {
                console.log("Error:" + response.error.message);
            })
    }

    // sum all the items in cart aand get the total
    public getSumCart() {
        let sum = 0;
        if (this.cartItems !== undefined) {
            for (let i = 0; i < this.cartItems.length; i++) {
                sum += this.cartItems[i].totalPrice;
            }
        }
        localStorage.setItem("total", JSON.stringify(sum));
        return sum;
    }

    // set the total of cart for total check out
    public setTotalInStore(total) {
        localStorage.setItem("total", JSON.stringify(total));
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}
