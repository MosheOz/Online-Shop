import { Category } from './category';

export class Product {
    public constructor(
        public _id?: string,
        public name?: string,
        public category?: Category,
        public price?: number,
        public imgFileName?: string
    ) { }
}