import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { Product } from '../models/product';
import { ActionType } from '../redux/action-type';
import { Order } from '../models/order';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    public constructor(public httpClient: HttpClient, public redux: NgRedux<Store>) { }

    // get all products for live products count page
    public getProducts() {
        this.httpClient.get<Product[]>("http://localhost:3000/api/products")
            .subscribe((products) => {
                const action = { type: ActionType.GetProducts, payload: products };
                this.redux.dispatch(action);
            });
    }

    // get all orers for live orders count page
    public getOrders() {
        this.httpClient.get<Order[]>("http://localhost:3000/api/orders")
            .subscribe((orders) => {
                const action = { type: ActionType.GetOrders, payload: orders };
                this.redux.dispatch(action);
            })
    }

    // get categories for categories nav bar
    public getCategories() {
        this.httpClient.get<Category[]>("http://localhost:3000/api/categories")
            .subscribe((categories) => {
                const action = { type: ActionType.GetCategories, payload: categories };
                this.redux.dispatch(action);
            })
    }

    //get products by category ID
    public getProductsByCategoryID(categoryID) {
        return this.httpClient.get<Product[]>(`http://localhost:3000/api/prducts-by-category/${categoryID}`)
    }

    // get items by search value
    public getItemsBySearch(value) {
        return this.httpClient.get<Product[]>(`http://localhost:3000/api/search-items/${value}`);
    }

    // check if product name already exist , when admin editing / adding product
    public getItemsByName(value) {
        return this.httpClient.get<Product[]>(`http://localhost:3000/api/get-item-by-name/${value}`);
    }
}
