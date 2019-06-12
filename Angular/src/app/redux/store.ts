import { Product } from '../models/product';
import { Order } from '../models/order';
import { Customer } from '../models/customer';
import { Category } from '../models/category';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { CartService } from '../services/cart.service';

export class Store {
    public products: Product[];
    public orders: Order[];
    public isLoggedIn: boolean;
    public isAdminLoggedIn: boolean;
    public cartStatus: any = [];
    public CurrentCustomer: Customer;
    public currentCart: Cart;
    public categories: Category[];
    public itemsCarts: CartItem[];
    public totalPriceForOrder: number;
    public productForEdit: Product;
    public isOrderActive: boolean;

    public constructor() {
        if (sessionStorage.getItem("isLoggedIn") === "true") {
            this.isLoggedIn = true;
        }
        if (sessionStorage.getItem("isAdminLoggedIn") === "true") {
            this.isAdminLoggedIn = true;
        }
        if (sessionStorage.getItem("isOrderActive") === "true") {
            this.isOrderActive = true;
        }
        if (localStorage.getItem("cartStatus")) {
            this.cartStatus = JSON.parse(localStorage.getItem('cartStatus'));
        }
        if (localStorage.getItem("currentCustomer")) {
            this.CurrentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
        }
        if (localStorage.getItem("currentCart")) {
            this.currentCart = JSON.parse(localStorage.getItem("currentCart"));
        }
    }
}