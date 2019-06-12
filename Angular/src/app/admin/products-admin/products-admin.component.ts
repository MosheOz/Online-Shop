import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductsService } from '../../services/products.service';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { AdminService } from '../../services/admin.service';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-products-admin',
    templateUrl: './products-admin.component.html',
    styleUrls: ['./products-admin.component.css'],
})
export class ProductsAdminComponent implements OnInit, OnDestroy {

    public products: Product[];
    public categories: Category[];
    public product: Product;
    public unsubscribe: Unsubscribe;

    constructor(private redux: NgRedux<Store>, public productService: ProductsService, private adminService: AdminService) { }

    public ngOnInit() {
        // get categories on init and update redux, then subscribe to redux
        this.productService.getCategories();
        this.unsubscribe = this.redux.subscribe(() => {
            this.categories = this.redux.getState().categories;
            this.product = this.redux.getState().productForEdit;
        });
    }

    // when select category, get all items category
    public getProductsCategory(categoryID) {
        this.productService.getProductsByCategoryID(categoryID)
            .subscribe((products) => {
                this.products = products;
            }, response => {
                console.log("Error: ", response.error.message)
            })
    }

    // get all items by search
    public search(searchValue) {
        this.productService.getItemsBySearch(searchValue)
            .subscribe((items) => {
                this.products = items;
            }, response => {
                console.log("Error: " + response.error.message);
            })
    }
    
    // on click, open the search input
    public openSearch(searchAppear) {
        searchAppear.style.display = "flex";
    }

    // on click, close search input
    public closeSearchInput(searchAppear) {
        searchAppear.style.display = "none";
    }

    // on click, update redux for items for edit
    public editProduct(p) {
        this.adminService.getItemDetailsForEdit(p);
    }

    // toggle menu
    public toggle(id) {
        if (id.style.display == 'block')
            id.style.display = 'none';
        else
            id.style.display = 'block';
    }

    ngOnDestroy(): void {
    }

}
