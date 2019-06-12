import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { Cart } from '../models/cart';
import { ActionType } from '../redux/action-type';
import { CartItem } from '../models/cartItem';
import { LoginService } from './login.service';
import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public constructor(private httpClient: HttpClient, private redux: NgRedux<Store>, private loginService: LoginService) { }

    // declare current cart and insert into store
    public cartStatus() {
        const currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        const customerID = currentCustomer._id;
        const cart = JSON.parse(localStorage.getItem('cartStatus'));

        const newCart = new Cart();
        newCart.customerID = currentCustomer._id;
        newCart.dateCreated = new Date();

        switch (cart.value) {
            case "a":
                this.currentCart(cart.carts._id);
                break;

            case "b":
                this.createNewCart(newCart, customerID);
                break;

            case "c":
                this.createNewCart(newCart, customerID);
                break;
        }
    }

    public currentCart(cartID) {
        this.httpClient.get<Cart>("http://localhost:3000/api/carts/" + cartID)
            .subscribe((cart) => {
                const cartUser = cart;
                const action = { type: ActionType.CurrentCart, payload: cartUser };
                this.redux.dispatch(action);
                this.getItemsCartForStore(cartUser._id);
            })
    }

    public getItemsCart(cart) {
        return this.httpClient.get<CartItem[]>("http://localhost:3000/api/cart-items/" + cart);
    }

    public getItemsCartForStore(cartId) {
        this.httpClient.get<CartItem[]>("http://localhost:3000/api/cart-items/" + cartId)
            .subscribe((cartItems) => {
                const itemsCart = cartItems;
                const action = { type: ActionType.AddCartItem, payload: itemsCart };
                this.redux.dispatch(action);
            })
    }

    public createNewCart(cart, customerID) {
        this.httpClient.post<Cart>("http://localhost:3000/api/carts/", cart)
            .subscribe((newCart) => {
                const cartUser = newCart;
                const action = { type: ActionType.CurrentCart, payload: cartUser };
                this.redux.dispatch(action);
                this.loginService.loginCartsStatus(customerID);
            })
    }

    public getItemsBySearch(value) {
        return this.httpClient.get<Product[]>(`http://localhost:3000/api/search-items/${value}`);
    }

    public addNewItemToCart(item) {
        return this.httpClient.post<CartItem>("http://localhost:3000/api/add-item-to-cart", item)
    }

    // get last order for order guard message 
    public getLastOrder(customerID) {
        return this.httpClient.get<Order>(`http://localhost:3000/api/last-order/${customerID}`)
    }

    // when user clicks on submit order, create new order in database
    public createOrder(order) { 
        return this.httpClient.post<Order>("http://localhost:3000/api/new-order", order);
    }

    public deleteItemFromCart(_id) {
        return this.httpClient.delete(`http://localhost:3000/api/delete-one-item-from-cart/${_id}`);
    }

    public deleteAllFromCart(cartID) {
        return this.httpClient.delete(`http://localhost:3000/api/delete-all-items-from-cart/${cartID}`);
    }

}
