import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { NgRedux } from 'ng2-redux';
import { Store } from '../../redux/store';
import { Unsubscribe } from 'redux';
import { Category } from '../../models/category';
import { AdminService } from '../../services/admin.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-aside-edit-admin',
    templateUrl: './aside-edit-admin.component.html',
    styleUrls: ['./aside-edit-admin.component.css']
})
export class AsideEditAdminComponent implements OnInit, OnDestroy {

    public product: Product;
    public products: Product[];
    public categories: Category[];
    public editProduct = new Product();
    public newImage: string;
    public selectedFile = null;
    public isAlert: boolean = false;
    public isName: boolean = false;
    public unsubscribe: Unsubscribe;


    constructor(private redux: NgRedux<Store>,
        private adminService: AdminService,
        private productService: ProductsService,
        private router: Router) { }

    ngOnInit() {
        // call to all categories on init and than subscaribe to redux
        this.productService.getCategories();

        this.unsubscribe = this.redux.subscribe(() => {
            this.products = this.redux.getState().products;
            this.categories = this.redux.getState().categories;
            this.product = this.redux.getState().productForEdit;
        })
    }

    public uploadFile($event, file) {
        // getting the first file of this array
        this.selectedFile = <File>$event.target.files[0];
        if (!this.selectedFile) {
            file.classList.remove("alert-success");
            file.classList.add("alert-danger");
            return;
        }
        file.classList.remove("alert-danger");
        file.classList.add("alert-success");
    }

    // Notify the admin about selected category changed
    public categoryChanged($event) {
        this.isAlert = true;
    }

    // send the form and edit product
    public send(category, file): void {

        this.editProduct = this.product;
        this.editProduct.category = category;

        // check if name contain only space
        if (/^\s+$/.test(this.editProduct.name)) {
            this.isName = true;
            return;
        }

        // check if product name already in system
        this.productService.getItemsByName(this.editProduct.name)
            .subscribe((product) => {
                // if product name exist
                if (product.length > 0) {

                    // Notify the admin that the name already exists in the system
                    if (!confirm("Product name already exist, Are you sure?")) {
                        return;
                    }
                }

                // if the admin decided to continue -->
                // check if user selected to change the existing image
                if (file !== "") {
                    this.editProduct.imgFileName = this.selectedFile.name;
                    this.uploadFileAndUpdateProduct();
                }
                else {
                    this.updateProduct();
                }
            })

    }

    public uploadFileAndUpdateProduct() {

        const fd = new FormData();
        fd.append("image", this.selectedFile, this.selectedFile.name);

        this.adminService.uploadImage(fd)
            .subscribe((response) => {

                this.adminService.editProduct(this.editProduct._id, this.editProduct)
                    .subscribe((productEdited) => {

                        //check if the response correct and item did change
                        if (productEdited !== 0) {
                            sessionStorage.setItem("message", "edited");
                            this.router.navigate(["/admin-log-in/admin-manage/success-message"]);
                        }
                    }, response => {
                        alert("The Item not editted.\nError: " + response.error.message);
                    })
            })
    }

    public updateProduct() {
        this.adminService.editProduct(this.editProduct._id, this.editProduct)
            .subscribe((productEdited) => {

                //check if the response correct and item did change
                if (productEdited !== 0) {
                    sessionStorage.setItem("message", "edited");
                    this.router.navigate(["/admin-log-in/admin-manage/success-message"]);
                }
            }, response => {
                alert("The Item not editted.\nError: " + response.error.message);
            })
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

}
