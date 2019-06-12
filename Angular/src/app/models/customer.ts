export class Customer {
    public constructor(
        public _id?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public password?: string,
        public phone?: string,
        public city?: string,
        public street?: string,
        public houseNumber?: string
    ) { }
}