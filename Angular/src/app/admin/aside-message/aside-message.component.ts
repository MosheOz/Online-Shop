import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-aside-message',
    templateUrl: './aside-message.component.html',
    styleUrls: ['./aside-message.component.css']
})
export class AsideMessageComponent implements OnInit {

    public message: string;

    constructor() { }

    ngOnInit() {
        if (sessionStorage.getItem("message")) {
            this.message = sessionStorage.getItem("message")
        }
    }

}
