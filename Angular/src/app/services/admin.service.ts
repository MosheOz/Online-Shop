import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    public constructor(public httpClient: HttpClient, public redux: NgRedux<Store>) { }

    public getItemDetailsForEdit(product) {
        const action = { type: ActionType.productForEdit, payload: product };
        this.redux.dispatch(action);
    }

    public uploadImage(image):Observable<File> { 
        return this.httpClient.post<File>("http://localhost:3000/api/upload-image", image);
    }

    // edit product
    public editProduct(productID, productBody): Observable<Product> {
        return this.httpClient.put<Product>(`http://localhost:3000/api/edit-product/${productID}`, productBody);
    }

    public addProduct(p): Observable<Product> {
        return this.httpClient.post<Product>("http://localhost:3000/api/add-product", p);
    }
}
