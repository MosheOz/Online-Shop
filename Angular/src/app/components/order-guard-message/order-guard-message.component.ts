import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/order';
import { Unsubscribe } from '../../../../node_modules/redux';
import { NgRedux } from '../../../../node_modules/ng2-redux';
import { Store } from '../../redux/store';

@Component({
    selector: 'app-order-guard-message',
    templateUrl: './order-guard-message.component.html',
    styleUrls: ['./order-guard-message.component.css']
})
export class OrderGuardMessageComponent implements OnInit {

    private order: Order;
    private noOrders: boolean = false;
    public curCustomer;

    constructor(private cartService: CartService) { }

    ngOnInit() {
        const customer = JSON.parse(localStorage.getItem("currentCustomer"));
        this.cartService.getLastOrder(customer._id)
            .subscribe((lastOrder) => {
                if (lastOrder !== null) {
                    this.order = lastOrder;
                }
                else {
                    this.noOrders = true;
                }
            }, response => {
                console.log("Error: ", response.error.message)
            })

        setTimeout(() => { 
            const currentUser = JSON.parse((localStorage.getItem("currentCustomer")));
            this.curCustomer = currentUser.firstName;
        }, 500)
    }

}
