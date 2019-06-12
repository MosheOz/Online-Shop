import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout-message',
    templateUrl: './logout-message.component.html',
    styleUrls: ['./logout-message.component.css']
})
export class LogoutMessageComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(["/home"]);
        }, 1000);
    }

}
