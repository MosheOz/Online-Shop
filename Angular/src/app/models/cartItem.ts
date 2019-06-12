export class CartItem {
    public constructor(
        public _id?: string,
        public product?: object,
        public quantity?: string,
        public totalPrice?: number,
        public cart?: string
    ) { }
}