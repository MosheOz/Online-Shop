import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-thank-you-message',
    templateUrl: './thank-you-message.component.html',
    styleUrls: ['./thank-you-message.component.css'],
})
export class ThankYouMessageComponent implements OnInit {

    public orderID: string;

    constructor() { }

    ngOnInit() {
        // wait half second for localstorage data changing
        setTimeout(() => {
            const currentOrder = JSON.parse(localStorage.getItem("cartStatus"));
            this.orderID = currentOrder.order[0]._id;
        }, 500)
    }

}
