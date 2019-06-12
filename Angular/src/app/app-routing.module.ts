import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginGuardService } from './services/LoginGuardService';
import { LogoutMessageComponent } from './components/logout-message/logout-message.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { OrderComponent } from './components/order/order.component';
import { ThankYouMessageComponent } from './components/thank-you-message/thank-you-message.component';
import { OrderGuardService } from './services/order-guard.service';
import { OrderGuardMessageComponent } from './components/order-guard-message/order-guard-message.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "products", component: ProductsComponent, canActivate: [LoginGuardService, OrderGuardService] },
    { path: "register", component: RegistrationPageComponent },
    { path: "order", component: OrderComponent, canActivate: [LoginGuardService, OrderGuardService] },
    { path: "last-order-message", component: OrderGuardMessageComponent, canActivate: [LoginGuardService] },
    { path: "thank-you", component: ThankYouMessageComponent, canActivate: [LoginGuardService] },
    { path: "logout", component: LogoutMessageComponent },
    { path: "admin-log-in", loadChildren: "./admin/admin.module#AdminModule" },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", component: Page404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
