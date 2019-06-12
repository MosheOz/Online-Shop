import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
// import { Credentials } from '../models/credentials';
import { Customer } from '../models/customer';
import { ActionType } from '../redux/action-type';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { CartService } from './cart.service';
import { CartItem } from '../models/cartItem';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    public constructor(private httpClient: HttpClient, private redux: NgRedux<Store>) { }

    public isAdmin(email, password): Observable<any> {
        return this.httpClient.get<any>("http://localhost:3000/api/admin/" + email + "/" + password);
    }

    public isCustomerNull(email, password): Observable<Customer> {
        return this.httpClient.get<Customer>("http://localhost:3000/api/customer/" + email + "/" + password);
    }

    public getCustomerDetails(id): Observable<Customer> {
        return this.httpClient.get<Customer>(`http://localhost:3000/api/user-by-id/${id}`);
    }

    public loginCartsStatus(_id) {
        this.httpClient.get(("http://localhost:3000/api/cart-status/" + _id))
            .subscribe((carts: object) => {
                this.cartStatus(carts);
            });
    }

    public login(customer) {
        sessionStorage.setItem("isLoggedIn", "true");
        const action = { type: ActionType.Login };
        this.redux.dispatch(action);
        this.loginCustomerIDForStore(customer);
    }

    public loginCustomerIDForStore(customer) {
        let currentCustomer = {
            _id: customer._id,
            firstName: customer.firstName
        };
        localStorage.setItem("currentCustomer", JSON.stringify(currentCustomer));
        const action = { type: ActionType.CurrentCustomer, payload: customer };
        this.redux.dispatch(action);
    }

    public logout() {
        localStorage.clear();
        sessionStorage.clear();
        const action = { type: ActionType.Logout };
        this.redux.dispatch(action);
    }

    public cartStatus(cartStatus) {

        const action = { type: ActionType.CartStatus, payload: cartStatus };
        this.redux.dispatch(action);
        let cartStatusLocalStorage = cartStatus;

        if (cartStatus.order) {
            cartStatusLocalStorage = {
                order: [{
                    _id: cartStatus.order[0]._id,
                    dateForShipping: cartStatus.order[0].dateForShipping,
                }],
                value: cartStatus.value
            }
        }

        localStorage.setItem("cartStatus", JSON.stringify(cartStatusLocalStorage));

        if (cartStatusLocalStorage.carts) {
            this.getItemsCart(cartStatusLocalStorage.carts._id);
        }
    }

    public getItemsCart(id) {
        this.httpClient.get<CartItem[]>("http://localhost:3000/api/cart-items/" + id)
            .subscribe((items) => {
                this.getSum(items);
            })
    }

    public getSum(items) {
        let sum = 0;
        for (let i = 0; i < items.length; i++) {
            sum += items[i].totalPrice;
        }
        localStorage.setItem("total", JSON.stringify(sum));
    }

}
