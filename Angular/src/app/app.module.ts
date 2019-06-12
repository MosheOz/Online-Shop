import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgRedux, NgReduxModule } from "ng2-redux";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { Page404Component } from './components/page404/page404.component';
import { Reducer } from './redux/reducer';
import { Store } from './redux/store';
import { HttpClientModule } from "@angular/common/http";
import { ProductsService } from './services/products.service';
import { AboutComponent } from './components/about/about.component';
import { LiveDetailsComponent } from './components/live-details/live-details.component';
import { LogoutMessageComponent } from './components/logout-message/logout-message.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { OrderComponent } from './components/order/order.component';
import { CartDetailsOrderComponent } from './components/cart-details-order/cart-details-order.component';
import { UserDetailsOrderComponent } from './components/user-details-order/user-details-order.component';
import { ThankYouMessageComponent } from './components/thank-you-message/thank-you-message.component';
import { OrderGuardMessageComponent } from './components/order-guard-message/order-guard-message.component';

@NgModule({
    declarations: [LayoutComponent, HomeComponent, ProductsComponent, Page404Component, AboutComponent, LiveDetailsComponent, LogoutMessageComponent, RegistrationPageComponent, HeaderComponent, FooterComponent, CartComponent, AllProductsComponent, OrderComponent, CartDetailsOrderComponent, UserDetailsOrderComponent, ThankYouMessageComponent, OrderGuardMessageComponent],
    imports: [BrowserModule, AppRoutingModule, NgReduxModule, HttpClientModule, FormsModule, RouterModule, NgbModule],
    bootstrap: [LayoutComponent]
})
export class AppModule {
    public constructor(redux: NgRedux<Store>, productsService: ProductsService) {
        redux.configureStore(Reducer.reduce, new Store());
        productsService.getProducts();
        productsService.getOrders();
        productsService.getCategories();
    }

}
