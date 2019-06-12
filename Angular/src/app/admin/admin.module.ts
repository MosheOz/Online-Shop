import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { FormsModule  } from '@angular/forms';
import { AsideEditAdminComponent } from './aside-edit-admin/aside-edit-admin.component';
import { AsideAddAdminComponent } from './aside-add-admin/aside-add-admin.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AsideComponent } from './aside/aside.component';
import { AsideMessageComponent } from './aside-message/aside-message.component';
import { AdminLoginGuardService } from '../services/admin-login-guard.service';

const routes: Routes = [
    { path: "", component: AdminLogInComponent },
    {
        path: "admin-manage", component: AdminManagementComponent, children: [
            { path: "aside-edit", component: AsideEditAdminComponent },
            { path: "aside-add", component: AsideAddAdminComponent },
            { path: "success-message", component: AsideMessageComponent}
        ]
    , canActivate: [AdminLoginGuardService]},
];

@NgModule({
    declarations: [ProductsAdminComponent, AdminLogInComponent, AsideEditAdminComponent, AsideAddAdminComponent, AdminManagementComponent, AsideComponent, AsideMessageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule]
})
export class AdminModule { }
