import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from 'redux';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

    public products: Product[];
    public orders: Order[];
    public unsubscrice: Unsubscribe;
    public currentCart: Cart;

    constructor(private redux: NgRedux<Store>, private cartService: CartService) { }

    public ngOnInit(): void {
        this.cartService.cartStatus();
        this.unsubscrice = this.redux.subscribe(() => {
            this.products = this.redux.getState().products;
            this.orders = this.redux.getState().orders;
            this.currentCart = this.redux.getState().currentCart;
        });
    }
    // open and close cart (small screens)
    public open(cart, productsContainer) {
        if (cart.style.display == "inline-block") {
            cart.style.width = "0";
            cart.style.display = "none";
            productsContainer.style.width = "100%";
            productsContainer.style.display = "inline-block";
        }
        else {
            productsContainer.style.width = "0";
            productsContainer.style.display = "none";
            cart.style.width = "100%";
            cart.style.display = "inline-block";
        }
    }

    //open and close cart (big screens)
    public toggle(cart, productsContainer) {
        if (cart.style.display == "inline-block") {
            cart.style.display = "none";
            cart.style.width = "0";
            productsContainer.style.width = "100%";
        }
        else {
            cart.style.display = "inline-block";
            cart.style.width = "30%";
            productsContainer.style.width = "70%";
        }
    }
    ngOnDestroy(): void {
        this.unsubscrice();
    }
}
