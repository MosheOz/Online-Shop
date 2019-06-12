import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
    selector: 'app-aside-add-admin',
    templateUrl: './aside-add-admin.component.html',
    styleUrls: ['./aside-add-admin.component.css']
})
export class AsideAddAdminComponent implements OnInit {

    public categories: Category[];
    public product = new Product();
    public selectedFile = null;
    public imageRequired: boolean = false;
    public isName: boolean = false;

    // Disable submit btn if user clicked on input file but did not choose any file. 
    // Couldn't use the ngForm for this 
    public disableBtnForImage: boolean = true;

    public constructor(private redux: NgRedux<Store>, private adminService: AdminService, private router: Router, private productService: ProductsService) { }

    public ngOnInit(): void {
        this.productService.getCategories();
        this.redux.subscribe(() => {
            this.categories = this.redux.getState().categories;
        })
    }

    public uploadFile($event, file) {

        // getting the first file of this array
        this.selectedFile = <File>$event.target.files[0];

        //if user canceled his select, changing the div color to red
        if (!this.selectedFile) {
            this.imageRequired = true;
            this.disableBtnForImage = true;
            file.classList.remove("alert-success");
            file.classList.add("alert-danger");
            return;
        }

        //changing the div color to green
        this.disableBtnForImage = false;
        file.classList.remove("alert-danger");
        file.classList.add("alert-success");
        this.imageRequired = false;
    }

    // add item to DB
    public addItem(category) {

        // add image and category to the product object
        this.product.imgFileName = this.selectedFile.name;
        this.product.category = category;

        // check if name contain only space
        if (/^\s+$/.test(this.product.name)) {
            this.isName = true;
            return;
        }

        //check if product name already exists
        this.productService.getItemsByName(this.product.name)
            .subscribe((product) => {
                // if product name already in system
                if (product.length > 0) {
                    // Notify the admin that the name already exists in the system
                    if (!confirm("Product name already exist, Are you sure?")) {
                        return;
                    }
                }
                // if the admin decided to continue -->
                this.uploadFileAndUpdateProduct();
            })
    }

    // add file and product to DB
    public uploadFileAndUpdateProduct() {

        // create new formdata of type image
        const fd = new FormData();
        fd.append("image", this.selectedFile, this.selectedFile.name);

        // subscibe to upload image service
        this.adminService.uploadImage(fd)
            .subscribe((response) => {
                // subscribe to add product service
                this.adminService.addProduct(this.product)
                    .subscribe((product) => {

                        //check if the response correct and item edited
                        if (product !== 0) {
                            // update session storage for edit message 
                            sessionStorage.setItem("message", "added");
                            this.router.navigate(["/admin-log-in/admin-manage/success-message"]);
                        }
                    }, response => {
                        alert("The Item not edited.\nError: " + response.error.message);
                    })
            }, response => {
                alert("The image not uploaded.\nError: " + response.error.message);
            })
    }

}
