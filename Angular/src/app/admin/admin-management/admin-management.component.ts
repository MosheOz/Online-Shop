import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-management',
    templateUrl: './admin-management.component.html',
    styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

}
