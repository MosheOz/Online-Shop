import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Category } from '../../models/category';
import { ActionType } from '../../redux/action-type';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

    public categories: Category[];

    constructor(private router: Router, private redux: NgRedux<Store>, productsService: ProductsService) { }

    public ngOnInit(): void {
        this.redux.subscribe(() => {
            this.redux.getState().categories;
        })
    }

    public edit() {
        this.router.navigate(["/admin-log-in/admin-manage/aside-edit"]);
    }

    public Add() {
        this.router.navigate(["/admin-log-in/admin-manage/aside-add"]);
        this.ngOnInit();
    }

}
