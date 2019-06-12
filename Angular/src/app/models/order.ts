export class Order {
    public constructor(
        public _id?: string,
        public customer?: object,
        public cart?: object,
        public totalPrice?: number,
        public cityForShiping?: string,
        public streetForShipping?: string,
        public dateForShipping?: Date,
        public creditCardNumber?: number
    ) { }
}