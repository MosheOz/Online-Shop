import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    providers: [NgbCarouselConfig]
})
export class AboutComponent implements OnInit {

    public images = [
        "/assets/images/shop1.png",
        "/assets/images/shop2.png",
        "/assets/images/shop3.png",
        "/assets/images/shop4.png",
        "/assets/images/shop5.png",
    ]

    constructor() { }

    ngOnInit() {
    }
}
