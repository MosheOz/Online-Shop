import { Store } from './store';
import { Action } from './action';
import { ActionType } from './action-type';

export class Reducer {

    public static reduce(oldStore: Store, action: Action): Store {

        const newStore = { ...oldStore };

        switch (action.type) {

            case ActionType.GetProducts:
                newStore.products = action.payload;
                break;

            case ActionType.AddProduct:
                newStore.products.push(action.payload);
                break;

            case ActionType.GetOrders:
                newStore.orders = action.payload;
                break;

            case ActionType.Login:
                newStore.isLoggedIn = true;
                break;

            case ActionType.AdminLogin:
                newStore.isAdminLoggedIn = true;
                break;

            case ActionType.Logout:
                newStore.isLoggedIn = false;
                newStore.isAdminLoggedIn = false;
                break;

            case ActionType.CartStatus:
                newStore.cartStatus = action.payload;
                break;

            case ActionType.CurrentCustomer:
                newStore.CurrentCustomer = action.payload;
                break;

            case ActionType.GetCategories:
                newStore.categories = action.payload;
                break;

            case ActionType.CurrentCart:
                newStore.currentCart = action.payload;
                break;

            case ActionType.AddCartItem:
                newStore.itemsCarts = action.payload;
                break;

            case ActionType.TotalPriceForOrder:
                newStore.totalPriceForOrder = action.payload;
                break;

            case ActionType.productForEdit:
                newStore.productForEdit = action.payload;
                break;

            case ActionType.ActiveOrder:
                newStore.isOrderActive = true;
                break;

            case ActionType.VoidOrder:
                newStore.isOrderActive = false;
                break;
        }

        return newStore;
    }
}