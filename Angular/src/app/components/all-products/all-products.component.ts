import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Category } from '../../models/category';
import { ProductsService } from '../../services/products.service';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit, OnDestroy {

    public products: Product[];
    public categories: Category[];
    public itemPrice: any;
    public cartItem = new CartItem();
    public currentCart: Cart;
    public unsubscribe: Unsubscribe;

    constructor(private redux: NgRedux<Store>, private productService: ProductsService,
        private cartService: CartService) { }

    ngOnInit(): void {
        // get the categories from server on init and update redux
        this.productService.getCategories();
        // sign to redux for categories and current cart details
        this.unsubscribe = this.redux.subscribe(() => {
            this.categories = this.redux.getState().categories;
            this.currentCart = this.redux.getState().currentCart;
        });
    }

    // this function opening the modal and inserts into the modal the current details
    openBackDropCustomClass(modal, title, p, imageWrap, priceWrap) {
        // show modal
        modal.style.display = "block";
        // insert details into modal
        title.innerHTML = `<b>${p.name}</b><br><p style='font-size: 13px;'>${p.category.name}</p>`;
        imageWrap.src = `http://localhost:3000/images/${p.imgFileName}`;
        priceWrap.innerHTML = `${p.price} &#x20AA;`;
        // insert details in our local objects
        this.itemPrice = p.price;
        this.cartItem.product = p._id;
    }

    // when user click the x for modal closing
    public closeModal(modal) {
        modal.style.display = "none";
    }

    // when user click on selected category, will get the selected category result
    public getProductsCategory(categoryID) {
        // subscribe to get products service
        this.productService.getProductsByCategoryID(categoryID)
            .subscribe((products) => {
                // get the response and insert into our products objects array 
                this.products = products;
            }, response => {
                // notify user for errors
                alert("Error: " + response.error.message);
            })
    }

    // function using for easy items adding to cart 
    public addAmount(amount, p) {
        if (amount <= 0) { 
            return;
        }
        // build the object 
        this.cartItem.quantity = amount;
        this.cartItem.totalPrice = amount * p.price;
        this.cartItem.cart = this.currentCart._id;
        this.cartItem.product = p._id;

        // subscribe to service and send the object to server
        this.cartService.addNewItemToCart(this.cartItem)
            .subscribe((item) => {
                this.cartService.getItemsCartForStore(item.cart);
            }, reponse => {
                alert("Error: " + reponse.error.message)
            })
    }

    // function on user modal click
    public addQuantityToCart(quantity, modal) {
        if (quantity <= 0) { 
            return;
        }
        // build the object
        this.cartItem.quantity = quantity;
        this.cartItem.totalPrice = quantity * this.itemPrice;
        this.cartItem.cart = this.currentCart._id;

        // close the modal
        modal.style.display = "none";

        // subscribe to add new item service
        this.cartService.addNewItemToCart(this.cartItem)
            .subscribe((item) => {
                // update items in cart while updating redux with new item added
                this.cartService.getItemsCartForStore(item.cart);
            }, reponse => {
                alert("Error: " + reponse.error.message);
            })
    }

    // send value to server for search
    public search(searchValue) {
        if (searchValue == "") {
            return;
        }
        this.cartService.getItemsBySearch(searchValue)
            .subscribe((items) => {
                this.products = items;
            }, response => {
                alert("Error: " + response.error);
            })
    }

    // open search bar
    public openSearch(searchAppear) {
        searchAppear.style.display = "flex";
    }

    //close search bar
    public closeSearchInput(searchAppear) {
        searchAppear.style.display = "none";
    }

    //open and close categories menu, using for small screen size
    public toggle(id) {
        if (id.style.display == 'block')
            id.style.display = 'none';
        else
            id.style.display = 'block';
    }

    // open and close the categories menu, using for big screen size
    public toggleCategories(id) {
        if (id.style.display == 'block')
            id.style.display = 'none';
        else
            id.style.display = 'block';
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}
